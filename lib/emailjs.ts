import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_t8srnau';
const EMAILJS_TEMPLATE_ID = 'template_yo854ov';
const EMAILJS_PUBLIC_KEY = 'yD2XGJhCWpvQvaZIR';

// Initialize EmailJS
export const initEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {     
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } else {
    console.warn('EmailJS public key not found. Please add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY to your environment variables.');
  }
};

// Send email using EmailJS
export const sendEmail = async (templateParams: Record<string, string>) => {
    console.log(templateParams);

  try {
    if (!EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS public key not configured');
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return {
      success: true,
      message: 'Email sent successfully!',
      response
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
      error
    };
  }
};

// Generate HTML table for stops
export const generateStopsTableHTML = (stops: Array<{
  id: string;
  address: string;
  accessType: string;
  doorman: boolean;
  coi: boolean;
}>) => {
  if (!stops || stops.length === 0) {
    return 'No additional stops';
  }

  const tableRows = stops.map((stop, index) => 
    `Stop ${index + 1}: ${stop.address || 'Not provided'}\n` +
    `Access Type: ${stop.accessType || 'Not specified'}\n` +
    `Doorman: ${stop.doorman ? 'Yes' : 'No'}\n` +
    `COI: ${stop.coi ? 'Yes' : 'No'}\n` +
    `----------------------------\n`
  ).join('\n');

  return `ADDITIONAL STOPS:\n${tableRows}`;
};

// Format form data for EmailJS template with all new fields
export const formatEmailData = (formData: {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Moving Information
  moveDate: string;
  pickupTime: string;
  moveType: string;
  inPersonQuote: string;
  
  // Pickup Address Details
  pickupAddress: string;
  pickupAccessType: string;
  pickupDoorman: boolean;
  pickupCOI: boolean;
  
  // Dropoff Address Details
  dropoffAddress: string;
  dropoffAccessType: string;
  dropoffDoorman: boolean;
  dropoffCOI: boolean;
  
  // Additional Information
  message?: string;
  
  // Stops
  stops?: Array<{
    id: string;
    address: string;
    accessType: string;
    doorman: boolean;
    coi: boolean;
  }>;
}) => {
  const stopsTableHTML = formData.stops ? generateStopsTableHTML(formData.stops) : '<p>No additional stops</p>';
  
  // Get price from sessionStorage (set by price modal)
  const storedPrice = typeof window !== 'undefined' ? sessionStorage.getItem('price') : null;
  
  return {
    // Personal Information
    price: storedPrice || '0',
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone_number: formData.phone,

    // Moving Information
    move_date: formData.moveDate,
    preferred_pickup_time: formData.pickupTime,
    type_of_move: formData.moveType,
    in_person_qoute: formData.inPersonQuote,
    
    // Pickup Address Details
    pickup_address: formData.pickupAddress,
    pickup_floor: formData.pickupAccessType || '',
    opt_pickup_floor: formData.pickupDoorman ? 'Doorman: Yes' : 'Doorman: No',
    
    // Dropoff Address Details
    dropoff_address: formData.dropoffAddress,
    dropoff_floor: formData.dropoffAccessType || '',
    opt_drop_floor: formData.dropoffDoorman ? 'Doorman: Yes' : 'Doorman: No',
    
    // Additional Information
    message: formData.message || '',

    
    // Stops Information
    additional_stops: stopsTableHTML,
    
    // Legacy fields for backward compatibility
    name: `${formData.firstName} ${formData.lastName}`,
    full_name: `${formData.firstName} ${formData.lastName}`
  };
};
