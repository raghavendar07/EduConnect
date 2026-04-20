import { useState } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  MoreVertical,
  Send,
} from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { PostComments } from "./PostComments";

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
  const CLAMP = 180;
  const combinedLen = post.title.length + 1 + post.excerpt.length;
  const isLong = combinedLen > CLAMP;
  const shownExcerpt = !isLong || expanded
    ? post.excerpt
    : post.excerpt.slice(0, Math.max(0, CLAMP - post.title.length - 1)).trimEnd() + "…";
  return (
    <article className="flex flex-col gap-15 rounded-[20px] border border-line bg-white p-15 shadow-soft transition-shadow hover:shadow-card">
      {/* Header */}
      <header className="flex items-start justify-between gap-10">
        <button
          type="button"
          onClick={handleAuthorClick}
          disabled={!authorClickable}
          className={`flex min-w-0 items-center gap-10 text-left transition-opacity ${
            authorClickable ? "cursor-pointer hover:opacity-80" : "cursor-default"
          }`}
        >
          <Avatar name={post.author.name} src={post.author.avatar} tone={post.author.tone ?? "sand"} size="md" />
          <div className="flex min-w-0 flex-col leading-[1.3]">
            <p
              className={`truncate text-base font-semibold text-ink ${
                authorClickable ? "hover:underline underline-offset-2" : ""
              }`}
            >
              {post.author.name}
            </p>
            <p className="truncate text-sm text-muted">
              <span>{post.author.role}</span>
              <span className="mx-[6px] inline-block h-[3px] w-[3px] -translate-y-[3px] rounded-pill bg-subtle/60 align-middle" />
              <span>{post.author.school}</span>
              <span className="mx-[6px] inline-block h-[3px] w-[3px] -translate-y-[3px] rounded-pill bg-subtle/60 align-middle" />
              <span>{post.time}</span>
            </p>
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-10">
          <button
            type="button"
            className="inline-flex h-[36px] shrink-0 items-center rounded-pill border border-line bg-white px-15 text-sm font-semibold text-ink transition-colors hover:bg-canvas"
          >
            Follow
          </button>
          <button
            aria-label="More options"
            className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-pill text-muted transition-colors hover:bg-canvas"
          >
            <MoreVertical className="h-[20px] w-[20px]" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Body — title + excerpt inline with Read more */}
      <p className="text-sm leading-[1.5] text-ink">
        <span>{post.title}</span>{" "}
        <span>{shownExcerpt}</span>
        {isLong && (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="font-semibold text-green-700 transition-colors hover:text-green-600"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          </>
        )}
      </p>

      {/* Media */}
      {post.images && post.images.length > 0 && (
        post.images.length === 1 ? (
          <div className="relative overflow-hidden rounded-[16px] bg-canvas">
            <img
              src={post.images[0]}
              alt=""
              className="block max-h-[420px] w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-10">
            {post.images.slice(0, 2).map((src, i) => {
              const isOverflow =
                post.images && post.images.length > 2 && i === 1;
              return (
                <div
                  key={i}
                  className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-line"
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
        )
      )}

      {/* Footer */}
      <footer className="flex items-center justify-between px-5">
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

      <PostComments totalComments={post.stats.comments} />
    </article>
  );
}
