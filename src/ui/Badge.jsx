export default function Badge({ children, color = "#FF6600" }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontFamily: "'IBM Plex Mono', monospace",
        padding: "2px 6px",
        borderRadius: 3,
        background: `${color}22`,
        color,
        border: `0.5px solid ${color}44`,
        marginRight: 4,
      }}
    >
      {children}
    </span>
  );
}
