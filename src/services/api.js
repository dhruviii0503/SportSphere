const BASE_URL = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem('sportsphere_token');
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const raw = await res.text();
  let data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch { data = { message: raw || 'Unexpected server response' }; }
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

function buildQuery(params = {}) {
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return q ? `?${q}` : '';
}

// ── Auth ──────────────────────────────────────────────────
export const authAPI = {
  register: (data)   => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login:    (data)   => request('/auth/login',    { method: 'POST', body: JSON.stringify(data) }),
  getMe:    ()       => request('/auth/me'),
};

// ── Users ─────────────────────────────────────────────────
export const usersAPI = {
  getAll:        (params) => request(`/users${buildQuery(params)}`),
  getById:       (id)     => request(`/users/${id}`),
  updateProfile: (data)   => request('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
};

// ── Games ─────────────────────────────────────────────────
export const gamesAPI = {
  getAll:  (params) => request(`/games${buildQuery(params)}`),
  getById: (id)     => request(`/games/${id}`),
  create:  (data)   => request('/games',         { method: 'POST',   body: JSON.stringify(data) }),
  update:  (id, d)  => request(`/games/${id}`,   { method: 'PUT',    body: JSON.stringify(d) }),
  remove:  (id)     => request(`/games/${id}`,   { method: 'DELETE' }),
  join:    (id)     => request(`/games/${id}/join`,  { method: 'POST' }),
  leave:   (id)     => request(`/games/${id}/leave`, { method: 'POST' }),
};

// ── Teams ─────────────────────────────────────────────────
export const teamsAPI = {
  getAll:  (params) => request(`/teams${buildQuery(params)}`),
  getById: (id)     => request(`/teams/${id}`),
  create:  (data)   => request('/teams',         { method: 'POST', body: JSON.stringify(data) }),
  join:    (id)     => request(`/teams/${id}/join`,  { method: 'POST' }),
  leave:   (id)     => request(`/teams/${id}/leave`, { method: 'POST' }),
};

// ── Community ─────────────────────────────────────────────
export const communityAPI = {
  getPosts:   (params) => request(`/community${buildQuery(params)}`),
  createPost: (data)   => request('/community',         { method: 'POST', body: JSON.stringify(data) }),
  likePost:   (id)     => request(`/community/${id}/like`, { method: 'POST' }),
};

// ── Admin ─────────────────────────────────────────────────
export const adminAPI = {
  getStats:   ()   => request('/admin/stats'),
  getUsers:   ()   => request('/admin/users'),
  deleteUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  getGames:   ()   => request('/admin/games'),
  deleteGame: (id) => request(`/admin/games/${id}`, { method: 'DELETE' }),
  getTeams:   ()   => request('/admin/teams'),
};
