import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';

import Home          from './pages/Home/Home';
import Games         from './pages/Games/Games';
import GameDetails   from './pages/Games/GameDetails';
import CreateGame    from './pages/Games/CreateGame';
import Players       from './pages/Players/Players';
import PlayerProfile from './pages/Players/PlayerProfile';
import Teams         from './pages/Teams/Teams';
import CreateTeam    from './pages/Teams/CreateTeam';
import TeamDetails   from './pages/Teams/TeamDetails';
import Community     from './pages/Community/Community';
import Login         from './pages/Auth/Login';
import Register      from './pages/Auth/Register';
import Dashboard     from './pages/Dashboard/Dashboard';
import Profile       from './pages/Profile/Profile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import About         from './pages/static/About';
import Contact       from './pages/static/Contact';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"           element={<Layout><Home /></Layout>} />
          <Route path="/games"      element={<Layout><Games /></Layout>} />
          <Route path="/games/create" element={<Layout><CreateGame /></Layout>} />
          <Route path="/games/:id"  element={<Layout><GameDetails /></Layout>} />
          <Route path="/players"    element={<Layout><Players /></Layout>} />
          <Route path="/player/:id" element={<Layout><PlayerProfile /></Layout>} />
          <Route path="/teams"      element={<Layout><Teams /></Layout>} />
          <Route path="/teams/create" element={<Layout><CreateTeam /></Layout>} />
          <Route path="/teams/:id"  element={<Layout><TeamDetails /></Layout>} />
          <Route path="/community"  element={<Layout><Community /></Layout>} />
          <Route path="/about"      element={<Layout><About /></Layout>} />
          <Route path="/contact"    element={<Layout><Contact /></Layout>} />
          <Route path="/login"      element={<Layout><Login /></Layout>} />
          <Route path="/register"   element={<Layout><Register /></Layout>} />
          {/* Protected */}
          <Route path="/dashboard"  element={<Layout><ProtectedRoute><Dashboard /></ProtectedRoute></Layout>} />
          <Route path="/profile"    element={<Layout><ProtectedRoute><Profile /></ProtectedRoute></Layout>} />
          <Route path="/admin"      element={<Layout><ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
