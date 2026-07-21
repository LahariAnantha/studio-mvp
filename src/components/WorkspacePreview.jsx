import { useMemo, useState } from "react";
import {
  TONE_TOKENS,
  DENSITY_TOKENS,
  VISUAL_TOKENS,
  COMPLEXITY_TOKENS,
  NAMING_SYSTEMS,
  TOOL_CATALOG,
  REGEN_DELTAS,
  MAX_ROOMS,
  generateConfig,
  validateConfig,
} from "../lib/workspaceGeneration";

const ROOM_TYPE_ICONS = {
  dashboard: "🏠",
  discussion: "💬",
  planning: "🗺️",
  creative: "💡",
  execution: "🎓",
  archive: "📚",
};

function Segmented({ label, value, options, onChange }) {
  return (
    <div className="dim-control">
      <span className="dim-control-label">{label}</span>
      <div className="segmented">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`segmented-btn ${value === option ? "active" : ""}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function WorkspacePreview({ intent, initialConfig, onAccept, onStartOver }) {
  const [config, setConfig] = useState(initialConfig);
  const [history, setHistory] = useState([]);
  const [building, setBuilding] = useState(false);

  const canAddRoom = config.rooms.length < MAX_ROOMS;

  const enabledToolCount = useMemo(
    () => config.tools.filter((t) => t.enabled).length,
    [config.tools]
  );

  function commit(nextConfig) {
    setHistory((prev) => [...prev, config]);
    setConfig(validateConfig(nextConfig, intent));
  }

  function undo() {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setConfig(last);
      return prev.slice(0, -1);
    });
  }

  function regenerate(delta) {
    setHistory((prev) => [...prev, config]);
    setConfig(generateConfig(intent, { delta }));
  }

  // ----- Room edits -----
  function renameRoom(id, name) {
    commit({
      ...config,
      rooms: config.rooms.map((r) => (r.id === id ? { ...r, name } : r)),
    });
  }
  function removeRoom(id) {
    commit({ ...config, rooms: config.rooms.filter((r) => r.id !== id) });
  }
  function moveRoom(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= config.rooms.length) return;
    const rooms = [...config.rooms];
    [rooms[index], rooms[target]] = [rooms[target], rooms[index]];
    commit({ ...config, rooms });
  }
  function addRoom() {
    if (!canAddRoom) return;
    const id = `custom-${Date.now()}`;
    commit({
      ...config,
      rooms: [
        ...config.rooms,
        { id, name: "New Room", type: "planning", icon: "🗂️", tools: [], required: false },
      ],
    });
  }

  // ----- Tool edits -----
  function toggleTool(id) {
    commit({
      ...config,
      tools: config.tools.map((t) =>
        t.id === id && !t.core ? { ...t, enabled: !t.enabled } : t
      ),
    });
  }
  function moveToolPlacement(id, placement) {
    commit({
      ...config,
      tools: config.tools.map((t) => (t.id === id ? { ...t, placement } : t)),
    });
  }

  // ----- Dimension edits -----
  function setNamingSystem(system) {
    commit({ ...config, naming: { ...config.naming, system } });
  }
  function setDensity(density) {
    commit({ ...config, navigation: { density } });
  }
  function setComplexity(complexity) {
    commit({ ...config, workflow: { complexity } });
  }
  function setTone(tone) {
    commit({ ...config, presentation: { ...config.presentation, tone } });
  }
  function setVisual(visualEmphasis) {
    commit({ ...config, presentation: { ...config.presentation, visualEmphasis } });
  }

  function handleAccept() {
    setBuilding(true);
    // Small delay so the assembling state is visible.
    setTimeout(() => onAccept(config), 500);
  }

  if (building) {
    return (
      <div className="preview-page">
        <div className="preview-building">
          <div className="preview-spinner" />
          <h2>Building your Studio…</h2>
          <p>Assembling rooms → tools → layout → tone</p>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-page">
      <div className="preview-card">
        <header className="preview-header">
          <div>
            <p className="onboarding-kicker">2️⃣ BUILDING THE STUDIO — REVIEW YOUR WORKSPACE</p>
            <h1 className="preview-title">Here's the workspace I generated for you</h1>
            <p className="preview-subtitle">
              This is a draft preview — nothing is built yet. Edit any part, regenerate, or accept
              to provision your Studio.
            </p>
          </div>
          <div className="preview-summary-chips">
            <span className="chip">{config.rooms.length} rooms</span>
            <span className="chip">{enabledToolCount} tools</span>
            <span className="chip">{config.presentation.tone}</span>
            <span className="chip">{config.navigation.density}</span>
          </div>
        </header>

        {/* Room structure */}
        <section className="dim">
          <div className="dim-head">
            <h3>🧩 Room structure</h3>
            <p className="dim-rationale">{config.rationale?.rooms}</p>
          </div>
          <ul className="room-editor-list">
            {config.rooms.map((room, index) => (
              <li key={room.id} className="room-editor-item">
                <span className="room-editor-icon">
                  {room.icon || ROOM_TYPE_ICONS[room.type] || "🗂️"}
                </span>
                <input
                  className="room-editor-input"
                  value={room.name}
                  onChange={(e) => renameRoom(room.id, e.target.value)}
                  maxLength={28}
                />
                <span className="room-editor-type">{room.type}</span>
                <div className="room-editor-actions">
                  <button type="button" onClick={() => moveRoom(index, -1)} disabled={index === 0}>
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveRoom(index, 1)}
                    disabled={index === config.rooms.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="room-remove"
                    onClick={() => removeRoom(room.id)}
                    disabled={room.required}
                    title={room.required ? "Required room" : "Remove room"}
                  >
                    {room.required ? "🔒" : "✕"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="dim-add-btn"
            onClick={addRoom}
            disabled={!canAddRoom}
          >
            + Add room {canAddRoom ? "" : `(max ${MAX_ROOMS})`}
          </button>
        </section>

        {/* Tools */}
        <section className="dim">
          <div className="dim-head">
            <h3>🧰 Tool selection</h3>
            <p className="dim-rationale">{config.rationale?.tools}</p>
          </div>
          <ul className="tool-editor-list">
            {config.tools.map((tool) => (
              <li key={tool.id} className={`tool-editor-item ${tool.enabled ? "on" : "off"}`}>
                <label className="tool-toggle">
                  <input
                    type="checkbox"
                    checked={tool.enabled}
                    disabled={tool.core}
                    onChange={() => toggleTool(tool.id)}
                  />
                  <span>
                    {TOOL_CATALOG[tool.key]?.icon} {tool.label}
                    {tool.core && <span className="tool-core-tag">core</span>}
                  </span>
                </label>
                <select
                  className="tool-placement"
                  value={tool.placement}
                  disabled={!tool.enabled}
                  onChange={(e) => moveToolPlacement(tool.id, e.target.value)}
                >
                  {config.rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </section>

        {/* Naming / density / complexity / tone / visual */}
        <section className="dim">
          <div className="dim-head">
            <h3>🎛️ Layout & style</h3>
            <p className="dim-rationale">{config.rationale?.presentation}</p>
          </div>
          <div className="dim-controls-grid">
            <Segmented
              label="Naming system"
              value={config.naming.system}
              options={NAMING_SYSTEMS}
              onChange={setNamingSystem}
            />
            <Segmented
              label="Navigation density"
              value={config.navigation.density}
              options={DENSITY_TOKENS}
              onChange={setDensity}
            />
            <Segmented
              label="Workflow complexity"
              value={config.workflow.complexity}
              options={COMPLEXITY_TOKENS}
              onChange={setComplexity}
            />
            <Segmented
              label="Tone"
              value={config.presentation.tone}
              options={TONE_TOKENS}
              onChange={setTone}
            />
            <Segmented
              label="Visual emphasis"
              value={config.presentation.visualEmphasis}
              options={VISUAL_TOKENS}
              onChange={setVisual}
            />
          </div>
          <p className="dim-guardrail-note">
            🔒 All values map to approved design tokens — off-brand values are snapped back
            automatically.
          </p>
        </section>

        {/* Regenerate */}
        <section className="dim regen">
          <div className="dim-head">
            <h3>🔄 Not quite right?</h3>
            <p className="dim-rationale">
              Regenerate with a nudge. Your workspace will be re-assembled from your onboarding
              signals.
            </p>
          </div>
          <div className="regen-chips">
            {REGEN_DELTAS.map((d) => (
              <button
                key={d.id}
                type="button"
                className="regen-chip"
                onClick={() => regenerate(d.id)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </section>

        <footer className="preview-actions">
          <button
            type="button"
            className="preview-secondary"
            onClick={undo}
            disabled={history.length === 0}
          >
            ↩ Undo
          </button>
          <button type="button" className="preview-tertiary" onClick={onStartOver}>
            Start over
          </button>
          <button type="button" className="preview-primary" onClick={handleAccept}>
            Accept &amp; Build →
          </button>
        </footer>
      </div>
    </div>
  );
}
