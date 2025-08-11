import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Play, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import SlotCounter from "./SlotCounter";

export default function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left animate-slide-up">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                🇿🇦 South African Service
              </span>
            </div>
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
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Rocket className="mr-2" size={20} />
                  Get Started Today
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-200 hover:border-blue-300 transition-all duration-300"
              >
                <Play className="mr-2" size={20} />
                Watch Demo
              </Button>
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
              {/* Modern dashboard mockup showcasing Slotly interface */}
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern tech interface showing Slotly dashboard"
                className="w-full rounded-2xl shadow-2xl"
              />

              {/* Floating notification cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-bounce-gentle">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs font-medium text-slate-700">Centurion DTLC - New Slot!</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce-gentle" style={{ animationDelay: "1s" }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-medium text-slate-700">Sandton DTLC - Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
