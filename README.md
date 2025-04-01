# Mortgage Calculator

A simple, responsive web application to calculate mortgage-related costs and fees.

## Features

- Calculate down payment, closing costs, and agent commissions based on mortgage amount
- Real-time calculations as you adjust values
- Responsive design for mobile and desktop
- Shareable URLs for saving and sharing calculations
- Local storage to remember your previous inputs
- Projections for incremented mortgage amounts

## Technologies Used

- React.js
- Vite
- TailwindCSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd mortgage-calculator
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Building for Production

```
npm run build
```

This will create optimized files in the `dist` directory ready for deployment.

## Deploying to GitHub Pages

1. Ensure your vite.config.js has the correct base URL:
   ```js
   base: './' // or your repo name if not using a custom domain
   ```

2. Build the project
   ```
   npm run build
   ```

3. Deploy the contents of the `dist` directory to GitHub Pages

## License

MIT
