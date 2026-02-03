"use client";

export function FrequentlyAskedQuestions() {
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
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-[13px] font-[200] leading-[23px]">
            ❓ Frequently Asked Questions
          </p>
          <p className="text-[13px] font-[700] leading-[23px]">
            Q: What is NuminaAI?
          </p>
          <p className="text-[13px] font-[300] leading-[23px]">
            A: NuminaAI is a personal insight tool that blends astrology,
            psychology, energy systems, and AI to generate personalized soul
            profiles and self-discovery guidance.
          </p>
        </div>

        <div>
          <p className="text-[13px] font-[700] leading-[23px]">
            Q: Is it accurate?
          </p>
          <p className="text-[13px] font-[300] leading-[23px]">
            A: While our AI combines tested systems like MBTI, numerology, and
            astrology, it's meant for reflection and exploration — not
            scientific or medical diagnosis.
          </p>
        </div>

        <div>
          <p className="text-[13px] font-[700] leading-[23px]">
            Q: How do I unlock all features?
          </p>
          <p className="text-[13px] font-[300] leading-[23px]">
            A: You can upgrade to Premium anytime through the app to unlock all
            16 tests, full synthesis, deeper insights, and new features as
            they’re released.
          </p>
        </div>

        <div>
          <p className="text-[13px] font-[700] leading-[23px]">
            Q: What data do I need to enter?
          </p>
          <p className="text-[13px] font-[300] leading-[23px]">
            A: Your name, birth date, time, and location. These are used only
            for generating your personalized astrology and numerology insights.
          </p>
        </div>

        <div>
          <p className="text-[13px] font-[700] leading-[23px]">
            Q: Can I delete my data?
          </p>
          <p className="text-[13px] font-[300] leading-[23px]">
            A: Yes. You can contact support at support@numina.ai to request full
            data deletion.
          </p>
        </div>

        <div>
          <p className="text-[13px] font-[700] leading-[23px]">
            Q: Will I get new content over time?
          </p>
          <p className="text-[13px] font-[300] leading-[23px]">
            A: Yes. You’ll receive updated insights as you complete more tests,
            and Premium users may also receive seasonal and personalized
            reflections.
          </p>
        </div>

        <div>
          <p className="text-[13px] font-[700] leading-[23px]">
            Q: Do you offer refunds?
          </p>
          <p className="text-[13px] font-[300] leading-[23px]">
            A: As this is a digital subscription, we do not offer partial
            refunds. You can cancel anytime to avoid future billing.
          </p>
        </div>
      </div>
    </div>
  );
}
