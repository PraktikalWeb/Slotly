import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";

export default function LoginPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
              Welcome back to Slotly
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              South Africa's premier DTLC slot monitoring service
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
