import { useRef } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { Icon } from "../ui/Icon";
import type { Post } from "./PostCard";

export function YouMightLike({
  posts,
  onAuthorClick,
}: {
  posts: Post[];
  onAuthorClick?: (authorId: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  if (posts.length === 0) return null;

  return (
    <section className="flex flex-col gap-15">
      <SectionHeader
        title="You might like"
        action={
          <div className="flex items-center gap-10">
            <IconBtn onClick={() => scroll(-1)} label="Previous suggestion">
              <Icon name="caretLeft" size={16} />
            </IconBtn>
            <IconBtn onClick={() => scroll(1)} label="Next suggestion">
              <Icon name="caretRight" size={16} />
            </IconBtn>
          </div>
        }
      />
      <div
        ref={trackRef}
        className="flex gap-15 overflow-x-auto scroll-smooth pb-5 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post, i) => (
          <LikeCard key={i} post={post} onAuthorClick={onAuthorClick} />
        ))}
      </div>
    </section>
  );
}

function LikeCard({
  post,
  onAuthorClick,
}: {
  post: Post;
  onAuthorClick?: (authorId: string) => void;
}) {
  const cover = post.images?.[0];
  const authorClickable = Boolean(post.author.id && onAuthorClick);
  return (
    <article className="flex w-[280px] shrink-0 flex-col gap-10 rounded-[16px] border border-line bg-white p-10 shadow-soft transition-shadow hover:shadow-card">
      <div className="aspect-[4/3] overflow-hidden rounded-[12px] bg-canvas">
        {cover ? (
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-subtle">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[6px] px-5 pb-5">
        <button
          type="button"
          onClick={() =>
            authorClickable && onAuthorClick!(post.author.id!)
          }
          disabled={!authorClickable}
          className={`flex items-center gap-[6px] text-left ${
            authorClickable ? "cursor-pointer hover:opacity-80" : "cursor-default"
          }`}
        >
          <span className="inline-flex h-[24px] w-[24px] shrink-0 overflow-hidden rounded-pill bg-sand-200">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-full w-full object-cover"
              />
            )}
          </span>
          <span className="truncate text-[11px] font-semibold text-ink">
            {post.author.name}
          </span>
        </button>
        <h3 className="line-clamp-2 text-sm font-semibold leading-[1.3] text-ink">
          {post.title}
        </h3>
        <p className="text-[11px] text-subtle">
          {post.time} · {post.stats.likes} likes
        </p>
      </div>
    </article>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill border border-line bg-white text-muted transition-colors hover:bg-canvas hover:text-ink"
    >
      {children}
    </button>
  );
}
