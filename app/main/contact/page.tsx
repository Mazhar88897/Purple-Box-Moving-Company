"use client"
import Heading from '@/components/screens/customHeading'
import type React from "react"
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { initEmailJS, sendEmail, formatEmailData } from '@/lib/emailjs'
import { useRouter } from 'next/navigation'
import PriceModal, { computeEstimate, type PackingData, type ComplexItemsData } from '@/components/dashboardItems/pricemodal'
import Autocomplete from '@/components/ui/autocomplete'
// import { toast } from 'react-hot-toast'
// import { toast } from 'sonner'
import { TrashIcon } from 'lucide-react'

type StopData = {
  id: string
  address: string
  accessType: string
  doorman: boolean
  coi: boolean
}

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
  
  // Additional Stops
  stops: StopData[]
  
  // Personal Information
  firstName: string
  lastName: string
  phone: string
  email: string
  additionalInfo: string
  
  // Quote Options
  inPersonQuote: string
  hearAboutUs: string
  
  // Complex Items
  hasComplexItems: boolean
  complexItems: string
  complexItemsList: string[]
  
  // Packing/Unpacking
  needsPacking: string // "yes" | "no" | ""
  numberOfBoxes: string
  roomSize: string // "1-bedroom" | "2-bedroom" | "3+-bedroom" | "large-house" | ""
  furnitureBed: boolean
  furnitureSofa: boolean
  furnitureCloset: boolean
  furnitureBoxes: boolean
  additionalFurniture: string[]
  customFurnitureItems: string[]
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
  stops: [],
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  additionalInfo: "",
  inPersonQuote: "",
  hearAboutUs: "",
  hasComplexItems: false,
  complexItems: "",
  complexItemsList: [],
  needsPacking: "",
  numberOfBoxes: "",
  roomSize: "",
  furnitureBed: false,
  furnitureSofa: false,
  furnitureCloset: false,
  furnitureBoxes: false,
  additionalFurniture: [],
  customFurnitureItems: [],
}

