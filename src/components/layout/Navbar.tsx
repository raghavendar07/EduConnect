import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LogOut,
  Settings,
  UserPen,
} from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Icon } from "../ui/Icon";
import { NotificationPanel } from "./NotificationPanel";

export function Navbar({
  onOpenNotifications,
  onOpenMessages,
  onNavigateHome,
}: {
  onOpenNotifications?: () => void;
  onOpenMessages?: () => void;
  onNavigateHome?: () => void;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notifOpen && !profileOpen) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (notifOpen && !notifRef.current?.contains(t)) setNotifOpen(false);
      if (profileOpen && !profileRef.current?.contains(t)) setProfileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [notifOpen, profileOpen]);

  return (
    <div className="sticky top-0 z-40">
      {/* Announcement bar */}
      <div className="bg-[#5b4fa0] text-white">
        <div className="flex h-[40px] w-full items-center gap-5 px-30">
          <div className="flex flex-1 items-center justify-center gap-5">
            <Icon name="compass" size={20} className="[filter:brightness(0)_invert(1)]" />
            <p className="text-base">
              <span className="font-bold">Greenfield International</span>{" "}
              <span className="text-white/85">
                is looking for an AP Biology teacher — matches your profile
              </span>
            </p>
          </div>
          <button
            className="opacity-80 transition-opacity hover:opacity-100"
            aria-label="Dismiss"
          >
            <Icon name="closeX" size={14} className="[filter:brightness(0)_invert(1)]" />
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-line">
        <div className="flex h-[70px] w-full items-center gap-20 px-30">
          {/* Logo */}
          <div className="flex w-[260px] items-center gap-[24px]">
            <button
              aria-label="Menu"
              className="inline-flex h-[24px] w-[24px] items-center justify-center text-ink"
            >
              <Icon name="list" size={24} />
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              aria-label="EduConnect — Home"
              className="font-semibold text-[22px] tracking-wide2 text-ink transition-opacity hover:opacity-80"
            >
              EduConnect
            </button>
          </div>

          {/* Search */}
          <div className="flex flex-1 items-center">
            <div className="flex h-[40px] w-[500px] items-center gap-10 rounded-pill border border-line bg-canvas px-15">
              <Icon name="search" size={20} />
              <input
                type="text"
                placeholder="Search Posts, Communities, People or Topic...."
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-subtle focus:outline-none"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex h-full items-center gap-20">
            {/* Messages */}
            <div className="relative">
              <button
                aria-label="Messages"
                onClick={onOpenMessages}
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-pill text-ink transition-colors hover:bg-canvas"
              >
                <Icon name="bellLarge" size={24} />
              </button>
            </div>

            {/* Notification bell + panel */}
            <div ref={notifRef} className="relative">
              <button
                aria-label="Notifications"
                aria-expanded={notifOpen}
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setProfileOpen(false);
                }}
                className={`inline-flex h-[40px] w-[40px] items-center justify-center rounded-pill text-ink transition-colors ${
                  notifOpen ? "bg-canvas" : "hover:bg-canvas"
                }`}
              >
                <Icon name="bell" size={24} />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-50 animate-[fadeIn_120ms_ease-out]">
                  <NotificationPanel
                    onClose={() => setNotifOpen(false)}
                    onSeeAll={() => {
                      setNotifOpen(false);
                      onOpenNotifications?.();
                    }}
                  />
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div ref={profileRef} className="relative">
              <button
                type="button"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen((v) => !v);
                  setNotifOpen(false);
                }}
                className={`flex items-center gap-10 rounded-pill p-[4px] pr-10 transition-colors ${
                  profileOpen ? "bg-canvas" : "hover:bg-canvas"
                }`}
              >
                <Avatar
                  name="Sarah Iyer"
                  src="https://i.pravatar.cc/300?img=48"
                  size="sm"
                  tone="sand"
                />
                <div className="hidden flex-col items-start gap-[2px] leading-none md:flex">
                  <span className="inline-flex items-center gap-[4px] text-sm font-semibold text-ink">
                    Sarah Iyer
                    <ChevronDown
                      className={`h-[14px] w-[14px] text-subtle transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </span>
                  <span className="text-xs font-medium text-subtle">
                    Biology Teacher · DPS
                  </span>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[260px] animate-[fadeIn_120ms_ease-out] rounded-[16px] bg-white p-[8px] shadow-[0_24px_48px_-12px_rgba(16,24,40,0.18),0_4px_12px_rgba(16,24,40,0.06)] ring-1 ring-line">
                  {/* Identity */}
                  <div className="flex items-center gap-10 rounded-md p-10">
                    <Avatar
                      name="Sarah Iyer"
                      src="https://i.pravatar.cc/300?img=48"
                      size="md"
                      tone="sand"
                    />
                    <div className="flex flex-col gap-[2px] leading-none">
                      <span className="text-sm font-semibold text-ink">
                        Sarah Iyer
                      </span>
                      <span className="text-xs font-medium text-subtle">
                        Biology Teacher · DPS
                      </span>
                    </div>
                  </div>

                  <div className="my-[4px] h-px bg-line" />

                  <MenuItem icon={<UserPen className="h-[16px] w-[16px]" strokeWidth={1.8} />}>
                    Edit Profile
                  </MenuItem>
                  <MenuItem icon={<Settings className="h-[16px] w-[16px]" strokeWidth={1.8} />}>
                    Settings
                  </MenuItem>

                  <div className="my-[4px] h-px bg-line" />

                  <MenuItem
                    icon={<LogOut className="h-[16px] w-[16px]" strokeWidth={1.8} />}
                    tone="danger"
                  >
                    Log out
                  </MenuItem>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  children,
  tone = "default",
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  tone?: "default" | "danger";
}) {
  const colors =
    tone === "danger"
      ? "text-[#c0392b] hover:bg-[#fdecea]"
      : "text-ink hover:bg-canvas";
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-10 rounded-sm px-10 py-[8px] text-sm font-medium transition-colors ${colors}`}
    >
      <span className="inline-flex h-[20px] w-[20px] items-center justify-center">
        {icon}
      </span>
      {children}
    </button>
  );
}
