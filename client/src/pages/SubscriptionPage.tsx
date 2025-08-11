import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Users, Zap, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  if (!user) {
    return null;
  }

  const currentPlan = user.subscriptionPlan || "individual";

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "R250",
      period: "/month",
      description: "Perfect for small driving schools",
      features: [
        "Up to 5 preferred centers",
        "Up to 50 alerts per month",
        "Email & SMS notifications",
        "Priority support",
        "Basic analytics",
      ],
      buttonText: currentPlan === "basic" ? "Current Plan" : "Upgrade to Basic",
      disabled: currentPlan === "basic",
    },
    {
      id: "premium",
      name: "Premium",
      price: "R350",
      period: "/month",
      description: "Full-featured for established schools",
      features: [
        "Unlimited preferred centers",
        "Unlimited alerts",
        "Individual referral program",
        "Advertising signup option",
        "24/7 premium support",
        "Advanced analytics & reports",
        "Priority slot booking",
        "Custom branding options",
      ],
      buttonText: currentPlan === "premium" ? "Current Plan" : "Upgrade to Premium",
      disabled: currentPlan === "premium",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Subscription Management</h1>
          <p className="text-slate-600">Manage your Slotly subscription and billing preferences.</p>
        </div>

        {/* Current Plan Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="mr-2 text-purple-600" size={20} />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold capitalize text-slate-900">
                    {currentPlan === "individual" ? "Individual Plan" : `${currentPlan} Plan`}
                  </h3>
                  <Badge variant={currentPlan === "premium" ? "default" : "secondary"}>
                    {currentPlan === "premium" && <Star className="mr-1" size={12} />}
                    {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
                  </Badge>
                </div>
                <p className="text-slate-600 mt-1">
                  {currentPlan === "individual" 
                    ? "One-time purchase for personal use"
                    : currentPlan === "basic"
                    ? "Monthly subscription with limited features"
                    : "Full-featured monthly subscription"
                  }
                </p>
                <div className="flex items-center mt-3 space-x-4">
                  <span className="text-sm text-slate-500">Status:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {user.subscriptionStatus || "Active"}
                  </Badge>
                </div>
              </div>
              {user.userType === "driving_school" && currentPlan !== "premium" && (
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Crown className="mr-2" size={16} />
                  Upgrade Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Plans for Driving Schools */}
        {user.userType === "driving_school" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Plans</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative ${
                    plan.popular 
                      ? "border-purple-500 ring-2 ring-purple-500 ring-opacity-50" 
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-6 transform -translate-y-1/2">
                      <Badge className="bg-purple-600 text-white">
                        <Star className="mr-1" size={12} />
                        Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{plan.name}</span>
                      <div className="text-right">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-slate-600">{plan.period}</span>
                      </div>
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="mr-3 text-green-500" size={16} />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant={plan.disabled ? "outline" : "default"}
                      className={`w-full ${
                        plan.popular && !plan.disabled 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : ""
                      }`}
                      disabled={plan.disabled}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Advertising Signup - Premium Feature */}
        {user.userType === "driving_school" && currentPlan === "premium" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 text-amber-500" size={20} />
                Advertising Opportunities
              </CardTitle>
              <CardDescription>
                Promote your driving school to Slotly users across South Africa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Featured Listings</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Appear at the top of search results when users look for driving schools in your area.
                  </p>
                  <Button variant="outline" size="sm">
                    Setup Featured Listing
                  </Button>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Referral Network</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Receive referrals from individuals using Slotly who need driving instruction.
                  </p>
                  <Button variant="outline" size="sm">
                    Join Referral Network
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center">
                  <Users className="mr-2 text-amber-600" size={16} />
                  <span className="font-medium text-amber-800">Premium Feature</span>
                </div>
                <p className="text-amber-700 text-sm mt-1">
                  Advertising features are included with your Premium subscription at no additional cost.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Individual Users Info */}
        {user.userType === "individual" && (
          <Card>
            <CardHeader>
              <CardTitle>Looking for More Features?</CardTitle>
              <CardDescription>
                Consider upgrading to a driving school account for additional benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-medium text-slate-900">Multiple Centers</h4>
                    <p className="text-slate-600 text-sm">Monitor unlimited DTLC centers simultaneously</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-medium text-slate-900">Unlimited Alerts</h4>
                    <p className="text-slate-600 text-sm">Receive unlimited slot notifications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-green-500 mt-0.5" size={16} />
                  <div>
                    <h4 className="font-medium text-slate-900">Referral Income</h4>
                    <p className="text-slate-600 text-sm">Earn money by referring students to driving schools</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6" disabled>
                Contact Us for School Account Upgrade
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
