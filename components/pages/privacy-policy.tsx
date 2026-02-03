"use client";

export function PrivacyPolicy() {
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
        className="text-[21px] font-[400] text-center mb-4"
      >
        Privacy Policy
      </h1>

      <p className="text-[11px] mb-1">Last updated: [Month] [Day], [Year]</p>

      <p className="text-[13px] leading-[23px] font-[400] mb-4">
        Your privacy matters to us. This policy explains how we collect, use,
        and protect your personal data.
      </p>

      <div className="space-y-4">
        <div>
          <h2 className="text-[13px] font-[700] leading-[23px] mb-1">
            1. Data Collection
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            We collect basic personal info (name, birth data, device ID) to
            provide accurate insights.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px] mb-1">
            2. Use of Data
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            Your data is used strictly to generate your results and improve your
            experience. We do not sell your data.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px] mb-1">
            3. Third-Party Services
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            We may use secure third-party tools (e.g. payment processors,
            analytics) under strict confidentiality.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px] mb-1">
            4. Security
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            We use encryption and best practices to keep your data safe.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px] mb-1">
            5. Data Deletion
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            You may request deletion of your data at any time via
            support@numina.ai.
          </p>
        </div>

        <div>
          <h2 className="text-[13px] font-[700] leading-[23px] mb-1">
            6. Changes to Policy
          </h2>
          <p className="text-[13px] font-[300] leading-[23px]">
            Any updates will be posted here. Continued use of the app means you
            accept the current version.
          </p>
        </div>
      </div>
    </div>
  );
}
