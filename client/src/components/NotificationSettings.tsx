import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Mail, Phone, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreferences {
  whatsapp: boolean;
  email: boolean;
  sms: boolean;
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    whatsapp: true,
    email: true,
    sms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleToggle = (type: keyof NotificationPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved successfully.",
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-t-lg">
        <CardTitle className="flex items-center">
          <Settings className="mr-2 text-purple-600" size={20} />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Choose how you want to receive DTLC slot alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* WhatsApp */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <Label htmlFor="whatsapp" className="text-sm font-medium">
                WhatsApp
              </Label>
              <p className="text-xs text-slate-500">
                Instant notifications via WhatsApp message
              </p>
            </div>
          </div>
          <Switch
            id="whatsapp"
            checked={preferences.whatsapp}
            onCheckedChange={() => handleToggle('whatsapp')}
            data-testid="switch-whatsapp"
          />
        </div>

        {/* Email */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <p className="text-xs text-slate-500">
                Detailed notifications sent to your email
              </p>
            </div>
          </div>
          <Switch
            id="email"
            checked={preferences.email}
            onCheckedChange={() => handleToggle('email')}
            data-testid="switch-email"
          />
        </div>

        {/* SMS */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Phone className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <Label htmlFor="sms" className="text-sm font-medium">
                SMS
              </Label>
              <p className="text-xs text-slate-500">
                Text message alerts to your phone
              </p>
            </div>
          </div>
          <Switch
            id="sms"
            checked={preferences.sms}
            onCheckedChange={() => handleToggle('sms')}
            data-testid="switch-sms"
          />
        </div>

        <div className="pt-4 border-t border-slate-200">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            data-testid="button-save-settings"
          >
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { NotificationSettings };