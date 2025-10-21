import React from 'react';

const SpecialService = () => {
  return (
    <section className="bg-white py-16 px-4 mx-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Purple Box
              </span>
              <br />
              <span className="text-[#0c1241]">
                Everyone Favorite Mover
              </span>
            </h2>
            <p className="text-md font-semibold text-gray-600 mb-6 leading-relaxed">
              Meet Purple Box, everyone favorite mover with an infectious smile and a can-do attitude. 
              A true NYC mover, always on the move, rolling with whatever life brings and ready to lend a hand 
              (or wheel) on your next moving day.
            </p>
            <p className="text-md text-gray-600">
              Follow Purple Box adventures{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold underline decoration-2 underline-offset-4">
                @purpleboxmoving
              </span>
            </p>
          </div>

          {/* Video/Image Content */}
          <div className="relative">
          <div className="relative w-full md:w-3/4">
            <div className="relative z-10 overflow-hidden rounded-xl">
              <img
                src="/pic2.png"
                alt="Storage service"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
          </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialService;
