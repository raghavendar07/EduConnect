import { ProfileBanner } from "../components/profile/ProfileBanner";
import { ProfileStats } from "../components/profile/ProfileStats";
import { ProfileAbout } from "../components/profile/ProfileAbout";
import { Tabs } from "../components/sections/Tabs";
import { PostCard } from "../components/cards/PostCard";
import type { Profile } from "../types/profile";

export function ProfilePage({
  profile,
  onBack,
}: {
  profile: Profile;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-20">
      <ProfileBanner profile={profile} onBack={onBack} />
      <ProfileStats profile={profile} />
      <ProfileAbout profile={profile} />

      <div className="flex flex-col gap-25">
        <div className="sticky top-[110px] z-20 -mx-30 bg-canvas px-30 py-15">
          <div className="flex flex-col gap-15">
            <h2 className="font-display text-4xl text-ink">Activity</h2>
            <Tabs tabs={["Posts", "Images", "Videos", "Comments"]} />
          </div>
        </div>
        <div className="flex flex-col gap-20">
          {profile.posts.map((p, i) => (
            <PostCard key={i} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
