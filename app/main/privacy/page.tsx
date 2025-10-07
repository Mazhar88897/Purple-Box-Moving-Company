import Heading from '@/components/screens/customHeading';
import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="my-12">
      <Heading
        color="black"
        heading1="Privacy"
        heading2="Policy"
        subheading="How we collect, use, and protect your personal data."
      />
      <div>
        <Component />
      </div>
    </div>
  );
};

export default PrivacyPage;

function Component() {
  return (
    <div className="mb-20 my-10 bg-white">
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div className="space-y-8 text-base font-semibold text-gray-800">
          
          {/* Last Updated */}
          <div className="text-sm text-gray-600 italic">
            <strong>Last Updated:</strong> December 2024
          </div>

          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">1. Introduction</h2>
            <p className="mb-4">
              Welcome to <strong>Purple Box Moving Company</strong>. This Privacy Policy explains how <strong>Purple Box Moving Company</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your personal data when you use our website, request moving quotes, book our services, or contact us for moving assistance.
            </p>
            <p>
              Your privacy is important to us. By using our website, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">2. Information We Collect</h2>
            <p className="mb-4">We collect the following personal data from you:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Name</strong></li>
              <li><strong>Email Address</strong></li>
              <li><strong>Phone Number</strong></li>
              <li><strong>Moving Addresses</strong> (pickup and delivery locations)</li>
              <li><strong>Moving Date and Time</strong></li>
              <li><strong>Inventory Details</strong> (items to be moved)</li>
              <li><strong>Special Requirements</strong> (fragile items, access restrictions, etc.)</li>
            </ul>
            <p>We may also collect building management contact information for COI (Certificate of Insurance) requirements.</p>
          </section>

          {/* Section 3: How We Collect Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">3. How We Collect Your Information</h2>
            <p className="mb-4">We collect your information directly from you when you:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Request a moving quote through our website or contact form.</li>
              <li>Book our moving services.</li>
              <li>Contact us directly via phone, email, or our website.</li>
              <li>Provide information for COI (Certificate of Insurance) requirements.</li>
              <li>Communicate with us about your moving needs.</li>
            </ul>
          </section>

          {/* Section 4: How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">4. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for the following purposes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>To provide accurate moving quotes and estimates for your relocation needs.</li>
              <li>To coordinate and execute your moving services, including scheduling and logistics.</li>
              <li>To handle COI (Certificate of Insurance) requirements with building management.</li>
              <li>To communicate with you about your move, including updates and confirmations.</li>
              <li>To provide customer support and address any concerns or special requirements.</li>
              <li>To improve our services and develop new offerings for our customers.</li>
              <li>To comply with legal and regulatory requirements in the UAE.</li>
            </ul>
          </section>

          {/* Section 5: Legal Basis for Processing */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">5. Our Legal Basis for Processing</h2>
            <p className="mb-4">
              Under applicable data protection laws, we must have a legal basis for processing your personal data. We rely on:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Contract Performance:</strong> To fulfill our moving service agreements with you.</li>
              <li><strong>Legitimate Interest:</strong> To provide customer support and improve our services.</li>
              <li><strong>Legal Obligation:</strong> To comply with UAE regulations and COI requirements.</li>
              <li><strong>Consent:</strong> For marketing communications (where applicable).</li>
            </ul>
            <p>
              You have the right to withdraw your consent for marketing communications at any time by contacting us.
            </p>
          </section>

          {/* Section 6: Sharing Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">6. Sharing Your Information</h2>
            <p className="mb-4">
              We are committed to keeping your personal data secure. <strong>We will never sell your data to any third party.</strong>
            </p>
            <p className="mb-4">
              We may share your information only in the following limited circumstances:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Building Management:</strong> To obtain COI (Certificate of Insurance) requirements for your move.</li>
              <li><strong>Service Providers:</strong> With trusted partners who assist in providing moving services (packing materials suppliers, insurance providers, etc.).</li>
              <li><strong>Legal Requirements:</strong> When required by UAE law or to protect our rights and safety.</li>
            </ul>
            <p>
              All third parties are required to maintain the confidentiality of your information and use it only for the specified purpose.
            </p>
          </section>

          {/* Section 7: Data Protection Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">7. Your Data Protection Rights</h2>
            <p className="mb-4">Under applicable data protection laws, you have the right to:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Rectification:</strong> Ask us to correct any inaccurate or incomplete data we hold about you.</li>
              <li><strong>Erasure:</strong> Request that we delete your personal data in certain circumstances.</li>
              <li><strong>Restrict Processing:</strong> Request that we limit how we use your data.</li>
              <li><strong>Data Portability:</strong> Ask for your data to be transferred to another organization or directly to you in a machine-readable format.</li>
              <li><strong>Object:</strong> Object to us processing your personal data in certain circumstances.</li>
            </ul>
            <p>
                To exercise any of these rights, please contact us at the email address provided in the &quot;Contact Us&quot; section below.
            </p>
          </section>

          {/* Section 8: Moving-Specific Data Handling */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">8. Moving-Specific Data Handling</h2>
            <p className="mb-4">
              As a moving company, we handle additional types of information specific to relocation services:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Inventory Lists:</strong> Details of items being moved are kept confidential and used only for service planning.</li>
              <li><strong>Building Access Information:</strong> Used solely for coordinating move logistics and COI requirements.</li>
              <li><strong>Valuation Information:</strong> For insurance purposes and service planning only.</li>
              <li><strong>Special Instructions:</strong> Fragile items, access restrictions, and other moving requirements.</li>
            </ul>
            <p>
              This information is retained only as long as necessary to complete your move and comply with legal requirements.
            </p>
          </section>

          {/* Section 9: Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">9. Data Security</h2>
            <p>
              We take reasonable and appropriate measures to protect your personal data from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          {/* Section 10: Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. Your continued use of the website after any changes signifies your acceptance of the updated policy.
            </p>
          </section>

          {/* Section 11: Contact Us */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Email:</strong> ldc.co@mail.ru</li>
              <li><strong>Phone:</strong> +1 917-353-9666</li>
              <li><strong>Company Name:</strong> Purple Box Moving Company</li>
              <li><strong>Address:</strong> DAN LUNELL CORPORATION, 418 Broadway Ste Y, Albany, NY 12207</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
