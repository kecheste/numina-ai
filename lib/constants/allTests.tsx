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
  },
  {
    id: 2,
    title: "Numerology",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: false,
    alreadyTaken: true,
    questions: 10,
    completed: false,
    icon: <NumerologyIcon />,
  },
  {
    id: 3,
    title: "Starseed origins",
    category: "Cosmic Identity",
    categoryId: "cosmic",
    locked: true,
    alreadyTaken: false,
    questions: 9,
    completed: false,
    icon: <StarseedIcon />,
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
  },

  // Psychological Profile
  {
    id: 7,
    title: "MBTI Type",
    category: "Psychological Profile",
    categoryId: "psychological",
    locked: false,
    alreadyTaken: true,
    questions: 16,
    completed: false,
    icon: <MBTITypeIcon />,
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
  },

  // Energy & Wellbeing
  {
    id: 13,
    title: "Chakra Assessment Scan",
    category: "Energy & Wellbeing",
    categoryId: "energy",
    locked: false,
    alreadyTaken: true,
    questions: 8,
    completed: false,
    icon: <ChakraAlignmentIcon />,
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
  },
];
