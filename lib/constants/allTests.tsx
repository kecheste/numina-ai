import React, { ReactNode } from "react";
import { AstrologyIcon } from "../../components/icons/astrology";
import { AstrologyChartIcon } from "../../components/icons/explore/astrologyCharIcon";
import { NumerologyIcon } from "../../components/icons/explore/numerologyIcon";
import { StarseedIcon } from "../../components/icons/explore/starseedIcon";
import { HumanDesignIcon } from "../../components/icons/explore/humanDesignIcon";
import { TransitsIcon } from "../../components/icons/explore/transitsIcon";
import { ZodiacElementIcon } from "../../components/icons/explore/zodiacElement";
import { MBTITypeIcon } from "../../components/icons/explore/mbtiTypeIcon";
import { ShadowWorkIcon } from "../../components/icons/explore/shadowWorkIcon";
import { BigFiveIcon } from "../../components/icons/explore/bigFiveIcon";
import { CoreValuesIcon } from "../../components/icons/explore/coreValuesIcon";
import { CognitiveStyleIcon } from "../../components/icons/explore/cognitiveStyle";
import { MindMirrorIcon } from "../../components/icons/explore/mindMirrorIcon";
import { ChakraAlignmentIcon } from "../../components/icons/explore/chakraAlignmentIcon";
import { EnergyArchetypeIcon } from "../../components/icons/explore/energyArchetypeIcon";
import { EmotionalRegulationIcon } from "../../components/icons/explore/emotionalRegulationIcon";
import { StressBalanceIcon } from "../../components/icons/explore/stressBalanceIcon";
import { SomaticConnectionIcon } from "../../components/icons/explore/somaticConnection";
import { EnergySynthesisIcon } from "../../components/icons/explore/energySynthesisIcon";
import { LifePathIcon } from "../../components/icons/explore/lifePathIcon";
import { SoulUrgeIcon } from "../../components/icons/explore/soulUrgeIcon";
import { PastLifeIcon } from "../../components/icons/explore/pastLifeIcon";
import { KarmicLessonsIcon } from "../../components/icons/explore/karmicLessonsIcon";
import { SoulCompassIcon } from "../../components/icons/explore/soulCompassIcon";
import { InnerChildIcon } from "../../components/icons/explore/InnerChildIcon";

interface Test {
  id: number;
  title: string;
  category: string;
  categoryId: string;
  locked: boolean;
  questions: number;
  completed: boolean;
  icon: ReactNode;
  alreadyTaken: boolean;
  description: string;
}

