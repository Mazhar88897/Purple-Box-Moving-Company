import React from 'react';
import Image from 'next/image';

const PackingService = () => {
  const services = [
    {
      id: 1,
      title: "24/7/365 Moving",
      description: "The only moving company in NYC that offers any day and time moving services. No matter how big or small your move is we will move it.",
      icon: "/i-clock.png", // Placeholder for calendar icon
      link: "#"
    },
    {
      id: 2,
      title: "Local Residential Moving Services",
      description: "We specialize in local residential NYC and New York State moves. We can move you across all of New York City's Five Boroughs and surrounding Tri State locations.",
      icon: "/i-world.png", // Placeholder for map icon
      link: "#"
    },
    {
      id: 3,
      title: "Long Distance Moving Services",
      description: "From NYC to Miami, California and Seattle we can move you to any state in the USA. With on time long distance delivery dates and safe packing we will get you settled into your new home quickly.",
      icon: "/i-ballon.png", // Placeholder for USA map icon
      link: "#"
    },
    {
      id: 4,
      title: "Office and Commercial Moves",
      description: "We can move your office overnight, on the weekend and during holidays to minimize your downtime. With full office packing and unpacking, your staff will be up and running the next morning.",
      icon: "/i-home.png", // Placeholder for office buildings icon
      link: "#"
    },
    {
      id: 5,
      title: "Small Moves",
      description: "Need to move a few small items or moving out of a studio with minimal furniture? Do not lift a finger with our small move service.",
      icon: "/icon-boxlogo.png", // Placeholder for sofa icon
      link: "#"
    },
    {
      id: 6,
      title: "Last Minute Moves",
      description: "Need to move urgently, our last minute moving service will save the day. We will get you into your new address asap! We also offer emergency packing and storage services.",
      icon: "/i-box.png", // Placeholder for hourglass icon
      link: "#"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className=" mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Keep <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">moving forward</span> with our complete moving services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Whatever you need to move from point A to B, we will get it there safely.
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

export default PackingService;
