import { useState } from "react";
import { PageLayout } from "./components/layout/PageLayout";
import { ProfileHeader } from "./components/cards/ProfileHeader";
import { SessionCarousel } from "./components/cards/SessionCarousel";
import { Tabs } from "./components/sections/Tabs";
import { PostCard } from "./components/cards/PostCard";
import { ProfilePage } from "./pages/ProfilePage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { MessagesPage } from "./pages/MessagesPage";
import { sessions, posts } from "./data/mock";
import { getProfile } from "./data/profiles";
import type { Profile } from "./types/profile";

type View =
  | { name: "feed" }
  | { name: "profile"; id: string }
  | { name: "self" }
  | { name: "notifications" }
  | { name: "messages" };

const SELF_PROFILE_ID = "sarah-iyer";

export default function App() {
  const [view, setView] = useState<View>({ name: "feed" });
  const [selfProfile, setSelfProfile] = useState<Profile | undefined>(() =>
    getProfile(SELF_PROFILE_ID)
  );

  const openProfile = (id: string) => {
    setView({ name: "profile", id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const backToFeed = () => {
    setView({ name: "feed" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openNotifications = () => {
    setView({ name: "notifications" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openMessages = () => {
    setView({ name: "messages" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openSelfProfile = () => {
    setView({ name: "self" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLayout
      hideSidebars={view.name === "notifications" || view.name === "messages"}
      hideMenu={view.name === "notifications" || view.name === "messages"}
      onOpenNotifications={openNotifications}
      onOpenMessages={openMessages}
      onOpenSelfProfile={openSelfProfile}
      onNavigateHome={backToFeed}
    >
      {view.name === "feed" ? (
        <div className="flex flex-col gap-30">
          <ProfileHeader
            date={{ day: "Wednesday", full: "April 1, 2026" }}
            name="Sarah Iyer"
            meta={{
              count: "3 students",
              message:
                "earned new achievements, your lab review is at 2 PM, and the Science fair deadline is approaching.",
            }}
          />

          <SessionCarousel sessions={sessions} />

          <div className="flex flex-col gap-20">
            <div className="sticky top-[110px] z-20 -mx-30 bg-canvas px-30 py-15">
              <Tabs tabs={["All", "My Classes", "Student Works", "School Notices"]} />
            </div>
            <div className="flex flex-col gap-20">
              {posts.map((p, i) => (
                <PostCard key={i} post={p} onAuthorClick={openProfile} />
              ))}
            </div>
          </div>
        </div>
      ) : view.name === "notifications" ? (
        <NotificationsPage onBack={backToFeed} />
      ) : view.name === "messages" ? (
        <MessagesPage onBack={backToFeed} />
      ) : view.name === "self" ? (
        !selfProfile ? (
          <div className="rounded-[20px] border border-line bg-white p-30 text-center">
            <p className="text-base text-muted">Your profile is unavailable.</p>
          </div>
        ) : (
          <ProfilePage
            profile={selfProfile}
            onBack={backToFeed}
            isSelf
            onUpdate={(patch) =>
              setSelfProfile((p) => (p ? { ...p, ...patch } : p))
            }
          />
        )
      ) : (
        (() => {
          const profile = getProfile(view.id);
          if (!profile) {
            return (
              <div className="rounded-[20px] border border-line bg-white p-30 text-center">
                <p className="text-base text-muted">Profile not found.</p>
                <button
                  onClick={backToFeed}
                  className="mt-15 inline-flex h-[40px] items-center gap-5 rounded-pill bg-ink px-20 text-sm font-medium text-white"
                >
                  Back to feed
                </button>
              </div>
            );
          }
          return <ProfilePage profile={profile} onBack={backToFeed} />;
        })()
      )}
    </PageLayout>
  );
}
