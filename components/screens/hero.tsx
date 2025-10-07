import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/purple 4.jpg"
          alt="CNC Machine cutting wood"
          fill
          className="object-cover object-center brightness-80"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Main Content - Top */}
        <div className="flex-1 flex items-center">
          <div className="w-full justify-center items-center">
            <div className='max-w-7xl py-6 px-4 sm:px-6 lg:px-24'>
               {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl md:text-7xl  font-black text-white mb-4 leading-tight break-words drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Professional movers who pack, load and deliver — <span className='text-purple-400'>on time, with care.</span>
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-100 mb-8 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            Experienced, trained moving crews
            </h2>

            {/* Call to Action Button */}
            <div className="mb-12">
              <Link href="/main/contact">
                <Button 
                  size="lg" 
                  className="bg-[#9A4CB9] hover:bg-[#9A4CB9]/90 text-white font-bold px-8 py-4 text-lg rounded-[20px] transition-colors duration-200 shadow-lg"
                >
                  Get Started
                </Button>
              </Link>
            </div>
            </div>
          </div>
        </div>

        {/* Sponsor Section - Bottom */}
      
      </div>
    </div>
  )
}

export default Hero

// import React from 'react'

// import {ButtonsContent} from '@/components/pages/buutons'
// const hero = () => {
//   return (
//     <div  className="w-full sm:h-full lg:h-[90vh] justify-center  p-8 sm:bg-white lg:bg-[#FDFBFB]">
//       <div className=" h-full  lg:pt-3 sm:pt-3 max-w-7xl  mx-auto flex flex-col-reverse md:flex-row gap-8 items-center">

//   <div className=' w-full mx-0 md:mx-10'>
//   <div className="flex flex-col mt-8 items-start sm:items-center sm:justify-center ">
//       <h1 className="text-2xl sm:text-4xl md:text-[2.6rem] mb-2 sm:mb-4  font-bold ">
//      <span className='text-[#9A4CB9]'>Dial in your desktop CNC </span> 
//       </h1>
//       <h1 className="text-2xl sm:text-4xl mb-6 md:text-[2.6rem]   font-bold ">
//       Easier cutting starts here
//       </h1>
//         <h1 className='text-xl sm:text-2xl    mt-6 sm:mt-12 md:text-2xl lg:text-4xl  font-bold text-black'>Optimized feeds and speeds for your hobby CNC machines.</h1> 
//         <h1 className='text-xl sm:text-2xl    mt-4 sm:mt-4 md:text-2xl lg:text-4xl  font-bold text-[#9A4CB9]'>Just select and cut.</h1> 

     
//       </div>

//  <div className='my-16'> <ButtonsContent/></div>
   
//     <h1 className='text-xl sm:text-3xl mt-20 sm:mt-26  text-black font-bold'>
//     Take the guesswork out of CNC. Whether you&apos;re carving hard
// wood or cutting acrylic on your machine, our feeds and speeds 
// app gives you machine-specific recommendations in seconds. 
// Confident cuts every time. </h1>
    
   
    
//   </div>
// </div></div>
//   )
// }

// export default hero

