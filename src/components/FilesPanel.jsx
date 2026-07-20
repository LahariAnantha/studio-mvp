import { useApp } from "../context/AppContext";
import { getUserById, formatDate } from "../data/mockData";

const FILE_ICONS = {
  pdf: "📄",
  image: "🖼️",
  video: "🎬",
  spreadsheet: "📊",
  archive: "📦",
};

export default function FilesPanel() {
  const { currentRoom } = useApp();
  const files = currentRoom.files || [];

  return (
    <div className="panel">
      <h3 className="panel-title">Files in {currentRoom.name}</h3>
      {files.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📁</p>
          <p>This space is waiting for files.</p>
        </div>
      ) : (
        <ul className="file-list">
          {files.map((file) => {
            const uploader = getUserById(file.uploadedBy);
            return (
              <li key={file.id} className="file-item">
                <span className="file-icon">
                  {FILE_ICONS[file.type] || "📎"}
                </span>
                <div className="file-details">
                  <p className="file-name">{file.name}</p>
                  <p className="file-meta">
                    {file.size} · Uploaded by {uploader?.name} ·{" "}
                    {formatDate(file.uploadedAt)}
                  </p>
                </div>
                <button className="file-action-btn">Download</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
