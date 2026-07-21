import { useMemo, useState } from "react";

const QUESTIONS = [
  {
    id: "purpose",
    kind: "hybrid",
    prompt: "What is the main purpose of your team?",
    helper: "What does your team primarily work on?",
    options: [
      "Creating things (design, content, ideas)",
      "Solving problems (engineering, research)",
      "Organizing people or events",
      "Training or practicing",
      "Supporting a community",
      "Something else (describe)",
    ],
  },
  {
    id: "collaboration",
    kind: "single",
    prompt: "How does your team usually collaborate?",
    helper: "How do most of your team's work happen together?",
    options: [
      "Real-time discussions",
      "Sharing files and resources",
      "Planning and tracking tasks",
      "Brainstorming ideas",
      "Reviewing or giving feedback",
      "A mix of everything",
    ],
  },
  {
    id: "contentType",
    kind: "single",
    prompt: "What kind of information does your team handle most?",
    helper: "What type of content does your team work with the most?",
    options: [
      "Text and messages",
      "Visuals (images, boards, sketches)",
      "Code or technical data",
      "Schedules and timelines",
      "Lists and records",
      "Mixed content",
    ],
  },
  {
    id: "workflowStructure",
    kind: "single",
    prompt: "How structured is your team's workflow?",
    helper: "How predictable is your team's work process?",
    options: [
      "Very structured (steps, rules, routines)",
      "Some structure, some flexibility",
      "Mostly flexible and creative",
      "Totally dynamic and changing",
    ],
  },
  {
    id: "tools",
    kind: "single",
    prompt: "What tools does your team already rely on?",
    helper: "What kinds of tools do you use or need?",
    options: [
      "Chat & communication",
      "File sharing",
      "Planning & calendars",
      "Whiteboards / visual boards",
      "Specialized tools (code, analytics, strategy, etc.)",
      "Not sure yet — let Studio decide",
    ],
  },
  {
    id: "teamSizeAndCadence",
    kind: "single",
    prompt: "How large is your team and how often do you interact?",
    helper: "How many people and how active is your team?",
    options: [
      "1–5 people / occasional use",
      "5–15 people / daily use",
      "15+ people / constant collaboration",
      "Community-style group with many members",
    ],
  },
  {
    id: "speedVsClarity",
    kind: "single",
    prompt: "What matters more to your team: speed or clarity?",
    helper: "Which feels more important for your team?",
    options: [
      "Speed and quick updates",
      "Clear, organized communication",
      "Balance of both",
    ],
  },
  {
    id: "spaces",
    kind: "multi",
    prompt: "Does your team need special spaces or modes?",
    helper: "Does your team need any of these? (Multi-select)",
    options: [
      "Brainstorming space",
      "Planning space",
      "Training or learning space",
      "Resource library",
      "Strategy or decision space",
      "Social or community space",
    ],
  },
  {
    id: "vibe",
    kind: "single",
    prompt: "How should the workspace feel?",
    helper: "Pick the vibe that best fits your team.",
    options: [
      "Calm and focused",
      "Energetic and fast",
      "Creative and playful",
      "Professional and clean",
      "Supportive and friendly",
      "Custom / mix of vibes",
    ],
  },
  {
    id: "workspaceMode",
    kind: "single",
    prompt: "Is this a professional or social workspace?",
    options: ["Professional", "Social", "Mix of both"],
  },
];

function inferFocus(purpose) {
  const value = (purpose || "").toLowerCase();
  if (value.includes("creating")) return "creating";
  if (value.includes("solving")) return "solving";
  if (value.includes("organizing")) return "organizing";
  if (value.includes("training")) return "training";
  if (value.includes("community")) return "community";
  return "general";
}

function getAdaptivePrompt(answers) {
  if (!answers.purposeOption && !answers.purposeText) {
    return "Describe what your team is trying to accomplish.";
  }
  if (!answers.contentTypeOption) {
    return "Do you work more with ideas, schedules, code, people, or logistics?";
  }
  if (!answers.collaborationOption) {
    return "What do you collaborate on most?";
  }
  return "What slows your team down today?";
}

