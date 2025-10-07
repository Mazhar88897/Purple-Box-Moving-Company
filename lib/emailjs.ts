import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_t8srnau';
const EMAILJS_TEMPLATE_ID = 'template_yh0pzzf';
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

// Format form data for EmailJS template
export const formatEmailData = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupCityState: string;
  pickupZip: string;
  deliveryCityState: string;
  deliveryZip: string;
  moveDate: string;
  bedrooms: string;
}) => {
  return {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    pickupCityState: formData.pickupCityState,
    pickupZip: formData.pickupZip,
    deliveryCityState: formData.deliveryCityState,
    deliveryZip: formData.deliveryZip,
    moveDate: formData.moveDate,
    bedrooms: formData.bedrooms,
    phone: formData.phone,
    name: `${formData.firstName} ${formData.lastName}` // Combined name field
  };
};
