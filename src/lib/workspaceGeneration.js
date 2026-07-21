// ============================================================
// AI Workspace Generation ("Building the Studio")
// Deterministic slice: onboarding signals -> WorkspaceIntent
// -> WorkspaceConfig (draft) -> guardrail validation -> provisioned workspace.
// No LLM in the loop: this is the determinism floor. Every intent yields a
// valid, on-principle workspace.
// ============================================================

// ----- Design tokens (guardrail: generated values may ONLY be these) -----
export const TONE_TOKENS = ["formal", "playful", "calm", "serious"];
export const DENSITY_TOKENS = ["compact", "comfortable", "spacious"];
export const VISUAL_TOKENS = ["text", "visual", "minimal"];
export const COMPLEXITY_TOKENS = ["simple", "standard", "advanced"];
export const NAMING_SYSTEMS = ["themed", "functional", "custom"];

export const MIN_ROOMS = 1;
export const MAX_ROOMS = 6;
export const MAX_LABEL_LENGTH = 28;

// Rooms/tools flagged as protected can never be removed by generation or edits.
const REQUIRED_ROOM_IDS = ["home"];
const CORE_TOOL_KEYS = ["chat", "files"];

export const TOOL_CATALOG = {
  chat: { key: "chat", label: "Chat", icon: "💬" },
  files: { key: "files", label: "Files", icon: "📁" },
  notes: { key: "notes", label: "Notes", icon: "📝" },
  tasks: { key: "tasks", label: "Tasks", icon: "✅" },
  calendar: { key: "calendar", label: "Calendar", icon: "📅" },
  whiteboard: { key: "whiteboard", label: "Whiteboard", icon: "🗺️" },
  gallery: { key: "gallery", label: "Gallery", icon: "🖼️" },
  analytics: { key: "analytics", label: "Analytics", icon: "📊" },
  library: { key: "library", label: "Library", icon: "📚" },
};

const NAMING_LABELS = {
  themed: { room: "Studio", project: "Collection", task: "Spark" },
  functional: { room: "Room", project: "Project", task: "Task" },
  custom: { room: "Room", project: "Project", task: "Task" },
};

// ------------------------------------------------------------
// 1. Signal extraction: onboarding answers -> WorkspaceIntent
// ------------------------------------------------------------
export function extractIntent(profile = {}) {
  const purpose = profile.purposeDetails || profile.purposeLabel || "Team collaboration";
  const focus = profile.focus || inferFocusFromText(purpose);

  const size = mapTeamSize(profile.teamSizeAndCadenceOption);
  const experience = mapExperience(
    profile.workflowStructureOption,
    profile.toolsOption
  );

  return {
    purpose,
    domain: mapDomain(focus),
    focus,
    teamSize: size,
    experienceLevel: experience,
    preferredTone: mapTone(profile.vibeOption, profile.workspaceModeOption),
    visualPreference: mapVisual(profile.contentTypeOption),
    complexityAppetite: mapComplexityAppetite(profile.workflowStructureOption),
    collaboration: profile.collaborationOption || "A mix of everything",
    speedVsClarity: profile.speedVsClarityOption || "Balance of both",
    spaces: profile.spacesSelections || [],
    workspaceMode: profile.workspaceModeOption || "Professional",
    workspaceModeDetail: profile.workspaceModeFollowUp || "",
    rawSignals: profile,
  };
}

function inferFocusFromText(text = "") {
  const value = text.toLowerCase();
  if (value.includes("creat")) return "creating";
  if (value.includes("solv") || value.includes("engineer") || value.includes("research"))
    return "solving";
  if (value.includes("organ") || value.includes("event")) return "organizing";
  if (value.includes("train") || value.includes("learn")) return "training";
  if (value.includes("communit")) return "community";
  return "general";
}

function mapTeamSize(option = "") {
  const v = option.toLowerCase();
  if (v.includes("1–5") || v.includes("1-5")) return "solo";
  if (v.includes("5–15") || v.includes("5-15")) return "small";
  if (v.includes("15+") || v.includes("community")) return "large";
  return "small";
}

