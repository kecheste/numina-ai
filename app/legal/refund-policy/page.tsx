import Link from "next/link";

export const metadata = {
  title: "Refund Policy – Numina",
  description: "Numina refund policy for digital products and personalized reports.",
};

export default function RefundPolicyPage() {
  return (
    <div
      style={{ fontFamily: "var(--font-gotham)" }}
      className="flex flex-col w-full px-[28px] text-left pb-20"
    >
      <h1
        className="text-white text-[28px] font-bold mb-2 text-center"
        style={{ lineHeight: "36px" }}
      >
        Refund Policy
      </h1>
      <p className="text-[#FFFFFF80] text-[13px] mb-10 text-center" style={{ lineHeight: "20px" }}>
        Last updated: April 21, 2026
      </p>

      <div className="space-y-8">
        <Section>
          Numina offers digital products and personalized reports.
          Because the Premium Full Synthesis is a digital product delivered electronically, purchases are generally non-refundable once access has been provided, except in the situations described below.
        </Section>

        <Section title="1. Refunds May Be Considered If:">
          <ul className="mt-3 space-y-2">
            <BulletItem>a duplicate purchase was made</BulletItem>
            <BulletItem>a technical issue prevented access to the purchased product</BulletItem>
            <BulletItem>delivery failed because of a verified product-side problem</BulletItem>
            <BulletItem>an accidental charge is reported shortly after purchase</BulletItem>
          </ul>
        </Section>

        <Section title="2. Refunds Will Generally Not Be Given For:">
          <ul className="mt-3 space-y-2">
            <BulletItem>change of mind after access has been provided</BulletItem>
            <BulletItem>dissatisfaction based only on personal interpretation of reflective or spiritual-style content</BulletItem>
            <BulletItem>failure to review the product description before purchase</BulletItem>
            <BulletItem>issues caused by unsupported devices, local connection problems, or misuse of the service</BulletItem>
          </ul>
        </Section>

        <Section title="3. Request Window">
          Refund requests should be submitted within 7 days of purchase.
        </Section>

        <Section title="4. How to Request a Refund">
          To request a refund, contact:{" "}
          <a
            href="mailto:numina@numinaapp.com"
            className="text-[#F2D08C] underline underline-offset-2"
          >
            numina@numinaapp.com
          </a>
          <br /><br />
          Please include:
          <ul className="mt-3 space-y-1">
            <BulletItem>the email used for purchase</BulletItem>
            <BulletItem>date of purchase</BulletItem>
            <BulletItem>brief description of the issue</BulletItem>
          </ul>
        </Section>

        <Section title="5. Review Process">
          Each request is reviewed individually. If approved, the refund will be processed back to the original payment method where possible.
        </Section>

        <div className="border-t border-[#FFFFFF15] pt-6">
          <p className="text-[#FFFFFF40] text-[11px]" style={{ lineHeight: "18px" }}>
            By making a purchase on Numina you acknowledge and agree to this refund policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {title && (
        <h2
          className="text-[#F2D08C] text-[15px] font-semibold mb-3"
          style={{ lineHeight: "22px" }}
        >
          {title}
        </h2>
      )}
      <div className="text-[#FFFFFF80] text-[14px]" style={{ lineHeight: "24px" }}>
        {children}
      </div>
    </div>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[#FFFFFF80] text-[14px]" style={{ lineHeight: "22px" }}>
      <span className="text-[#F2D08C] mt-[3px] shrink-0">—</span>
      <span>{children}</span>
    </li>
  );
}
