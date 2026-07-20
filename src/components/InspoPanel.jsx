import { useApp } from "../context/AppContext";

export default function InspoPanel() {
  const { currentRoom } = useApp();

  return (
    <div className="panel">
      <h3 className="panel-title">✨ Fashion Inspo Gallery</h3>
      <div className="inspo-image-wrapper">
        <img
          src={currentRoom.inspoImage}
          alt={currentRoom.inspoImageAlt || "Fashion inspiration"}
          className="inspo-image"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="inspo-image-fallback" style={{ display: "none" }}>
          <span className="inspo-fallback-icon">👗</span>
          <p>Fashion Inspo Image</p>
          <p className="inspo-fallback-sub">Tonal dressing · Quiet luxury</p>
        </div>
      </div>
      <div className="inspo-caption">
        <p className="inspo-caption-text">
          🌿 Quiet Luxury — Tonal Dressing, Oversized Silhouettes & Minimalist Accessories
        </p>
        <div className="inspo-tags">
          {["#QuietLuxury", "#EditorialFashion", "#TonalDressing", "#AW26", "#FashionInspo"].map((tag) => (
            <span key={tag} className="inspo-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
