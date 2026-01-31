"use client";

import { TestCard } from "../cards/test-card";
import ProgressBar from "../custom/progress";
import { AstrologyChartIcon } from "../icons/explore/astrologyCharIcon";
import { LifePathIcon } from "../icons/explore/lifePathIcon";
import { MBTITypeIcon } from "../icons/explore/mbtiTypeIcon";
import { NumerologyIcon } from "../icons/explore/numerologyIcon";

interface SynthesisPageProps {
  isPremium: boolean;
}

const tests = [
  {
    id: 1,
    title: "Astrology Chart",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: false,
    questions: 12,
    completed: false,
    icon: <AstrologyChartIcon />,
  },
  {
    id: 2,
    title: "Numerology",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: false,
    questions: 10,
    completed: false,
    icon: <NumerologyIcon />,
  },
  {
    id: 3,
    title: "MBTI Type",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    questions: 16,
    completed: false,
    icon: <MBTITypeIcon />,
  },
  {
    id: 4,
    title: "Life Path Number",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: false,
    questions: 10,
    completed: false,
    icon: <LifePathIcon />,
  },
];

export function SynthesisPage({ isPremium }: SynthesisPageProps) {
  return (
    <div
      className="pb-24 space-y-4 text-white "
      style={{ fontFamily: "var(--font-gotham)" }}
    >
      <div className="mb-3 px-[28px] relative">
        <div className="h-[15px] rounded-full bg-transparent border border-[#F2D08C]/50 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: "20.5%", backgroundColor: "#F2D08C" }}
          />
        </div>

        <p className="absolute right-13 top-1/2 -translate-y-1/2 text-white text-[10px] font-[400] z-10 pointer-events-none">
          4/16
        </p>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-[21px] font-light text-white">
          Your Full Synthesis
        </h1>

        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex flex-nowrap gap-2 px-1">
            {tests.map((test) => (
              <div key={test.id} className="shrink-0">
                <TestCard test={test} isSelected={false} onSelect={() => {}} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-2 px-[28px] text-left">
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[13px] text-[#FFFFFF] pt-1"
        >
          You Are
        </h2>

        <p className="text-[13px] font-[400] text-[#F2D08C]">
          A visionary empath walking a path between inner truth and outer
          complexity.
        </p>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Sure things
        </h2>
        <p className="text-[13px] font-[400] text-[#F2D08C]">
          These patterns appear consistently across your completed tests —
          strong indicators of your core wiring.
        </p>

        <div className="flex items-center gap-1 flex-wrap">
          <div className="text-[#F2D08C] px-1.5 border border-[#F2D08C]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Insightful
          </div>
          <div className="text-[#F2D08C] px-1.5 border border-[#F2D08C]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Private
          </div>
          <div className="text-[#F2D08C] px-1.5 border border-[#F2D08C]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Spritual
          </div>
          <div className="text-[#F2D08C] px-1.5 border border-[#F2D08C]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Purpose-drived
          </div>
          <div className="text-[#F2D08C] px-1.5 border border-[#F2D08C]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Emotionally deep
          </div>
        </div>

        {/* Identity Definition */}
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Your Identity
        </h2>

        <p className="text-[13px] font-[400] text-[#F2D08C]">
          (Based on your currentdata: INFJ + Life Path 7 + Scorpio Sun + Crown
          Chakra Active)
        </p>

        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            You are deeply reflective, guided by inner knowing and mystic
            curiosity. A seeker of deeper truths, often straddling the worlds of
            emotion and logic. Scorpio’s intensity fuels your cycles of
            transformation, while the INFJ’s depth gives you a soul that listens
            before it speaks.
          </p>

          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            You often feel different — more sensitive, more watchful. Not
            because you are lost, but because you are wired to explore what lies
            beneath. You feel most alive when what you do serves a purpose
            beyond the surface.
          </p>

          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            You often feel different — more sensitive, more watchful. Not
            because you are lost, but because you're wired to explore what lies
            beneath. In relationships and work, you're most alive when what you
            do serves a purpose beyond the surface.
          </p>
        </div>

        {/* Core Strengths */}
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Core Strengths
        </h2>

        <div className="flex items-center gap-1 flex-wrap">
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Wise beyond your years
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Emotionally intelligent and intuitive
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Sees patterns others miss
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Natural healder or guide
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Self-discplined and reflective
          </div>
        </div>

        {/* Archetype */}
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Archetypal Nature
        </h2>

        <div className="flex flex-col gap-[1px] py-1">
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            <strong className="text-[#F2D08C]">Water</strong> - Primary Element
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            <strong className="text-[#F2D08C]">Air</strong> - Secondary Element
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            <strong className="text-[#F2D08C]">
              The Mystic / The Alchemist
            </strong>{" "}
            - Archetype
          </p>
        </div>

        {/* Mind & Motivation */}
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Mind & Motivation
        </h2>

        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            Your INFJ mind is shaped by introspection, long-term vision, and
            intuition over raw analysis. You are energized by ideas more than
            action — but when you act, it is aligned, intentional, and precise.
          </p>

          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            Your cognition is abstract, strategic, and pattern-based. You
            perceive the big picture instinctively.
          </p>
        </div>

        {/* Soul Blueprint */}
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Soul Blueprint
        </h2>

        <div className="flex flex-col gap-[1px] py-1">
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            <strong className="text-[#F2D08C]">7</strong> - Life path (The
            Philosopher-Seeker)
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            <strong className="text-[#F2D08C]">5</strong> - Soul Urge(Craves
            freedom, exploration, fluidity)
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            <strong className="text-[#F2D08C]">5</strong> - Personality
            (Dynamic, adaptive, clever)
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            <strong className="text-[#F2D08C]">6</strong> - Birthday (Carries
            nurturing energy and love for harmony)
          </p>
        </div>

        <p className="text-[13px] text-[#F2D08C] font-[275] italic">
          These numbers combine to create a soul that seeks truth and beauty,
          growing through solitude and reinvention.
        </p>

        {/* Energy Alignment */}
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Energy Alignment
        </h2>

        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            Your Crown Chakra is currently most active — reflecting strong
            spiritual focus and connection to intuition. Yet your Root Chakra
            shows signs of imbalance, suggesting grounding practices would bring
            harmony.
          </p>
        </div>

        {/* Energetic Forecast */}
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Your Current Energetic Forecast
        </h2>

        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-[300] text-[#F2D08C] border-l-2 border-[#F2D08C66] pl-1.5">
            This month’s energy challenges you to release old attachments
          </p>
          <p className="text-[13px] font-[300] text-[#F2D08C] border-l-2 border-[#F2D08C66] pl-1.5">
            Your Third Eye is activated—pay attention to signs & dreams.
          </p>
        </div>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Try
        </h2>

        <div className="flex items-center gap-1 flex-wrap">
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Nature walks
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            daily routines
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            body awareness
          </div>
        </div>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Avoid
        </h2>

        <div className="flex items-center gap-1 flex-wrap">
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Mental overstimulation
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            ignoring your body
          </div>
        </div>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Challenges
        </h2>

        <div className="flex items-center gap-1 flex-wrap">
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Tendency to over-isolate
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Prone to escapism when overwhelmed
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Overthinking may lock intuitive flow
          </div>
          <div className="text-[#D9D9D9] px-1.5 border border-[#D9D9D9]/50 rounded-[10px] text-[13px] font-[300] p-0">
            Difficulty trusting others
          </div>
        </div>

        {/* Mission */}
        <h2 className="font-[400] text-sm text-[#FFFFFF] pt-2">
          Spiritual Mission Summary
        </h2>

        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            You're here to illuminate truth, guide transformation, and hold
            space for others' healing journeys.
          </p>

          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            Your path is not comfort — it's inner clarity and resonance with the
            unseen.
          </p>
        </div>

        {/* Rituals */}
        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Your Inner Architecture
        </h2>

        <div>
          <p className="text-[#F2D08C] text-[13px] font-[300]">MBTI (INFJ)</p>
          <p className="text-[#E7E7E7] text-[13px] font-[300]">
            Your cognitive style and emotional depth
          </p>
        </div>
        <div>
          <p className="text-[#F2D08C] text-[13px] font-[300]">
            Chakra (Crown Active / Root Blocked)
          </p>
          <p className="text-[#E7E7E7] text-[13px] font-[300]">
            Your energy flow and spiritual tendencies.
          </p>
        </div>
        <div>
          <p className="text-[#F2D08C] text-[13px] font-[300]">
            Numerology (Life Path 7, Destiny 6)
          </p>
          <p className="text-[#E7E7E7] text-[13px] font-[300]">
            Your deeper life mission and karmic personality.
          </p>
        </div>
        <div>
          <p className="text-[#F2D08C] text-[13px] font-[300]">
            Astrology (Scorpio Sun, Virgo Moon)
          </p>
          <p className="text-[#E7E7E7] text-[13px] font-[300]">
            Your surface and inner emotional rhythm.
          </p>
        </div>
        <div>
          <p className="text-[#F2D08C] text-[13px] font-[300]">
            Cognitive Style (Right-Brain Intuitive)
          </p>
          <p className="text-[#E7E7E7] text-[13px] font-[300]">
            How you learn, create, and make decisions.
          </p>
        </div>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Your Soul Timeline
        </h2>

        <div className="flex flex-col">
          <p className="text-[#F2D08C] text-[13px] font-[300]">PAST</p>
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            You’ve come into this life with the echoes of wisdom already
            whispering in your soul… a quiet guide with karmic insight.
          </p>

          <p className="text-[#F2D08C] text-[13px] font-[300] pt-3">PRESENT</p>
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            This stage is about harmonizing your intuition with grounded action.
            It’s time to share your truth, even if your voice shakes.
          </p>

          <p className="text-[#F2D08C] text-[13px] font-[300] pt-3">
            PATH AHEAD
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            Your journey leads toward healing others through presence, not
            persuasion. Your gift is your frequency.
          </p>
        </div>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Your Energetic Layers
        </h2>

        <div className="flex flex-col gap-[1px] py-1">
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            Core Aura Tone: <strong className="text-[#F2D08C]">Indigo</strong>
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            Primary Energy Center:{" "}
            <strong className="text-[#F2D08C]">Third Eye</strong>
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            Shadow Influence:{" "}
            <strong className="text-[#F2D08C]">Isolation / Control</strong>{" "}
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            Signature Vibe:{" "}
            <strong className="text-[#F2D08C]">"Mysterious Healer"</strong>
          </p>
          <p className="text-[13px] font-[300] text-[#E7E7E7]">
            Soul Style:{" "}
            <strong className="text-[#F2D08C]">
              Quiet Depth / Alchemical Insight
            </strong>
          </p>
        </div>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Personal Rituals & Practices
        </h2>

        <div>
          <p className="text-[13px] text-[#F2D08C] font-[300]">
            You thrive with:
          </p>
          <p className="text-[13px] text-[#E7E7E7] font-[300] underline">
            10 min daily journaling
          </p>
          <p className="text-[13px] text-[#E7E7E7] font-[300] underline">
            Time in quiet nature
          </p>
          <p className="text-[13px] text-[#E7E7E7] font-[300] underline">
            Breathwork or grounding touch
          </p>
          <p className="text-[13px] text-[#E7E7E7] font-[300] underline">
            Studying symbolism / metaphysical ideas
          </p>
          <p className="text-[13px] text-[#E7E7E7] font-[300] underline">
            Low-stimulation music or ambient soundscapes
          </p>
        </div>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          Your Inner Alignment
        </h2>

        <div className="text-[13px] text-[#D9D9D9] font-[300]">
          <p>
            A holistic snapshot of your energetic expression across five key
            areas of self:
          </p>
          <ul className="list-disc pl-5">
            <li>Mind - Thinking patterns, clarity, personality structure</li>
            <li>Heart – Emotional openness, empathy, inner harmony</li>
            <li>Body – Physical presence, grounding, energetic stability</li>
            <li>Soul – Purpose, intuition, karmic patterns</li>
            <li>
              Spirit – Spiritual connection, cosmic identity, higher insight
            </li>
          </ul>
          <p>
            These scores reflect how clearly each aspect is expressed in your
            current profile. Not a judgment — but a mirror for self-awareness
            and gentle rebalancing.
          </p>
        </div>

        <div className="pt-2">
          <ProgressBar
            value={85}
            type="percent"
            textPosition="outside"
            precedingText={"Mind"}
            text={""}
            fillColor="#006DFF"
            borderColor="#006DFF"
          />
          <ProgressBar
            value={60}
            type="percent"
            textPosition="outside"
            precedingText={"Heart"}
            text={""}
            fillColor="#FF9DEA"
            borderColor="#FF9DEA"
          />
          <ProgressBar
            value={40}
            type="percent"
            textPosition="outside"
            precedingText={"Body"}
            text={""}
            fillColor="#9E5A07"
            borderColor="#9E5A07"
          />
          <ProgressBar
            value={90}
            type="percent"
            textPosition="outside"
            precedingText={"Soul"}
            text={""}
            fillColor="#6807A3"
            borderColor="#6807A3"
          />
          <ProgressBar
            value={70}
            type="percent"
            textPosition="outside"
            precedingText={"Spirit"}
            text={""}
            fillColor="#9E9E9E"
            borderColor="#9E9E9E"
          />
        </div>

        <h2
          style={{
            lineHeight: "33px",
          }}
          className="font-[400] text-[15px] text-[#FFFFFF] pt-3"
        >
          This Week's Forecast
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[#F2D08C] text-[13px] font-[600]">
              Relationships
            </p>
            <p className="text-[#F2D08C] text-[13px] font-[300]">
              You're in a reflective cycle.
            </p>
          </div>
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            Now is not the time to initiate something new — instead, revisit old
            emotional patterns and be gentle with yourself. Your current
            alignment favors intimacy with people who honor your depth, not
            surface-level connection.
          </p>

          <div>
            <p className="text-[#F2D08C] text-[13px] font-[600]">
              Career & Money
            </p>
            <p className="text-[#F2D08C] text-[13px] font-[300]">
              Strategic momentum is building.
            </p>
          </div>
          <p className="text-[13px] font-[300] text-[#E7E7E7] border-l-2 border-[#F2D08C66] pl-1.5">
            This week is ideal for refining long-term goals, reviewing your
            role, or laying quiet foundations.Avoid spontaneous decisions —
            clarity will peak midweek.
          </p>

          <p className="text-[#F2D08C] text-[13px] font-[600]">
            Positive / Challenging Days
          </p>

          <div>
            <p className="text-[#F2D08C] text-[13px] font-[600]">
              High-energy days:
            </p>
            <p className="text-[#D9D9D9] text-[13px] font-[300]">
              July 12-13: bold action, creativity, clarity
            </p>
          </div>

          <div>
            <p className="text-[#F2D08C] text-[13px] font-[600]">
              Reflective days:
            </p>
            <p className="text-[#D9D9D9] text-[13px] font-[300]">
              July 16- 18: rest, rethink, restore
            </p>
          </div>

          <p className="text-[#F2D08C] text-[13px] font-[600]">
            Mind / 🫀 Heart / 🕊 Soul
          </p>

          <div>
            <p className="text-[#D9D9D9] text-[13px] font-[300]">
              Mind is active and future-oriented
            </p>
            <p className="text-[#D9D9D9] text-[13px] font-[300]">
              Heart feels protective, seeking emotional safety
            </p>
            <p className="text-[#D9D9D9] text-[13px] font-[300]">
              Soul is quietly integrating past lessons
            </p>
            <p className="text-[#D9D9D9] text-[13px] font-[300]">
              Trust the slow unfolding. Don’t rush clarity — it’s coming.
            </p>
          </div>
        </div>

        {/* Closing */}
        <div>
          <p className="text-[13px] text-[#ffffff] font-[600] pt-2">
            What's next?
          </p>
          <p className="text-[13px] text-[#FFFFFF] font-[300]">
            Complete all tests and this synthesis will change based on your new
            data.
          </p>
        </div>
      </section>
    </div>
  );
}
