"use client"
import Heading from '@/components/screens/customHeading'
import type React from "react"
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { initEmailJS, sendEmail, formatEmailData } from '@/lib/emailjs'

type QuoteFormData = {
  // Moving Information
  moveDate: string
  pickupTime: string
  moveType: string
  
  // Storage Services
  storageServices: string
  
  // Pickup Address
  pickupAddress: string
  pickupAccessType: string
  pickupDoorman: boolean
  pickupCOI: boolean
  
  // Dropoff Address
  dropoffAddress: string
  dropoffAccessType: string
  dropoffDoorman: boolean
  dropoffCOI: boolean
  
  // Personal Information
  firstName: string
  lastName: string
  phone: string
  email: string
  additionalInfo: string
  
  // Quote Options
  inPersonQuote: string
  hearAboutUs: string
}

const initialData: QuoteFormData = {
  moveDate: "",
  pickupTime: "",
  moveType: "",
  storageServices: "",
  pickupAddress: "",
  pickupAccessType: "",
  pickupDoorman: false,
  pickupCOI: false,
  dropoffAddress: "",
  dropoffAccessType: "",
  dropoffDoorman: false,
  dropoffCOI: false,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  additionalInfo: "",
  inPersonQuote: "",
  hearAboutUs: "",
}

const ContactPage = () => {
  const [formData, setFormData] = useState<QuoteFormData>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      if (!formData.moveDate || !formData.pickupTime || !formData.moveType || 
          !formData.storageServices || !formData.pickupAddress || !formData.dropoffAddress ||
          !formData.firstName || !formData.lastName || !formData.phone || !formData.email ||
          !formData.inPersonQuote || !formData.hearAboutUs) {
        await Swal.fire({
          title: 'Incomplete Form',
          text: 'Please complete all required fields before submitting.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#9A4CB9',
        })
        setIsLoading(false)
        return
      }

      // Format the form data for EmailJS template
      const emailData = {
        to_name: "Purple Box Moving",
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        move_date: formData.moveDate,
        pickup_time: formData.pickupTime,
        move_type: formData.moveType,
        storage_services: formData.storageServices,
        pickup_address: formData.pickupAddress,
        pickup_access: formData.pickupAccessType,
        pickup_doorman: formData.pickupDoorman ? 'Yes' : 'No',
        pickup_coi: formData.pickupCOI ? 'Yes' : 'No',
        dropoff_address: formData.dropoffAddress,
        dropoff_access: formData.dropoffAccessType,
        dropoff_doorman: formData.dropoffDoorman ? 'Yes' : 'No',
        dropoff_coi: formData.dropoffCOI ? 'Yes' : 'No',
        additional_info: formData.additionalInfo,
        in_person_quote: formData.inPersonQuote,
        hear_about_us: formData.hearAboutUs,
        message: `Moving Quote Request from ${formData.firstName} ${formData.lastName}`
      }
      
      // Send email using EmailJS
      const result = await sendEmail(emailData)

      if (result.success) {
        setShowSuccessModal(true)
        setFormData(initialData)
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className=" mb-8">
          <h1 className="text-3xl  font-bold text-gray-900 mb-4">
            Your piece of cake move starts with a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">fast free quote</span>
          </h1>
          <p className="text-sm text-gray-600 max-w-3xl ">
            Add your rooms & items to receive an obligation-free moving quote with a guaranteed flat-fee cost.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Moving Information Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Moving Information <span className="text-red-500">*</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated move date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="moveDate"
                  value={formData.moveDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred pick up time <span className="text-red-500">*</span>
                </label>
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Choose an option</option>
                  <option value="morning">Morning (8AM-12PM)</option>
                  <option value="afternoon">Afternoon (12PM-4PM)</option>
                  <option value="evening">Evening (4PM-8PM)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of move <span className="text-red-500">*</span>
                </label>
                <select
                  name="moveType"
                  value={formData.moveType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Choose an option</option>
                  <option value="local">Local Move</option>
                  <option value="long-distance">Long Distance</option>
                  <option value="international">International</option>
                  <option value="office">Office Move</option>
                </select>
              </div>
            </div>
          </div>

          {/* Storage Services Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Do you require Piece of Cake storage services? <span className="text-red-500">*</span>
            </h2>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="storageServices"
                  value="yes"
                  checked={formData.storageServices === "yes"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="storageServices"
                  value="no"
                  checked={formData.storageServices === "no"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Pickup Address Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pick Up address <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              *Please include the zip code when providing address.
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Enter pickup address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of access:
                </label>
                <select
                  name="pickupAccessType"
                  value={formData.pickupAccessType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Choose an option</option>
                  <option value="ground-floor">Ground Floor</option>
                  <option value="elevator">Elevator Access</option>
                  <option value="stairs">Stairs Only</option>
                  <option value="narrow-access">Narrow Access</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Optional location details:
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="pickupDoorman"
                      checked={formData.pickupDoorman}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Doorman</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="pickupCOI"
                      checked={formData.pickupCOI}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">COI</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Dropoff Address Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Drop Off address <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              *Please include the zip code when providing address.
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="dropoffAddress"
                  value={formData.dropoffAddress}
                  onChange={handleChange}
                  placeholder="Enter dropoff address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of access:
                </label>
                <select
                  name="dropoffAccessType"
                  value={formData.dropoffAccessType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Choose an option</option>
                  <option value="ground-floor">Ground Floor</option>
                  <option value="elevator">Elevator Access</option>
                  <option value="stairs">Stairs Only</option>
                  <option value="narrow-access">Narrow Access</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Optional location details:
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="dropoffDoorman"
                      checked={formData.dropoffDoorman}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Doorman</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="dropoffCOI"
                      checked={formData.dropoffCOI}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">COI</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center text-pink-600 cursor-pointer">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-lg">+</span>
                </div>
                <span>Add stops if it's necessary</span>
              </div>
            </div>
          </div>

          {/* Personal Information and Quote Options */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Any additional information you would like to share about your move?
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Quote Options */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Quote Options
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Are you interested in our free in-person quote?
                    </label>
                    <p className="text-sm text-gray-500 mb-3">
                      We will come to your home and price your quote in-person. Only 2+ bedrooms & larger size moves qualify. *
                    </p>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="inPersonQuote"
                          value="yes"
                          checked={formData.inPersonQuote === "yes"}
                          onChange={handleChange}
                          className="mr-2"
                          required
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="inPersonQuote"
                          value="no"
                          checked={formData.inPersonQuote === "no"}
                          onChange={handleChange}
                          className="mr-2"
                          required
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you hear about Piece of Cake? <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Choose an option</option>
                      <option value="google">Google Search</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="referral">Referral</option>
                      <option value="yelp">Yelp</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-4">
                      You have the option to provide us with the list of your items & rooms, or submit now and we will call you back to collect your inventory details.
                    </p>
                    <div className="space-y-3">
                      <button
                        type="button"
                        className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Add items for instant pricing
                      </button>
                      <div className="text-center text-sm text-gray-500">or</div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? "Submitting..." : "Submit now & we will get in touch"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactPage;



