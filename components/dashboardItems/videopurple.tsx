"use client"

import React, { useRef, useEffect } from 'react'

const VideoPurple = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Enable looping
      video.loop = true
      // Disable fullscreen
      video.setAttribute('controlsList', 'nofullscreen')
      video.setAttribute('disablePictureInPicture', 'true')
    }
  }, [])

  const handleContextMenu = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault() // Prevent right-click context menu
  }

  return (
    <div className="w-full flex justify-center items-center py-8 px-4">
      <div className="relative w-full md:w-[80%]">
        <div className="relative z-10 overflow-hidden rounded-xl">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
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

