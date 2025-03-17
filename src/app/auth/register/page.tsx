import { RegisterForm } from "@/components/auth/register-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
}
