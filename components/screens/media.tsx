import React from 'react'

export default function MediaReviews() {
  return (
    <div className="bg-white py-12 ">
      <div className="max-w-7xl mx-auto">
        {/* Single horizontal strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Title */}
          <div className="text-center md:text-left">
            <h2 className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-extrabold text-[#9A4CB9] ">
              Top rated UAE movers
            </h2>
            <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-extrabold text-[#9A4CB9]">
              across ALL review sites
            </p>
          </div>

          {/* Right side - Review platforms in a row */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            {/* Google Reviews */}
            <div className="flex items-center gap-4">
              <svg className="w-14 h-14" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div>
                <div className="text-[#0c1241] font-bold text-2xl">4.8/5</div>
                <div className="text-[#0c1241]/70 text-base">1,200+ reviews</div>
              </div>
            </div>

            {/* Yelp Reviews */}
            <div className="flex items-center gap-4">
              <img src="/yelp.png" alt="Yelp" className="w-14 h-14" />
              <div>
                <div className="text-[#0c1241] font-bold text-2xl">4.6/5</div>
                <div className="text-[#0c1241]/70 text-base">850+ reviews</div>
              </div>
            </div>

            {/* Trustpilot Reviews */}
            <div className="flex items-center gap-4">
            <img src="/trust.png" alt="Trustpilot" className="w-17 h-14" />
              <div>
                <div className="text-[#0c1241] font-bold text-2xl">4.9/5</div>
                <div className="text-[#0c1241]/70 text-base">650+ reviews</div>
              </div>
            </div>

            {/* Thumbtack Reviews */}
            <div className="flex items-center gap-4">
              <img src="/thumbtrack.png" alt="Thumbtack" className="w-16 h-15" />
              <div>
                <div className="text-[#0c1241] font-bold text-2xl">4.7/5</div>
                <div className="text-[#0c1241]/70 text-base">420+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
