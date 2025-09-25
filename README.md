This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) with authentication features.

## Features

- **Authentication System**: Complete login/register functionality with JWT tokens
- **Apollo GraphQL Client**: Integrated with authentication headers
- **Next.js Middleware**: Automatic route protection and token validation
- **User Dashboard**: Protected dashboard showing user information
- **Cookie & LocalStorage**: Dual token storage for SSR compatibility

## Getting Started

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Authentication Flow

- **Unauthenticated users** are automatically redirected to `/login`
- **Authenticated users** are redirected to `/dashboard`
- **Protected routes** (like `/dashboard`) require valid JWT tokens
- **Middleware** automatically validates tokens and redirects if invalid

## Authentication Features

### Login/Register Form
- Toggle between login and registration modes
- Form validation with error handling
- Loading states during authentication
- Automatic redirect after successful auth

### Protected Routes
- Middleware protects routes defined in `middleware.ts`
- Automatic token validation using the `ME` GraphQL query
- Redirect to login if token is invalid or missing

### Token Management
- JWT tokens stored in both localStorage and cookies
- Automatic token refresh and validation
- Secure logout with token cleanup

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
