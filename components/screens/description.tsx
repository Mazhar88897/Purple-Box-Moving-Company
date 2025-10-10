import React from 'react';

const Description = () => {
  return (
    <section className="bg-white py-16 px-4 mx-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Section 1: Image left, text right */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative w-full md:w-3/4">
            <div className="relative z-10 overflow-hidden rounded-xl">
              <img
                src="/purple5.jpg"
                alt="Team member working on laptop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0c1241] sm:text-4xl">
              We Handle All Your Moving COI Needs
            </h2>
            <div className="mt-5 space-y-4 text-[15px] text-xs leading-7 text-slate-600">
              <p>
                At <span className="font-semibold">Purple Box Moving Company</span>, we know UAE moves—especially in
                apartments, offices, and towers—come with strict building rules. We handle all
                <span className="font-semibold"> COI </span>requirements for you so your move stays smooth, compliant, and
                stress‑free.
              </p>
              <p>
                As a <span className="font-semibold">fully insured</span> mover, we routinely coordinate COIs for homes and
                offices. Complex access or insurance policies? We manage the paperwork quickly
                and correctly.
              </p>
              <p>
                Your <span className="font-semibold">COI is included</span> in our pricing. After booking, we send a simple
                request form for your building. Once they respond, our team issues the
                certificate and sends it to you and management—ready before moving day.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Text left, image right */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-extrabold leading-tight text-[#0c1241] sm:text-3xl">
              What is a Certificate of Insurance (COI) and Why It Matters
            </h3>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-slate-600">
              <p>
                A <span className="font-semibold">Certificate of Insurance (COI)</span> confirms your mover has valid
                insurance. Many buildings require it to protect their property during moves.
              </p>
              <p>
                If you’re moving in a managed apartment, villa community, or office, a COI may be
                needed before booking elevators or a time slot. It prevents delays and protects
                both you and the building.
              </p>
              <p>
                At Purple Box, the COI process is <span className="font-semibold">quick and fully handled</span> so you can focus
                on moving in while we manage the formalities with care.
              </p>
            </div>
          </div>

           <div className="relative w-full md:w-3/4">
            <div className="relative z-10 overflow-hidden rounded-xl">
              <img
                src="/purple 4.jpg"
                alt="Team member working on laptop"
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

export default Description;
