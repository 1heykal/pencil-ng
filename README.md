# 🖊️ Pencil - Modern Blogging Platform

![Pencil Logo](src/assets/icons/pencil-logo.svg)

## Overview

Pencil is a modern, feature-rich blogging platform built with Angular, designed for creators who want to share their stories, ideas, and expertise with the world. It combines powerful content creation tools with a sleek, user-friendly interface.

## ✨ Features

- **Rich Text Editor**: Advanced WYSIWYG editor powered by Quill.js with support for:
  - Text formatting and styling
  - Code syntax highlighting
  - Image and media embedding
  - Multiple layout options
  
- **User Management**:
  - Secure authentication system
  - Customizable user profiles
  - Profile photo upload capabilities

- **Blog Management**:
  - Create and manage multiple blogs
  - Custom blog URLs
  - Blog analytics and insights

- **Article Creation**:
  - Support for both short-form and long-form content
  - Tag system for better content organization
  - Draft saving and preview
  
- **Modern UI/UX**:
  - Dark/Light theme support
  - Responsive design
  - Material Design components
  - Tailwind CSS utilities

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Angular CLI
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pencil.git
cd pencil
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 17+
- **UI Components**: 
  - Angular Material
  - PrimeNG
  - Tailwind CSS
- **Rich Text Editor**: Quill.js
- **Code Highlighting**: highlight.js
- **State Management**: Angular Signals
- **Form Handling**: Reactive Forms

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   ├── blog/
│   │   ├── articles/
│   │   └── profile/
│   ├── services/
│   └── viewmodels/
├── assets/
└── styles/
```

## 🔒 Environment Configuration

Create an `environment.ts` file in the `src/environments` directory:

```typescript
export const environment = {
  production: false,
  BaseURL: 'your-api-base-url'
};
```

## 👥 Team

Our dedicated team is committed to making Pencil the best blogging platform possible:

```typescript
teamMembers = [
  {
    name: 'Osama Hekal',
    role: 'Founder & CEO',
    image: 'https://pbs.twimg.com/profile_images/1854140818774220816/CeZrsNPd_400x400.jpg',
    bio: 'Passionate about creating meaningful content platforms.',
    social: {
      linkedin: 'https://linkedin.com/in/1heykal',
      github: 'https://github.com/1heykal',
    },
  }
];
```

## ✍️ Editor Configuration

Our rich text editor comes with comprehensive formatting options:

```typescript
editorConfig: QuillOptions = {
  modules: {
    syntax: true,
    toolbar: [
      // Text formatting
      ['bold', 'italic', 'underline', 'strike'],

      // Color and background
      [{ color: [] }, { background: [] }],

      // Paragraph formatting
      [{ align: [] }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      // Headers
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      // Font
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ font: [] }],

      // Lists and quotes
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],

      // Media and links
      ['link', 'image', 'video'],

      // Clear formatting
      ['clean'],
    ],
  },
};
```

## 🧪 Testing

Run the test suite:

```bash
ng test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- PrimeNG team for the comprehensive UI components
- Quill.js team for the powerful editor
- All contributors who have helped shape this project

---

Made with ❤️ by the Pencil Team
