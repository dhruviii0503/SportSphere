import { useEffect, useState } from 'react';
import { adminAPI } from '../../services/api';
import { Users, Calendar, Trophy, Trash2 } from 'lucide-react';

function AdminDashboard() {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (tab === 'users') {
      adminAPI.getUsers().then(d => setUsers(d.users || [])).catch(() => {}).finally(() => setLoading(false));
    } else if (tab === 'games') {
      adminAPI.getGames().then(d => setGames(d.games || [])).catch(() => {}).finally(() => setLoading(false));
    } else {
      adminAPI.getTeams().then(d => setTeams(d.teams || [])).catch(() => {}).finally(() => setLoading(false));
    }
  }, [tab]);

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user permanently?')) return;
    try {
      await adminAPI.deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
    } catch {}
  };

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'games', label: 'Games', icon: Calendar },
    { id: 'teams', label: 'Teams', icon: Trophy },
  ];

  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">Admin Panel</p>
        <h1 className="mt-4 text-4xl font-bold">Platform Management</h1>

        <div className="mt-8 flex gap-3">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${tab === t.id ? 'bg-indigo-600 text-white' : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]'}`}>
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  {tab === 'users' && ['Name', 'Email', 'Location', 'Role', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">{h}</th>
                  ))}
                  {tab === 'games' && ['Title', 'Sport', 'Host', 'Date', 'Players'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">{h}</th>
                  ))}
                  {tab === 'teams' && ['Name', 'Sport', 'Captain', 'Members', 'Status'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tab === 'users' && users.map(u => (
                  <tr key={u._id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{u.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{u.location || '-'}</td>
                    <td className="px-6 py-4"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${u.role === 'admin' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-white/10 text-slate-400'}`}>{u.role}</span></td>
                    <td className="px-6 py-4">
                      {u.role !== 'admin' && (
                        <button onClick={() => handleDeleteUser(u._id)} className="text-red-400 hover:text-red-300 transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {tab === 'games' && games.map(g => (
                  <tr key={g._id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-medium">{g.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{g.sport}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{g.host?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{new Date(g.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{g.currentPlayers?.length}/{g.maxPlayers}</td>
                  </tr>
                ))}
                {tab === 'teams' && teams.map(t => (
                  <tr key={t._id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-medium">{t.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{t.sport}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{t.captain?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{t.members?.length}/{t.maxMembers}</td>
                    <td className="px-6 py-4"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.status === 'open' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-red-600/20 text-red-400'}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