export const allTests: Test[] = [
  // Cosmic Identity
  {
    id: 1,
    title: "Astrology Chart",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: false,
    alreadyTaken: false,
    questions: 12,
    completed: false,
    icon: <AstrologyChartIcon />,
    description:
      "Decode the blueprint of your soul. By analyzing your date, time, and place of birth, this quiz reveals your sun, moon, and rising signs—shedding light on your core personality, emotional rhythms, and life path.",
  },
  {
    id: 2,
    title: "Numerology",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: false,
    alreadyTaken: true, // result screen: TestResultView (numerology)
    questions: 10,
    completed: false,
    icon: <NumerologyIcon />,
    description:
      "Discover the numbers that guide your destiny. By calculating your Life Path and Soul Urge numbers from your birth date and name, you’ll learn what drives your purpose and what your heart truly desires.",
  },
  {
    id: 3,
    title: "Starseed origins",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    alreadyTaken: true, // result screen: TestResultStarseedView
    questions: 9,
    completed: false,
    icon: <StarseedIcon />,
    description:
      "Are you a soul seeded from the stars? This test uncovers your cosmic ancestry—whether you resonate with the Pleiadians, Arcturians, or other galactic lineages—and how that heritage shapes your intuition, mission, and energy.",
  },
  {
    id: 4,
    title: "Human Design",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    alreadyTaken: false,
    questions: 15,
    completed: false,
    icon: <HumanDesignIcon />,
    description:
      "Step into your unique energy blueprint. Combining astrology, the I Ching, and chakras, Human Design maps how you’re meant to engage with life, revealing your Type, Strategy, and Authority for aligned decision‑making.",
  },
  {
    id: 5,
    title: "Transits",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    alreadyTaken: false,
    questions: 15,
    completed: false,
    icon: <TransitsIcon />,
    description: "No description available.",
  },
  {
    id: 6,
    title: "Zodiac Element & Modality",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    alreadyTaken: false,
    questions: 15,
    completed: false,
    icon: <ZodiacElementIcon />,
    description: "No description available.",
  },

  // Psychological Profile
  {
    id: 7,
    title: "MBTI Type",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    alreadyTaken: false,
    questions: 16,
    completed: false,
    icon: <MBTITypeIcon />,
    description:
      "Uncover your cognitive preferences. Answer four simple questions to pinpoint your Myers‑Briggs type (e.g., INFJ, ENTP), and learn how you naturally process information, make decisions, and interact with the world.",
  },
  {
    id: 8,
    title: "Shadow Work Lens",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    alreadyTaken: false,
    questions: 20,
    completed: false,
    icon: <ShadowWorkIcon />,
    description:
      "Bring your hidden patterns into the light. This quiz explores your inner shadows—vulnerability, self‑critique, and avoidance—helping you recognize and transform the aspects of yourself you’ve been running from.",
  },
  {
    id: 9,
    title: "Big Five",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    alreadyTaken: false,
    questions: 20,
    completed: false,
    icon: <BigFiveIcon />,
    description:
      "Measure the five fundamental dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. See where you land on each spectrum and understand how it influences your behavior.",
  },
  {
    id: 10,
    title: "Core Values Sort",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    alreadyTaken: false,
    questions: 18,
    completed: false,
    icon: <CoreValuesIcon />,
    description:
      "Clarify what matters most. Prioritize a curated list of values—like Freedom, Authenticity, or Service—to reveal your top guiding principles and understand where conflicts might arise in your life choices.",
  },
  {
    id: 11,
    title: "Cognitive Style",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    alreadyTaken: false,
    questions: 14,
    completed: false,
    icon: <CognitiveStyleIcon />,
    description:
      "Find your thinking‑feeling balance. Through scenario‑based choices, this test shows whether you lean toward analytical logic or empathetic intuition—and how to harmonize both for clearer insight.",
  },
  {
    id: 12,
    title: "Mind Mirror",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: true,
    alreadyTaken: false,
    questions: 14,
    completed: false,
    icon: <MindMirrorIcon />,
    description:
      "Reflect on your daily emotional landscape. Log your morning, midday, and evening moods to see which inner compass (Mind, Heart, Body, Soul, or Spirit) dominates—and learn how to cultivate balance.",
  },

  // Energy & Wellbeing
  {
    id: 13,
    title: "Chakra Assessment Scan",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: false,
    alreadyTaken: true, // result screen: TestResultChakraView
    questions: 8,
    completed: false,
    icon: <ChakraAlignmentIcon />,
    description:
      "Check in with your energetic centers. Through a series of targeted questions, this scan identifies which of your seven chakras are open, blocked, or overactive—and gives you tailored practices to restore balance.",
  },
  {
    id: 14,
    title: "Energy Archetype",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: false,
    alreadyTaken: false,
    questions: 11,
    completed: false,
    icon: <EnergyArchetypeIcon />,
    description:
      "Find your energetic signature. By choosing how you recharge, lead, and connect, you’ll discover if you’re a Grounder, Firestarter, Harmonizer, or Visionary—so you can lean into your innate power style.",
  },
  {
    id: 15,
    title: "Emotional Regulation Type",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    alreadyTaken: false,
    questions: 13,
    completed: false,
    icon: <EmotionalRegulationIcon />,
    description: "No description available.",
  },
  {
    id: 16,
    title: "Stress Balance Index",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    alreadyTaken: false,
    questions: 16,
    completed: false,
    icon: <StressBalanceIcon />,
    description:
      "Gauge your stress response. Rate your perceived stress level and coping style to discover whether you’re Calm, Adaptive, or Overwhelmed—and get simple strategies to restore equilibrium.",
  },
  {
    id: 17,
    title: "Somatic Connection",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    alreadyTaken: false,
    questions: 16,
    completed: false,
    icon: <SomaticConnectionIcon />,
    description:
      "Tune into body‑mind signals. Identify physical sensations linked to emotions—like tension or lightness—and uncover how your body holds stress, joy, or release, so you can practice targeted somatic healing.",
  },
  {
    id: 18,
    title: "Energy Synthesis",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: true,
    alreadyTaken: false,
    questions: 16,
    completed: false,
    icon: <EnergySynthesisIcon />,
    description:
      "See how your mental clarity and emotional openness merge. By combining your Mind Mirror and Chakra data, this quiz reveals your current mental‑emotional fusion state—guiding you toward integrated vitality.",
  },

  // Soul Path & Karma
  {
    id: 19,
    title: "Life Path Number",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: false,
    alreadyTaken: false,
    questions: 10,
    completed: false,
    icon: <LifePathIcon />,
    description: "No description available.",
  },
  {
    id: 20,
    title: "Soul Urge / Heart's Desire",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: false,
    alreadyTaken: false,
    questions: 15,
    completed: false,
    icon: <SoulUrgeIcon />,
    description: "No description available.",
  },
  {
    id: 21,
    title: "Past Life Vibes",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    alreadyTaken: false,
    questions: 17,
    completed: false,
    icon: <PastLifeIcon />,
    description:
      "Sense echoes of other lifetimes. Explore questions about cultural affinities, dream recall, and cosmic nostalgia to pinpoint which ancient star systems or civilizations your soul may have called home.",
  },
  {
    id: 22,
    title: "Karmic Lessons",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    alreadyTaken: false,
    questions: 19,
    completed: false,
    icon: <KarmicLessonsIcon />,
    description:
      "“Uncover your soul’s schoolroom. Select recurring life themes—like Power, Patience, or Voice—to reveal your Karmic Lessons, conflicts you’re meant to resolve, and the growth waiting on your path.",
  },
  {
    id: 23,
    title: "Inner Child Dialogue",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    alreadyTaken: false,
    questions: 19,
    completed: false,
    icon: <InnerChildIcon />,
    description:
      "Connect with your younger self. Through reflective prompts about early emotional experiences, you’ll discover whether your Inner Child is Gentle, Wounded, or Playful—and learn how to offer it healthy support.",
  },
  {
    id: 24,
    title: "Soul Compass",
    category: "Soul Path & Karma",
    categoryId: "soul",
    locked: true,
    alreadyTaken: false,
    questions: 19,
    completed: false,
    icon: <SoulCompassIcon />,
    description: "No description available.",
  },
];
