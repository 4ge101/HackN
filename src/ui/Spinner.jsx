export default function Spinner({ size = 20 }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: "2px solid #e8e8e0",
          borderTopColor: "#FF6600",
          borderRadius: "50%",
          animation: "hn-spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes hn-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
