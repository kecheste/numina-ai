"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { AppContainer } from "@/components/app-container";
import { WelcomeScreen } from "@/components/auth/welcome-screen";
import { DOBScreen } from "@/components/auth/dob-screen";
import { OnboardingInfoScreen } from "@/components/auth/onboarding-info-screen";
import { TestFlow } from "@/components/test/test-flow";
import AboutYourself from "@/components/auth/about-yourself";

type AuthView =
  | "welcome"
  | "dob"
  | "about"
  | "register"
  | "onboarding-info"
  | "test-intro"
  | "authenticated"
  | "loading";

interface UserData {
  dob: string;
  name: string;
  email: string;
}

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [authView, setAuthView] = useState<AuthView>("loading");
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [userProfile, setUserProfile] = useState<any>(null);

  // Check if user is authenticated and has completed onboarding
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setAuthView("welcome");
      return;
    }

    // User is signed in, fetch their profile
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users/profile");
        if (res.ok) {
          const profile = await res.json();
          setUserProfile(profile);
          setAuthView("authenticated");
        } else {
          // User exists but incomplete profile, ask for DOB
          setAuthView("dob");
        }
      } catch (error) {
        setAuthView("dob");
      }
    };

    fetchProfile();
  }, [isLoaded, isSignedIn]);

  if (authView === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="text-primary text-2xl mb-4">✨</div>
          <p className="text-foreground">Loading your journey...</p>
        </div>
      </div>
    );
  }

  // Welcome -> Start Your Journey button
  if (authView === "welcome") {
    return <WelcomeScreen onStartJourney={() => setAuthView("dob")} />;
  }

  // DOB collection
  if (authView === "dob") {
    return (
      <DOBScreen
        onContinue={async (dob) => {
          setUserData((prev) => ({ ...prev, dob }));

          // Save DOB and other user data
          if (user?.emailAddresses[0]?.emailAddress) {
            try {
              await fetch("/api/users/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: user.emailAddresses[0].emailAddress,
                  name: user.firstName || "User",
                  dateOfBirth: dob,
                }),
              });
            } catch (error) {
              console.error("Error saving profile:", error);
            }
          }

          setAuthView("about");
        }}
        onBack={() => setAuthView("welcome")}
      />
    );
  }

  if (authView === "about") {
    return (
      <AboutYourself
        onContinue={async ({ name, email, password }) => {
          setUserData((prev) => ({
            ...prev,
            name,
            email,
          }));

          // Save profile once we have DOB + name
          try {
            await fetch("/api/users/profile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email: email || user?.emailAddresses[0]?.emailAddress,
                dateOfBirth: userData.dob,
              }),
            });
          } catch (error) {
            console.error("Error saving profile:", error);
          }

          setAuthView("onboarding-info");
        }}
      />
    );
  }

  // Onboarding info screen
  if (authView === "onboarding-info") {
    return (
      <OnboardingInfoScreen
        userName={user?.firstName || "Friend"}
        onStartTest={() => setAuthView("test-intro")}
      />
    );
  }

  // First test flow
  if (authView === "test-intro") {
    return (
      <TestFlow
        testId={1}
        testTitle="Cosmic Alignment"
        category="Astrology"
        onClose={() => setAuthView("authenticated")}
      />
    );
  }

  // Authenticated - show main app
  return <AppContainer userProfile={userProfile} />;
}
