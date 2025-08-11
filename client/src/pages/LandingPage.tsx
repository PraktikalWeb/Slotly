import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingPlans from "@/components/PricingPlans";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <PricingPlans />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Get Your License Faster?
          </h2>
          <p className="mt-6 text-xl text-blue-100">
            Join thousands of South Africans who are already using Slotly to monitor DTLC slots and book their tests efficiently.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register">
              <button className="flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                🚀 Start Monitoring Slots
              </button>
            </a>
            <button className="flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white text-lg font-semibold rounded-xl border-2 border-white transition-all duration-300">
              📞 Contact Us
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
