import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MapPin, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/queryClient";
import { type Notification } from "@shared/schema";

export default function NotificationAlertList() {
  const { user } = useAuth();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["/api/notifications", user?.id],
    enabled: !!user?.id,
  });

  const markAsRead = async (notificationId: string) => {
    try {
      await apiRequest("PATCH", `/api/notifications/${notificationId}/read`);
      // In a real app, you'd want to invalidate and refetch the query
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2" size={20} />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-slate-600">Loading notifications...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!Array.isArray(notifications) || notifications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2" size={20} />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Bell className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-2 text-slate-600">No notifications yet</p>
            <p className="text-sm text-slate-500">
              You'll see slot alerts here when they become available
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
        <CardTitle className="flex items-center">
          <Bell className="mr-2 text-blue-600" size={20} />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {Array.isArray(notifications) && notifications.map((notification: Notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.read ? "bg-slate-50" : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="text-blue-600" size={16} />
                    <span className="font-medium text-slate-900">
                      DTLC Center Alert
                    </span>
                    {!notification.read && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-700 mb-2">{notification.message}</p>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock size={14} className="mr-1" />
                    {notification.createdAt ? new Date(notification.createdAt).toLocaleDateString("en-ZA", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }) : 'Just now'}
                  </div>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
