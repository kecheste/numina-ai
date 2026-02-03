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
        className="text-[21px] font-[400] text-center mb-6"
      >
        Contact Support
      </h1>

      <div className="space-y-1 text-[13px] leading-[23px] font-[400]">
        <p>Need help? We’re here for you.</p>

        <p>📩 Email: support@numina.ai</p>

        <p>⏰ Hours: Mon–Fri, 10:00–18:00 GMT+4</p>

        <p>📄 For FAQs, visit the Help section</p>
      </div>
    </div>
  );
}
