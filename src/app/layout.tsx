import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { FirebaseAnalytics } from "@/components/firebase-analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MundoChef - Discover Delicious Recipes",
  description: "Find and save your favorite recipes from around the world",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="min-h-screen bg-background text-foreground">
              {children}
            </main>
            <Toaster />
            <FirebaseAnalytics />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
