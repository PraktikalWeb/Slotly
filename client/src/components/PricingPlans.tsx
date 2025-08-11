import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Link } from "wouter";

export default function PricingPlans() {
  const plans = [
    {
      name: "Individual",
      description: "Perfect for personal use",
      price: "R99",
      period: "/one-time",
      features: [
        "1 notification alert",
        "Choose your preferred center",
        "Instant SMS notification",
        "Basic support",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Driving Schools",
      description: "Basic subscription",
      price: "R250",
      period: "/month",
      features: [
        "Limited preferred centers",
        "Limited alerts per month",
        "Email & SMS notifications",
        "Priority support",
      ],
      buttonText: "Choose Basic",
      buttonVariant: "default" as const,
      popular: false,
    },
    {
      name: "Premium Schools",
      description: "Full-featured subscription",
      price: "R350",
      period: "/month",
      features: [
        "Unlimited preferred centers",
        "Unlimited alerts",
        "Individual referral program",
        "Advertising signup option",
        "24/7 premium support",
      ],
      buttonText: "Choose Premium",
      buttonVariant: "default" as const,
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Choose the perfect plan for your needs. All prices in South African Rand.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative hover:transform hover:scale-105 transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-purple-500 to-purple-600 text-white border-purple-500"
                  : "bg-white text-slate-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium bg-amber-500 text-white">
                    <Star className="mr-1" size={12} />
                    POPULAR
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className={`mt-2 ${plan.popular ? "text-purple-100" : "text-slate-600"}`}>
                  {plan.description}
                </p>
                <div className="mt-6">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className={`text-xl ${plan.popular ? "text-purple-100" : "text-slate-600"}`}>
                    {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check 
                        className={`mr-3 ${plan.popular ? "text-emerald-300" : "text-emerald-500"}`} 
                        size={16} 
                      />
                      <span className={plan.popular ? "text-white" : "text-slate-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href="/register">
                    <Button
                      variant={plan.popular ? "secondary" : plan.buttonVariant}
                      className={`w-full font-semibold ${
                        plan.popular
                          ? "bg-white hover:bg-slate-100 text-purple-600"
                          : plan.buttonVariant === "outline"
                          ? "bg-slate-800 hover:bg-slate-900 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
