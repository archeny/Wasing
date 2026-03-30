import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Link from "next/link";

interface AnimeCardProps {
  title: string;
  img: string;
  link: string;
  ep?: string;
  type?: string;
  is_completed?: boolean;
  className?: string;
}

export function AnimeCard({ title, img, link, ep, type, is_completed, className }: AnimeCardProps) {
  return (
    <Link href={link} className={cn("group relative flex flex-col gap-2 w-[120px] sm:w-[140px] md:w-[160px] flex-shrink-0 cursor-pointer", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={img || "/placeholder.jpg"} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-4 h-4 text-white ml-1" />
          </div>
        </div>

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {type && (
            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white bg-primary/90 rounded backdrop-blur-md">
              {type}
            </span>
          )}
        </div>
        
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
          {ep && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium text-white bg-black/60 rounded backdrop-blur-md">
              {ep}
            </span>
          )}
          {is_completed && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium text-green-400 bg-black/60 rounded backdrop-blur-md">
              END
            </span>
          )}
        </div>
      </div>
      <h3 className="text-xs sm:text-sm font-medium line-clamp-2 text-foreground/90 group-hover:text-primary transition-colors">
        {title}
      </h3>
    </Link>
  );
}