function isAnswerValid(question, optionValue, textValue, selectedOptions) {
  const cleanOption = optionValue.trim();
  const cleanText = textValue.trim();

  if (question.kind === "single") return Boolean(cleanOption);
  if (question.kind === "multi") return selectedOptions.length > 0;
  if (question.kind === "open") return Boolean(cleanText);
  if (question.kind === "hybrid") return Boolean(cleanOption || cleanText);
  return false;
}

export default function OnboardingQuiz({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [optionValue, setOptionValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [followUpMix, setFollowUpMix] = useState("");

  const currentQuestion = QUESTIONS[currentIndex];
  const isFinalStep = currentIndex === QUESTIONS.length - 1;
  const showMixFollowUp = isFinalStep && optionValue === "Mix of both";
  const canContinue = isAnswerValid(currentQuestion, optionValue, textValue, selectedOptions);
  const adaptivePrompt = useMemo(() => getAdaptivePrompt(answers), [answers]);
  const progressTotal = QUESTIONS.length;
  const progressCurrent = currentIndex + 1;

  function toggleMultiOption(option) {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  }

  function moveNext(updatedAnswers) {
    if (isFinalStep) {
      const purposeLabel = updatedAnswers.purposeOption || updatedAnswers.purposeText || "Team";
      const purposeDetails = updatedAnswers.purposeText || purposeLabel;
      onComplete({
        ...updatedAnswers,
        purposeLabel,
        purposeDetails,
        teamName: "",
        focus: inferFocus(purposeLabel),
      });
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setOptionValue("");
    setTextValue("");
    setSelectedOptions([]);
    setFollowUpMix("");
  }

  function handleNext() {
    if (!canContinue) return;

    const baseAnswer = {
      ...answers,
      [`${currentQuestion.id}Option`]: optionValue.trim(),
      [`${currentQuestion.id}Text`]: textValue.trim(),
      [`${currentQuestion.id}Selections`]: selectedOptions,
    };

    const updatedAnswers =
      currentQuestion.id === "workspaceMode" && optionValue === "Mix of both"
        ? {
            ...baseAnswer,
            workspaceModeFollowUp:
              followUpMix.trim() || "Balanced between professional and social collaboration",
          }
        : baseAnswer;

    setAnswers(updatedAnswers);
    moveNext(updatedAnswers);
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <p className="onboarding-kicker">1️⃣ AI ONBOARDING — UNDERSTANDING ANY TEAM</p>
        <h1 className="onboarding-title">
          Studio begins by learning what the team actually does, rather than forcing a category.
        </h1>
        <p className="onboarding-subtitle">
          Adaptive quiz across 10 core questions to shape purpose, workflows, tools, tone, and
          collaboration design.
        </p>
        <p className="onboarding-adaptive">Adaptive prompt: "{adaptivePrompt}"</p>

        <div className="onboarding-progress">
          Question {progressCurrent} of {progressTotal}
        </div>

        <div className="onboarding-question-block">
          <h2 className="onboarding-question">{currentQuestion.prompt}</h2>
          {currentQuestion.helper && <p className="onboarding-helper">{currentQuestion.helper}</p>}

          {(currentQuestion.kind === "single" || currentQuestion.kind === "hybrid") && (
            <div className="onboarding-options">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  className={`onboarding-option ${optionValue === option ? "active" : ""}`}
                  onClick={() => setOptionValue(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.kind === "multi" && (
            <div className="onboarding-options">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  className={`onboarding-option ${selectedOptions.includes(option) ? "active" : ""}`}
                  onClick={() => toggleMultiOption(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {(currentQuestion.kind === "open" || currentQuestion.kind === "hybrid") && (
            <textarea
              className="onboarding-textarea"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Share a bit more..."
              rows={4}
            />
          )}

          {showMixFollowUp && (
            <textarea
              className="onboarding-textarea onboarding-follow-up"
              value={followUpMix}
              onChange={(e) => setFollowUpMix(e.target.value)}
              placeholder="If it's a mix, what does that look like for your team?"
              rows={3}
            />
          )}
        </div>

        <button
          className="onboarding-submit"
          onClick={handleNext}
          type="button"
          disabled={!canContinue}
        >
          {isFinalStep ? "Build my custom workspace" : "Next question"}
        </button>
      </div>
    </div>
  );
}
