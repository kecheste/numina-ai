import Link from "next/link";

export const metadata = {
  title: "Pricing – Numina",
  description:
    "Numina pricing — choose between our Free Preview and the Premium Full Synthesis report.",
};

export default function PricingPage() {
  return (
    <div
      style={{ fontFamily: "var(--font-gotham)" }}
      className="flex flex-col w-full px-[28px] pb-20"
    >
      {/* Header */}
      <h1
        className="text-white text-[28px] font-bold mb-2"
        style={{ lineHeight: "36px" }}
      >
        Pricing
      </h1>
      <p
        className="text-[#FFFFFF80] text-[13px] mb-10"
        style={{ lineHeight: "20px" }}
      >
        Choose the option that fits your journey.
      </p>

      {/* Plans */}
      <div className="space-y-4 mb-4">
        <PlanCard
          name="Free Preview"
          price="Free"
          description={
            <div className="space-y-3">
              <p>
                Start with a guided preview of your personality and spiritual
                profile.
              </p>
              <div className="text-left">
                <p className="font-semibold mb-1 text-[#FFFFFF]">Includes:</p>
                <ul className="list-disc list-inside space-y-1 text-[12px]">
                  <li>a preview of your Soul Map</li>
                  <li>personality and strengths highlights</li>
                  <li>astrological and numerological highlights</li>
                  <li>chakra and energetic alignment insights</li>
                </ul>
              </div>
            </div>
          }
        />
        <PlanCard
          name="Premium Full Synthesis"
          price="$9.99"
          priceSuffix="one-time"
          highlighted
          description={
            <div className="space-y-3">
              <p>Unlock your full personalized synthesis report.</p>
              <div className="text-left">
                <p className="font-semibold mb-1 text-[#FFFFFF]">Includes:</p>
                <ul className="list-disc list-inside space-y-1 text-[12px]">
                  <li>your complete AI-generated synthesis</li>
                  <li>integrated insights across all completed modules</li>
                  <li>core identity, strengths, patterns, and challenges</li>
                  <li>psychological and spiritual insights in one report</li>
                  <li>
                    practical guidance to help you better understand yourself
                  </li>
                </ul>
              </div>
              <p className="text-[11px] text-[#F2D08C] italic">
                Important: this is a one-time digital purchase.
              </p>
            </div>
          }
        />
      </div>

      <div className="mt-10 pt-10 border-t border-white/10">
        <h2 className="text-white text-[20px] font-bold mb-4">Questions?</h2>
        <p className="text-[#FFFFFF80] text-[13px] mb-2">
          For pricing or access questions, contact:
        </p>
        <a
          href="mailto:numina@numinaapp.com"
          className="text-[#F2D08C] text-[14px] font-semibold underline"
        >
          numina@numinaapp.com
        </a>
      </div>
    </div>
  );
}

function PlanCard({
  name,
  price,
  priceSuffix,
  description,
  highlighted = false,
}: {
  name: string;
  price: string;
  priceSuffix?: string;
  description: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-[14px] border p-5 flex flex-col gap-2 ${
        highlighted
          ? "border-[#F2D08C] bg-[#F2D08C14]"
          : "border-[#FFFFFF20] bg-[#FFFFFF08]"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={`text-[16px] font-semibold ${
            highlighted ? "text-[#F2D08C]" : "text-white"
          }`}
          style={{ lineHeight: "24px" }}
        >
          {name}
        </span>
        <span className="flex items-baseline gap-0.5 shrink-0">
          <span
            className={`text-[20px] font-bold ${
              highlighted ? "text-[#F2D08C]" : "text-white"
            }`}
          >
            {price}
          </span>
          {priceSuffix && (
            <span className="text-[#FFFFFF60] text-[12px] ml-1">
              {priceSuffix}
            </span>
          )}
        </span>
      </div>
      <div
        className="text-[#FFFFFF80] text-[13px]"
        style={{ lineHeight: "20px" }}
      >
        {description}
      </div>
    </div>
  );
}
