# My Contributions to Flamant - Food Marketplace App

## 🚀 Project Overview
Flamant is a food marketplace application where users can buy and sell food items. I contributed to building key features for real-time communication and user authentication.

## My Contributions

###  Real-Time Chat System (feature/chat-integration)
Built a complete chat system to enable buyers and sellers to communicate directly within the app.

**What I Built:**
- Real-time messaging between buyers and sellers
- Chat history persistence 
- User-specific chat rooms
- Integration with existing user profiles
- Buyer/Seller tab navigation for organized conversations

**Technical Implementation:**
- **Frontend**: React Native with Expo
- **Database**: Firestore for real-time data sync
- **Architecture**: Service-based architecture with dedicated chat services
- **Key Files I Created/Modified**:
  - `chat/` - Complete chat component system
  - `services/chatService.ts` - Chat functionality logic
  - `services/chatUserService.ts` - User management for chat
  - `config/chatFirebase.ts` - Firebase configuration
  - `(tabs)/chat.tsx` - Chat interface with buyer/seller tabs

###  Push Notifications for Messaging (feature/push-notifications)
Built an automated push notification system specifically for chat messages using Firebase Cloud Functions and Expo's push notification API to ensure users never miss important conversations.

** How the Messaging Notification System Works:**
1. **New Message Trigger** - User sends a chat message, stored in Firestore
2. **Firebase Cloud Function Triggered** - Cloud function automatically detects new message
3. **Expo Push API Called** - Cloud function calls Expo's push notification service
4. **Instant Message Alert** - Recipient gets push notification about new chat message

**☁️ Firebase Cloud Functions I Built:**
- **Message Notification Function** - Triggers whenever new chat messages are added
  - Listens to Firestore `messages` collection changes
  - Extracts sender info and message content
  - Finds recipient's Expo push token from user database
  - Formats notification with sender name and message preview

- **Push Token Management** - Handles Expo push token registration
  - Stores and updates user device tokens in Firestore
  - Manages token expiration and refresh cycles
  - Links push tokens to user accounts for targeted messaging

**📱 Expo Push Integration:**
- **Client-side Token Registration** - Gets Expo push token on app launch
- **Permission Handling** - Requests notification permissions from users  
- **Deep Linking** - Tapping notification opens specific chat conversation
- **Notification Formatting** - Custom notification appearance with sender info

**⚡ Complete Technical Flow:**
```javascript
// Real-time Messaging Notification Pipeline
1. User A sends message to User B via chat interface
2. Message saved to Firestore messages collection  
3. Firebase Cloud Function detects new document in messages
4. Cloud Function retrieves User B's Expo push token
5. Function calls Expo Push API with message details:
   - Title: "New message from [Sender Name]"
   - Body: "[Message preview...]"
   - Data: {chatRoomId, senderId} for deep linking
6. Expo delivers push notification to User B's device
7. User B taps notification → app opens directly to that chat
```

**🛠️ Technologies Used:**
- **Firebase Cloud Functions** - Serverless functions for automatic message detection
- **Firestore Triggers** - Real-time database change listeners
- **Expo Push Notifications API** - Cross-platform push delivery service
- **Expo Client SDK** - Push token management and notification handling

### 🔐 Authentication & UI Improvements
Enhanced the login/signup flow and improved overall user experience.

**Improvements Made:**
- Database integration for user authentication
- Improved splash screen and login UI
- Enhanced profile management
- Better navigation flow

## 🛠️ Tech Stack Used
- **Frontend**: React Native, Expo
- **Database**: Firestore (NoSQL)
- **Real-time**: Firebase Real-time Database
- **Authentication**: Firebase Auth
- **Navigation**: Expo Router
- **State Management**: React Hooks
- **Notifications**: Expo Notifications

## 📁 Project Structure
```
chat-integration/
├── chat/                 # Chat components I built
├── services/            # Chat services I created
├── config/              # Firebase config I set up  
├── (tabs)/              # Tab navigation I enhanced
└── auth/                # Authentication flow I improved
```

## 🎯 Key Achievements & Impact
- ✅ **Built Real-time Chat from Scratch** - Developed complete messaging system using Firestore's real-time capabilities
- ✅ **Enhanced User Engagement** - Created seamless buyer-seller communication reducing transaction friction
- ✅ **Scalable Architecture** - Implemented service-based design that can handle thousands of concurrent conversations
- ✅ **Cross-Platform Excellence** - Ensured consistent experience across iOS and Android platforms
- ✅ **Database Integration** - Successfully integrated chat system with existing user authentication and profiles
- ✅ **Performance Optimized** - Implemented efficient data fetching and real-time updates without lag
- ✅ **User Experience Focus** - Designed intuitive interface with clear visual hierarchy and smooth animations


## 📝 Note About Repository Structure
*This repository showcases the complete chat integration branch for demonstration purposes. While git history shows all files as modified by me due to the branch copying process, my actual contributions were specifically to the chat system components, user profile integration, and navigation enhancements listed above. The Flamant project is a collaborative effort with multiple contributors.*
