import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import BrowseHackathons from "./pages/BrowseHackathons/BrowseHackathons";
import HackathonDetails from "./pages/HackathonDetails/HackathonDetails";
import Teams from "./pages/Teams/Teams";
import TeamDetails from "./pages/TeamDetails/TeamDetails";
import HostHackathon from "./pages/HostHackathon/HostHackathon";
import SubmitProject from "./pages/SubmitProject/SubmitProject";
import OrganizerDashboard from "./pages/OrganizerDashboard/OrganizerDashboard";
import ManageHackathon from "./pages/ManageHackathon/ManageHackathon";
import JudgeSubmission from "./pages/JudgeSubmission/JudgeSubmission";
import Leaderboard from "./pages/Leaderboard/Leaderboard";


function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function RoleRoute({ role, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/hackathons" replace />;
  }

  return children;
}


export default function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/hackathons"
          element={<BrowseHackathons />}
        />

        <Route
          path="/hackathons/:id"
          element={<HackathonDetails />}
        />

        <Route
          path="/hackathons/:id/leaderboard"
          element={<Leaderboard />}
        />


        {/* Student routes */}

        <Route
          path="/teams"
          element={
            <RoleRoute role="student">
              <Teams />
            </RoleRoute>
          }
        />

        <Route
          path="/teams/:id"
          element={
            <RoleRoute role="student">
              <TeamDetails />
            </RoleRoute>
          }
        />

        <Route
          path="/teams/:teamId/submit"
          element={
            <RoleRoute role="student">
              <SubmitProject />
            </RoleRoute>
          }
        />


        {/* Organizer routes */}

        <Route
          path="/host"
          element={
            <RoleRoute role="organiser">
              <HostHackathon />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer"
          element={
            <RoleRoute role="organiser">
              <OrganizerDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer/hackathons/:id"
          element={
            <RoleRoute role="organiser">
              <ManageHackathon />
            </RoleRoute>
          }
        />

        <Route
          path="/organizer/submissions/:id"
          element={
            <RoleRoute role="organiser">
              <JudgeSubmission />
            </RoleRoute>
          }
        />

        {/* Unknown route */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}