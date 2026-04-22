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
        Last updated: April 21, 2026
      </p>

      <p className="text-[13px] leading-[23px] text-white font-[400] mb-4">
        Welcome to Numina. These Terms & Conditions govern your access to and use of the Numina website and services.
        By accessing or using Numina, you agree to these Terms. If you do not agree, please do not use the website or services.
      </p>

      <div className="space-y-4 text-white">
        <Section num="1" title="About the Service">
          Numina provides digital self-discovery content, personalized reports, and reflective guidance for personal use only.
        </Section>

        <Section num="2" title="Eligibility">
          By using Numina, you confirm that you are legally able to agree to these Terms and that the information you provide is accurate.
        </Section>

        <Section num="3" title="Purchases">
          Numina may offer free preview content and paid digital products. At this stage, the paid offering is: **Premium Full Synthesis — $9.99 one-time**. All prices are shown in USD unless otherwise stated.
        </Section>

        <Section num="4" title="Digital Delivery">
          Paid products are delivered digitally through the Numina website/app after successful purchase and access to the required product flow.
        </Section>

        <Section num="5" title="Refunds">
          Refunds are handled according to the Refund Policy. By purchasing through Numina, you agree to that policy.
        </Section>

        <Section num="6" title="Acceptable Use">
          You agree not to misuse the service, interfere with its operation, attempt unauthorized access, copy protected content, or use the platform for unlawful purposes.
        </Section>

        <Section num="7" title="Intel Property">
          All content on Numina, including branding, visuals, text, reports, interfaces, and software, is owned by or licensed to Numina and may not be copied, resold, distributed, or exploited without prior written permission.
        </Section>

        <Section num="8" title="Informational Nature of the Service">
          Numina provides reflective, personal, and spiritual-style guidance for informational purposes only. It is not medical, psychological, legal, financial, or therapeutic advice and should not be treated as a substitute for professional services.
        </Section>

        <Section num="9" title="Suspension or Termination">
          Numina reserves the right to suspend or terminate access where there is misuse, abuse, fraud, or violation of these Terms.
        </Section>

        <Section num="10" title="Changes">
          Numina may update the service, pricing, features, or these Terms from time to time. Continued use of the service after updates means you accept the revised Terms.
        </Section>

        <Section num="11" title="Contact">
          For questions about these Terms, contact: <a href="mailto:numina@numinaapp.com" className="text-[#F2D08C] underline">numina@numinaapp.com</a>.
          <br /><br />
          Operator details: Numina is operated by a sole trader in Georgia. Full legal details are available on request where required for billing or compliance purposes.
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
