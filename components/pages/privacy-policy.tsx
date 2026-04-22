"use client";

export function PrivacyPolicy() {
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
        Privacy Policy
      </h1>

      <p className="text-[11px] text-[#F2D08C] mb-1">
        Last updated: April 21, 2026
      </p>

      <p className="text-[13px] leading-[23px] text-white font-[400] mb-4">
        Numina respects your privacy. This Privacy Policy explains what information may be collected, how it is used, and how it is protected.
      </p>

      <div className="space-y-4 text-white">
        <Section num="1" title="Information We Collect">
          We may collect:
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>account information such as name and email address</li>
            <li>responses provided in tests, modules, and reflective prompts</li>
            <li>generated reports and synthesis outputs linked to your account</li>
            <li>technical and usage information such as browser/device data, log data, and interaction data</li>
            <li>billing-related information processed by payment providers, where applicable</li>
          </ul>
        </Section>

        <Section num="2" title="How We Use Information">
          We use information to:
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>create and manage accounts</li>
            <li>generate personalized results and synthesis</li>
            <li>deliver purchased digital products</li>
            <li>improve product performance and user experience</li>
            <li>provide customer support</li>
            <li>monitor service reliability, usage, and security</li>
            <li>send essential account or service-related communications</li>
          </ul>
        </Section>

        <Section num="3" title="Payments">
          Payments may be processed by third-party providers. Numina does not store full payment card details on its own servers.
        </Section>

        <Section num="4" title="Analytics and Improvement">
          Numina may use analytics and usage data to understand product performance, improve user journeys, and identify technical issues.
        </Section>

        <Section num="5" title="Data Sharing">
          Numina does not sell personal data. Limited data may be shared with trusted service providers that help operate the service, such as hosting, analytics, authentication, email, and payment providers, only where needed to provide the service.
        </Section>

        <Section num="6" title="Data Retention">
          Personal data is retained only for as long as reasonably necessary to operate the service, provide purchased access, comply with legal obligations, resolve disputes, and improve the product.
        </Section>

        <Section num="7" title="Your Rights">
          Depending on applicable law, you may have rights to request access, correction, deletion, or restriction of your personal data. Requests can be made using the contact email below.
        </Section>

        <Section num="8" title="Security">
          Numina takes reasonable technical and organizational measures to protect data. However, no online system can guarantee absolute security.
        </Section>

        <Section num="9" title="Changes to This Policy">
          This Privacy Policy may be updated from time to time. Continued use of Numina after updates means you accept the revised version.
        </Section>

        <Section num="10" title="Contact">
          For privacy-related questions or requests, contact: <a href="mailto:numina@numinaapp.com" className="text-[#F2D08C] underline">numina@numinaapp.com</a>.
        </Section>
      </div>
    </div>
  );
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[13px] font-[700] leading-[23px]">
        {num}. {title}
      </h2>
      <div className="text-[13px] font-[300] leading-[23px]">
        {children}
      </div>
    </div>
  );
}
