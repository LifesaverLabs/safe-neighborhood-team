# Neighbor 911™ - Community Emergency Response Platform

## About

Neighbor 911™ is an open-source platform that connects neighbors for rapid emergency response. Built by Lifesaver Labs Public Benefit Corporation, this platform enables communities to organize modern-day minutemen & minutewomen who can respond to emergencies in minutes, not hours.

When seconds count, your neighbors are closer than emergency services. This platform helps coordinate community response for medical emergencies, lost pets, wellness checks, and other urgent situations where immediate local assistance can make a critical difference.

## Features

- **Rapid Response Network**: Connect with trained neighbors who can respond within minutes
- **Emergency Alerts**: Send and receive location-based emergency notifications
- **Community Coordination**: Organize and train local response teams
- **Multi-scenario Support**: Handle medical emergencies, missing persons/pets, wellness checks, and more
- **Privacy-First Design**: Secure, opt-in system that respects user privacy

## Technology Stack

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - Component-based UI framework
- **shadcn/ui** - Accessible and customizable UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd safe-neighborhood-team

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
safe-neighborhood-team/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions
│   ├── hooks/         # Custom React hooks
│   └── assets/        # Images and static assets
├── public/            # Public assets
└── index.html         # Entry HTML file
```

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help makes this platform better for everyone.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

This project can be deployed to any static hosting service:

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed.

### Hosting Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect GitHub
- **GitHub Pages**: Use GitHub Actions to deploy automatically
- **Self-hosted**: Serve the `dist` folder with any web server

## Security

This platform handles sensitive emergency response coordination. Please report security vulnerabilities responsibly by emailing security@lifesaverlabs.org.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Project Website**: [neighbor911.com](https://neighbor911.com)
- **Organization**: Lifesaver Labs Public Benefit Corporation
- **GitHub**: [github.com/lifesaverlabs/neighbor911](https://github.com/lifesaverlabs/neighbor911)

## Acknowledgments

- All the brave neighbors who step up to help in emergencies
- Emergency responders who inspire this community-based approach
- Open source contributors who make this platform possible

---

**Remember**: When seconds count, neighbors are minutes away. Together, we can save lives.