function mapExperience(structure = "", tools = "") {
  const s = structure.toLowerCase();
  const t = tools.toLowerCase();
  if (t.includes("specialized") && s.includes("very structured")) return "expert";
  if (t.includes("not sure")) return "novice";
  if (s.includes("very structured")) return "expert";
  if (s.includes("totally dynamic")) return "intermediate";
  return "intermediate";
}

function mapDomain(focus) {
  return (
    {
      creating: "Creative",
      solving: "Engineering",
      organizing: "Operations",
      training: "Learning",
      community: "Community",
      general: "General",
    }[focus] || "General"
  );
}

function mapTone(vibe = "", mode = "") {
  const v = vibe.toLowerCase();
  if (v.includes("energetic") || v.includes("playful") || v.includes("creative"))
    return "playful";
  if (v.includes("professional") || v.includes("clean")) return "formal";
  if (v.includes("calm") || v.includes("focused") || v.includes("supportive"))
    return "calm";
  if (mode.toLowerCase() === "professional") return "formal";
  return "calm";
}

function mapVisual(contentType = "") {
  const v = contentType.toLowerCase();
  if (v.includes("visual")) return "visual";
  if (v.includes("schedule") || v.includes("list") || v.includes("record"))
    return "minimal";
  if (v.includes("mixed")) return "visual";
  return "text";
}

function mapComplexityAppetite(structure = "") {
  const s = structure.toLowerCase();
  if (s.includes("very structured")) return "high";
  if (s.includes("some structure")) return "medium";
  if (s.includes("mostly flexible")) return "low";
  if (s.includes("totally dynamic")) return "high";
  return "medium";
}

// ------------------------------------------------------------
// 2. Deterministic generation: WorkspaceIntent -> WorkspaceConfig (draft)
// ------------------------------------------------------------

const SPACE_ROOM_MAP = {
  "Brainstorming space": {
    id: "brainstorm",
    name: "Brainstorm",
    type: "creative",
    icon: "💡",
    tools: ["whiteboard", "notes"],
  },
  "Planning space": {
    id: "planning",
    name: "Planning",
    type: "planning",
    icon: "🗺️",
    tools: ["tasks", "calendar"],
  },
  "Training or learning space": {
    id: "learning",
    name: "Learning",
    type: "execution",
    icon: "🎓",
    tools: ["library", "notes"],
  },
  "Resource library": {
    id: "library",
    name: "Library",
    type: "archive",
    icon: "📚",
    tools: ["library", "files"],
  },
  "Strategy or decision space": {
    id: "strategy",
    name: "Strategy",
    type: "planning",
    icon: "🎯",
    tools: ["notes", "analytics"],
  },
  "Social or community space": {
    id: "community",
    name: "Community",
    type: "discussion",
    icon: "🤝",
    tools: ["chat"],
  },
};

const FOCUS_DEFAULT_ROOMS = {
  creating: ["Brainstorming space", "Resource library"],
  solving: ["Planning space", "Strategy or decision space"],
  organizing: ["Planning space", "Social or community space"],
  training: ["Training or learning space", "Resource library"],
  community: ["Social or community space", "Resource library"],
  general: ["Planning space"],
};

function homeRoom() {
  return {
    id: "home",
    name: "Home",
    type: "dashboard",
    icon: "🏠",
    tools: ["chat", "files"],
    required: true,
  };
}

