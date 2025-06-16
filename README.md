# React Blog Application

A modern blog application built with React, Vite, and Material UI, featuring user authentication, post management, and a clean, responsive design.

## Features

- 🔐 User Authentication
  - Registration with email and password
  - Login functionality
  - Secure password handling
  - Logout with confirmation dialog

- 📝 Blog Post Management
  - Create new blog posts
  - View all posts with author information
  - Sort posts by creation date
  - Responsive post cards with Material UI design

- 👤 User Management
  - User registration
  - User profiles
  - Author attribution for posts

- 🎨 Modern UI/UX
  - Material UI components
  - Responsive design
  - Clean and intuitive interface
  - Loading states and error handling

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd react-blog-app  

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`



```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── App.jsx           # Main application component
```

## Key Components

- `AuthContext`: Manages user authentication state
- `PostContext`: Handles blog post data and operations
- `Navbar`: Main navigation component
- `PostCard`: Reusable component for displaying blog posts
- `Login` & `Register`: Authentication pages
- `Home`: Main page displaying all blog posts

## Technologies Used

- React
- Vite
- Material UI
- React Router
- Context API for state management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material UI for the component library
- React team for the amazing framework
- Vite for the fast development experience 