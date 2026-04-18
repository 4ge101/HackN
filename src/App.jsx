import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Story from "./Pages/Story";
import User from "./Pages/User";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element{<Home feed='top' />} />
          <Route path="/" element{<Home feed='top' />} />
          <Route path="/" element{<Home feed='top' />} />
          <Route path="/" element{<Home feed='top' />} />
          <Route path="/" element{<Home feed='top' />} />
          <Route path="/" element{<Home feed='top' />} />
          <Route path="/" element{<Home feed='top' />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
}
