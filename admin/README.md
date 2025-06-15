# Admin Dashboard

A modern React-based admin dashboard built with Vite, designed for managing courses, users, and blog content. This dashboard provides a clean and intuitive interface for administrators to manage their platform effectively.

## 🚀 Features

### Core Features
- **Authentication System**
  - Secure sign-in functionality
  - Role-based access control
  - Session management

- **Course Management**
  - Create and edit courses
  - Course listing and details view
  - Course card component for visual representation

- **User Management**
  - User listing and details
  - User role management
  - Admin user management

- **Blog Management**
  - Blog post creation and editing
  - Content management system

### Technical Features
- Modern React with Vite for fast development and building
- TailwindCSS for responsive and modern styling
- React Router for seamless navigation
- Axios for robust API requests
- React Icons for beautiful iconography
- ESLint for maintaining code quality
- TypeScript support for type safety

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Git for version control
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## 🛠️ Installation

1. Clone the repository
```bash
git clone [your-repository-url]
cd admin
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Environment Setup
Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Admin Dashboard
```

## 🚀 Getting Started

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Before you can preview the production build, you need to create it first:

```bash
npm run build
# or
yarn build
```

This command will:
1. Compile your React components
2. Optimize assets
3. Create a `dist` directory with production-ready files
4. Generate source maps for debugging

### Previewing Production Build

After successfully building the project, you can preview the production build:

```bash
npm run preview
# or
yarn preview
```

The preview server will start and serve your production build locally, typically at `http://localhost:4173`.

> **Note:** If you see an error like "The directory 'dist' does not exist", make sure you've run the build command first.

### Deployment

To deploy the application:

1. Build the project as described above
2. The `dist` directory contains all the files needed for deployment
3. Upload the contents of the `dist` directory to your web server
4. Configure your web server to serve the `index.html` file for all routes

## 📁 Project Structure

```
admin/
├── src/
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── components/       # Reusable React components
│   │   ├── CourseCard.jsx   # Course display component
│   │   └── Menu.jsx         # Navigation menu component
│   ├── pages/           # Page components
│   │   ├── Homepage.jsx     # Dashboard home
│   │   ├── Courses.jsx      # Course management
│   │   ├── AddCourse.jsx    # Course creation
│   │   ├── Users.jsx        # User management
│   │   ├── Admins.jsx       # Admin management
│   │   ├── Blog.jsx         # Blog management
│   │   └── Sign_in.jsx      # Authentication
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Public static files
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
└── package.json         # Project dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally (requires build first)
- `npm run lint` - Run ESLint for code quality
- `npm run lint:fix` - Fix ESLint errors automatically

## 🔧 Dependencies

### Main Dependencies
- **React 19.0.0** - UI library
- **React DOM 19.0.0** - React rendering for web
- **React Router DOM 7.3.0** - Client-side routing
- **Axios 1.8.4** - HTTP client
- **TailwindCSS 4.0.14** - Utility-first CSS framework
- **React Icons 5.5.0** - Icon library

### Development Dependencies
- **Vite 6.2.0** - Build tool and dev server
- **ESLint 9.21.0** - Code linting
- **TypeScript** - Type checking
- **ESLint Plugins**
  - react-hooks
  - react-refresh
  - typescript-eslint

## 📱 Pages and Features

### Homepage
- Dashboard overview
- Quick access to main features
- Statistics and metrics

### Courses
- Course listing
- Course creation and editing
- Course details view
- Course management tools

### Users
- User listing
- User role management
- User details and editing

### Admins
- Admin user management
- Role assignment
- Access control

### Blog
- Blog post management
- Content creation
- Post scheduling

### Authentication
- Secure sign-in
- Session management
- Password recovery

## 🔒 Security Considerations

- Implement proper authentication
- Use environment variables for sensitive data
- Follow security best practices
- Regular dependency updates
- Input validation and sanitization

## 🎨 Styling Guidelines

- Use TailwindCSS utility classes
- Follow responsive design principles
- Maintain consistent color scheme
- Use provided component library
- Follow accessibility guidelines

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Follow ESLint rules
- Use meaningful variable names
- Write clear comments
- Keep components modular
- Follow React best practices

## 🐛 Troubleshooting

Common issues and solutions:
1. **Build fails**
   - Clear node_modules and reinstall
   - Check for dependency conflicts
   - Verify Node.js version

2. **Development server issues**
   - Check port availability
   - Verify environment variables
   - Clear browser cache

3. **API connection issues**
   - Verify API URL in .env
   - Check network connectivity
   - Verify API endpoints

4. **Preview server error: "The directory 'dist' does not exist"**
   - Run `npm run build` first to create the production build
   - Check if the build completed successfully
   - Verify the dist directory exists in your project root

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue if needed
4. Contact the development team

## 🔄 Updates and Maintenance

- Regular dependency updates
- Security patches
- Feature additions
- Bug fixes
- Performance improvements
