"use client"

import Link from "next/link"

export default function AnnouncementStrip() {
  return (
    <div className="w-full bg-purple-50 ">
      <div className="container mx-auto px-2 sm:px-14 py-2 text-center">
        <span className="text-xs text-[#1f2a44]">
          Purple Box is the Official Moving Partner in NYC
        </span>{" "}
        <Link href="/main/about" className="text-sm font-semibold text-purple-800 hover:text-pink-700">
          Read More
        </Link>
      </div>
    </div>
  )
}


