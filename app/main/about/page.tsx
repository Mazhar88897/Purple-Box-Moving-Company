import {HeadingReverse} from '@/components/screens/customHeading'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='my-12'>
         <HeadingReverse  
             color="black"
             heading1="About "
             heading2="Purple Box"
             subheading="A newly launched moving and packing company you can trust."
           />
           <div>
            <Component />
           </div>
           
           
          
    </div>
    <Subfooter />
    </>
  )
}

export default page


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightToLine } from 'lucide-react'
import Link from 'next/link'
import Subfooter from '@/components/screens/subfooter'
function Component() {
  return (
    <div className="min-h-screen my-10 bg-white">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className='max-w-xl  mx-auto md:mx-0'>
          <div className="relative max-w-5xl">
            <div className="relative z-10 overflow-hidden rounded-xl">
              <img
                src="/pic2.png"
                alt="Team member working on laptop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
          </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Welcome to <span style={{ color: "#9A4CB9" }}>Purple Box Moving Company</span>
            </h1>
            <p className="font-semibold leading-relaxed text-slate-700 mb-6">
              We just launched to make moving simple, safe, and stress‑free across the UAE. From fast quotes to
              professional packing and careful delivery, our friendly team treats your belongings like their own.
            </p>
            <Link
              href="/main/contact"
              className="inline-flex items-center justify-center h-10 sm:h-[2.5rem] px-4 rounded-md border-2 border-black bg-white text-sm text-black font-bold hover:bg-gray-50 transition-colors"
            >
              Get a Free Quote <ArrowRightToLine className="ml-2 h-3 sm:h-4 w-3 sm:w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-6 py-8 max-w-7xl mx-auto">

        {/* Mission Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">
            Our <span style={{ color: "#9A4CB9" }}>Mission</span>
          </h2>
          <p className="font-semibold">
            To deliver reliable, transparent moving services that feel personal—so you can focus on settling in while we
            handle the heavy lifting.
          </p>
        </div>

        {/* Key Points Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            What <span style={{ color: "#9A4CB9" }}>We Offer</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-2 p-[-2]" style={{ borderColor: "black" }}>
              <div className="pb-1 px-5 py-3">
                <p className="text-lg font-bold">Fast, Transparent Quotes</p>
                <p className="text-md my-[-1] font-bold text-[#9A4CB9]">No surprises—just clear pricing</p>
              </div>
              <CardContent>
                <p className="text-xs text-gray-700">
                  Share a few details and get a quick, accurate estimate for local or commercial moves.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 p-[-2]" style={{ borderColor: "black" }}>
              <div className="pb-1 px-5 py-3">
                <p className="text-lg font-bold">Professional Packing</p>
                <p className="text-md my-[-1] font-bold text-[#9A4CB9]">Safe from door to door</p>
              </div>
              <CardContent>
                <p className="text-xs text-gray-700">
                  Sturdy materials and careful handling keep your items protected—fragile, bulky, and everything between.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 p-[-2]" style={{ borderColor: "black" }}>
              <div className="pb-1 px-5 py-3">
                <p className="text-lg font-bold">Local & Commercial Moves</p>
                <p className="text-md my-[-3] font-bold text-[#9A4CB9]">Apartments, villas, and offices</p>
              </div>
              <CardContent>
                <p className="text-xs text-gray-700">
                  Flexible teams and vehicles sized for your job—minimize downtime and get set up faster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 p-[-2]" style={{ borderColor: "black" }}>
              <div className="pb-1 px-5 py-3">
                <p className="text-lg font-bold">Customer‑First Support</p>
                <p className="text-md my-[-1] font-bold text-[#9A4CB9]">We’re here before, during, after</p>
              </div>
              <CardContent>
                <p className="text-xs text-gray-700">
                  Real people to help with planning, updates, and post‑move support—just message or call.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Getting <span style={{ color: "#9A4CB9" }}>Started</span>
          </h2>

          <p className=" mb-4">
            Moving with us is simple:
          </p>

          <ol className="list-decimal list-inside space-y-2 font-semibold">
            <li>Request a quick quote</li>
            <li>Pick your date and services</li>
            <li>We pack, move, and unpack</li>
            <li>Settle in—stress‑free</li>
          </ol>
        </div>
        <div>
  <Link
    href="/main/contact"
    className="inline-flex items-center justify-center h-10 sm:h-[2.5rem] px-4 rounded-md border-2 border-black bg-white text-sm text-black font-bold hover:bg-gray-50 transition-colors"
  >
    Get a Free Quote <ArrowRightToLine className="ml-2 h-3 sm:h-4 w-3 sm:w-4" />
  </Link>
</div>

        

        {/* Footer Quote */}
        <div className="text-center py-8">
          <h1 className="text-xl mt-5 sm:mt-10 md:text-3xl lg:text-3xl  font-bold ">
            <span className='text-[#9A4CB9]'>Moving made simple.</span> Pack less, stress less, arrive happy.
          </h1>
        </div>
      </div>
    </div>
  )
}
