import { Clock } from "lucide-react";
import { Eyebrow } from "../ui/SectionHeader";
import { Icon } from "../ui/Icon";
import type { IconName } from "../../assets/icons";

type NavItem = { label: string; icon: IconName; active?: boolean };

const nav: NavItem[] = [
  { label: "Home", icon: "house", active: true },
  { label: "My Classes", icon: "graduationCap" },
  { label: "Communities", icon: "users" },
  { label: "Discover", icon: "compass" },
  { label: "Progress", icon: "chartLine" },
];

const recents = ["AP Biology", "Symposium Announcement", "Emma Chen's profile"];

const availability = [
  { days: "Mon, Wed, Thu", time: "6–8 PM" },
  { days: "Fri", time: "5–6 PM" },
];

export function LeftSidebar() {
  return (
    <aside className="hidden w-[300px] shrink-0 bg-white border-r border-line p-20 lg:flex flex-col gap-20 sticky top-[var(--nav-h,110px)] h-[calc(100vh-var(--nav-h,110px))] overflow-y-auto">
      {/* Primary nav */}
      <nav className="flex flex-col gap-5">
        {nav.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`group flex items-center gap-10 rounded-sm p-10 text-lg transition-colors ${
              item.active
                ? "text-green-500 font-medium"
                : "text-subtle hover:text-ink hover:bg-canvas font-medium"
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Availability card */}
      <div className="rounded-md border border-green-100 bg-green-50 p-15 flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <h3 className="font-semibold text-lg text-ink leading-none">Your Availability</h3>
          <p className="text-xs font-medium text-muted leading-[1.4]">
            Intensive session on cellular respiration pathways. Join Dr. Sharma for deep-dive analysis.
          </p>
          <div className="flex flex-col gap-5 pt-5">
            {availability.map((a) => (
              <div key={a.days} className="flex items-center gap-5">
                <span className="flex-1 text-xs font-medium text-ink">{a.days}</span>
                <Clock className="h-[14px] w-[14px] text-green-500" strokeWidth={2} />
                <span className="text-xs font-medium text-green-500">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="w-full rounded-pill bg-ink px-15 py-[12px] text-sm font-medium text-white transition-colors hover:bg-black/85">
          Edit Availability
        </button>
      </div>

      {/* Recents */}
      <div className="flex flex-col gap-20 pt-5">
        <Eyebrow>Recents</Eyebrow>
        <div className="flex flex-col gap-15">
          {recents.map((r) => (
            <a
              key={r}
              href="#"
              className="flex items-center gap-10 text-lg font-medium text-subtle transition-colors hover:text-ink"
            >
              <Icon name="clock" size={16} />
              <span className="truncate">{r}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
