"use client"
import { useState } from 'react'
import { sendEmail, formatEmailData } from '@/lib/emailjs'
import Swal from 'sweetalert2'

const EmailJSTest = () => {
  const [isLoading, setIsLoading] = useState(false)

  const testData = {
    firstName: "John",
    lastName: "Doe",
    email: "test@example.com",
    phone: "+1234567890",
    pickupCityState: "New York, NY",
    pickupZip: "10001",
    deliveryCityState: "Los Angeles, CA",
    deliveryZip: "90210",
    moveDate: "2024-02-15",
    bedrooms: "2"
  }

  const handleTestEmail = async () => {
    setIsLoading(true)
    
    try {
      const emailData = formatEmailData(testData)
      console.log('Sending test email with data:', emailData)
      
      const result = await sendEmail(emailData)
      
      if (result.success) {
        await Swal.fire({
          title: 'Test Email Sent!',
          text: 'Test email sent successfully! Check your EmailJS dashboard for delivery status.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#9A4CB9',
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      await Swal.fire({
        title: 'Test Failed!',
        text: error instanceof Error ? error.message : 'Failed to send test email',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#9A4CB9',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">EmailJS Test</h3>
      <p className="text-sm text-gray-600 mb-4">
        Click the button below to send a test email using your EmailJS template.
      </p>
      <button
        onClick={handleTestEmail}
        disabled={isLoading}
        className="bg-[#9A4CB9] hover:bg-[#8A3BA9] text-white font-medium py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send Test Email'}
      </button>
    </div>
  )
}

export default EmailJSTest
