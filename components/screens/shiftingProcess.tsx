"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function COIFAQ() {
  const [openAccordions, setOpenAccordions] = useState<number[]>([])

  // Merge a single list of FAQ items
  const faqs = [
    {
      title: "Q1. What is a Certificate of Insurance (COI)?",
      description:
        "A COI is issued by our insurer confirming Purple Box Moving Company is fully insured. It protects you and building management from liabilities during your move.",
    },
    {
      title: "Q2. Do I need a COI for my move?",
      description:
        "If you’re moving into/out of an apartment, office tower, or managed community, your building will likely require a COI before approving the schedule.",
    },
    {
      title: "Q3. Is the COI included in your moving cost?",
      description:
        "Yes. Your COI is included in our flat‑rate moving fee—no hidden charges for obtaining or submitting it.",
    },
    {
      title: "Q4. How do I request a COI for my building?",
      description:
        "After booking, we send a simple COI Request form. Share it with building management and forward their response—our team sends the final certificate to you and them.",
    },
    {
      title: "Q5. How long does it take to get the COI?",
      description:
        "In most cases, we issue and deliver your COI within 24 hours after we receive the required details from building management.",
    },
   
  ]

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section className="px-6 py-10 mx-4">
        <div className="mx-auto max-w-5xl overflow-visible">
        {/* Hero image with pink underline accent */}
        <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="z-10">
            <h2 className="text-3xl font-extrabold leading-tight text-[#0c1241] sm:text-4xl">
            Our flat fee pricing means no hidden surprises, ever.
            </h2>
            {/* <div className="mt-5 space-y-4 text-[15px] text-xs leading-7 text-slate-600">
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
            </div> */}
          </div>
          <div className="relative w-full md:w-3/4 =">
            <div className="relative z-10 overflow-hidden rounded-xl">
              <img
                src="/pic4.png"
                alt="Team member working on laptop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
          </div>

         
        </div>

        {/* Heading and intro */}
       

        {/* FAQ list */}

    <div     className="grid items-center gap-10 md:grid-cols-3 mt-10">
        <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold leading-tight text-purple-700">
            We offer a guaranteed, all-inclusive flat fee, locked in before your move day. Which means the duration of your move will not impact your move price. We always include the following services at no extra charge to you.
            </h2>
        </div>
        
        <div className="my-20 md:col-span-2 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="flex w-full items-center justify-between border-b border-gray-900 pb-3 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-md font-bold text-[#00003f]">{faq.title}</span>
                {openAccordions.includes(index) ? (
                  <ArrowDownRight className="h-5 w-5 text-purple-700 transition-transform duration-200 scale-x-[-1]" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-gray-600 transition-transform duration-200" />
                )}
              </button>
              <div
                className={`my-2 overflow-hidden text-gray-600 transition-all duration-300 ${
                  openAccordions.includes(index) ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="py-2 text-sm font-semibold">{faq.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  )
}

