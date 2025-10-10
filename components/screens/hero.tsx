"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightToLine, Phone } from 'lucide-react'

const Hero = () => {
  return (
    <div className="relative w-full  bg-gradient-to-br from-[#9A4CB9] to-[#7A3A9A] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Visual Content */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
            <img src="/bg.png" alt="hero" className="w-full h-full object-cover" />
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Right Side - Text and Form */}
          <div className="order-1 lg:order-2 text-white">
            <div className="max-w-lg mx-auto lg:mx-0">
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Professional movers who pack, load and deliver <span className='text-purple-950'>on time, with care.</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-white/90 mb-8 font-medium">
                Experienced, trained moving crews. Reliable storage solutions for your peace of mind.
              </p>

              {/* Horizontal Banner with CTAs */}
              <div className="  py-4 px-2 sm:p-8 lg:py-8 mb-8">
                <div className="flex flex-row items-center justify-center sm:justify-between  gap-4">
                  {/* Left Side - GET QUOTE Butt2n */}
                  <Link href="/main/contact">
                    <div 
                    
                      className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold px-3 sm:px-7 py-3 text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform  flex items-center space-x-2"
                    >
                      <span>Get a Quote</span>
                      <ArrowRightToLine className="w-5 h-5 " />
                    </div>
                  </Link>

                  {/* Right Side - Phone CTA */}
                  <Link href="/main/contact" className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors duration-200">
                    <svg className="w-5 h-5 sm:w-8 sm:h-8 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="text-sm sm:text-lg font-medium">Or get a call from us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero


