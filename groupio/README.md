# Groupio - Social Groups Platform

A modern, Facebook Groups-style social platform built with React. Create communities, share posts, and connect with people who share your interests.

## Features

- **User Authentication** - Register and login with secure authentication
- **Create Groups** - Build communities around your interests with custom cover images
- **Discover Groups** - Explore and join public groups
- **Post & Engage** - Share text and images, like posts, and comment on discussions
- **Member Management** - Join and leave groups freely
- **Real-time Updates** - See likes and comments update instantly
- **Responsive Design** - Works beautifully on desktop and mobile devices

## Tech Stack

- **React 19** - Modern UI library
- **React Router** - Client-side routing
- **Vite** - Lightning-fast build tool
- **LocalStorage** - Client-side data persistence
- **CSS3** - Modern styling with Facebook-inspired design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd groupio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### First Time Setup

1. **Register an Account** - Click "Register here" on the login page
2. **Create Your Profile** - Enter your name, email, and password
3. **Explore Groups** - Browse available groups or create your own
4. **Join Groups** - Click "Join Group" to become a member
5. **Start Posting** - Share your thoughts, images, and engage with the community

### Creating a Group

1. Click "Create Group" button on the home page
2. Fill in group details:
   - Group Name
   - Description
   - Privacy setting (Public/Private)
   - Select a cover image
3. Click "Create Group" to publish

### Posting in Groups

1. Navigate to any group you're a member of
2. Click on the post input box
3. Write your message and optionally add an image
4. Click "Post" to share with the group

## Project Structure

```
groupio/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── GroupCard.jsx
│   │   ├── Post.jsx
│   │   └── CreatePost.jsx
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── GroupDetail.jsx
│   │   └── CreateGroup.jsx
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── GroupsContext.jsx
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
└── package.json         # Project dependencies

```

## Features in Detail

### Authentication System
- Secure registration and login
- Persistent sessions using localStorage
- Protected routes for authenticated users
- Avatar generation for new users

### Groups Management
- Create public or private groups
- Custom cover images from curated selection
- Member tracking and management
- Group discovery feed
- Join/leave functionality

### Posts & Engagement
- Rich text posts with optional images
- Like/unlike functionality
- Comment threads
- Time-based post sorting
- Real-time UI updates

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Accessible UI components

## Data Persistence

This app uses browser localStorage for data persistence. All data is stored locally on your device:

- `groupio_users` - User accounts
- `groupio_user` - Current session
- `groupio_groups` - Groups and posts data

**Note:** Data will be reset if localStorage is cleared.

## Future Enhancements

- Backend API integration
- Real database (PostgreSQL/MongoDB)
- Image upload functionality
- User profiles and settings
- Search functionality
- Notifications system
- Group moderation tools
- Direct messaging
- Rich text editor
- Emoji reactions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by Facebook Groups
- Built with React and Vite
- Icons and images from Unsplash
- UI design inspired by modern social platforms
