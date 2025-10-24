"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightToLine, ArrowUpRight, Phone } from 'lucide-react'
import Autocomplete from '@/components/ui/autocomplete'
import { CityOption } from '@/lib/googlePlaces'

const Hero = () => {
  const [fromAddress, setFromAddress] = useState('')
  const [toAddress, setToAddress] = useState('')

  const handleFromAddressChange = (value: string) => {
    setFromAddress(value)
  }

  const handleToAddressChange = (value: string) => {
    setToAddress(value)
  }

  const handleFromAddressSelect = (option: CityOption) => {
    setFromAddress(option.fullAddress)
  }

  const handleToAddressSelect = (option: CityOption) => {
    setToAddress(option.fullAddress)
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 overflow-hidden min-h-screen">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - Visual Content with Moving Boxes */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <img src="/hro.png" alt="moving background" className="w-full h-full object-cover rounded-lg" />
              
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
              Five-star moving made simple
   <span className="text-[#221c55]">with Purple Box</span>.
              </h1>
              
              <p className="text-lg   text-purple-950 font-bold">Affordable moving & storage services.</p>
              <p className="text-lg  text-white/90 mb-8 font-medium">
           
              Get your guaranteed all-inclusive quote in minutes.   </p>

              {/* Form Fields */}
              <div className="space-y-4 mb-8">
                <Autocomplete
                  placeholder="Enter street address (e.g., 123 Main St, New York, NY)"
                  value={fromAddress}
                  onChange={handleFromAddressChange}
                  onSelect={handleFromAddressSelect}
                />
                <Autocomplete
                  placeholder="Enter street address (e.g., 456 Oak Ave, Los Angeles, CA)"
                  value={toAddress}
                  onChange={handleToAddressChange}
                  onSelect={handleToAddressSelect}
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* GET QUOTE Button */}
                <Link href="/main/contact" className="inline-flex items-center gap-2 rounded-md bg-[#221c55] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm hover:bg-[#1a1645]">
            GET QUOTE <ArrowUpRight className="h-4 w-4" />
            
          </Link>

                {/* Phone CTA */}
                <Link href="/main/contact" className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-medium">Or get a call from us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero


