import { useState } from "react";

const platforms = {
  meta: {
    label: "Meta",
    color: "#0866FF",
    formats: [
      { name: "Feed Image (Square)", dimensions: "1080 × 1080 px", ratio: "1:1", fileSize: "30 MB", type: "Image" },
      { name: "Feed Image (Landscape)", dimensions: "1200 × 628 px", ratio: "1.91:1", fileSize: "30 MB", type: "Image" },
      { name: "Feed Image (Portrait)", dimensions: "1080 × 1350 px", ratio: "4:5", fileSize: "30 MB", type: "Image" },
      { name: "Stories / Reels", dimensions: "1080 × 1920 px", ratio: "9:16", fileSize: "4 GB (video) / 30 MB (image)", type: "Image + Video" },
      { name: "Carousel Card", dimensions: "1080 × 1080 px", ratio: "1:1", fileSize: "30 MB per card", type: "Image" },
      { name: "Feed Video", dimensions: "1080 × 1080 px", ratio: "1:1 recommended", fileSize: "4 GB", type: "Video" },
      { name: "In-Stream Video", dimensions: "1280 × 720 px", ratio: "16:9", fileSize: "4 GB", type: "Video" },
    ]
  },
  whatsapp: {
    label: "WhatsApp",
    color: "#25D366",
    formats: [
      { name: "Image Message", dimensions: "800 × 800 px (recommended)", ratio: "1:1", fileSize: "5 MB", type: "Image" },
      { name: "Image (Wide)", dimensions: "1200 × 628 px", ratio: "1.91:1", fileSize: "5 MB", type: "Image" },
      { name: "Video Message", dimensions: "Any (720p recommended)", ratio: "Any", fileSize: "16 MB", type: "Video" },
      { name: "Document / PDF", dimensions: "N/A", ratio: "N/A", fileSize: "100 MB", type: "Document" },
      { name: "Status (Image)", dimensions: "1080 × 1920 px", ratio: "9:16", fileSize: "5 MB", type: "Image" },
      { name: "Status (Video)", dimensions: "1080 × 1920 px", ratio: "9:16", fileSize: "16 MB", type: "Video" },
    ]
  },
  google: {
    label: "Google Display",
    color: "#EA4335",
    formats: [
      { name: "Medium Rectangle", dimensions: "300 × 250 px", ratio: "1.2:1", fileSize: "150 KB", type: "Image / HTML5" },
      { name: "Leaderboard", dimensions: "728 × 90 px", ratio: "8.09:1", fileSize: "150 KB", type: "Image / HTML5" },
      { name: "Wide Skyscraper", dimensions: "160 × 600 px", ratio: "4:15", fileSize: "150 KB", type: "Image / HTML5" },
      { name: "Large Rectangle", dimensions: "336 × 280 px", ratio: "1.2:1", fileSize: "150 KB", type: "Image / HTML5" },
      { name: "Half Page", dimensions: "300 × 600 px", ratio: "1:2", fileSize: "150 KB", type: "Image / HTML5" },
      { name: "Billboard", dimensions: "970 × 250 px", ratio: "3.88:1", fileSize: "150 KB", type: "Image / HTML5" },
      { name: "Mobile Banner", dimensions: "320 × 50 px", ratio: "6.4:1", fileSize: "150 KB", type: "Image / HTML5" },
      { name: "Large Mobile Banner", dimensions: "320 × 100 px", ratio: "3.2:1", fileSize: "150 KB", type: "Image / HTML5" },
      { name: "Responsive Display Ad", dimensions: "Various (auto-fit)", ratio: "Various", fileSize: "5 MB (image)", type: "Responsive" },
    ]
  }
};

const typeColors = {
  "Image": "#3B82F6",
  "Video": "#8B5CF6",
  "Image + Video": "#EC4899",
  "Document": "#F59E0B",
  "Image / HTML5": "#10B981",
  "Responsive": "#6366F1",
};

