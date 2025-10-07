"use client"
import Navbar from "@/components/screens/Navbar"
import Hero from "@/components/screens/hero"
import Footer from "@/components/screens/Footer"
import Accords from "@/components/screens/Accords"
import Testimonials from "@/components/screens/owner"
import Image from "next/image"
import Heading, { HeadingReverse } from "@/components/screens/customHeading"
import { ButtonsFAQ, ButtonsTable } from "@/components/pages/buutons"
import Newsletter from "@/components/screens/newsletter"
import Table from "@/components/screens/table"
import Sponsor from "@/components/screens/sponsor"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Description from "@/components/screens/description"
import Purple from "@/components/screens/purple"
import Subfooter from "@/components/screens/subfooter"
import Postfooter from "@/components/screens/postfooter"

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />











   


      <div>
        <Description />
      </div>


       






















    














      <>
     
    
     
      <Accords />
    
      </>

      <>
      <Purple />
      </>
   






    





      <>
      {/* <div className="bg-[#38004e] pt-10">
      <Heading  
          color="white"
          heading1=" Sign up "
          heading2="for newsletter"
          subheading="Join the Purple Box Moving Company Newsletter for Exclusive Industry Updates!"
        />
        <Newsletter />

      </div> */}

      </>








     <>
     <Subfooter />
     </>














      <Footer />
      {/* <Postfooter /> */}

    </main>
  )
}
