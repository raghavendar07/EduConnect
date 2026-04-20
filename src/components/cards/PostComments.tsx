import { Send } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { teacherAvatars } from "../../data/images";

type Comment = {
  name: string;
  role: string;
  avatar?: string;
  avatarTone?: "green" | "purple" | "sand";
  time: string;
  body: string;
  likes: number;
  likedByMe?: boolean;
};

// Small demo set used across all cards so the design reads well.
const DEMO_COMMENTS: Comment[] = [
  {
    name: "Ananya Reddy",
    role: "Physics Teacher",
    avatar: teacherAvatars.ananyaReddy,
    avatarTone: "purple",
    time: "2h",
    body: "Thanks for sharing this! Really appreciated the clarity on how you structured the hypothesis template.",
    likes: 3,
  },
  {
    name: "Rajesh Mehta",
    role: "Principal",
    avatar: teacherAvatars.rajeshMehta,
    avatarTone: "green",
    time: "4h",
    body: "Wonderful work. Let's chat about rolling this out to other Grade 10 sections next semester.",
    likes: 1,
  },
];

export function PostComments({
  totalComments,
  comments = DEMO_COMMENTS,
}: {
  totalComments: number;
  comments?: Comment[];
}) {
  const preview = comments.slice(0, 1);
  const remaining = Math.max(0, totalComments - preview.length);
  return (
    <div className="flex flex-col gap-15 border-t border-line pt-15">
      {/* Comments list */}
      <ul className="flex flex-col gap-15">
        {preview.map((c, i) => (
          <li key={i} className="flex gap-10">
            <Avatar name={c.name} src={c.avatar} tone={c.avatarTone ?? "sand"} size="sm" />
            <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
              <div className="rounded-[16px] bg-canvas px-15 py-[10px]">
                <div className="flex items-baseline gap-[6px]">
                  <span className="truncate text-sm font-semibold text-ink">
                    {c.name}
                  </span>
                  <span className="truncate text-xs text-subtle">
                    · {c.role}
                  </span>
                </div>
                <p className="mt-[4px] text-sm leading-[1.5] text-ink">{c.body}</p>
              </div>
              <div className="flex items-center gap-15 pl-15 text-xs font-semibold text-subtle">
                <span>{c.time}</span>
                <button
                  type="button"
                  className={`transition-colors hover:text-ink ${
                    c.likedByMe ? "text-green-700 hover:text-green-600" : ""
                  }`}
                >
                  Like {c.likes > 0 ? `· ${c.likes}` : ""}
                </button>
                <button
                  type="button"
                  className="transition-colors hover:text-ink"
                >
                  Reply
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <button
          type="button"
          className="w-fit text-sm font-semibold text-green-700 transition-colors hover:text-green-600"
        >
          View all {remaining} more comments
        </button>
      )}

      {/* Composer — bottom */}
      <div className="flex items-center gap-10">
        <Avatar
          name="Sarah Iyer"
          src="https://i.pravatar.cc/300?img=48"
          tone="sand"
          size="sm"
        />
        <div className="flex flex-1 items-center gap-[6px] rounded-pill border border-line bg-canvas px-15 py-[8px]">
          <input
            type="text"
            placeholder="Write a comment…"
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
          />
          <button
            type="button"
            aria-label="Post comment"
            className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-pill text-subtle transition-colors hover:bg-white hover:text-ink"
          >
            <Send className="h-[16px] w-[16px]" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}
