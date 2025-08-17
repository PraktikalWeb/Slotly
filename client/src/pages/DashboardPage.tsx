import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import NotificationAlertList from "@/components/NotificationAlertList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Bell, Settings, Users, Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocation, Link } from "wouter";

export default function DashboardPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  const { data: userCenters, isLoading: centersLoading } = useQuery({
    queryKey: ["/api/user-centers", user?.id],
    enabled: !!user?.id,
  });

  if (!user) {
    return null;
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "premium":
        return <Badge className="bg-purple-100 text-purple-700"><Crown size={12} className="mr-1" />Premium</Badge>;
      case "basic":
        return <Badge className="bg-blue-100 text-blue-700">Basic</Badge>;
      default:
        return <Badge variant="secondary">Individual</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header with Stats */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.username}!</h1>
              <p className="text-blue-100 opacity-90">Manage your DTLC slot monitoring preferences and view recent alerts.</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{Array.isArray(userCenters) ? userCenters.length : 0}</div>
                <div className="text-sm text-blue-100">Centers Monitored</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <User className="mr-2 text-blue-600" size={20} />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <label className="text-sm font-medium text-slate-600">Email</label>
                  <p className="text-slate-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Account Type</label>
                  <p className="text-slate-900 capitalize">{user.userType?.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Subscription Plan</label>
                  <div className="mt-1">
                    {getPlanBadge(user.subscriptionPlan || "individual")}
                  </div>
                </div>
                {user.userType === "driving_school" && (
                  <div className="pt-4 border-t">
                    <Link href="/subscription">
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="mr-2" size={16} />
                        Manage Subscription
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferred Centers Summary */}
            <Card className="mt-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 text-purple-600" size={20} />
                  Preferred Centers
                </CardTitle>
                <CardDescription>
                  {centersLoading ? "Loading..." : `${Array.isArray(userCenters) ? userCenters.length : 0} centers monitored`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {centersLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : Array.isArray(userCenters) && userCenters.length > 0 ? (
                  <div className="space-y-2">
                    {userCenters.slice(0, 3).map((uc: any) => (
                      <div key={uc.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                        <div>
                          <p className="font-medium text-sm">{uc.center?.name}</p>
                          <p className="text-xs text-slate-500">{uc.center?.location}</p>
                        </div>
                        <Badge variant={uc.center?.available ? "default" : "secondary"}>
                          {uc.center?.available ? "Available" : "Full"}
                        </Badge>
                      </div>
                    ))}
                    {Array.isArray(userCenters) && userCenters.length > 3 && (
                      <p className="text-xs text-slate-500 text-center pt-2">
                        +{userCenters.length - 3} more centers
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No centers added yet</p>
                )}
                <Link href="/manage-centers">
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Manage Centers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-2">
            <NotificationAlertList />
            
            {/* Quick Actions */}
            <Card className="mt-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 text-emerald-600" size={20} />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks to help you manage your DTLC slot monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/manage-centers">
                    <Button variant="outline" className="w-full justify-start h-12 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700">
                      <MapPin className="mr-2" size={16} />
                      Add Centers
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start h-12 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700" disabled>
                    <Bell className="mr-2" size={16} />
                    Notification Settings
                  </Button>
                  {user.userType === "driving_school" && (
                    <>
                      <Button variant="outline" className="w-full justify-start h-12 bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700" disabled>
                        <Users className="mr-2" size={16} />
                        Referral Program
                      </Button>
                      <Link href="/subscription">
                        <Button variant="outline" className="w-full justify-start h-12 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border-amber-200 text-amber-700">
                          <Crown className="mr-2" size={16} />
                          Upgrade Plan
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
