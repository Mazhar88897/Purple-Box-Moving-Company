import React from 'react';

const Strip = () => {
  return (
    <section className="bg-purple-800 py-8 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-40 ">
             <img src="/purple.png" alt="Strip" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              YOUR MOVE <span className="text-[#38004e]">MATTERS</span>
            </h2>
            <p className="text-white text-sm md:text-base max-w-2xl mx-auto">
 We offer a wide range of services, including packing, loading, transportation, unloading, and unpacking. We are committed to providing our clients with the highest level of service and satisfaction.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <button
            className="inline-flex items-center justify-center rounded-md bg-[#38004e] px-5 py-2.5 text-white text-xs sm:text-sm font-extrabold shadow-sm hover:bg-[#9A4CB9]/90 transition-colors">
            LEARN MORE
            
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Strip;
