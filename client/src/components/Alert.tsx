import { Alert as UIAlert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, XCircle, Info } from "lucide-react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  className?: string;
}

export default function Alert({ type, message, className = "" }: AlertProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "error":
        return <XCircle className="h-4 w-4" />;
      case "warning":
        return <AlertCircle className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <UIAlert variant={getVariant()} className={className}>
      {getIcon()}
      <AlertDescription>{message}</AlertDescription>
    </UIAlert>
  );
}
