"use client";

import React, { ReactNode } from "react";
import { AstrologyChartIcon } from "@/components/icons/explore/astrologyCharIcon";
import { NumerologyIcon } from "@/components/icons/explore/numerologyIcon";
import { StarseedIcon } from "@/components/icons/explore/starseedIcon";
import { HumanDesignIcon } from "@/components/icons/explore/humanDesignIcon";
import { TransitsIcon } from "@/components/icons/explore/transitsIcon";
import { ZodiacElementIcon } from "@/components/icons/explore/zodiacElement";
import { MBTITypeIcon } from "@/components/icons/explore/mbtiTypeIcon";
import { ShadowWorkIcon } from "@/components/icons/explore/shadowWorkIcon";
import { BigFiveIcon } from "@/components/icons/explore/bigFiveIcon";
import { CoreValuesIcon } from "@/components/icons/explore/coreValuesIcon";
import { CognitiveStyleIcon } from "@/components/icons/explore/cognitiveStyle";
import { MindMirrorIcon } from "@/components/icons/explore/mindMirrorIcon";
import { ChakraAlignmentIcon } from "@/components/icons/explore/chakraAlignmentIcon";
import { EnergyArchetypeIcon } from "@/components/icons/explore/energyArchetypeIcon";
import { EmotionalRegulationIcon } from "@/components/icons/explore/emotionalRegulationIcon";
import { StressBalanceIcon } from "@/components/icons/explore/stressBalanceIcon";
import { SomaticConnectionIcon } from "@/components/icons/explore/somaticConnection";
import { EnergySynthesisIcon } from "@/components/icons/explore/energySynthesisIcon";
import { LifePathIcon } from "@/components/icons/explore/lifePathIcon";
import { SoulUrgeIcon } from "@/components/icons/explore/soulUrgeIcon";
import { PastLifeIcon } from "@/components/icons/explore/pastLifeIcon";
import { KarmicLessonsIcon } from "@/components/icons/explore/karmicLessonsIcon";
import { InnerChildIcon } from "@/components/icons/explore/InnerChildIcon";
import { SoulCompassIcon } from "@/components/icons/explore/soulCompassIcon";

export interface TestUi {
  icon: ReactNode;
  description: string;
}

const DEFAULT_UI: TestUi = {
  icon: <MindMirrorIcon />,
  description: "Discover more about yourself through this assessment.",
};

