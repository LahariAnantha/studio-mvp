import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import OnboardingQuiz from "./components/OnboardingQuiz";
import WorkspacePreview from "./components/WorkspacePreview";
import { extractIntent, generateConfig } from "./lib/workspaceGeneration";

function AppContent() {
  // Flow: onboarding -> preview -> studio
  const [phase, setPhase] = useState("onboarding");
  const [intent, setIntent] = useState(null);
  const [draftConfig, setDraftConfig] = useState(null);
  const { commitWorkspace } = useApp();

  function handleOnboardingComplete(profile) {
    const nextIntent = extractIntent(profile);
    setIntent(nextIntent);
    setDraftConfig(generateConfig(nextIntent));
    setPhase("preview");
  }

  function handleAccept(config) {
    commitWorkspace(config, intent);
    setPhase("studio");
  }

  function handleStartOver() {
    setIntent(null);
    setDraftConfig(null);
    setPhase("onboarding");
  }

  if (phase === "onboarding") {
    return <OnboardingQuiz onComplete={handleOnboardingComplete} />;
  }

  if (phase === "preview") {
    return (
      <WorkspacePreview
        intent={intent}
        initialConfig={draftConfig}
        onAccept={handleAccept}
        onStartOver={handleStartOver}
      />
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
