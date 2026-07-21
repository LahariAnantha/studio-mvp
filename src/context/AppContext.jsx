import { createContext, useContext, useState } from "react";
import { USERS, WORKSPACES } from "../data/mockData";
import { provisionWorkspace } from "../lib/workspaceGeneration";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(USERS.admin);
  const [workspaces, setWorkspaces] = useState(WORKSPACES);
  const [currentWorkspace, setCurrentWorkspace] = useState(WORKSPACES[0]);
  const [currentRoom, setCurrentRoom] = useState(WORKSPACES[0].rooms[0]);
  const [activeTab, setActiveTab] = useState("messages");

  function switchUser(userKey) {
    setCurrentUser(USERS[userKey]);
  }

  function switchWorkspace(wsId) {
    const ws = workspaces.find((w) => w.id === wsId);
    if (ws) {
      setCurrentWorkspace(ws);
      setCurrentRoom(ws.rooms[0]);
      setActiveTab("messages");
    }
  }

  function switchRoom(roomId) {
    const room = currentWorkspace.rooms.find((r) => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
      setActiveTab("messages");
    }
  }

  function commitWorkspace(config, intent) {
    const customWorkspace = provisionWorkspace(config, intent);
    setWorkspaces((prev) => [customWorkspace, ...prev]);
    setCurrentWorkspace(customWorkspace);
    setCurrentRoom(customWorkspace.rooms[0]);
    setActiveTab("messages");
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentWorkspace,
        currentRoom,
        activeTab,
        setActiveTab,
        switchUser,
        switchWorkspace,
        switchRoom,
        commitWorkspace,
        workspaces,
        users: USERS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