/** Map test id (from API) → icon + description. Order matches backend: 1–6 Cosmic, 7–12 Psychological, 13–18 Energy, 19–24 Soul. */
const TEST_UI_BY_ID: Record<number, TestUi> = {
  // Cosmic Identity (1–6)
  1: {
    icon: <AstrologyChartIcon />,
    description:
      "Decode the blueprint of your soul. By analyzing your date, time, and place of birth, this quiz reveals your sun, moon, and rising signs—shedding light on your core personality, emotional rhythms, and life path.",
  },
  2: {
    icon: <NumerologyIcon />,
    description:
      "Discover the numbers that guide your destiny. By calculating your Life Path and Soul Urge numbers from your birth date and name, you’ll learn what drives your purpose and what your heart truly desires.",
  },
  3: {
    icon: <StarseedIcon />,
    description:
      "Are you a soul seeded from the stars? This test uncovers your cosmic ancestry—whether you resonate with the Pleiadians, Arcturians, or other galactic lineages—and how that heritage shapes your intuition, mission, and energy.",
  },
  4: {
    icon: <HumanDesignIcon />,
    description:
      "Step into your unique energy blueprint. Combining astrology, the I Ching, and chakras, Human Design maps how you’re meant to engage with life, revealing your Type, Strategy, and Authority for aligned decision‑making.",
  },
  5: {
    icon: <TransitsIcon />,
    description:
      "The sky is always moving, and those movements can activate different themes in your life. By comparing current planetary positions with your birth chart, this test reveals which energies may be influencing your experiences right now: growth, change, relationships, or transformation.",
  },
  6: {
    icon: <ZodiacElementIcon />,
    description:
      "Each zodiac sign belongs to one of four elements: Fire, Earth, Air, or Water. These elements describe how you naturally move through the world: through passion, practicality, intellect, or emotion. This test reveals your dominant element and how it shapes your energy and personality.",
  },
  // Psychological Profile (7–12)
  7: {
    icon: <MBTITypeIcon />,
    description:
      "Uncover your cognitive preferences. Answer four simple questions to pinpoint your Myers‑Briggs type (e.g., INFJ, ENTP), and learn how you naturally process information, make decisions, and interact with the world.",
  },
  8: {
    icon: <ShadowWorkIcon />,
    description:
      "Bring your hidden patterns into the light. This quiz explores your inner shadows—vulnerability, self‑critique, and avoidance—helping you recognize and transform the aspects of yourself you’ve been running from.",
  },
  9: {
    icon: <BigFiveIcon />,
    description:
      "Measure the five fundamental dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. See where you land on each spectrum and understand how it influences your behavior.",
  },
  10: {
    icon: <CoreValuesIcon />,
    description:
      "Clarify what matters most. Prioritize a curated list of values—like Freedom, Authenticity, or Service—to reveal your top guiding principles and understand where conflicts might arise in your life choices.",
  },
  11: {
    icon: <CognitiveStyleIcon />,
    description:
      "Find your thinking‑feeling balance. Through scenario‑based choices, this test shows whether you lean toward analytical logic or empathetic intuition—and how to harmonize both for clearer insight.",
  },
  12: {
    icon: <MindMirrorIcon />,
    description:
      "Reflect on your daily emotional landscape. Log your morning, midday, and evening moods to see which inner compass (Mind, Heart, Body, Soul, or Spirit) dominates—and learn how to cultivate balance.",
  },
  // Energy and Wellbeing (13–18)
  13: {
    icon: <ChakraAlignmentIcon />,
    description:
      "Check in with your energetic centers. Through a series of targeted questions, this scan identifies which of your seven chakras are open, blocked, or overactive—and gives you tailored practices to restore balance.",
  },
  14: {
    icon: <EnergyArchetypeIcon />,
    description:
      "Find your energetic signature. By choosing how you recharge, lead, and connect, you’ll discover if you’re a Grounder, Firestarter, Harmonizer, or Visionary—so you can lean into your innate power style.",
  },
  15: {
    icon: <EmotionalRegulationIcon />,
    description:
      "Emotions are signals that tell you what is happening inside. This assessment explores how you experience, express, and recover from emotional intensity. You’ll discover your natural emotional regulation style and how you can build greater balance and resilience.",
  },
  16: {
    icon: <StressBalanceIcon />,
    description:
      "Gauge your stress response. Rate your perceived stress level and coping style to discover whether you’re Calm, Adaptive, or Overwhelmed—and get simple strategies to restore equilibrium.",
  },
  17: {
    icon: <SomaticConnectionIcon />,
    description:
      "Tune into body‑mind signals. Identify physical sensations linked to emotions—like tension or lightness—and uncover how your body holds stress, joy, or release, so you can practice targeted somatic healing.",
  },
  18: {
    icon: <EnergySynthesisIcon />,
    description:
      "See how your mental clarity and emotional openness merge. By combining your Mind Mirror and Chakra data, this quiz reveals your current mental‑emotional fusion state—guiding you toward integrated vitality.",
  },
  // Soul Path and Karma (19–24)
  19: {
    icon: <LifePathIcon />,
    description:
      "Your Life Path number reflects the central theme of your life journey. Calculated from your birth date, it reveals the talents, challenges, and opportunities that shape your purpose. This test helps you understand the deeper direction guiding your path.",
  },
  20: {
    icon: <SoulUrgeIcon />,
    description:
      "Your Soul Urge reveals what your heart truly desires beneath your outer personality. Derived from the vowels in your birth name, this number reflects your inner motivations, emotional needs, and what brings you a sense of fulfillment.",
  },
  21: {
    icon: <PastLifeIcon />,
    description:
      "Sense echoes of other lifetimes. Explore questions about cultural affinities, dream recall, and cosmic nostalgia to pinpoint which ancient star systems or civilizations your soul may have called home.",
  },
  22: {
    icon: <KarmicLessonsIcon />,
    description:
      "Uncover your soul’s schoolroom. Select recurring life themes—like Power, Patience, or Voice—to reveal your Karmic Lessons, conflicts you’re meant to resolve, and the growth waiting on your path.",
  },
  23: {
    icon: <InnerChildIcon />,
    description:
      "Connect with your younger self. Through reflective prompts about early emotional experiences, you’ll discover whether your Inner Child is Gentle, Wounded, or Playful—and learn how to offer it healthy support.",
  },
  24: {
    icon: <SoulCompassIcon />,
    description:
      "Your inner world can be guided by four forces: Mind, Heart, Body, and Soul. This assessment explores how these parts of you work together, helping you see where you feel aligned and where you may need more balance and direction in your life.",
  },
};

export function getTestUi(testId: number): TestUi {
  return TEST_UI_BY_ID[testId] ?? DEFAULT_UI;
}
