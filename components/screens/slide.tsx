import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function AwardsSlider() {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current!.offsetLeft)
    setScrollLeft(sliderRef.current!.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current!.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current!.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - sliderRef.current!.offsetLeft)
    setScrollLeft(sliderRef.current!.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - sliderRef.current!.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current!.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 py-4 md:py-6 overflow-hidden">
      <div 
        ref={sliderRef}
        className="flex animate-scroll whitespace-nowrap cursor-grab active:cursor-grabbing"
        style={{ animationPlayState: isDragging ? 'paused' : 'running' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex items-center space-x-6 md:space-x-12 text-white">
          {/* Award 1 - INC.5000 */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="text-white px-2 md:px-4 py-1 md:py-2 rounded-lg font-bold text-xs md:text-sm">
              INC.5000
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;NYC&rsquo;s Fastest Growing Mover&rdquo;</span>
          </div>

          {/* Award 2 - Forbes */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <span className="text-white font-bold text-sm md:text-lg" style={{fontFamily: 'serif'}}>Forbes</span>
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;Voted Dubai&rsquo;s Best Mover&rdquo;</span>
          </div>

          {/* Award 3 - Fortune */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <span className="text-white font-bold text-sm md:text-lg">FORTUNE</span>
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;The Mover Who Cares&rdquo;</span>
          </div>

          {/* Award 4 - The New York Times */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <div className="text-white font-bold text-center" style={{fontFamily: 'serif'}}>
                <div className="text-xs">The</div>
                <div className="text-sm md:text-lg">New York</div>
                <div className="text-sm md:text-lg">Times</div>
              </div>
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;Excellent Service Provider&rdquo;</span>
          </div>

          {/* Award 5 - Google */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;Top Rated Moving Company&rdquo;</span>
          </div>

          {/* Award 6 - Trustpilot */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <Image src="/trust.png" alt="Trustpilot" width={32} height={32} className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;Professional & Reliable&rdquo;</span>
          </div>
        </div>

        {/* Duplicate for seamless loop */}
        <div className="flex items-center space-x-6 md:space-x-12 text-white ml-6 md:ml-12">
          {/* Award 1 - INC.5000 */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="text-white px-2 md:px-4 py-1 md:py-2 rounded-lg font-bold text-xs md:text-sm">
              INC.5000
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;NYC&rsquo;s Fastest Growing Mover&rdquo;</span>
          </div>

          {/* Award 2 - Forbes */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <span className="text-white font-bold text-sm md:text-lg" style={{fontFamily: 'serif'}}>Forbes</span>
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;Voted Dubai&rsquo;s Best Mover&rdquo;</span>
          </div>

          {/* Award 3 - Fortune */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <span className="text-white font-bold text-sm md:text-lg">FORTUNE</span>
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;The Mover Who Cares&rdquo;</span>
          </div>

          {/* Award 4 - The New York Times */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <div className="text-white font-bold text-center" style={{fontFamily: 'serif'}}>
                <div className="text-xs">The</div>
                <div className="text-sm md:text-lg">New York</div>
                <div className="text-sm md:text-lg">Times</div>
              </div>
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;Excellent Service Provider&rdquo;</span>
          </div>

          {/* Award 5 - Google */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;Top Rated Moving Company&rdquo;</span>
          </div>

          {/* Award 6 - Trustpilot */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg">
              <Image src="/trust.png" alt="Trustpilot" width={32} height={32} className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-bold text-sm md:text-lg">&ldquo;Professional & Reliable&rdquo;</span>
          </div>
        </div>
      </div>
    </div>
  )
}