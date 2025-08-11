import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote: "Slotly saved me months of waiting! I got an alert for a cancellation at Sandton DTLC and booked my test within minutes. Passed on the first try!",
      name: "Thabo Mthembu",
      location: "Johannesburg, Gauteng",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      bgGradient: "from-blue-50 to-purple-50",
      quoteColor: "text-blue-500",
    },
    {
      quote: "As a driving school owner, Slotly Premium has been a game-changer. We get unlimited alerts and can book slots for all our students efficiently.",
      name: "Sarah Ndlovu",
      location: "Cape Town Driving Academy",
      image: "https://images.unsplash.com/photo-1594736797933-d0301ba6b0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      bgGradient: "from-emerald-50 to-blue-50",
      quoteColor: "text-emerald-500",
    },
    {
      quote: "The referral system connected me with an excellent driving instructor. Between Slotly's alerts and great training, I'm now a confident driver!",
      name: "Nomsa Sibiya",
      location: "Durban, KwaZulu-Natal",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      bgGradient: "from-purple-50 to-amber-50",
      quoteColor: "text-purple-500",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            What Our South African Users Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Join thousands of satisfied learners and driving schools across SA
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-4xl mx-auto">
                    <Card className={`bg-gradient-to-r ${testimonial.bgGradient} border-0`}>
                      <CardContent className="p-8 lg:p-12">
                        <div className="text-center">
                          <div className={`text-4xl ${testimonial.quoteColor} mb-6`}>
                            <Quote size={48} />
                          </div>
                          <blockquote className="text-xl lg:text-2xl text-slate-700 mb-8">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="flex items-center justify-center">
                            <img
                              src={testimonial.image}
                              alt={`${testimonial.name}, satisfied Slotly user`}
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div className="text-left">
                              <p className="text-lg font-semibold text-slate-900">
                                {testimonial.name}
                              </p>
                              <p className="text-slate-600">{testimonial.location}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="p-2 rounded-full"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="p-2 rounded-full"
            >
              <ChevronRight size={16} />
            </Button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? "bg-blue-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
