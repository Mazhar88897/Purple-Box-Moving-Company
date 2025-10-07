import Heading from '@/components/screens/customHeading'
  import COIFAQ from '@/components/screens/Accords'
import Qouatation from '@/components/screens/Qouatation'
import React from 'react'
import Subfooter from '@/components/screens/subfooter'

const page = () => {
  return (
    <>
    <div className='my-12'>
      <Heading  
          color="black"
          heading1="Frequently "
          heading2="Asked Questions"
          subheading="Some of the most common questions users 
may ask all in one place."
        />
        <div className='mt-10'>
        <COIFAQ />
        </div>
      </div>
   
    <Subfooter />
    </>
  )
}

export default page