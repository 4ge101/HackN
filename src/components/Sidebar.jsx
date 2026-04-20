import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/icons/home.svg";
import FavouriteIcon from "../assets/icons/favourite.svg";
import SettingIcon from "../assets/icons/setting.svg";
import BookMarkIcon from "../assets/icons/book-mark.svg";
import TrendingIcon from "../assets/icons/trending.svg";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/new", label: "Trending", icon: TrendingIcon },
  { to: "/saved", label: "Bookmarks", icon: BookMarkIcon },
  { to: "/ask", label: "Favourites", icon: FavouriteIcon },
  { to: "/settings", label: "Settings", icon: SettingIcon },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: "#0a0a0a",
        borderRight: "1px solid #1f1f1f",
        padding: "30px 0",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }}
    >
      {NAV_ITEMS.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "13px 28px",
            color: isActive ? "#ff8500" : "#aaa",
            textDecoration: "none",
            fontFamily: "Poppins, sans-serif",
            fontSize: 20,
            fontWeight: isActive ? 600 : 400,
            background: isActive ? "rgba(255,133,0,0.08)" : "transparent",
            borderLeft: isActive
              ? "3px solid #ff8500"
              : "3px solid transparent",
            transition: "all 0.15s",
          })}
        >
          <img src={icon} alt={label} style={{ width: 30, height: 30 }} />
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
