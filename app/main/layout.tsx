import Footer from '@/components/screens/Footer'
import Navbar from '@/components/screens/Navbar'
import AnnouncementStrip from '@/components/screens/AnnouncementStrip'
import React, { Children } from 'react'

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <>
      <AnnouncementStrip />
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default layout