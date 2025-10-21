import React from 'react';
import Image from 'next/image';

const SecondService = () => {
  const services = [
    {
      id: 1,
      title: "Professional Piano Moving",
      description: "Specialized relocation services for all piano types including upright, grand, and baby grand pianos. Our expert team uses specialized equipment and techniques to ensure your precious instrument arrives safely at its destination.",
      icon: "/piano.png",
      link: "#"
    },
    {
      id: 2,
      title: "Complete Packing Solutions",
      description: "Full-service packing from single rooms to entire homes. Our experienced team handles everything from fragile items to bulky furniture with professional-grade materials and techniques.",
      icon: "/i-sofa.png",
      link: "#"
    },
    {
      id: 3,
      title: "White-Glove Unpacking Service",
      description: "Premium unpacking and setup service that goes beyond just moving. We'll carefully unpack your belongings and arrange them in your new home exactly as you envision, saving you time and stress.",
      icon: "/i-gloves.png",
      link: "#"
    },
    {
      id: 4,
      title: "Eco-Friendly Moving Bins",
      description: "Sustainable moving solution with reusable plastic bins delivered to your door. After your move, we collect and sanitize the bins for future use, eliminating cardboard waste and environmental impact.",
      icon: "/i-stuff.png",
      link: "#"
    },
    {
      id: 5,
      title: "Time Sensitive Moves",
      description: "Convenient delivery of all your moving essentials including boxes, tape, bubble wrap, and protective materials. Custom packages tailored to your specific moving needs delivered right to your door.",
      icon: "/i-calender.png",
      link: "#"
    },
    {
      id: 6,
      title: "Valuable Items Protection",
      description: "Specialized handling for antiques, artwork, and high-value items. Our team provides custom crating, museum-quality wrapping, and secure transport to protect your most precious possessions.",
      icon: "/i-piano.png",
      link: "#"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className=" mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">packing & moving</span> services tailored to your needs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            From specialized piano moves to eco-friendly solutions, we provide comprehensive moving services with attention to every detail.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 ">
              {/* Icon */}
              <div className="mb-3 flex r">
                <div className="w-20 object-cover flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    // width={80}
                    // height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 test-sm mb-6 leading-relaxed text-left">
                {service.description}
              </p>

              {/* Learn More Link */}
          
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondService;
