"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"


export default function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto py-3 sm:my-0 ">
      <Component />
    </div>
  )
}



import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"


const testimonials = [
  {
    id: 1,
    clientNumber: "Sarah M.",
    companyName: "Dubai Marina Resident",
    rating: 5,
    text: "Purple Box made our apartment move so smooth! They handled all the COI paperwork and everything arrived perfectly. Highly recommend!",
  },
  {
    id: 2,
    clientNumber: "Ahmed K.",
    companyName: "Business Owner",
    rating: 5,
    text: "Professional team that packed our office equipment with care. The COI process was handled seamlessly. Will use again!",
  },
  {
    id: 3,
    clientNumber: "Lisa R.",
    companyName: "Abu Dhabi Resident",
    rating: 5,
    text: "From quote to delivery, everything was transparent and stress-free. They even helped with building access requirements.",
  },
  {
    id: 4,
    clientNumber: "David L.",
    companyName: "Sharjah Villa Owner",
    rating: 5,
    text: "Fast, reliable, and reasonably priced. The team treated our belongings like their own. COI was included at no extra cost!",
  },
  {
    id: 5,
    clientNumber: "Fatima A.",
    companyName: "Ajman Resident",
    rating: 5,
    text: "Excellent service from start to finish. They coordinated everything with our building management. Moving made easy!",
  },
  {
    id: 6,
    clientNumber: "Michael T.",
    companyName: "Ras Al Khaimah",
    rating: 5,
    text: "Professional, punctual, and careful with our items. The COI process was handled quickly. Great value for money!",
  },
];

 function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Get visible testimonials (current + next 2)
  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push({ ...testimonials[index], displayIndex: i })
    }
    return visible
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="w-full max-w-8xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnimatePresence mode="wait">
          {getVisibleTestimonials().map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-1">{testimonial.clientNumber}</h3>  
                <div className="flex justify-between border-b">
                  <div>  <p className="text-sm font-bold text-gray-600 mb-3">{testimonial.companyName}</p></div>
              
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                </div>
                
              </div>
              <p className="text-gray-500 font-bold text-sm leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-teal-500 scale-110" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="flex justify-center mt-4">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500" : "bg-gray-400"}`} />
          {isAutoPlaying ? "Auto-playing" : "Paused"}
        </div>
      </div>
    </div>
  )
}
