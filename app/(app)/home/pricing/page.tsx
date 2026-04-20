import Link from "next/link";

export const metadata = {
  title: "Pricing – Numina",
  description: "Numina pricing plans — Free, Premium Report, and Pro Subscription.",
};

export default function PricingPage() {
  return (
    <div
      style={{ fontFamily: "var(--font-gotham)" }}
      className="flex flex-col w-full  px-[28px]"
    >

      {/* Header */}
      <h1
        className="text-white text-[28px] font-bold mb-2"
        style={{ lineHeight: "36px" }}
      >
        Pricing
      </h1>
      <p className="text-[#FFFFFF80] text-[13px] mb-10" style={{ lineHeight: "20px" }}>
        Choose the plan that fits your journey.
      </p>

      {/* Plans */}
      <div className="space-y-4 mb-10">
        <PlanCard
          name="Free Plan"
          price="Free"
          description="Basic personality insights to get you started."
        />
        <PlanCard
          name="Premium Report"
          price="$9.99"
          priceSuffix="one-time"
          description="A full, personalised report covering your complete personality blueprint."
          highlighted
        />
        <PlanCard
          name="Pro Subscription"
          price="$4.99"
          priceSuffix="/month"
          description="Monthly access to advanced insights, synthesis updates, and new features as they launch."
        />
      </div>

      {/* Fine print */}
      <p className="text-[#FFFFFF50] text-[11px] text-center" style={{ lineHeight: "18px" }}>
        Prices are in USD. Subscriptions renew automatically and can be cancelled anytime.
      </p>
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
  description: string;
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
            <span className="text-[#FFFFFF60] text-[12px]">{priceSuffix}</span>
          )}
        </span>
      </div>
      <p className="text-[#FFFFFF80] text-[13px]" style={{ lineHeight: "20px" }}>
        {description}
      </p>
    </div>
  );
}
