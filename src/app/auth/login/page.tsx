import { LoginForm } from "@/components/auth/login-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <LoginForm />
      </div>
      <Footer />
    </>
  );
}
