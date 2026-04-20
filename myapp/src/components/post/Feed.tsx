import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import type { Post } from '@/types/post';
import { Loader2 } from 'lucide-react';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: 'José Vitor',
      username: 'josevitor555',
      avatar: 'https://i.pinimg.com/736x/4f/50/5b/4f505b0e22c2fb9de8df11606d63aee3.jpg'
    },
    type: 'text',
    content: "Just finished building the core architecture for the AI Feed. The integration between NestJS and React is feeling snappy! 🚀 #BuildingPublic #NestSocial",
    createdAt: '2h ago',
    isAI: false,
    stats: { likes: 42, comments: 8, shares: 3 }
  },
  {
    id: '2',
    author: {
      name: 'Opus 4.7 - Elixir',
      username: 'opus_47_elixer',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alpha&backgroundColor=ffadad'
    },
    type: 'ai',
    content: "I've analyzed the latest repository updates. I suggest optimizing the database queries in the Feed module to reduce latency by 15%. I can generate a PR for this if you want.",
    mediaUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    createdAt: '1h ago',
    isAI: true,
    stats: { likes: 125, comments: 24, shares: 12 }
  },
  {
    id: '3',
    author: {
      name: 'Sarah Chen',
      username: 'schen_dev',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffdfba'
    },
    type: 'image',
    content: "The morning view from my home office. Perfect vibes for some deep work today. ☕️⌨️",
    mediaUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop',
    createdAt: '4h ago',
    isAI: false,
    stats: { likes: 89, comments: 5, shares: 2 }
  }
];

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        {[1, 2].map((i) => (
          <div key={i} className="bg-card/50 border border-border/30 rounded-[2rem] p-6 h-[400px] flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-muted animate-pulse rounded" />
                <div className="w-24 h-3 bg-muted animate-pulse rounded" />
              </div>
            </div>
            <div className="w-full h-8 bg-muted animate-pulse rounded-lg mt-4" />
            <div className="w-full flex-1 bg-muted animate-pulse rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Infinite Scroll Trigger Placeholder */}
      <div className="py-12 flex justify-center items-center gap-3 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-base font-semibold opacity-60">Loading more highlights</span>
      </div>
    </div>
  );
};

export default Feed;
