"use client";

import { useEffect, useState } from "react";
import { AnimeCard } from "@/components/AnimeCard";
import { Search, Bell, Menu } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 text-muted-foreground hover:text-foreground md:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              OrbitCloud
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:text-foreground">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-muted ml-2 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section (Popular) */}
      <div className="pt-14">
        {loading ? (
          <div className="w-full h-[40vh] md:h-[60vh] bg-muted animate-pulse" />
        ) : (
          <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
            {data?.popular?.[0] && (
              <>
                <div className="absolute inset-0">
                  <img 
                    src={data.popular[0].img} 
                    alt={data.popular[0].title}
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-3xl">
                  <span className="px-2 py-1 text-xs font-bold bg-primary text-white rounded mb-3 inline-block">
                    #1 POPULAR
                  </span>
                  <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 line-clamp-2">
                    {data.popular[0].title}
                  </h2>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-white/90 transition flex items-center gap-2 text-sm md:text-base">
                      <Play className="w-4 h-4 fill-current" /> Play
                    </button>
                    <button className="px-6 py-2 bg-white/20 text-white font-semibold rounded-md hover:bg-white/30 transition backdrop-blur-md text-sm md:text-base">
                      More Info
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content Rows */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col gap-8">
        <Section title="Trending Now" items={data?.popular?.slice(1)} loading={loading} />
        <Section title="Latest Donghua" items={data?.latestDonghua} loading={loading} />
        <Section title="Latest Anime" items={data?.latestAnime} loading={loading} />
      </div>
    </main>
  );
}

function Section({ title, items, loading }: { title: string, items: any[], loading: boolean }) {
  if (loading) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground/90">{title}</h3>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[120px] sm:w-[140px] md:w-[160px] flex-shrink-0">
              <div className="aspect-[3/4] bg-muted rounded-xl animate-pulse mb-2" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-foreground/90 flex items-center gap-2">
        {title}
        <span className="text-xs text-primary cursor-pointer hover:underline ml-2">View All</span>
      </h3>
      <div className="flex gap-3 md:gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {items.map((item, i) => (
          <AnimeCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

// Simple Play icon for hero
function Play(props: any) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