function buildRooms(intent) {
  const rooms = [homeRoom()];

  const chosenSpaces =
    intent.spaces.length > 0 ? intent.spaces : FOCUS_DEFAULT_ROOMS[intent.focus] || [];

  chosenSpaces.forEach((space) => {
    const template = SPACE_ROOM_MAP[space];
    if (template) rooms.push({ ...template, tools: [...template.tools], required: false });
  });

  // Real-time discussion collaboration always deserves a team chat room.
  const wantsChat = /discussion|mix/i.test(intent.collaboration);
  if (wantsChat && !rooms.some((r) => r.type === "discussion")) {
    rooms.push({
      id: "team-chat",
      name: "Team Chat",
      type: "discussion",
      icon: "💬",
      tools: ["chat"],
      required: false,
    });
  }

  // Ensure at least one working room beyond Home.
  if (rooms.length === 1) {
    rooms.push({
      id: "workspace",
      name: "Workspace",
      type: "planning",
      icon: "🗂️",
      tools: ["tasks", "notes"],
      required: false,
    });
  }

  return rooms.slice(0, MAX_ROOMS).map((room, index) => ({ ...room, order: index }));
}

function buildTools(rooms) {
  const placements = {};
  rooms.forEach((room) => {
    (room.tools || []).forEach((key) => {
      if (!placements[key]) placements[key] = room.id;
    });
  });

  CORE_TOOL_KEYS.forEach((key) => {
    if (!placements[key]) placements[key] = "home";
  });

  return Object.keys(TOOL_CATALOG)
    .filter((key) => placements[key])
    .map((key, index) => ({
      id: `t${index + 1}`,
      key,
      label: TOOL_CATALOG[key].label,
      icon: TOOL_CATALOG[key].icon,
      enabled: true,
      core: CORE_TOOL_KEYS.includes(key),
      placement: placements[key],
    }));
}

function pickNamingSystem(intent) {
  if (intent.preferredTone === "playful") return "themed";
  return "functional";
}

function pickDensity(intent) {
  if (intent.visualPreference === "visual") return "spacious";
  if (intent.visualPreference === "minimal") return "compact";
  return "comfortable";
}

function pickWorkflowComplexity(intent) {
  if (intent.complexityAppetite === "high" && intent.experienceLevel !== "novice")
    return "advanced";
  if (intent.complexityAppetite === "low") return "simple";
  return "standard";
}

function buildRationale(intent, rooms) {
  return {
    rooms: `Chose ${rooms.length} room${rooms.length === 1 ? "" : "s"} for a ${
      intent.teamSize
    } ${intent.domain.toLowerCase()} team focused on ${intent.focus}.`,
    naming: `A ${pickNamingSystem(intent)} naming system fits a ${
      intent.preferredTone
    } tone.`,
    tools: `Enabled tools that match ${intent.collaboration.toLowerCase()} and your ${intent.focus} work.`,
    navigation: `${pickDensity(intent)} density suits a ${
      intent.visualPreference
    }-leaning, ${intent.experienceLevel} team.`,
    workflow: `${pickWorkflowComplexity(intent)} workflow matches a ${
      intent.complexityAppetite
    } complexity appetite.`,
    presentation: `Tone "${intent.preferredTone}" and ${intent.visualPreference} emphasis reflect the vibe you picked.`,
  };
}

// Delta instructions for regeneration.
export const REGEN_DELTAS = [
  { id: "simpler", label: "Simpler" },
  { id: "more_playful", label: "More playful" },
  { id: "more_visual", label: "More visual" },
  { id: "fewer_rooms", label: "Fewer rooms" },
  { id: "more_rooms", label: "More rooms" },
];

