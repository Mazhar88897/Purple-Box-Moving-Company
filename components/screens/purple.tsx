export default function Purple() {
  return (
    <section className="w-full bg-white py-14 px-4 md:px-6 lg:px-8 mx-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-extrabold leading-tight text-[#0c1241] sm:text-4xl">
          Our simple COI process & steps
        </h2>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 items-start mt-6">
       
        <div className="md:col-span-1 text-purple-700">
        <div>
            <img src="/purple2.png" alt="COI" className="w-full h-full object-cover" />
        </div>
          <p className="mt-6 text-lg font-bold text-[#9A4CB9]">
            Our straightforward COI process will ensure that come moving day, you
            have the correct and approved COI ready to go.
          </p>
          <p className="mt-6 text-lg font-bold text-[#9A4CB9]">
            Take a look at our guide, and for any other COI questions reach out
            to our specialist team.
          </p>
          <a
            href="mailto:coi@purplebox.com"
            className="inline-block mt-8 text-md font-semibold text-[#9A4CB9] underline decoration-[#9A4CB9]/40 underline-offset-4 hover:text-[#9A4CB9]"
          >
            Ldc.co@mail.ru
          </a>
        </div>
        <div className="md:col-span-2 space-y-6">
        {/* <ol className="relative pl-6 space-y-6 "> */}

        
           
            <p className="text-[#0c1241]/90">
             <span className="text-[#9A4CB9] text-md font-bold">1.</span>  Prior to planning your move, contact your Building Management and
              confirm if they require a COI, ask if they have a template and what
              they require. You will need to contact both your move out and move
              in building management team.
            </p>
       

       

            <p className="text-[#0c1241]/90">
            <span className="text-[#9A4CB9] text-md font-bold">2.</span>  Provide the received details and any additional information to your
              Purple Box Moving Consultant or our COI Department and authorize us
              to prepare your insurance paperwork. Buildings can have their own
              preferred format for the COI and each one needs to be made out with
              specific details, like who it should be mailed to. This is the
              planning work that limits delays from corrections and changes that
              we take care of for you.
            </p>
   

              
            <p className="text-[#0c1241]/90">
            <span className="text-[#9A4CB9] text-md font-bold">3.</span>  We will ensure all requirements are met including: the minimum
              insurance value, the right timing to ensure it’s finalized well
              before your move and we double check all the details and format of
              the COI so it’s acceptable to your Building Management
              requirements.
            </p>
        

       
                         
            <p className="text-[#0c1241]/90">
            <span className="text-[#9A4CB9] text-md font-bold">4.</span> We will also send your COI via email for your own records and
              confirm it’s approved.
            </p>
    

        
          
            <p className="text-[#0c1241]/90">
            <span className="text-[#9A4CB9] text-md font-bold">5.</span> Your approved COI will insure you for any accidental building
              damage that may occur in your move, which means you are not out of
              pocket if that happens.
            </p>
       
        {/* </ol> */}
        </div>
      </div>
    </section>
  );
}


