import { useApp } from "../context/AppContext";
import { USERS } from "../data/mockData";

export default function Sidebar() {
  const {
    currentUser,
    currentWorkspace,
    currentRoom,
    workspaces,
    switchUser,
    switchWorkspace,
    switchRoom,
  } = useApp();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-icon">✏️</span>
        <span className="logo-text">Studio</span>
      </div>

      {/* User Switcher */}
      <div className="sidebar-section">
        <p className="sidebar-label">Logged in as</p>
        <div className="user-switcher">
          {Object.entries(USERS)
            .filter(([, u]) => !u.isAI)
            .map(([key, user]) => (
              <button
                key={key}
                className={`user-btn ${currentUser.id === user.id ? "active" : ""}`}
                onClick={() => switchUser(key)}
                title={user.email}
              >
                <span
                  className="avatar-badge"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  {user.avatar}
                </span>
                <span className="user-btn-name">{user.name}</span>
                <span className="user-btn-role">{user.role}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Workspace Switcher */}
      <div className="sidebar-section">
        <p className="sidebar-label">Workspaces</p>
        <div className="workspace-list">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              className={`workspace-btn ${currentWorkspace.id === ws.id ? "active" : ""}`}
              onClick={() => switchWorkspace(ws.id)}
            >
              {ws.name}
            </button>
          ))}
        </div>
      </div>

      {/* Rooms List */}
      <div className="sidebar-section sidebar-rooms">
        <p className="sidebar-label">Rooms</p>
        <nav className="room-list">
          {currentWorkspace.rooms.map((room) => (
            <button
              key={room.id}
              className={`room-btn ${currentRoom.id === room.id ? "active" : ""}`}
              onClick={() => switchRoom(room.id)}
            >
              <span className="room-icon">{room.icon}</span>
              <span className="room-name">{room.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* AI Assistant */}
      <div className="sidebar-footer">
        <div className="sketch-badge">
          <span className="sketch-avatar">✏️</span>
          <div>
            <p className="sketch-name">Sketch</p>
            <p className="sketch-desc">AI Assistant · Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
