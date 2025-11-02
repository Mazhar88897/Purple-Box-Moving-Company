"use client"

import React, { useRef, useEffect } from 'react'

const VideoPurple = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    
    if (!video || !container) return

    // Enable looping
    video.loop = true
    // Mute video for autoplay (browsers require muted videos for autoplay)

    // Disable fullscreen
    video.setAttribute('controlsList', 'nofullscreen')
    video.setAttribute('disablePictureInPicture', 'true')

    // Function to try playing the video
    const playVideo = async () => {
      try {
        // Ensure video is muted for autoplay policies
       
        await video.play()
      } catch (error) {
        console.log('Video play failed:', error)
      }
    }

    // Check if video is already in viewport on mount
    const checkInitialView = () => {
      const rect = container.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      if (isInView) {
        playVideo()
      }
    }

    // Try to play immediately if in viewport
    checkInitialView()

    // Intersection Observer to detect when video is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in view, play it
            playVideo()
          } else {
            // Video is out of view, pause it
            video.pause()
          }
        })
      },
      {
        threshold: 0.1, // Play when at least 10% of video is visible
        rootMargin: '50px', // Start loading slightly before video enters viewport
      }
    )

    observer.observe(container)

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  const handleContextMenu = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault() // Prevent right-click context menu
  }

  return (
    <div className="w-full flex justify-center items-center py-8 px-4">
      <div ref={containerRef} className="relative w-full md:w-[80%]">
        <div className="relative z-10 overflow-hidden rounded-xl">
          <video
            ref={videoRef}
            loop
            autoPlay
            
            playsInline
            controls
            controlsList="nodownload  nofullscreen noremoteplayback"
            disablePictureInPicture
            onContextMenu={handleContextMenu}
            className="w-full h-auto object-cover"
          >
            <source src="/Purple Box Final Output.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute -bottom-4  -left-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
      </div>
    </div>
  )
}

export default VideoPurple

