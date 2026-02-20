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
      "Decode the blueprint of your soul from your birth date, time, and place—sun, moon, and rising signs.",
  },
  2: {
    icon: <NumerologyIcon />,
    description:
      "Life Path and Soul Urge numbers computed from your date of birth and name.",
  },
  3: {
    icon: <StarseedIcon />,
    description:
      "Starseed-type questions to uncover your cosmic ancestry and how it shapes your intuition and mission.",
  },
  4: {
    icon: <HumanDesignIcon />,
    description:
      "Your energy blueprint from birth date, time, and place—Type, Strategy, and Authority.",
  },
  5: {
    icon: <TransitsIcon />,
    description:
      "Current astrological transits and how they influence your chart.",
  },
  6: {
    icon: <ZodiacElementIcon />,
    description:
      "Your zodiac element and modality—fire, earth, air, water and cardinal, fixed, mutable.",
  },
  // Psychological Profile (7–12)
  7: {
    icon: <MBTITypeIcon />,
    description:
      "Four preference questions to pinpoint your Myers-Briggs type and how you process information and make decisions.",
  },
  8: {
    icon: <ShadowWorkIcon />,
    description:
      "Shadow-work questionnaire to bring hidden patterns into the light.",
  },
  9: {
    icon: <BigFiveIcon />,
    description:
      "Measure the five dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.",
  },
  10: {
    icon: <CoreValuesIcon />,
    description: "Rank your values to reveal your top guiding principles.",
  },
  11: {
    icon: <CognitiveStyleIcon />,
    description:
      "Scenario-based choices to show whether you lean toward analytical logic or empathetic intuition.",
  },
  12: {
    icon: <MindMirrorIcon />,
    description:
      "Morning, midday, and evening mood entries to see which inner compass dominates.",
  },
  // Energy and Wellbeing (13–18)
  13: {
    icon: <ChakraAlignmentIcon />,
    description:
      "Check in with your energetic centers. Targeted questions identify which chakras are open, blocked, or overactive.",
  },
  14: {
    icon: <EnergyArchetypeIcon />,
    description: "Recharge-style selections to find your energetic signature.",
  },
  15: {
    icon: <EmotionalRegulationIcon />,
    description:
      "How you experience and regulate emotions—containment, expression, and coping.",
  },
  16: {
    icon: <StressBalanceIcon />,
    description:
      "Stress sliders and coping-style selection to gauge your stress response.",
  },
  17: {
    icon: <SomaticConnectionIcon />,
    description: "Body-sensation selections to tune into body-mind signals.",
  },
  18: {
    icon: <EnergySynthesisIcon />,
    description:
      "Fuses your Mind Mirror and Chakra Scan results—no extra quiz.",
  },
  // Soul Path and Karma (19–24)
  19: {
    icon: <LifePathIcon />,
    description:
      "Your Life Path number from birth date—core purpose and life theme.",
  },
  20: {
    icon: <SoulUrgeIcon />,
    description:
      "Soul Urge number from your name—what your heart truly desires.",
  },
  21: {
    icon: <PastLifeIcon />,
    description:
      "Past-life affinity questions to sense echoes of other lifetimes.",
  },
  22: {
    icon: <KarmicLessonsIcon />,
    description:
      "Select recurring life-theme lessons to reveal your karmic lessons.",
  },
  23: {
    icon: <InnerChildIcon />,
    description:
      "Free-text and tone questions to connect with your younger self.",
  },
  24: {
    icon: <SoulCompassIcon />,
    description:
      "Navigate purpose and alignment with the Mind, Heart, Body, and Soul axes.",
  },
};

export function getTestUi(testId: number): TestUi {
  return TEST_UI_BY_ID[testId] ?? DEFAULT_UI;
}
