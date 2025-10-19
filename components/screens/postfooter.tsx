import Link from "next/link";

export default function postfooter() {
  return (
    <footer className="w-full bg-[#38004e] text-white">
      <div className="mx-auto max-w-6xl px-3 md:px-5 lg:px-6 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left: Logo truck + legal */}
          <div className="flex-1">
            <div className="w-36 sm:w-44">
              <img src="/box.png" alt="Company truck" className="w-full h-auto object-contain" />
            </div>
            <p className="mt-4 text-sm text-white/80">
              © 2025 purple box moving Moving & Storage.
              <br />
              All Rights Reserved.
            </p>
            <p className="mt-3 text-sm text-white/80">
              USDOT: 3066988
              <br />
              ICC MC: 58659
            </p>
          </div>

          {/* Middle: Address, phone, email */}
          <div className="flex-[1.2]">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                {/* building icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white/90 shrink-0 mt-0.5"><path d="M3 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5h4a2 2 0 0 1 2 2v9h-6v-4H9v4H3Zm6-8h4V5H5v16h2v-4h2v-4Z"/></svg>
                <p className="text-sm md:text-base leading-relaxed">
                  <span className="font-semibold">405 Lexington Ave, Suite 740,</span>
                  <br />
                  New York, NY 10174
                </p>
              </li>
              <li className="flex items-center gap-3">
                {/* phone icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white/90 shrink-0"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C11.85 22 2 12.15 2 1a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1c0 1.27.2 2.47.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2Z"/></svg>
                <Link href="tel:+12126517273" className="text-sm md:text-base hover:underline">
                  (212) 651 7273
                </Link>
              </li>
              <li className="flex items-center gap-3">
                {/* mail icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white/90 shrink-0"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
                <Link href="mailto:sales@mypieceofcakemove.com" className="text-sm md:text-base hover:underline break-all">
                  sales@mypieceofcakemove.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Links */}
          <div className="flex-1 md:text-right">
            <ul className="space-y-4 text-sm md:text-base">
              <li>
                <Link href="/main/terms" className="hover:underline">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="/main/privacy" className="hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">Website Accessibility</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

