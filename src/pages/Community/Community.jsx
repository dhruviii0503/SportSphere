
import { useEffect, useMemo, useState } from 'react';
import { Heart, Send, Users } from 'lucide-react';
import { communityAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const SPORTS = [
  '',
  'Football',
  'Cricket',
  'Badminton',
  'Basketball',
  'Volleyball',
  'Tennis'
];

const SPORT_ICONS = {
  Football: '⚽',
  Cricket: '🏏',
  Badminton: '🏸',
  Basketball: '🏀',
  Volleyball: '🏐',
  Tennis: '🎾'
};

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}

function Community() {
  const { isAuthenticated, user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    content: '',
    sport: ''
  });
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [activeSport, setActiveSport] = useState('');

  useEffect(() => {
    communityAPI.getPosts()
      .then(data => setPosts(data.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!activeSport) return posts;

    return posts.filter(
      post => post.sport?.toLowerCase() === activeSport.toLowerCase()
    );
  }, [posts, activeSport]);

  const handlePost = async (e) => {
    e.preventDefault();

    if (!newPost.content.trim()) return;

    setPosting(true);
    setError('');

    try {
      const data = await communityAPI.createPost(newPost);

      setPosts(prev => [data.post, ...prev]);
      setNewPost({
        content: '',
        sport: ''
      });

      setActiveSport('');
    } catch (err) {
      setError(err.message || 'Failed to post');
    } finally {
      setPosting(false);
    }
  };


const handleLike = async (postId) => {
  if (!isAuthenticated) return;

  try {
    const data = await communityAPI.likePost(postId);

    setPosts(prev =>
      prev.map(post =>
        post._id === postId
          ? {
              ...post,
              likes: data.likeIds
            }
          : post
      )
    );
  } catch (err) {
    console.error('Like failed:', err);
  }
};


  return (
    <main className="min-h-screen bg-[#050816] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
          SportSphere Community
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Find Your People.
          <span className="block text-indigo-400">
            Play Together.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Connect with players, share your sports journey, and build your community.
        </p>

        {/* Create Post */}
        {isAuthenticated && (
          <form
            onSubmit={handlePost}
            className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-sm font-semibold text-indigo-300">
                {user?.name?.charAt(0)}
              </div>

              <div className="flex-1">

                <textarea
                  value={newPost.content}
                  onChange={e =>
                    setNewPost({
                      ...newPost,
                      content: e.target.value
                    })
                  }
                  placeholder="Share something with the SportSphere community..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
                />

                {error && (
                  <p className="mt-2 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between">

                  <select
                    value={newPost.sport}
                    onChange={e =>
                      setNewPost({
                        ...newPost,
                        sport: e.target.value
                      })
                    }
                    className="rounded-xl border border-white/10 bg-[#080b1c] px-3 py-2 text-sm text-white outline-none"
                  >
                    {SPORTS.map(sport => (
                      <option
                        key={sport}
                        value={sport}
                        className="bg-[#080b1c]"
                      >
                        {sport || 'General'}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    disabled={posting || !newPost.content.trim()}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {posting ? 'Posting...' : 'Post'}
                  </button>

                </div>
              </div>
            </div>
          </form>
        )}

        {/* Sport Filters */}
        <div className="mt-10">
          <div className="flex flex-wrap gap-2">

            {SPORTS.map(sport => {
              const selected = activeSport === sport;

              return (
                <button
                  key={sport || 'all'}
                  type="button"
                  onClick={() => setActiveSport(sport)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selected
                      ? 'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-indigo-500/50 hover:text-white'
                  }`}
                >
                  {sport
                    ? `${SPORT_ICONS[sport]} ${sport}`
                    : 'All Sports'}
                </button>
              );
            })}

          </div>
        </div>

        {/* Posts Feed */}
        <div className="mt-6 space-y-5">

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">

              <Users className="mx-auto h-10 w-10 text-slate-600" />

              <p className="mt-4 text-slate-400">
                {activeSport
                  ? `No ${activeSport} posts yet. Be the first to share!`
                  : 'No posts yet. Be the first to share!'}
              </p>

              {activeSport && (
                <button
                  onClick={() => setActiveSport('')}
                  className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  View all posts
                </button>
              )}

            </div>
          ) : (
            filteredPosts.map(post => (
              <article
                key={post._id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-sm font-semibold text-indigo-300">
                    {post.author?.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {post.author?.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {post.author?.location} · {timeAgo(post.createdAt)}
                    </p>
                  </div>

                  {post.sport && (
                    <span className="ml-auto rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400">
                      {SPORT_ICONS[post.sport]} {post.sport}
                    </span>
                  )}

                </div>

                <p className="mt-4 leading-7 text-slate-300">
                  {post.content}
                </p>

                <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-4">

                  <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-red-400"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{post.likes?.length || 0}</span>
                  </button>

                </div>

              </article>
            ))
          )}

        </div>

      </div>
    </main>
  );
}

export default Community;