export function generateConfig(intent, options = {}) {
  const { delta = null } = options;
  const workingIntent = applyDeltaToIntent(intent, delta);

  let rooms = buildRooms(workingIntent);

  if (delta === "fewer_rooms") {
    const removable = [...rooms].reverse().find((r) => !r.required);
    if (removable) rooms = rooms.filter((r) => r.id !== removable.id);
  }
  if (delta === "more_rooms" && rooms.length < MAX_ROOMS) {
    rooms.push({
      id: `extra-${rooms.length}`,
      name: "Ideas",
      type: "creative",
      icon: "✨",
      tools: ["notes"],
      required: false,
    });
  }
  if (delta === "more_visual" && !rooms.some((r) => r.tools.includes("gallery"))) {
    const target = rooms.find((r) => !r.required) || rooms[0];
    target.tools = [...target.tools, "gallery"];
  }

  rooms = rooms.map((room, index) => ({ ...room, order: index }));

  const config = {
    version: 1,
    rooms,
    naming: {
      system: pickNamingSystem(workingIntent),
      labels: { ...NAMING_LABELS[pickNamingSystem(workingIntent)] },
    },
    tools: buildTools(rooms),
    navigation: { density: pickDensity(workingIntent) },
    workflow: { complexity: pickWorkflowComplexity(workingIntent) },
    presentation: {
      tone: workingIntent.preferredTone,
      visualEmphasis: workingIntent.visualPreference,
    },
    rationale: buildRationale(workingIntent, rooms),
    meta: {
      generatedFrom: hashIntent(workingIntent),
      editable: true,
      createdAt: new Date().toISOString(),
      delta,
    },
  };

  return validateConfig(config, workingIntent);
}

function applyDeltaToIntent(intent, delta) {
  if (!delta) return intent;
  const next = { ...intent };
  if (delta === "simpler") {
    next.complexityAppetite = "low";
    next.visualPreference = "minimal";
    next.spaces = [];
  }
  if (delta === "more_playful") {
    next.preferredTone = "playful";
    next.visualPreference = "visual";
  }
  if (delta === "more_visual") {
    next.visualPreference = "visual";
  }
  return next;
}

function hashIntent(intent) {
  const str = JSON.stringify({
    p: intent.purpose,
    f: intent.focus,
    s: intent.teamSize,
    t: intent.preferredTone,
    v: intent.visualPreference,
    c: intent.complexityAppetite,
    sp: intent.spaces,
  });
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `intent-${Math.abs(hash)}`;
}

// ------------------------------------------------------------
// 6. Core design-principle guardrail (single validation layer)
// Runs on generation, inline edit, and regenerate. No bypass exists.
// ------------------------------------------------------------
export function validateConfig(config, intent = {}) {
  const next = JSON.parse(JSON.stringify(config));

  // Rooms: enforce protected rooms, bounds, non-empty + unique labels, order.
  let rooms = Array.isArray(next.rooms) ? next.rooms : [];

  REQUIRED_ROOM_IDS.forEach((id) => {
    if (!rooms.some((r) => r.id === id)) {
      rooms.unshift(homeRoom());
    }
  });
  rooms = rooms.map((room) =>
    REQUIRED_ROOM_IDS.includes(room.id) ? { ...room, required: true } : room
  );

  if (rooms.length > MAX_ROOMS) {
    const required = rooms.filter((r) => r.required);
    const optional = rooms.filter((r) => !r.required).slice(0, MAX_ROOMS - required.length);
    rooms = [...required, ...optional];
  }
  if (rooms.length < MIN_ROOMS) rooms = [homeRoom()];

  const seen = new Set();
  rooms = rooms.map((room, index) => {
    let name = (room.name || "").trim().slice(0, MAX_LABEL_LENGTH);
    if (!name) name = `Room ${index + 1}`;
    let unique = name;
    let n = 2;
    while (seen.has(unique.toLowerCase())) {
      unique = `${name} ${n}`;
      n += 1;
    }
    seen.add(unique.toLowerCase());
    return { ...room, name: unique, order: index };
  });
  next.rooms = rooms;

  // Naming system
  if (!NAMING_SYSTEMS.includes(next.naming?.system)) {
    next.naming = { system: "functional", labels: { ...NAMING_LABELS.functional } };
  }
  const labels = next.naming.labels || {};
  ["room", "project", "task"].forEach((k) => {
    if (!labels[k] || !labels[k].trim()) labels[k] = NAMING_LABELS.functional[k];
    labels[k] = labels[k].trim().slice(0, MAX_LABEL_LENGTH);
  });
  next.naming.labels = labels;

  // Tools: core tools always present, enabled, placement valid.
  const roomIds = new Set(rooms.map((r) => r.id));
  let tools = Array.isArray(next.tools) ? next.tools : [];
  CORE_TOOL_KEYS.forEach((key) => {
    const existing = tools.find((t) => t.key === key);
    if (!existing) {
      tools.push({
        id: `t-${key}`,
        key,
        label: TOOL_CATALOG[key].label,
        icon: TOOL_CATALOG[key].icon,
        enabled: true,
        core: true,
        placement: "home",
      });
    } else {
      existing.enabled = true;
      existing.core = true;
    }
  });
  tools = tools.map((tool) => ({
    ...tool,
    placement: roomIds.has(tool.placement) ? tool.placement : "home",
  }));
  next.tools = tools;

  // Navigation density
  if (!DENSITY_TOKENS.includes(next.navigation?.density)) {
    next.navigation = { density: "comfortable" };
  }

  // Workflow complexity — advanced gated behind capable-user check.
  if (!COMPLEXITY_TOKENS.includes(next.workflow?.complexity)) {
    next.workflow = { complexity: "standard" };
  }
  if (next.workflow.complexity === "advanced" && intent.experienceLevel === "novice") {
    next.workflow.complexity = "standard";
  }

  // Presentation tokens
  if (!TONE_TOKENS.includes(next.presentation?.tone)) {
    next.presentation = { ...next.presentation, tone: "calm" };
  }
  if (!VISUAL_TOKENS.includes(next.presentation?.visualEmphasis)) {
    next.presentation = { ...next.presentation, visualEmphasis: "text" };
  }

  return next;
}

