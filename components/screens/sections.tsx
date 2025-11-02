import React from 'react';

const Sections = () => {
  return (
    <section className="bg-white py-16 px-4 mx-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Section 1: Image left, text right */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative w-full md:w-3/4">
            <div className="relative z-10 overflow-hidden rounded-xl">
              <img
                src="/777.png"
                alt="Storage service"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0c1241] sm:text-4xl">
              Make space with our flexible short and long term <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">storage</span>
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#0c1241]">
              <p>
                We will pick up your items from your doorstep and deliver them to our secure storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you.
              </p>
            </div>
            <button className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors flex items-center gap-2">
              GET A STORAGE QUOTE
            </button>
          </div>
        </div>

        {/* Section 2: Text left, image right */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-extrabold leading-tight text-[#0c1241] sm:text-4xl">
              Put your feet up with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">complete packing experience</span>
            </h3>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#0c1241]">
              <p>
                We can pack your whole home, a few boxes or your most valuable items. Our packing methods and the high-quality packing materials we use are matched specifically to each of your items.
              </p>
            </div>
          </div>

           <div className="relative w-full md:w-3/4">
            <div className="relative z-10 overflow-hidden rounded-xl">
              <img
                src="/666.png"
                alt="Packing service"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Sections;
