import { Bell, MapPin, GraduationCap, Handshake } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Bell,
      title: "Instant Alerts",
      description: "Get notified the moment slots become available at your preferred DTLC centers across South Africa.",
      color: "blue",
    },
    {
      icon: MapPin,
      title: "Multiple Centers",
      description: "Monitor multiple DTLC centers simultaneously and never miss an opportunity at your preferred locations.",
      color: "purple",
    },
    {
      icon: GraduationCap,
      title: "Learning Resources",
      description: "Access driving test tips, practice materials, and guidance to help you pass your test on the first try.",
      color: "emerald",
    },
    {
      icon: Handshake,
      title: "School Referrals",
      description: "Connect with qualified driving schools in your area through our trusted referral network.",
      color: "amber",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-100 group-hover:bg-blue-600",
          text: "text-blue-600 group-hover:text-white",
        };
      case "purple":
        return {
          bg: "bg-purple-100 group-hover:bg-purple-600",
          text: "text-purple-600 group-hover:text-white",
        };
      case "emerald":
        return {
          bg: "bg-emerald-100 group-hover:bg-emerald-600",
          text: "text-emerald-600 group-hover:text-white",
        };
      case "amber":
        return {
          bg: "bg-amber-100 group-hover:bg-amber-600",
          text: "text-amber-600 group-hover:text-white",
        };
      default:
        return {
          bg: "bg-blue-100 group-hover:bg-blue-600",
          text: "text-blue-600 group-hover:text-white",
        };
    }
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Why Choose Slotly?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Everything you need to monitor and book DTLC slots across South Africa
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color);
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`flex items-center justify-center h-20 w-20 rounded-xl ${colorClasses.bg} mx-auto mb-6 transition-colors duration-300`}>
                  <Icon className={`${colorClasses.text} transition-colors duration-300`} size={28} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
