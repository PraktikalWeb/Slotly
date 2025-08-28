import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, TrendingUp, Bell } from "lucide-react";
import { Link } from "wouter";
import SlotCounter from "./SlotCounter";
import calendarImage from "@assets/generated_images/Calendar_booking_slots_illustration_9c863175.png";

export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left animate-slide-up">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl lg:text-6xl">
              Never Miss a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                DTLC Slot
              </span>{" "}
              Again
            </h1>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl">
              Get instant notifications when driving license test slots become available at your preferred South African DTLC centers. Monitor multiple locations and book faster than ever before.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg">
                  <Rocket className="mr-2" size={20} />
                  Get Started Today
                </Button>
              </Link>
            </div>

            {/* Live Counter */}
            <Card className="mt-12 shadow-xl border border-slate-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                      Total Notifications Sent
                    </p>
                    <div className="flex items-center mt-1">
                      <SlotCounter />
                      <div className="ml-3 flex items-center text-emerald-600">
                        <TrendingUp className="animate-bounce-gentle" size={16} />
                        <span className="ml-1 text-sm font-medium">Live</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl text-purple-500">
                    🔔
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">Updates every 30 seconds</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Hero Image */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative">
              {/* Calendar booking illustration */}
              <img
                src={calendarImage}
                alt="Calendar showing available DTLC booking slots with notification highlights"
                className="w-full rounded-2xl shadow-2xl"
              />

              {/* Floating notification cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 animate-bounce-gentle border border-green-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Benoni DTLC</span>
                </div>
                <p className="text-xs text-emerald-600 font-semibold">Slot Available Now!</p>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-bounce-gentle border border-blue-200" style={{ animationDelay: "1s" }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Springs DTLC</span>
                </div>
                <p className="text-xs text-blue-600 font-semibold">2 Slots Open</p>
              </div>

              <div className="absolute top-1/2 -left-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-3 animate-bounce-gentle" style={{ animationDelay: "2s" }}>
                <div className="flex items-center space-x-2">
                  <Bell size={14} className="animate-pulse" />
                  <span className="text-xs font-semibold">Live Alerts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