// ------------------------------------------------------------
// Provisioning: committed WorkspaceConfig -> live workspace object
// (matches the shape the rest of the app renders).
// ------------------------------------------------------------
const OVERVIEW_SAFE_TYPES = ["discussion", "planning", "creative", "execution", "archive"];

export function provisionWorkspace(config, intent) {
  const nowIso = new Date().toISOString();
  const title = intent.domain ? `${intent.domain} Studio` : "Custom Studio";
  const idCore = (intent.domain || "custom").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const rooms = config.rooms.map((room) => {
    const roomTools = config.tools.filter((t) => t.enabled && t.placement === room.id);
    const extraTabs = roomTools
      .filter((t) => !["chat", "files"].includes(t.key))
      .map((t) => ({ id: `tab-${room.id}-${t.key}`, label: t.label, icon: t.icon }));

    const tabs = [
      { id: `tab-${room.id}-overview`, label: "Overview", icon: "🏠" },
      { id: `tab-${room.id}-messages`, label: "Messages", icon: "💬" },
      { id: `tab-${room.id}-files`, label: "Files", icon: "📁" },
      ...extraTabs,
    ];

    return {
      id: `room-${idCore}-${room.id}`,
      name: room.name,
      icon: room.icon,
      type: OVERVIEW_SAFE_TYPES.includes(room.type) ? room.type : "discussion",
      messages: [
        {
          id: `msg-${idCore}-${room.id}`,
          userId: "user-sketch",
          text: roomWelcome(room, config, intent),
          timestamp: nowIso,
          reactions: [{ emoji: "🤖", count: 1 }],
        },
      ],
      files: [],
      tabs,
    };
  });

  return {
    id: `ws-${idCore}-${Date.now()}`,
    name: `🧩 ${title}`,
    type: "custom",
    description: `AI-built workspace for ${intent.purpose}`,
    presentation: config.presentation,
    navigation: config.navigation,
    workflow: config.workflow,
    generatedConfig: config,
    onboardingProfile: intent.rawSignals,
    rooms,
  };
}

function roomWelcome(room, config, intent) {
  if (room.id === "home") {
    return `Welcome to your ${intent.domain} workspace! I assembled ${config.rooms.length} rooms, a ${config.presentation.tone} tone, and ${config.navigation.density} navigation based on your onboarding answers.`;
  }
  return `This is your ${room.name} space — set up for ${room.type} work with the tools you selected.`;
}
