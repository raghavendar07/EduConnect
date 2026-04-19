import { useState } from "react";
import { ProfileBanner } from "../components/profile/ProfileBanner";
import { ProfileStats } from "../components/profile/ProfileStats";
import { ProfileAbout } from "../components/profile/ProfileAbout";
import {
  EditProfileModal,
  type ProfileEditablePatch,
} from "../components/profile/EditProfileModal";
import { Tabs } from "../components/sections/Tabs";
import { PostCard } from "../components/cards/PostCard";
import type { Profile } from "../types/profile";

export function ProfilePage({
  profile,
  onBack,
  isSelf = false,
  onUpdate,
}: {
  profile: Profile;
  onBack: () => void;
  isSelf?: boolean;
  onUpdate?: (patch: Partial<Profile>) => void;
}) {
  const [editing, setEditing] = useState(false);

  const handleSave = (patch: ProfileEditablePatch) => {
    if (!onUpdate) return;
    const { personalInfo, ...rest } = patch;
    const merged: Partial<Profile> = { ...rest };
    if (personalInfo) {
      merged.personalInfo = { ...profile.personalInfo, ...personalInfo };
    }
    onUpdate(merged);
  };

  return (
    <div className="flex flex-col gap-20">
      <ProfileBanner
        profile={profile}
        onBack={onBack}
        isSelf={isSelf}
        onEdit={isSelf ? () => setEditing(true) : undefined}
      />
      <ProfileStats profile={profile} />
      <ProfileAbout profile={profile} />

      <div className="flex flex-col gap-25">
        <div className="sticky top-[110px] z-20 -mx-30 bg-canvas px-30 py-15">
          <div className="flex flex-col gap-15">
            <h2 className="font-display text-4xl text-ink">
              {isSelf ? "Posts" : "Activity"}
            </h2>
            <Tabs
              tabs={
                isSelf
                  ? ["Posts", "Images", "Videos", "Saved"]
                  : ["Posts", "Images", "Videos", "Comments"]
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-20">
          {profile.posts.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-line bg-white p-30 text-center text-sm text-muted">
              {isSelf
                ? "You haven't posted anything yet. Share an update to get started."
                : "No posts yet."}
            </div>
          ) : (
            profile.posts.map((p, i) => <PostCard key={i} post={p} />)
          )}
        </div>
      </div>

      {editing && isSelf && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
