import { useApp } from "../context/AppContext";
import MessageList from "./MessageList";
import FilesPanel from "./FilesPanel";
import OverviewPanel from "./OverviewPanel";
import InspoPanel from "./InspoPanel";
import TabBar from "./TabBar";

export default function MainContent() {
  const { currentRoom, activeTab } = useApp();

  function renderPanel() {
    const tab = activeTab;

    if (tab === "messages") return <MessageList />;
    if (tab === "files") return <FilesPanel />;
    if (tab === "gallery" && currentRoom.isInspoRoom) return <InspoPanel />;
    if (tab === "overview") return <OverviewPanel />;

    // Generic placeholder for other tabs
    return (
      <div className="panel">
        <h3 className="panel-title">
          {currentRoom.tabs?.find(
            (t) => t.label.toLowerCase().replaceAll(" ", "-") === tab
          )?.icon ?? "📋"}{" "}
          {currentRoom.tabs?.find(
            (t) => t.label.toLowerCase().replaceAll(" ", "-") === tab
          )?.label ?? "Panel"}
        </h3>
        <div className="empty-state">
          <p className="empty-icon">✨</p>
          <p>This space is waiting for ideas.</p>
          <p className="empty-sub">
            Sketch, your AI assistant, can help set this up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="main-content">
      <TabBar />
      <div className="panel-area">{renderPanel()}</div>
    </main>
  );
}
