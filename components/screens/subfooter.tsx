import Link from "next/link";

type SubfooterProps = {
  imageUrl?: string; // optional, you can add later
  ctaHref?: string;
  ctaText?: string;
};

export default function Subfooter({
  imageUrl = "/purple.png",
  ctaHref = "/main/contact",
  ctaText = "GET YOUR QUOTE",
}: SubfooterProps) {
  return (
    <section className="w-full bg-[#fffeef] py-4 px-3 md:px-5 lg:px-6">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-2">
        <div className=" hidden md:block shrink-0 w-28 sm:w-40">
          <img
            src={imageUrl}
            alt="Subfooter visual"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className=" text-center md:text-left">
          <p className="text-xs sm:text-sm font-semibold text-[#0c1241]/80">
            Just what you were looking for?
          </p>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0c1241] tracking-tight">
            MAKE YOUR MOVE!
          </h3>
        </div>

        <div className="shrink-0">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-[#38004e] px-5 py-2.5 text-white text-xs sm:text-sm font-extrabold shadow-sm hover:bg-[#9A4CB9]/90 transition-colors"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}


