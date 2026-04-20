import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Icon } from "../ui/Icon";
import { NotificationPanel } from "./NotificationPanel";

export function Navbar({
  onOpenNotifications,
  onOpenMessages,
  onOpenSelfProfile,
  onNavigateHome,
  hideMenu = false,
}: {
  onOpenNotifications?: () => void;
  onOpenMessages?: () => void;
  onOpenSelfProfile?: () => void;
  onNavigateHome?: () => void;
  hideMenu?: boolean;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [notifHover, setNotifHover] = useState(false);
  const notifCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close the profile dropdown when clicking outside or pressing Escape.
  useEffect(() => {
    if (!profileOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) setProfileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  const openNotifPreview = () => {
    if (notifCloseTimer.current) {
      clearTimeout(notifCloseTimer.current);
      notifCloseTimer.current = null;
    }
    setNotifHover(true);
  };
  const scheduleNotifClose = () => {
    if (notifCloseTimer.current) clearTimeout(notifCloseTimer.current);
    notifCloseTimer.current = setTimeout(() => setNotifHover(false), 150);
  };

  // Expose the current navbar height as a CSS variable so descendant sticky
  // elements (e.g. tab strips inside pages) can pin just below the navbar and
  // stay in sync when the announcement banner is dismissed.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--nav-h", bannerOpen ? "110px" : "70px");
    return () => {
      root.style.removeProperty("--nav-h");
    };
  }, [bannerOpen]);

  return (
    <div className="sticky top-0 z-40">
      {/* Announcement bar */}
      {bannerOpen && (
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
              onClick={() => setBannerOpen(false)}
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Dismiss"
            >
              <Icon name="closeX" size={14} className="[filter:brightness(0)_invert(1)]" />
            </button>
          </div>
        </div>
      )}

      {/* Main nav */}
      <div className="bg-white border-b border-line">
        <div className="flex h-[70px] w-full items-center gap-20 px-30">
          {/* Logo */}
          <div className="flex w-[260px] items-center gap-[24px]">
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
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-pill text-ink transition-all duration-150 hover:bg-canvas hover:text-ink hover:scale-105 active:scale-95"
              >
                <Icon name="bellLarge" size={24} />
              </button>
            </div>

            {/* Notifications */}
            <div
              className="relative"
              onMouseEnter={openNotifPreview}
              onMouseLeave={scheduleNotifClose}
            >
              <button
                aria-label="Notifications"
                onClick={() => {
                  setProfileOpen(false);
                  setNotifHover(false);
                  onOpenNotifications?.();
                }}
                className={`inline-flex h-[40px] w-[40px] items-center justify-center rounded-pill text-ink transition-all duration-150 hover:bg-canvas hover:text-ink hover:scale-105 active:scale-95 ${
                  notifHover ? "bg-canvas text-ink" : ""
                }`}
              >
                <Icon name="bell" size={24} />
              </button>
              {notifHover && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-50 animate-[fadeIn_120ms_ease-out]">
                  <NotificationPanel
                    onClose={() => setNotifHover(false)}
                    onSeeAll={() => {
                      setNotifHover(false);
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
                aria-haspopup="menu"
                onClick={() => setProfileOpen((v) => !v)}
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
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+12px)] z-50 w-[260px] animate-[fadeIn_120ms_ease-out] rounded-[16px] bg-white p-[8px] shadow-[0_24px_48px_-12px_rgba(16,24,40,0.18),0_4px_12px_rgba(16,24,40,0.06)] ring-1 ring-line"
                >
                  {/* Identity — click to open self profile */}
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      onOpenSelfProfile?.();
                    }}
                    className="flex w-full items-center gap-10 rounded-md p-10 text-left transition-colors hover:bg-canvas"
                  >
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
                        View profile
                      </span>
                    </div>
                  </button>

                  <MenuItem icon={<Settings className="h-[16px] w-[16px]" strokeWidth={1.8} />}>
                    Settings
                  </MenuItem>
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
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  tone?: "default" | "danger";
  onClick?: () => void;
}) {
  const colors =
    tone === "danger"
      ? "text-[#c0392b] hover:bg-[#fdecea]"
      : "text-ink hover:bg-canvas";
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={`flex w-full items-center gap-10 rounded-sm px-10 py-[8px] text-sm font-medium transition-colors ${colors}`}
    >
      <span className="inline-flex h-[20px] w-[20px] items-center justify-center">
        {icon}
      </span>
      {children}
    </button>
  );
}
