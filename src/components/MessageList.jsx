import { getUserById, formatTime } from "../data/mockData";
import { useApp } from "../context/AppContext";

function MessageBubble({ message }) {
  const user = getUserById(message.userId);
  const { currentUser } = useApp();
  const isOwn = message.userId === currentUser.id;

  return (
    <div className={`message-row ${isOwn ? "message-row--own" : ""}`}>
      {!isOwn && (
        <div
          className="msg-avatar"
          style={{ backgroundColor: user?.avatarColor }}
        >
          {user?.avatar}
        </div>
      )}
      <div className="message-body">
        {!isOwn && (
          <div className="message-meta">
            <span className="msg-sender">{user?.name}</span>
            {user?.isAI && <span className="ai-badge">AI</span>}
            <span className="msg-time">{formatTime(message.timestamp)}</span>
          </div>
        )}
        <div className={`message-bubble ${user?.isAI ? "message-bubble--ai" : ""} ${isOwn ? "message-bubble--own" : ""}`}>
          {message.text}
        </div>
        {message.reactions && message.reactions.length > 0 && (
          <div className="reactions">
            {message.reactions.map((r, i) => (
              <span key={i} className="reaction">
                {r.emoji} {r.count}
              </span>
            ))}
          </div>
        )}
        {isOwn && (
          <div className="message-meta message-meta--own">
            <span className="msg-time">{formatTime(message.timestamp)}</span>
          </div>
        )}
      </div>
      {isOwn && (
        <div
          className="msg-avatar"
          style={{ backgroundColor: currentUser.avatarColor }}
        >
          {currentUser.avatar}
        </div>
      )}
    </div>
  );
}

export default function MessageList() {
  const { currentRoom } = useApp();

  return (
    <div className="message-list">
      <div className="message-list-header">
        <span className="room-icon-lg">{currentRoom.icon}</span>
        <div>
          <h2 className="message-list-title">{currentRoom.name}</h2>
          <p className="message-list-type">{currentRoom.type} room</p>
        </div>
      </div>
      <div className="messages-container">
        {currentRoom.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
      <div className="message-input-area">
        <input
          className="message-input"
          placeholder={`Message #${currentRoom.name}...`}
          readOnly
        />
        <button className="send-btn">Send ➤</button>
      </div>
    </div>
  );
}
