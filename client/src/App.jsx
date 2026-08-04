import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BrowseHackathons from "./pages/BrowseHackathons/BrowseHackathons";
import HackathonDetails from "./pages/HackathonDetails/HackathonDetails";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hackathons" element={<BrowseHackathons />} />
        <Route
          path="/hackathons/:id"
          element={<HackathonDetails />}
        />
      </Routes>
      <Footer/>
    </>
  );
}