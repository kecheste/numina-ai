"use client";

export function TermsAndConditions() {
  return (
    <div
      style={{
        fontFamily: "var(--font-montserrat)",
      }}
      className="w-full text-left pb-24"
    >
      <h1
        style={{
          fontFamily: "var(--font-gotham)",
          lineHeight: "33px",
        }}
        className="text-[21px] font-[400] text-center text-white mb-4"
      >
        Terms & Conditions
      </h1>

      <p className="text-[11px] text-[#F2D08C] mb-1">
        Last updated: [Month] [Day], [Year]
      </p>

      <p className="text-[13px] leading-[23px] text-white font-[400] mb-4">
        Welcome to NuminaAI. By accessing or using our app, you agree to be
        bound by these Terms and Conditions. If you do not agree, please do not
        use the app.
      </p>

      <div className="space-y-4 text-white">
        <div>
          <h2 className="text-[13px] font-[700] leading-[23px]">
            1. Use of the App
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            You agree to use the app for personal, non-commercial purposes only.
            Misuse, hacking, or unauthorized access is prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px]">
            2. Intellectual Property
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            All content, including visuals, text, and software, is owned by
            NuminaAI or licensed to us. You may not reproduce or redistribute
            content without permission.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px]">
            3. Subscription & Billing
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            Premium access is billed monthly. You may cancel at any time via
            your profile. No partial refunds are given for unused time.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px]">
            4. Limitations of Insight
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            Our app provides reflective guidance and does not replace
            professional medical, psychological, or legal advice.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px]">
            5. Termination
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            We reserve the right to suspend or terminate accounts for violating
            these terms.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px]">
            6. Changes to Terms
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            We may update these Terms periodically. Continued use of the app
            implies acceptance of the updated terms.
          </p>
        </div>
      </div>

      <p className="text-[13px] leading-[23px] text-white font-[400] mt-6">
        For any questions, contact: support@numina.ai
      </p>
    </div>
  );
}
