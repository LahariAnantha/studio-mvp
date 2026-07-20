import { useApp } from "../context/AppContext";

const OVERVIEW_CONTENT = {
  discussion: {
    title: "Discussion Room",
    desc: "An open space for team conversation, ideas, and updates.",
    features: ["💬 Real-time messaging", "😀 Reactions & emoji", "📌 Pinned messages", "🔔 Notifications"],
  },
  planning: {
    title: "Planning Room",
    desc: "Coordinate tasks, timelines, and team strategy.",
    features: ["✅ Task tracking", "📅 Scheduling", "📋 Checklists", "🗺️ Whiteboards"],
  },
  creative: {
    title: "Creative Room",
    desc: "A space for inspiration, mood boards, and creative collaboration.",
    features: ["🖼️ Inspiration gallery", "🎨 Mood boards", "📌 Reference pins", "💡 Idea capture"],
  },
  execution: {
    title: "Execution Room",
    desc: "Get things done — track progress and coordinate actions.",
    features: ["🏃 Sprint tracking", "📊 Progress reports", "⚡ Quick actions", "📣 Announcements"],
  },
  archive: {
    title: "Archive Room",
    desc: "A history of your team's past work and achievements.",
    features: ["🏆 Result logs", "📁 Archived files", "📊 Analytics", "🔍 Search history"],
  },
};

export default function OverviewPanel() {
  const { currentRoom } = useApp();
  const content = OVERVIEW_CONTENT[currentRoom.type] || OVERVIEW_CONTENT.discussion;

  return (
    <div className="panel">
      <h3 className="panel-title">
        {currentRoom.icon} {currentRoom.name}
      </h3>
      <div className="overview-card">
        <p className="overview-type">{content.title}</p>
        <p className="overview-desc">{content.desc}</p>
        <ul className="overview-features">
          {content.features.map((f, i) => (
            <li key={i} className="overview-feature-item">
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="overview-stats">
        <div className="stat-card">
          <span className="stat-number">{currentRoom.messages?.length ?? 0}</span>
          <span className="stat-label">Messages</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{currentRoom.files?.length ?? 0}</span>
          <span className="stat-label">Files</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{currentRoom.tabs?.length ?? 0}</span>
          <span className="stat-label">Tabs</span>
        </div>
      </div>
    </div>
  );
}
