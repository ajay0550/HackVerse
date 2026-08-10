import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BrowseHackathons from "./pages/BrowseHackathons/BrowseHackathons";
import HackathonDetails from "./pages/HackathonDetails/HackathonDetails";
import Teams from "./pages/Teams/Teams";
import TeamDetails from "./pages/TeamDetails/TeamDetails";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/hackathons"
          element={<BrowseHackathons />}
        />

        <Route
          path="/hackathons/:id"
          element={<HackathonDetails />}
        />

        <Route
          path="/teams"
          element={<Teams />}
        />

        <Route
          path="/teams/:id"
          element={<TeamDetails />}
        />



      </Routes>
    </>
  );
}