export default function CollateralTracker() {
  const [active, setActive] = useState("meta");
  const [search, setSearch] = useState("");

  const platform = platforms[active];
  const filtered = platform.formats.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      background: "#0A0A0A",
      minHeight: "100vh",
      color: "#E8E8E8",
      padding: "0"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Space+Grotesk:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .tab-btn { background: transparent; border: 1px solid #222; cursor: pointer; transition: all 0.15s; font-family: 'DM Mono', monospace; letter-spacing: 0.05em; }
        .tab-btn:hover { border-color: #444; }
        .tab-btn.active { border-color: var(--accent); color: var(--accent); background: rgba(255,255,255,0.03); }
        .row { transition: background 0.1s; }
        .row:hover { background: rgba(255,255,255,0.04) !important; }
        input::placeholder { color: #444; }
        input { outline: none; }
        .badge { font-size: 10px; padding: 2px 8px; border-radius: 100px; font-family: 'DM Mono', monospace; letter-spacing: 0.08em; font-weight: 500; }
        .copy-btn { opacity: 0; transition: opacity 0.15s; background: #1a1a1a; border: 1px solid #2a2a2a; color: #888; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 10px; font-family: 'DM Mono', monospace; }
        .row:hover .copy-btn { opacity: 1; }
        .copy-btn:hover { background: #222; color: #ccc; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.2s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "40px 48px 0", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#555", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif", textTransform: "uppercase" }}>
              Oro Corp — Performance Marketing
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
              Collateral Size Reference
            </h1>
          </div>
          <div style={{ fontSize: 11, color: "#444", textAlign: "right" }}>
            <div>{Object.values(platforms).reduce((a, p) => a + p.formats.length, 0)} formats</div>
            <div>3 platforms</div>
          </div>
        </div>

        {/* Platform Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: -1 }}>
          {Object.entries(platforms).map(([key, p]) => (
            <button
              key={key}
              className={`tab-btn ${active === key ? "active" : ""}`}
              style={{ "--accent": p.color, padding: "10px 20px", fontSize: 12, color: active === key ? p.color : "#555", borderBottom: active === key ? `2px solid ${p.color}` : "2px solid transparent", borderTop: "none", borderLeft: "none", borderRight: "none", background: "transparent" }}
              onClick={() => { setActive(key); setSearch(""); }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px 48px" }}>
        {/* Search */}
        <div style={{ marginBottom: 24, position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: 12 }}>⌕</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter formats..."
            style={{ background: "#111", border: "1px solid #222", borderRadius: 8, padding: "10px 14px 10px 36px", fontSize: 12, color: "#ccc", width: 280 }}
          />
        </div>

        {/* Table */}
        <div style={{ border: "1px solid #1a1a1a", borderRadius: 12, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 0.8fr 1fr 1fr", gap: 0, background: "#0f0f0f", padding: "12px 20px", borderBottom: "1px solid #1a1a1a" }}>
            {["Format", "Dimensions", "Ratio", "Max File Size", "Type"].map(h => (
              <div key={h} style={{ fontSize: 10, letterSpacing: "0.12em", color: "#444", textTransform: "uppercase" }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((f, i) => (
            <div
              key={i}
              className="row animate-in"
              style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 0.8fr 1fr 1fr", gap: 0, padding: "16px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #141414" : "none", background: "transparent", animationDelay: `${i * 0.03}s` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: "#e8e8e8", fontWeight: 500 }}>{f.name}</span>
                <button
                  className="copy-btn"
                  onClick={() => navigator.clipboard.writeText(`${f.name}: ${f.dimensions} | ${f.fileSize}`)}
                >
                  copy
                </button>
              </div>
              <div style={{ fontSize: 13, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>{f.dimensions}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{f.ratio}</div>
              <div style={{ fontSize: 13, color: platform.color, fontWeight: 500 }}>{f.fileSize}</div>
              <div>
                <span className="badge" style={{ background: `${typeColors[f.type]}18`, color: typeColors[f.type], border: `1px solid ${typeColors[f.type]}33` }}>
                  {f.type}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#444", fontSize: 13 }}>
              No formats match "{search}"
            </div>
          )}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 20, fontSize: 11, color: "#333", display: "flex", gap: 24 }}>
          <span>File sizes are maximums.</span>
          <span>Hover a row to copy specs.</span>
          <span style={{ color: "#444" }}>Last updated: {new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
        </div>
      </div>
    </div>
  );
}
