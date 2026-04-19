import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Icon } from "../ui/Icon";
import { NotificationPanel } from "./NotificationPanel";
import { ProfilePanel } from "./ProfilePanel";

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
            {!hideMenu && (
              <button
                aria-label="Menu"
                className="inline-flex h-[24px] w-[24px] items-center justify-center text-ink"
              >
                <Icon name="list" size={24} />
              </button>
            )}
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
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-pill text-ink transition-all duration-150 hover:bg-purple-50 hover:text-purple-700 hover:scale-105 active:scale-95"
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
                className={`inline-flex h-[40px] w-[40px] items-center justify-center rounded-pill text-ink transition-all duration-150 hover:bg-purple-50 hover:text-purple-700 hover:scale-105 active:scale-95 ${
                  notifHover ? "bg-purple-50 text-purple-700" : ""
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

            {/* Profile trigger — opens side panel */}
            <button
              type="button"
              aria-expanded={profileOpen}
              aria-label="Open profile panel"
              onClick={() => setProfileOpen(true)}
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
                    className="h-[14px] w-[14px] text-subtle"
                    strokeWidth={2}
                  />
                </span>
                <span className="text-xs font-medium text-subtle">
                  Biology Teacher · DPS
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <ProfilePanel
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onViewProfile={() => onOpenSelfProfile?.()}
      />
    </div>
  );
}
