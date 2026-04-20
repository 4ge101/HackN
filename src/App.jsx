import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Story from "./Pages/Story";
import User from "./Pages/User";
import Saved from "./Pages/Saved";
import Settings from "./Pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home feed="top" />} />
        <Route path="/new" element={<Home feed="new" />} />
        <Route path="/ask" element={<Home feed="ask" />} />
        <Route path="/show" element={<Home feed="show" />} />
        <Route path="/jobs" element={<Home feed="job" />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/item/:id" element={<Story />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<Home feed="top" />} />
      </Routes>
    </BrowserRouter>
  );
}
