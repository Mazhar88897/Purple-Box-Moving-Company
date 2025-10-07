
import Heading from '@/components/screens/customHeading'
import Testimonials from '@/components/screens/owner'
import Subfooter from '@/components/screens/subfooter'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='my-12'>
         <Heading  
             color="black"
             heading1="Client’s "
             heading2="Testimonials"
             subheading="A Few Kind Words from Our Valued Clients"
           />
           <div className='my-10'>
           <Testimonials /> 

           </div>

    </div>
    <Subfooter />
    </>
  )
}

export default page
