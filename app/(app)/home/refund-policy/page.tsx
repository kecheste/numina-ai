import Link from "next/link";

export const metadata = {
  title: "Refund Policy – Numina",
  description: "Numina refund policy for digital products and personalised reports.",
};

export default function RefundPolicyPage() {
  return (
    <div
      style={{ fontFamily: "var(--font-gotham)" }}
      className="flex flex-col w-full px-[28px] text-left"
    >
      <h1
        className="text-white text-[28px] font-bold mb-2 text-center"
        style={{ lineHeight: "36px" }}
      >
        Refund Policy
      </h1>
      <p className="text-[#FFFFFF80] text-[13px] mb-10 text-center" style={{ lineHeight: "20px" }}>
        Last updated: April 2025
      </p>

      <div className="space-y-8">
        <Section>
          Numina offers digital products and personalised reports. Due to the
          digital nature of our services, all purchases are{" "}
          <strong className="text-white">generally non-refundable</strong>.
        </Section>

        <Section title="Exceptions">
          Refunds may be granted within{" "}
          <strong className="text-[#F2D08C]">7 days of purchase</strong> in the
          following cases:
          <ul className="mt-3 space-y-2">
            <BulletItem>Technical issues preventing access to a purchased product</BulletItem>
            <BulletItem>Duplicate purchases</BulletItem>
          </ul>
        </Section>

        <Section title="How to Request a Refund">
          To request a refund, please contact us at{" "}
          <a
            href="mailto:contact@numinaapp.com"
            className="text-[#F2D08C] underline underline-offset-2"
          >
            contact@numinaapp.com
          </a>{" "}
          with your order details. We review each request individually and aim
          to respond within 3–5 business days.
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
      <p className="text-[#FFFFFF80] text-[14px]" style={{ lineHeight: "24px" }}>
        {children}
      </p>
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
