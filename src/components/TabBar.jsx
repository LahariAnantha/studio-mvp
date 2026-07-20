import { useApp } from "../context/AppContext";

export default function TabBar() {
  const { currentRoom, activeTab, setActiveTab } = useApp();

  return (
    <div className="tab-bar">
      {currentRoom.tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.label.toLowerCase().replace(" ", "-") ? "active" : ""}`}
          onClick={() =>
            setActiveTab(tab.label.toLowerCase().replace(" ", "-"))
          }
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
