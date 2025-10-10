import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Phone, Youtube, MapPin , Mail} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#38004e] text-white py-10 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Left Column - Logo and Text */}
          <div className="space-y-4 md:col-span-2">
            <div className=" p-2 inline-block rounded-full bg-white">
              <Image src="/box.png" alt="Only CNCs Logo" width={150} height={50} className="h-auto" />
            </div>
            <div>
            <p className="text-sm max-w-lg mb-4">
            Purple Box Movers — Professional moving and packing services in the UAE. Fast quotes, secure packing, and reliable local & commercial moves.  </p>
            </div>
            
          </div>

          {/* Middle Column - Links */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-2xl font-semibold mb-6">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/main/about" className="hover:underline">
                About
              </Link>
              <Link href="/main/contact" className="hover:underline">
                Contact
              </Link>
              <Link href="/main/faq" className="hover:underline">
                FAQ
              </Link>
              <Link href="/main/reviews" className="hover:underline">
                Reviews
              </Link>
             
              <Link href="/main/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/main/terms" className="hover:underline">
                Terms and Conditions
              </Link>
            </nav>
          </div>

          {/* Right Column - Social Media */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-2xl font-semibold mb-6">Social Media</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="https://www.instagram.com/purpleboxmovers/" target="_blank" className="hover:underline flex items-center gap-2">
                <Instagram size={18} />
                Instagram
              </Link>
              <Link href="https://www.youtube.com/@purpleboxmovers" target="_blank" className="hover:underline flex items-center gap-2">
                <Youtube size={18} />
                Youtube
              </Link>
              <Link href="https://www.facebook.com/people/Purple-Box-Moving-Company/61580275702236/?mibextid=wwXIfr&rdid=MDmbFUPLWMc7KyfK&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GUA1ctTp7%2F%3Fmibextid%3DwwXIfr" target="_blank" className="hover:underline flex items-center gap-2">
                <Facebook size={18} />
                Facebook
              </Link>
            
            </nav>
          </div>
        </div>

        {/* Bottom Divider and Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-600">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">
            <div className="mx-auto md:mx-0">
              <img src="/purple.png" alt="Only CNCs Logo" width={150} height={50} className="h-auto" />
            </div>
            <div className="flex flex-col items-center md:items-start space-y-1">
              <p className="text-sm mb-1 md:mb-0 inline-flex items-center gap-2 justify-center md:justify-start px-[5px] md:px-0"><Phone className="w-4 h-4 md:w-[18px] hidden md:block md:h-[18px]" /> +1 917-353-9666</p>
              <p className="text-sm inline-flex items-center gap-2 justify-center md:justify-start px-[5px] md:px-0"> <MapPin className="w-4 h-4 md:w-[18px] md:h-[18px] hidden md:block  " /> DAN LUNELL CORPORATION, 418 Broadway Ste Y, Albany, NY 12207</p>
              <p className="text-sm inline-flex items-center gap-2 justify-center md:justify-start px-[5px] md:px-0"> <Mail className="w-4 h-4 md:w-[18px] md:h-[18px] hidden md:block  " /> ldc.co@mail.ru </p>
            </div>
            <div className="space-y-1 md:space-y-0"> 
              <p className="text-sm font-bold mb-1 md:mb-0">Purple Box Moving Company </p>
              <p className="text-sm">Copyright © 2025. All rights reserved.</p>
            </div>
           
          </div>
         
        </div>
        
      </div>
    </footer>
  )
}
