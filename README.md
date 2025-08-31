## 🧠 About Neuro21

Neuro21 is a **Web3 gamified platform** that empowers people with different neurodivergences to improve their treatment journey in an engaging and rewarding way.  

Through daily goals — such as exercise, nutrition, and sleep — users earn tokens that can be exchanged for consultations with psychologists and psychiatrists registered on the platform.  

The ecosystem creates a balance of **community support and professional care**:  
- Users are motivated to build healthier habits with real incentives.  
- Psychologists and psychiatrists contribute with free monthly sessions while also offering paid consultations.  
- $ADHD Tokens circulate between users and professionals, fostering a sustainable and accessible mental health network.  

With its **gamified experience, token economy, and dual perspectives (patient and professional)**, Neuro21 blends technology, psychology, and Web3 innovation to make mental health care more **accessible, dynamic, and impactful**.

## 🚀 Technologies

- **Frontend Framework**: [Next.js](https://nextjs.org/) (React) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for accessible, customizable components
- **State Management**: React Context API and Hooks
- **Authentication**: NextAuth.js
- **Blockchain**: Web3.js / Ethers.js for Web3 integration
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel

## 🛠️ Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- PostgreSQL database
- Web3 wallet (MetaMask or similar) for blockchain interactions

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/neuro21.git
   cd neuro21
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the necessary environment variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/neuro21"
   NEXTAUTH_SECRET=your-secret-here
   NEXTAUTH_URL=http://localhost:3000
   # Add other environment variables as needed
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application running.

## 📁 Project Structure

```
/
├── app/                    # App Router
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # User dashboard
│   ├── journey/            # User journey tracking
│   └── profile/            # User profile management
│
├── components/             # Reusable components
│   ├── neuro21/            # Custom Neuro21 components
│   └── ui/                 # UI components
│
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── public/                 # Static files
└── styles/                 # Global styles
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&filter=next.js&utm_campaign=create-next-app-readme)

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
