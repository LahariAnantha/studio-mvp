import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <AppProvider>
      <div className="app-shell">
        <Sidebar />
        <MainContent />
      </div>
    </AppProvider>
  );
}
