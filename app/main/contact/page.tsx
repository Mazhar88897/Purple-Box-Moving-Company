"use client"
import Heading from '@/components/screens/customHeading'
import type React from "react"
import { useMemo, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { initEmailJS, sendEmail, formatEmailData } from '@/lib/emailjs'

type WizardData = {
  // Step 3 (shown first)
  pickupCityState: string
  pickupZip: string
  deliveryCityState: string
  deliveryZip: string
  // Step 2
  moveDate: string
  bedrooms: string
  // Step 1 (shown last)
  firstName: string
  lastName: string
  email: string
  phone: string
}

const initialData: WizardData = {
  pickupCityState: "",
  pickupZip: "",
  deliveryCityState: "",
  deliveryZip: "",
  moveDate: "",
  bedrooms: "1",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
}

const ContactPage = () => {
  const [stepIndex, setStepIndex] = useState(0) // 0=>Step 1, 1=>Step 2, 2=>Step 3
  const [formData, setFormData] = useState<WizardData>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const visualActiveStep = useMemo(() => [1, 2, 3][stepIndex], [stepIndex])

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate all steps before submission
      if (!validateStep1() || !validateStep2() || !validateStep3()) {
        await Swal.fire({
          title: 'Incomplete Form',
          text: 'Please complete all steps before submitting. Make sure all required fields are filled.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#9A4CB9',
        })
        setIsLoading(false)
        return
      }

      // Format the form data for EmailJS template
      const emailData = formatEmailData(formData)
      
      // Send email using EmailJS
      const result = await sendEmail(emailData)

      if (result.success) {
        setShowSuccessModal(true)
        setFormData(initialData)
        setStepIndex(0)
      } else {
        throw new Error(result.message || 'Failed to send email')
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: error instanceof Error ? error.message : 'Submission failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#9A4CB9',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Validation functions for each step
  const validateStep1 = () => {
    return formData.firstName.trim() !== '' && 
           formData.lastName.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.phone.trim() !== ''
  }

  const validateStep2 = () => {
    return formData.moveDate.trim() !== '' && 
           formData.bedrooms.trim() !== ''
  }

  const validateStep3 = () => {
    return formData.pickupCityState.trim() !== '' && 
           formData.pickupZip.trim() !== '' && 
           formData.deliveryCityState.trim() !== '' && 
           formData.deliveryZip.trim() !== ''
  }

  const goNext = () => {
    let isValid = false
    
    if (stepIndex === 0) {
      isValid = validateStep1()
      if (!isValid) {
        Swal.fire({
          title: 'Incomplete Step 1',
          text: 'Please fill in all required fields: First Name, Last Name, Email, and Phone Number.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#9A4CB9',
        })
        return
      }
    } else if (stepIndex === 1) {
      isValid = validateStep2()
      if (!isValid) {
        Swal.fire({
          title: 'Incomplete Step 2',
          text: 'Please fill in all required fields: Move Date and Bedrooms.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#9A4CB9',
        })
        return
      }
    }
    
    if (isValid) {
      setStepIndex((s) => Math.min(2, s + 1))
    }
  }

  const goPrev = () => setStepIndex((s) => Math.max(0, s - 1))

  // Test email function
  const handleTestEmail = async () => {
    setIsLoading(true)
    
    try {
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
    <div className="mt-4 sm:my-10 m-3  flex flex-col items-center justify-center">
      <Heading
        color="black"
        heading1="Contact "
        heading2="Us"
        subheading="Complete these 3 quick steps to request your free quote."
      />
      <div className='max-w-3xl mx-auto my-12'>
<div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative w-full">
            <div className="relative z-10 overflow-hidden rounded-xl">
              <img
                src="/purple5.jpg"
                alt="Team member working on laptop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
          </div>

          <div>
            <h2 className="text-lg font-extrabold leading-tight text-[#0c1241] ">
              We Handle All Your Moving COI Needs
            </h2>
            <div className="mt-5 space-y-4  text-sm leading-7 text-slate-600">
              <p>
                At <span className="font-semibold">Purple Box Moving Company</span>, we know UAE moves—especially in
                apartments, offices, and towers—come with strict building rules. We handle all
                <span className="font-semibold"> COI </span>requirements for you so your move stays smooth, compliant, and
                stress‑free.
              </p>
              <p>
                As a <span className="font-semibold">fully insured</span> mover, we routinely coordinate COIs for homes and
                offices. Complex access or insurance policies? We manage the paperwork quickly
                and correctly.
              </p>
             
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mb-24  mt-5  border-black border-2 my-4 rounded-mid max-w-3xl ">
        <div className="bg-white max-w-3xl rounded-mid p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">
                <span className="text-black">Step-by-step</span> <span className="text-[#9A4CB9]">Form</span>
              </h2>
              <p className="text-sm font-semibold">Fill out Step 1, then Step 2, and finally Step 3.</p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="/purple.png" 
                alt="Purple Box Moving Company" 
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              />
            </div>
          </div>

          {/* Top step indicator with connectors */}
          <div className="mb-8">
            <div className="flex items-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-9 w-9 rounded-full border-2 ${visualActiveStep === 1 ? 'bg-[#9A4CB9] border-[#9A4CB9] text-white' : 'border-slate-400 text-slate-700'}`}>1</div>
              </div>
              {/* Connector 1-2 */}
              <div className={`flex-1 h-[2px] mx-4 ${stepIndex >= 1 ? 'bg-[#e5d6f0]' : 'bg-slate-300'}`}></div>
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-9 w-9 rounded-full border-2 ${visualActiveStep === 2 ? 'bg-[#9A4CB9] border-[#9A4CB9] text-white' : 'border-slate-400 text-slate-700'}`}>2</div>
              </div>
              {/* Connector 2-3 */}
              <div className={`flex-1 h-[2px] mx-4 ${stepIndex >= 2 ? 'bg-[#e5d6f0]' : 'bg-slate-300'}`}></div>
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-9 w-9 rounded-full border-2 ${visualActiveStep === 3 ? 'bg-[#9A4CB9] border-[#9A4CB9] text-white' : 'border-slate-400 text-slate-700'}`}>3</div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-bold tracking-wide text-slate-700">
              <div>STEP ONE</div>
              <div>STEP TWO</div>
              <div>STEP THREE</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* STEP 1: Personal Info */}
            {stepIndex === 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">First Name <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter Your First Name"
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.firstName.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Last Name <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Your Last Name"
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.lastName.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email Address <span className="text-red-600">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.email.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Phone Number <span className="text-red-600">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.phone.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Date & Bedrooms */}
            {stepIndex === 1 && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">When are you moving? <span className="text-red-600">*</span></label>
                  <input
                    type="date"
                    name="moveDate"
                    value={formData.moveDate}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.moveDate.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">How many bedrooms are you moving?</label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.bedrooms.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    disabled={isLoading}
                  >
                    {['1','2','3','4','5','6+'].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: Pickup/Delivery */}
            {stepIndex === 2 && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Pick up Zip Code or City, State <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="pickupCityState"
                    value={formData.pickupCityState}
                    onChange={handleChange}
                    placeholder="Knoxville, TN, USA"
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.pickupCityState.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="pickupZip"
                    value={formData.pickupZip}
                    onChange={handleChange}
                    placeholder="37902"
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.pickupZip.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Delivery Zip Code or City, State <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="deliveryCityState"
                    value={formData.deliveryCityState}
                    onChange={handleChange}
                    placeholder="Kent, WA, USA"
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.deliveryCityState.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    name="deliveryZip"
                    value={formData.deliveryZip}
                    onChange={handleChange}
                    placeholder="98032"
                    className={`w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-[#9A4CB9] ${
                      formData.deliveryZip.trim() === '' ? 'border-red-500' : 'border-slate-950'
                    }`}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                onClick={goPrev}
                className="bg-black text-white font-medium py-2 px-6 rounded disabled:opacity-50"
                disabled={isLoading || stepIndex === 0}
              >
                Previous
              </button>
              {stepIndex < 2 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="bg-[#9A4CB9] hover:bg-[#9A4CB9] text-white font-medium py-2 px-6 rounded disabled:opacity-50"
                  disabled={isLoading}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#9A4CB9] hover:bg-[#9A4CB9] text-white font-medium py-2 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit For A Free Estimate'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Custom Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            {/* Image */}
            <div className="mb-6">
              <img 
                src="/purple.png" 
                alt="Purple Box Moving Company" 
                className="w-32 h-32 mx-auto object-contain rounded-lg"
              />
            </div>
            
            {/* Success Message */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#9A4CB9] mb-4">Success!</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Your request has been submitted successfully! We will contact you soon.
              </p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#9A4CB9] hover:bg-[#8A3BA9] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Great!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactPage;



