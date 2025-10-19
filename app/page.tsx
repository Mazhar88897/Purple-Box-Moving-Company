"use client"
import Navbar from "@/components/screens/Navbar"
import AnnouncementStrip from "@/components/screens/AnnouncementStrip"
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
import MediaReviews from "@/components/screens/media"
import AwardsSlider from "@/components/screens/slide"
import PackingService from "@/components/screens/packingService"
import ShiftingProcess from "@/components/screens/shiftingProcess"
import Sections from "@/components/screens/sections"
import Strip from "@/components/screens/strip"
import Insta from "@/components/screens/insta"
import SpecialService from "@/components/screens/special"

export default function Home() {
  return (
    <main className="">
      <AnnouncementStrip />
      <Navbar />
      <Hero />
      <MediaReviews />
      <AwardsSlider />  










   


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
      <PackingService  />
      </>
      <>
      <Insta />
      </>
   
   <>
   <ShiftingProcess  />
   </>

<Sections />

<div className="hidden md:block">
<Strip />  
</div>
  





    





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
<SpecialService />    
</>







     <>
     <Subfooter />
     </>














      <Footer />
      {/* <Postfooter /> */}

    </main>
  )
}
