import React from 'react';

const Insta = () => {
  return (
    <section className="bg-[#fffeef] py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex  gap-6">
          {/* Instagram Logo */}
          <div className="w-14 h-14 flex items-center justify-center">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="3" className="text-[#38004e]"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="3" className="text-[#38004e]"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" className="text-[#38004e]"/>
            </svg>
          </div>
          
          {/* Text */}
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl  font-bold text-[#0c1241] mb-2">
              Happy Customers, Happy Life
            </h2>
            <p className="text-sm md:text-md text-[#0c1241]">
              <span className="text-[#38004e] font-bold underline decoration-2 underline-offset-4">
                Follow us
              </span>
              <span className="font-medium">
                {' '}on Instagram for Promo Codes and News
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insta;
