"use client";

export function ContactSupport() {
  return (
    <div
      style={{
        fontFamily: "var(--font-montserrat)",
      }}
      className="w-full text-left pb-24 text-[#F8F8F8]"
    >
      <h1
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "33px",
        }}
        className="text-[21px] font-[400] text-center mb-2"
      >
        Contact
      </h1>
      
      <p className="text-[11px] text-[#F2D08C] mb-6 text-center">
        Last updated: April 21, 2026
      </p>

      <div className="space-y-4 text-[14px] leading-[23px] font-[400] text-white/80">
        <p>For questions about Numina, purchases, access, or support, contact:</p>

        <p>
          <a 
            href="mailto:numina@numinaapp.com" 
            className="text-[#F2D08C] font-semibold underline underline-offset-4"
          >
            numina@numinaapp.com
          </a>
        </p>

        <p className="pt-4 text-[13px] text-white/50">
          We aim to respond within a reasonable time.
        </p>
      </div>
    </div>
  );
}
