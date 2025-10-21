import Heading from '@/components/screens/customHeading';
import React from 'react';

const TermsPage = () => {
  return (
    <div className="my-12">
      <Heading
        color="black"
        heading1="Terms and"
        heading2="Conditions"
        subheading="Please read these terms carefully before using our moving services."
      />
      <div>
        <Component />
      </div>
    </div>
  );
};

export default TermsPage;

function Component() {
  return (
    <div className="mb-20 my-10 bg-white">
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div className="space-y-8 text-base font-semibold text-gray-800">
          {/* Last Updated */}
          <div className="text-sm text-gray-600 italic">
            <strong>Last Updated:</strong> 08 September 2025
          </div>
          
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">1. Introduction</h2>
            <p className="mb-4">
              Welcome to <strong>Purple Box Moving Company</strong>, a professional moving and packing service owned and operated by <strong>Purple Box Moving Company</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms and Conditions govern your use of our website and our moving services, including any content, functionality, and services offered on or through the site. By accessing or using our website or booking our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.
            </p>
          </section>

          {/* Section 2: Intellectual Property Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">2. Intellectual Property Rights</h2>
            <p>
              All intellectual property rights, including copyrights, trademarks, and other proprietary rights, in and to the website and its content—including text, graphics, logos, and service information—are owned by <strong>Purple Box Moving Company</strong>. You are granted a limited, non-exclusive, non-transferable license to access and use the website for your personal, non-commercial use only. You may not reproduce, distribute, modify, or create derivative works from any part of the website&quot;s content without our express written permission.
            </p>
          </section>

          {/* Section 3: Moving Services and Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">3. Moving Services and Responsibilities</h2>
            <p className="mb-4">
              <strong>Purple Box Moving Company</strong> provides professional moving and packing services in the NYC. Our services include local and commercial moves, packing, loading, and delivery of your belongings.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Service Scope:</strong> We will provide moving services as agreed upon in your service contract, including handling COI (Certificate of Insurance) requirements with building management.
              </li>
              <li>
                <strong>Customer Responsibilities:</strong> You are responsible for providing accurate information about your move, including inventory details, special requirements, and access information. Any changes to the scope of work may result in additional charges.
              </li>
              <li>
                <strong>Prohibited Items:</strong> We reserve the right to refuse to transport hazardous materials, perishable items, or items that may cause damage to other belongings or our equipment.
              </li>
            </ul>
          </section>

          {/* Section 4: Disclaimer of Warranties and Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">4. Disclaimer of Warranties and Limitation of Liability</h2>
            <p className="mb-4">
              While we strive to provide professional and reliable moving services, we cannot guarantee that our services will be completely free from delays, interruptions, or errors due to circumstances beyond our control, including weather conditions, traffic, building access restrictions, or other unforeseen events.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Liability Limitation:</strong> <strong>Purple Box Moving Company</strong> liability for any loss or damage to your belongings is limited to the value declared in your service contract or the actual replacement cost, whichever is less. We are not liable for items not properly declared or for damage due to improper packing by the customer.
              </li>
              <li>
                <strong>Insurance Coverage:</strong> We maintain appropriate insurance coverage for our operations. Additional insurance coverage for high-value items may be recommended and is available upon request.
              </li>
              <li>
                <strong>Force Majeure:</strong> We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, or other force majeure events.
              </li>
            </ul>
          </section>

          {/* Section 5: Data and Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">5. Data and Privacy</h2>
            <p className="mb-4">
              By requesting quotes, booking our services, or contacting <strong>Purple Box Moving Company</strong>, you agree to the collection and use of your personal data as outlined in our Privacy Policy.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Data Collection:</strong> We collect information necessary to provide moving services, including contact details, moving addresses, inventory information, and special requirements. This data is used solely for service delivery and customer communication.
              </li>
              <li>
                <strong>COI Requirements:</strong> We may share necessary information with building management to obtain Certificate of Insurance (COI) requirements for your move, as required by NYC building regulations.
              </li>
              <li>
                <strong>Data Security:</strong> We implement appropriate security measures to protect your personal information and ensure it is not shared with unauthorized third parties.
              </li>
              <li>
                <strong>Retention:</strong> We retain your data only as long as necessary to complete your move and comply with legal requirements.
              </li>
            </ul>
          </section>

          {/* Section 6: Payment and Cancellation */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">6. Payment and Cancellation</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Payment Terms:</strong> Payment terms will be specified in your service contract. We accept various payment methods as agreed upon during booking.
              </li>
              <li>
                <strong>Additional Charges:</strong> Additional charges may apply for services not included in the original quote, such as extra packing materials, additional stops, or services requested on moving day.
              </li>
              <li>
                <strong>Cancellation Policy:</strong> Cancellation terms will be specified in your service contract. Cancellation fees may apply depending on the timing of the cancellation.
              </li>
              <li>
                <strong>COI Fees:</strong> Certificate of Insurance (COI) fees are included in our service pricing and will not be charged separately.
              </li>
            </ul>
          </section>

          {/* Section 7: General Provisions */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">7. General Provisions</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Governing Law:</strong> These Terms and Conditions are governed by and construed in accordance with the laws of the <strong>United Arab Emirates</strong>.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </li>
              <li>
                <strong>Changes to Terms:</strong> We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the website or services after such changes constitutes your acceptance of the new Terms.
              </li>
              <li>
                <strong>Contact Information:</strong> For questions about these Terms and Conditions, please contact us at:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><strong>Email:</strong> ldc.co@mail.ru</li>
                  <li><strong>Phone:</strong> +1 (332)2835813‬</li>
                  <li><strong>Company:</strong> Purple Box Moving Company</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
