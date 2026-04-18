import { useState } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Icon } from "../ui/Icon";

export type Post = {
  author: {
    id?: string;
    name: string;
    role: string;
    school: string;
    tone?: "green" | "purple" | "sand";
    avatar?: string;
  };
  title: string;
  excerpt: string;
  time: string;
  images?: string[];
  stats: { likes: number; comments: number };
};

export function PostCard({
  post,
  onAuthorClick,
}: {
  post: Post;
  onAuthorClick?: (authorId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const authorClickable = Boolean(post.author.id && onAuthorClick);
  const handleAuthorClick = () => {
    if (post.author.id && onAuthorClick) onAuthorClick(post.author.id);
  };
  const isLong = post.excerpt.length > 160;
  const shown = !isLong || expanded
    ? post.excerpt
    : post.excerpt.slice(0, 160).trimEnd() + "…";
  return (
    <article className="flex flex-col gap-20 rounded-[20px] border border-line bg-white p-20 transition-shadow hover:shadow-soft">
      {/* Header */}
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleAuthorClick}
          disabled={!authorClickable}
          className={`flex items-start gap-10 rounded-sm text-left transition-opacity ${
            authorClickable ? "cursor-pointer hover:opacity-80" : "cursor-default"
          }`}
        >
          <Avatar name={post.author.name} src={post.author.avatar} tone={post.author.tone ?? "sand"} size="md" />
          <div className="flex flex-col gap-[8px] justify-center">
            <p
              className={`text-lg font-medium text-ink leading-none ${
                authorClickable ? "hover:underline underline-offset-2" : ""
              }`}
            >
              {post.author.name}
            </p>
            <div className="flex items-center gap-5 text-xs font-medium text-subtle leading-none">
              <span>{post.author.role}</span>
              <span className="h-[6px] w-[6px] rounded-pill bg-subtle/40" />
              <span>{post.author.school}</span>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="inline-flex h-[32px] shrink-0 items-center justify-center rounded-sm border border-[#e1e5ef] bg-white px-15 text-xs font-semibold leading-none text-ink transition-colors hover:bg-canvas hover:border-ink/30"
        >
          Follow
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-col gap-15">
        <div className="flex flex-col gap-5">
          <h3 className="font-display text-2xl font-medium text-ink leading-none">
            {post.title}
          </h3>
          <p className="text-sm text-[#374151] leading-[1.4]">
            {shown}
            {isLong && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="font-medium text-green-500 hover:underline"
                >
                  {expanded ? "Show less" : "Read more"}
                </button>
              </>
            )}
          </p>
        </div>
        <p className="inline-flex items-center gap-5 text-xs font-medium text-muted leading-none">
          <Icon name="clock" size={14} /> {post.time}
        </p>
      </div>

      {/* Media */}
      {post.images && post.images.length > 0 && (
        <div
          className={`grid gap-10 ${
            post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {post.images.slice(0, 2).map((src, i) => {
            const isOverflow =
              post.images && post.images.length > 2 && i === 1;
            return (
              <div
                key={i}
                className="relative aspect-[16/10] overflow-hidden rounded-md bg-line"
              >
                <img
                  src={src}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover ${
                    isOverflow ? "blur-[6px] scale-105" : ""
                  }`}
                  loading="lazy"
                />
                {isOverflow && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/20 font-display text-4xl text-white">
                    +{post.images!.length - 2}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-line pt-10">
        <div className="flex items-center gap-15">
          <button className="inline-flex items-center gap-5 text-sm font-semibold text-subtle transition-colors hover:text-ink">
            <Heart className="h-[20px] w-[20px] fill-[#e57373] text-[#e57373]" />
            <span>{post.stats.likes}</span>
          </button>
          <button className="inline-flex items-center gap-5 text-sm font-semibold text-subtle transition-colors hover:text-ink">
            <MessageCircle className="h-[20px] w-[20px]" strokeWidth={1.8} />
            <span>{post.stats.comments}</span>
          </button>
          <button
            aria-label="Share"
            className="inline-flex h-[24px] w-[24px] items-center justify-center text-subtle transition-colors hover:text-ink"
          >
            <Send className="h-[20px] w-[20px]" strokeWidth={1.8} />
          </button>
        </div>
        <div className="flex items-center gap-10">
          <button
            aria-label="Bookmark"
            className="inline-flex h-[24px] w-[24px] items-center justify-center text-subtle transition-colors hover:text-ink"
          >
            <Bookmark className="h-[20px] w-[20px]" strokeWidth={1.8} />
          </button>
          <button
            aria-label="More options"
            className="inline-flex h-[20px] w-[20px] items-center justify-center text-subtle transition-colors hover:text-ink"
          >
            <MoreHorizontal className="h-[20px] w-[20px]" strokeWidth={1.8} />
          </button>
        </div>
      </footer>
    </article>
  );
}
