import { Link } from "react-router-dom";

export default function Navbar({ theme, query, onSearch }) {
  const isDark = theme === "dark";

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 32px",
        background: isDark ? "#000" : "#fff",
        borderBottom: `1px solid ${isDark ? "#1f1f1f" : "#e0e0e0"}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        gap: 20,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#ff8500",
          fontSize: 28,
          fontWeight: 700,
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "-1px",
          flexShrink: 0,
        }}
      >
        HN
      </Link>

      <div style={{ flex: 1, maxWidth: 480 }}>
        <input
          type="text"
          placeholder="Search stories..."
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "9px 16px",
            borderRadius: 8,
            border: `1px solid ${isDark ? "#2a2a2a" : "#e0e0e0"}`,
            background: isDark ? "#111" : "#f5f5f5",
            color: isDark ? "#fff" : "#111",
            fontFamily: "Poppins, sans-serif",
            fontSize: 14,
            outline: "none",
          }}
        />
      </div>

      <div
        style={{
          fontSize: 11,
          color: isDark ? "#333" : "#bbb",
          fontFamily: "monospace",
          flexShrink: 0,
        }}
      >
        j/k ↕ · o open · c comments · b bookmark
      </div>
    </nav>
  );
}
