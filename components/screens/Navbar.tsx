"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ArrowUpRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700">
      <div className="container mx-auto flex h-20 items-center w-full justify-center px-2 xl:px-14">
        {/* Logo */}
        <div   className=" w-full   flex justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex flex-col">
            <div className="relative w-[80px] sm:w-[150px] h-[60px]">
              <Image src="/box.png" alt="Logo" fill className="object-contain" />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 xl:gap-8  xl:flex">
          <Link href="/main/about" className="text-sm font-bold tracking-wider uppercase text-white/90 hover:text-white">
            About
          </Link>
          <Link href="/main/faq" className="text-sm font-semibold tracking-wider uppercase text-white/90 hover:text-white">
            FAQ
          </Link>
          <Link href="/main/reviews" className="text-sm font-semibold tracking-wider uppercase text-white/90 hover:text-white">
            Reviews
          </Link>
          <Link href="/main/privacy" className="text-sm font-semibold tracking-wider uppercase text-white/90 hover:text-white">
            Resources
          </Link>
          <Link href="/main/about" className="text-sm font-semibold tracking-wider uppercase text-white/90 hover:text-white">
            Company
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-end gap-4 xl:gap-6  mt-3 mx-0 xl:mx-4">
          <div className="flex flex-col items-center">
          <Link href="/main/contact" className="inline-flex items-center gap-2 rounded-md bg-[#221c55] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm hover:bg-[#1a1645]">
            Instant Price <ArrowUpRight className="h-4 w-4" />
            
          </Link>
          <span className="mt-1 text-[10px] font-bold tracking-wide text-transparent">x</span>
       

          </div>
          <div className="hidden md:flex 2xl:hidden  flex-col items-center align-center h-full py-3">
            <Phone className="h-4 w-4 text-white" stroke-width={4} />
            {/* <span className="text-[10px] font-bold tracking-wide text-white/90">7 days a week 7AM-9PM</span> */}
          </div>
               
          <div className=" hidden 2xl:flex  flex-col items-center   ">
            <a href="tel:+12126517273" className="inline-flex items-center gap-2 rounded-md bg-[#221c55] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm hover:bg-[#1a1645]">
              <Phone className="h-4 w-4" />+1 (332)2835813‬
            </a>
            <span className="mt-1 text-[10px] font-bold tracking-wide text-white/90">7 days a week 7AM-9PM</span>
          </div>
          
          
        </div>
          
        </div>
      

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] xl:w-[320px] max-w-[85vw]">
            <div className="flex items-center gap-3">
              <Image src="/box.png" height={80} width={80} alt="Logo" />
              {/* <span className="text-lg font-bold">Purple Box</span> */}
            </div>
            <nav className="flex flex-col space-y-4 pt-8">
              <Link
                href="/main/about"
                className="text-sm font-semibold text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/main/faq"
                className="text-sm font-semibold text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/main/reviews"
                className="text-sm font-semibold text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/main/privacy"
                className="text-sm font-semibold text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/main/about"
                className="text-sm font-semibold text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Company
              </Link>
              <Link href="/main/contact" className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#221c55] px-4 py-3 text-white font-semibold" onClick={() => setIsOpen(false)}>
                Instant Price <ArrowUpRight className="h-4 w-4" />
              </Link>
              <div className="flex  w-fullflex-col items-center">
                <a href="tel:+12126517273" className="inline-flex items-center w-full justify-center gap-2 rounded-md bg-[#221c55] px-4 py-3 text-white font-semibold" onClick={() => setIsOpen(false)}>
                  <Phone className="h-4 w-4" />+1 (332)2835813‬
                </a>
                {/* <span className="mt-1 text-[10px] font-semibold text-gray-700">7 days a week 7AM-9PM</span> */}
              </div>
              
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