const ContactPage = () => {
  const [formData, setFormData] = useState<QuoteFormData>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showPriceModal, setShowPriceModal] = useState(false)
  const [shouldSubmitAfterModal, setShouldSubmitAfterModal] = useState(false)
  const router = useRouter()
  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS()
    // Load addresses from sessionStorage if available
    const toAddress = (typeof window !== 'undefined' ? sessionStorage.getItem('toAddress') : '') || ''
    const fromAddress = (typeof window !== 'undefined' ? sessionStorage.getItem('fromAddress') : '') || ''
    if (toAddress || fromAddress) {
      setFormData((prev) => {
        const updated = { ...prev }
        // Only set if fields are empty
        if (toAddress && !prev.dropoffAddress) {
          updated.dropoffAddress = toAddress
        }
        if (fromAddress && !prev.pickupAddress) {
          updated.pickupAddress = fromAddress
        }
        return updated
      })
    }
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

  const addStop = () => {
    const newStop: StopData = {
      id: Date.now().toString(),
      address: "",
      accessType: "",
      doorman: false,
      coi: false
    }
    setFormData((prev) => {
      const updated = {
        ...prev,
        stops: [...prev.stops, newStop]
      }
      console.log('Added new stop. Current stops:', updated.stops)
      return updated
    })
  }

  const removeStop = (stopId: string) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        stops: prev.stops.filter(stop => stop.id !== stopId)
      }
      console.log('Removed stop. Current stops:', updated.stops)
      return updated
    })
  }

  const updateStop = (stopId: string, field: keyof StopData, value: string | boolean) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        stops: prev.stops.map(stop => 
          stop.id === stopId ? { ...stop, [field]: value } : stop
        )
      }
      console.log(`Updated stop ${stopId} field ${field} to:`, value)
      console.log('Updated stops:', updated.stops)
      return updated
    })
  }

  // Complex items helpers
  const addComplexItem = () => {
    setFormData((prev) => ({
      ...prev,
      complexItemsList: [...(prev.complexItemsList || []), ""],
    }))
  }

  const updateComplexItem = (index: number, value: string) => {
    setFormData((prev) => {
      const list = [...(prev.complexItemsList || [])]
      list[index] = value
      return { ...prev, complexItemsList: list }
    })
  }

  const removeComplexItem = (index: number) => {
    setFormData((prev) => {
      const list = [...(prev.complexItemsList || [])]
      list.splice(index, 1)
      return { ...prev, complexItemsList: list }
    })
  }

  // Keep combined complexItems string in sync (for email/backward compatibility)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      complexItems: (prev.complexItemsList || []).filter(Boolean).join(', '),
    }))
  }, [formData.complexItemsList])

  // Custom furniture helpers
  const addCustomFurnitureItem = () => {
    setFormData((prev) => ({
      ...prev,
      customFurnitureItems: [...(prev.customFurnitureItems || []), ""],
    }))
  }

  const updateCustomFurnitureItem = (index: number, value: string) => {
    setFormData((prev) => {
      const list = [...(prev.customFurnitureItems || [])]
      list[index] = value
      return { ...prev, customFurnitureItems: list }
    })
  }

  const removeCustomFurnitureItem = (index: number) => {
    setFormData((prev) => {
      const list = [...(prev.customFurnitureItems || [])]
      list.splice(index, 1)
      return { ...prev, customFurnitureItems: list }
    })
  }

  // Handle additional furniture checkbox
  const handleAdditionalFurnitureChange = (item: string) => {
    setFormData((prev) => {
      const current = prev.additionalFurniture || []
      const isSelected = current.includes(item)
      return {
        ...prev,
        additionalFurniture: isSelected
          ? current.filter(i => i !== item)
          : [...current, item]
      }
    })
  }

  // Calculate estimated boxes based on room size
  const getEstimatedBoxes = (roomSize: string) => {
    switch (roomSize) {
      case "1-bedroom":
        return "30-40 boxes"
      case "2-bedroom":
        return "40-50 boxes"
      case "3+-bedroom":
        return "50-70 boxes"
      case "large-house":
        return "70+ boxes"
      default:
        return ""
    }
  }

  const proceedSubmit = async () => {
    try {
      setIsLoading(true)
      // Get addresses from sessionStorage if form fields are not set
      const dropoffAddress = formData.dropoffAddress || (typeof window !== 'undefined' ? sessionStorage.getItem('toAddress') : '') || ''
      const pickupAddress = formData.pickupAddress || (typeof window !== 'undefined' ? sessionStorage.getItem('fromAddress') : '') || ''
      
      // Calculate number of movers based on move type
      const moveTypeLower = (formData.moveType || "").toLowerCase()
      let moversCount = 2
      if (moveTypeLower.includes("office")) moversCount = 3
      if (moveTypeLower.includes("long")) moversCount = 3
      
      // Prepare packing data
      const packingData: PackingData = {
        needsPacking: formData.needsPacking,
        roomSize: formData.roomSize,
        numberOfBoxes: formData.numberOfBoxes,
        furnitureBed: formData.furnitureBed,
        furnitureSofa: formData.furnitureSofa,
        furnitureCloset: formData.furnitureCloset,
        furnitureBoxes: formData.furnitureBoxes,
        additionalFurniture: formData.additionalFurniture,
        customFurnitureItems: formData.customFurnitureItems,
      }
      
      // Prepare complex items data
      const complexItemsData: ComplexItemsData = {
        complexItemsList: formData.complexItemsList,
      }
      
      // Calculate price
      let calculatedPrice = '0'
      if (pickupAddress && dropoffAddress) {
        const priceResult = computeEstimate(
          pickupAddress,
          dropoffAddress,
          moversCount,
          packingData,
          complexItemsData
        )
        calculatedPrice = String(priceResult.total)
      }
      
      const emailData = formatEmailData({
        // Personal Information
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        
        // Moving Information
        moveDate: formData.moveDate,
        pickupTime: formData.pickupTime,
        moveType: formData.moveType,
        inPersonQuote: formData.inPersonQuote,
        
        // Pickup Address Details - use sessionStorage if formData doesn't have it
        pickupAddress: pickupAddress,
        pickupAccessType: formData.pickupAccessType,
        pickupDoorman: formData.pickupDoorman,
        pickupCOI: formData.pickupCOI,
        
        // Dropoff Address Details - use sessionStorage if formData doesn't have it
        dropoffAddress: dropoffAddress,
        dropoffAccessType: formData.dropoffAccessType,
        dropoffDoorman: formData.dropoffDoorman,
        dropoffCOI: formData.dropoffCOI,
        
        // Additional Information
        message: formData.additionalInfo || `Moving Quote Request from ${formData.firstName} ${formData.lastName}`,
        
        // Price
        price: calculatedPrice,
        
        // Stops
        stops: formData.stops
      })
      
      console.log('Email data being sent:', emailData)
      const result = await sendEmail(emailData)

      if (result.success) {
        setShowSuccessModal(true)
        setFormData(initialData)
        await Swal.fire({
          title: 'We received your application',
          text: 'We will get back to you soon',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#9A4CB9',
        })
        router.push('/')
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
      setShouldSubmitAfterModal(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Log complete form data before submission
    console.log('=== FORM SUBMISSION ===')
    console.log('Complete form data:', formData)
    console.log('Number of stops:', formData.stops.length)
    console.log('Stops details:', formData.stops)
    console.log('========================')

    try {
      // Validate required fields - check sessionStorage for addresses if not in formData
      const dropoffAddress = formData.dropoffAddress ||  (typeof window !== 'undefined' ? sessionStorage.getItem('toAddress') : '') || ''
      const pickupAddress = formData.pickupAddress ||  (typeof window !== 'undefined' ? sessionStorage.getItem('fromAddress') : '') || ''
      if (!formData.moveDate || !formData.pickupTime || !formData.moveType || 
          !pickupAddress || !dropoffAddress ||
          !formData.firstName || !formData.lastName || !formData.phone || !formData.email ||
          !formData.inPersonQuote || !formData.hearAboutUs) {
        await Swal.fire({
          title: 'Incomplete Form',
          text: 'Please complete all required fields before submitting.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#9A4CB9',
        })
        return
      }

      // Open price modal first and defer sending until it is closed
      setShouldSubmitAfterModal(true)
      setShowPriceModal(true)
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: error instanceof Error ? error.message : 'Submission failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#9A4CB9',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <PriceModal
          open={showPriceModal}
          onClose={() => {
            setShowPriceModal(false)
            if (shouldSubmitAfterModal) {
              void proceedSubmit()
            }
          }}
          fromDestination={formData.pickupAddress || (typeof window !== 'undefined' ? sessionStorage.getItem('fromAddress') : ' ' as string ) || ''}
          toDestination={formData.dropoffAddress || (typeof window !== 'undefined' ? sessionStorage.getItem('toAddress') : ' ' as string      ) || ''}
          moveType={formData.moveType}
          packingData={{
            needsPacking: formData.needsPacking,
            roomSize: formData.roomSize,
            numberOfBoxes: formData.numberOfBoxes,
            furnitureBed: formData.furnitureBed,
            furnitureSofa: formData.furnitureSofa,
            furnitureCloset: formData.furnitureCloset,
            furnitureBoxes: formData.furnitureBoxes,
            additionalFurniture: formData.additionalFurniture,
            customFurnitureItems: formData.customFurnitureItems,
          }}
          complexItemsData={{
            complexItemsList: formData.complexItemsList,
          }}
        />
        {/* Header */}
        <div className=" mb-8">
          <h1 className="text-3xl  font-bold text-gray-900 mb-4">
            Your purple box moving move starts with a{" "}
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
                  min={new Date().toISOString().split('T')[0]}
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
                  className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <Autocomplete
                  placeholder="Enter pickup address"
                  value={formData.pickupAddress || (typeof window !== 'undefined' ? sessionStorage.getItem('fromAddress') : ' ' as string) || ''}
                  onChange={(val) => setFormData((prev) => ({ ...prev, pickupAddress: val }))}
                  onSelect={(opt) => setFormData((prev) => ({ ...prev, pickupAddress: opt.fullAddress }))}
                  className="w-full"
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
                  className="w-[300px] sm:w-[400px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <Autocomplete
                  placeholder="Enter dropoff address"
                  value={ formData.dropoffAddress || (typeof window !== 'undefined' ? sessionStorage.getItem('toAddress') : ' ' as string) || ''}
                  onChange={(val) => setFormData((prev) => ({ ...prev, dropoffAddress: val }))}
                  onSelect={(opt) => setFormData((prev) => ({ ...prev, dropoffAddress: opt.fullAddress }))}
                  className="w-full"
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
                  className="w-[300px] sm:w-[400px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              <div className="flex items-center text-purple-600 cursor-pointer" onClick={addStop}>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-lg">+</span>
                </div>
                <span>Add stops if it is necessary</span>
              </div>
            </div>
          </div>

          {/* Additional Stops */}
          {formData.stops.map((stop, index) => (
            <div key={stop.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Additional Stop {index + 1}
                </h2>
                <button
                  type="button"
                  onClick={() => removeStop(stop.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                *Please include the zip code when providing address.
              </p>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={stop.address}
                    onChange={(e) => updateStop(stop.id, 'address', e.target.value)}
                    placeholder="Enter stop address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of access:
                  </label>
                  <select
                    value={stop.accessType}
                    onChange={(e) => updateStop(stop.id, 'accessType', e.target.value)}
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
                        checked={stop.doorman}
                        onChange={(e) => updateStop(stop.id, 'doorman', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Doorman</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={stop.coi}
                        onChange={(e) => updateStop(stop.id, 'coi', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">COI</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Packing/Unpacking Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Full Packing/Unpacking
            </h2>
            <div className="space-y-6">
              {/* Packing Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you need packing/unpacking service?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsPacking"
                      value="yes"
                      checked={formData.needsPacking === "yes"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Yes, I need packing</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsPacking"
                      value="no"
                      checked={formData.needsPacking === "no"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">No, I already packed</span>
                  </label>
                </div>
              </div>

              {/* Number of boxes based on packing selection */}
              {formData.needsPacking === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="roomSize"
                    value={formData.roomSize}
                    onChange={handleChange}
                    className="w-full md:w-[400px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Choose room size</option>
                    <option value="1-bedroom">1-bedroom (~30-40 boxes)</option>
                    <option value="2-bedroom">2-bedroom (~40-50 boxes)</option>
                    <option value="3+-bedroom">3+-bedroom (~50-70 boxes)</option>
                    <option value="large-house">Large house (70+ boxes)</option>
                  </select>
                  {formData.roomSize && (
                    <p className="text-sm text-gray-500 mt-2">
                      Estimated: {getEstimatedBoxes(formData.roomSize)}
                    </p>
                  )}
                </div>
              )}

              {formData.needsPacking === "no" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many boxes do you already have? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfBoxes"
                    value={formData.numberOfBoxes}
                    onChange={handleChange}
                    placeholder="Enter number of boxes"
                    min="0"
                    className="w-full md:w-[400px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              {/* Amount of furniture and belongings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Amount of furniture and belongings:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.furnitureBed}
                      onChange={(e) => setFormData(prev => ({ ...prev, furnitureBed: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Bed</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.furnitureSofa}
                      onChange={(e) => setFormData(prev => ({ ...prev, furnitureSofa: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Sofa</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.furnitureCloset}
                      onChange={(e) => setFormData(prev => ({ ...prev, furnitureCloset: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Closet</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.furnitureBoxes}
                      onChange={(e) => setFormData(prev => ({ ...prev, furnitureBoxes: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Boxes</span>
                  </label>
                </div>
              </div>

              {/* Anything else? */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Anything else?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {[
                    "Dining Table",
                    "Desk",
                    "TV Stand",
                    "Bookshelf",
                    "Dresser",
                    "Nightstand",
                    "Coffee Table",
                    "Armchair",
                    "Mirror",
                    "Artwork",
                    "Appliances",
                    "Exercise Equipment"
                  ].map((item) => (
                    <label key={item} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.additionalFurniture?.includes(item) || false}
                        onChange={() => handleAdditionalFurnitureChange(item)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-3">
                  {(formData.customFurnitureItems || []).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateCustomFurnitureItem(index, e.target.value)}
                        placeholder="Enter custom item name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeCustomFurnitureItem(index)}
                        className="text-red-500 hover:text-red-700 px-2 py-2"
                        aria-label={`Remove item ${index + 1}`}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center text-purple-600 cursor-pointer" onClick={addCustomFurnitureItem}>
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-lg">+</span>
                    </div>
                    <span>Add custom item</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
{/* 
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Complex items
            </h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hasComplexItems"
                  checked={formData.hasComplexItems}
                  onChange={(e) => {
                    const checked = e.target.checked
                    setFormData((prev) => ({
                      ...prev,
                      hasComplexItems: checked,
                      complexItemsList: checked
                        ? (prev.complexItemsList && prev.complexItemsList.length ? prev.complexItemsList : [""])
                        : [],
                    }))
                  }}
                  className="mr-2"
                />
                <span className="text-gray-700">Do you have any complex items?</span>
              </label>
              {formData.hasComplexItems && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Please list the complex items (e.g., piano, safe, pool table)
                  </label>
                  {(formData.complexItemsList || []).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateComplexItem(index, e.target.value)}
                        placeholder={`Item ${index + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeComplexItem(index)}
                        className="text-red-500 hover:text-red-700 px-2 py-2"
                        aria-label={`Remove item ${index + 1}`}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center text-purple-600 cursor-pointer" onClick={addComplexItem}>
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-lg">+</span>
                    </div>
                    <span>Add item</span>
                  </div>
                </div>
              )}
            </div>
          </div> */}

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
                      How did you hear about purple box moving? <span className="text-red-500">*</span>
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
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 text-white py-3 px-4 rounded-md  transition-colors disabled:opacity-50"
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



