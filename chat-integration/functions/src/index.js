const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Cloud Function that triggers when a notification document is created
exports.sendPushNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    try {
      const notification = snap.data();
      const notificationId = context.params.notificationId;
      
      console.log('📤 Processing notification:', notificationId);
      console.log('📋 Notification data:', notification);

      // Get recipient's user document to find their push token
      const recipientDoc = await admin.firestore()
        .collection('users')
        .doc(notification.recipientId)
        .get();

      if (!recipientDoc.exists) {
        console.log('❌ Recipient user not found:', notification.recipientId);
        return;
      }

      const recipientData = recipientDoc.data();
      const pushToken = recipientData.pushToken;

      if (!pushToken) {
        console.log('❌ No push token found for recipient:', notification.recipientId);
        return;
      }

      console.log('🎯 Sending push notification to:', pushToken);

      // Prepare the push notification payload
      const message = {
        to: pushToken,
        sound: 'default',
        title: `New message from ${notification.senderName}`,
        body: notification.messageText,
        data: {
          chatId: notification.chatId,
          senderId: notification.senderId,
          senderName: notification.senderName,
          type: notification.type || 'chat_message',
          productId: notification.productId || null
        }
      };

      // Send to Expo Push Notification service
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      });

      const result = await response.json();
      console.log('✅ Expo Push API response:', result);

      // Update the notification document with the result
      await snap.ref.update({
        status: result.data?.status === 'ok' ? 'sent' : 'error',
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        expoPushResponse: result
      });

      // Optional: Get delivery receipt (check if notification was actually delivered)
      if (result.data && result.data.id) {
        const receiptId = result.data.id;
        console.log('🎯 Notification sent with ID:', receiptId);
        
        // You can implement receipt checking here if needed
        setTimeout(async () => {
          try {
            const receiptResponse = await fetch('https://exp.host/--/api/v2/push/getReceipts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ids: [receiptId]
              })
            });
            
            const receipts = await receiptResponse.json();
            console.log('📨 Delivery receipt:', receipts);
            
            // Update notification with delivery status
            await snap.ref.update({
              deliveryReceipt: receipts
            });
          } catch (error) {
            console.error('Error getting delivery receipt:', error);
          }
        }, 5000); // Check receipt after 5 seconds
      }

    } catch (error) {
      console.error('💥 Error in sendPushNotification function:', error);
      
      // Update notification with error status
      await snap.ref.update({
        status: 'error',
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        error: error.message
      });
    }
  });