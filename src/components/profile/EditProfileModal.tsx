import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Tag } from "../ui/Tag";
import type {
  EducationItem,
  ExperienceItem,
  Profile,
} from "../../types/profile";

export type ProfileEditablePatch = Partial<
  Pick<
    Profile,
    "name" | "role" | "school" | "bio" | "location" | "tags" | "experience" | "education"
  > & {
    personalInfo: Partial<Profile["personalInfo"]>;
  }
>;

const TONES: Array<ExperienceItem["tone"]> = ["green", "purple", "sand"];
const nextTone = (idx: number): ExperienceItem["tone"] => TONES[idx % TONES.length];

const emptyExperience = (idx: number): ExperienceItem => ({
  role: "",
  organization: "",
  employmentType: "Full Time",
  period: "",
  description: "",
  tone: nextTone(idx),
});

const emptyEducation = (idx: number): EducationItem => ({
  degree: "",
  institution: "",
  period: "",
  description: "",
  tone: nextTone(idx),
});

export function EditProfileModal({
  profile,
  onClose,
  onSave,
}: {
  profile: Profile;
  onClose: () => void;
  onSave: (patch: ProfileEditablePatch) => void;
}) {
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [school, setSchool] = useState(profile.school);
  const [location, setLocation] = useState(profile.location);
  const [bio, setBio] = useState(profile.bio);
  const [email, setEmail] = useState(profile.personalInfo.email);
  const [phone, setPhone] = useState(profile.personalInfo.phone);
  const [website, setWebsite] = useState(profile.personalInfo.website);
  const [tags, setTags] = useState<string[]>(profile.tags);
  const [tagDraft, setTagDraft] = useState("");
  const [experience, setExperience] = useState<ExperienceItem[]>(profile.experience);
  const [education, setEducation] = useState<EducationItem[]>(profile.education);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const addTag = () => {
    const v = tagDraft.trim();
    if (!v || tags.includes(v)) {
      setTagDraft("");
      return;
    }
    setTags((t) => [...t, v]);
    setTagDraft("");
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const updateExperience = (idx: number, patch: Partial<ExperienceItem>) =>
    setExperience((prev) => prev.map((item, i) => (i === idx ? { ...item, ...patch } : item)));
  const removeExperience = (idx: number) =>
    setExperience((prev) => prev.filter((_, i) => i !== idx));
  const addExperience = () =>
    setExperience((prev) => [...prev, emptyExperience(prev.length)]);

  const updateEducation = (idx: number, patch: Partial<EducationItem>) =>
    setEducation((prev) => prev.map((item, i) => (i === idx ? { ...item, ...patch } : item)));
  const removeEducation = (idx: number) =>
    setEducation((prev) => prev.filter((_, i) => i !== idx));
  const addEducation = () =>
    setEducation((prev) => [...prev, emptyEducation(prev.length)]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || profile.name,
      role: role.trim() || profile.role,
      school: school.trim() || profile.school,
      location: location.trim() || profile.location,
      bio: bio.trim(),
      tags,
      experience: experience
        .map((x) => ({ ...x, role: x.role.trim(), organization: x.organization.trim() }))
        .filter((x) => x.role || x.organization),
      education: education
        .map((x) => ({ ...x, degree: x.degree.trim(), institution: x.institution.trim() }))
        .filter((x) => x.degree || x.institution),
      personalInfo: {
        email: email.trim(),
        phone: phone.trim(),
        website: website.trim(),
      },
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Edit profile"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-20 py-20 animate-[fadeIn_120ms_ease-out]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="flex max-h-full w-full max-w-[640px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_24px_48px_-12px_rgba(16,24,40,0.25),0_8px_16px_rgba(16,24,40,0.08)] ring-1 ring-line"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-25 py-20">
          <h2 className="font-display text-2xl text-ink">Edit profile</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-pill text-muted transition-colors hover:bg-canvas"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
        </div>

        {/* Form */}
        <form
          id="edit-profile-form"
          onSubmit={handleSave}
          className="flex flex-1 flex-col gap-20 overflow-y-auto px-25 py-20"
        >
          <Section title="Personal information">
            <div className="grid grid-cols-1 gap-15 md:grid-cols-2">
              <Field label="Full name">
                <Input value={name} onChange={setName} placeholder="Your name" />
              </Field>
              <Field label="Role">
                <Input value={role} onChange={setRole} placeholder="e.g. Biology Teacher" />
              </Field>
              <Field label="School">
                <Input value={school} onChange={setSchool} placeholder="Institution" />
              </Field>
              <Field label="Location">
                <Input value={location} onChange={setLocation} placeholder="City, Country" />
              </Field>
            </div>
          </Section>

          <Section title="Contact">
            <div className="grid grid-cols-1 gap-15 md:grid-cols-2">
              <Field label="Email">
                <Input value={email} onChange={setEmail} placeholder="you@school.edu" type="email" />
              </Field>
              <Field label="Phone">
                <Input value={phone} onChange={setPhone} placeholder="+91 ..." />
              </Field>
              <Field label="Website">
                <Input value={website} onChange={setWebsite} placeholder="yourname.edu" />
              </Field>
            </div>
          </Section>

          <Section title="Bio">
            <Field label="About you">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                placeholder="Tell the community about yourself"
                className="w-full resize-y rounded-md border border-line bg-white px-15 py-[10px] text-sm leading-[1.5] text-ink placeholder:text-subtle focus:border-purple-700 focus:outline-none"
              />
            </Field>
          </Section>

          <Section title="Skills">
            <div className="flex flex-col gap-10">
              <div className="flex flex-wrap gap-[6px]">
                {tags.length === 0 && (
                  <span className="text-xs text-subtle">No skills added yet.</span>
                )}
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-5 rounded-pill border border-line bg-canvas px-10 py-[4px] text-xs font-medium text-ink"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      aria-label={`Remove ${t}`}
                      className="inline-flex h-[16px] w-[16px] items-center justify-center rounded-pill text-muted transition-colors hover:bg-white hover:text-ink"
                    >
                      <X className="h-[12px] w-[12px]" strokeWidth={2} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-10">
                <Input
                  value={tagDraft}
                  onChange={setTagDraft}
                  placeholder="Add a skill and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={!tagDraft.trim()}
                  className="inline-flex h-[40px] shrink-0 items-center rounded-pill border border-line-soft bg-white px-15 text-sm font-medium text-ink transition-colors hover:bg-canvas disabled:opacity-40"
                >
                  Add
                </button>
              </div>
              <PreviewTags tags={tags} />
            </div>
          </Section>

          <Section
            title="Experience"
            action={
              <AddButton onClick={addExperience}>Add experience</AddButton>
            }
          >
            <div className="flex flex-col gap-10">
              {experience.length === 0 && (
                <EmptyItem text="No experience added yet." />
              )}
              {experience.map((item, idx) => (
                <ItemCard
                  key={idx}
                  onRemove={() => removeExperience(idx)}
                  removeLabel={`Remove experience ${idx + 1}`}
                >
                  <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <Field label="Role">
                      <Input
                        value={item.role}
                        onChange={(v) => updateExperience(idx, { role: v })}
                        placeholder="e.g. Biology Teacher"
                      />
                    </Field>
                    <Field label="Organization">
                      <Input
                        value={item.organization}
                        onChange={(v) => updateExperience(idx, { organization: v })}
                        placeholder="School or company"
                      />
                    </Field>
                    <Field label="Employment type">
                      <Input
                        value={item.employmentType}
                        onChange={(v) => updateExperience(idx, { employmentType: v })}
                        placeholder="Full Time / Part Time"
                      />
                    </Field>
                    <Field label="Period">
                      <Input
                        value={item.period}
                        onChange={(v) => updateExperience(idx, { period: v })}
                        placeholder="e.g. Aug 2021 — Present"
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea
                      value={item.description}
                      onChange={(e) => updateExperience(idx, { description: e.target.value })}
                      rows={3}
                      placeholder="What did you do in this role?"
                      className="w-full resize-y rounded-md border border-line bg-white px-15 py-[10px] text-sm leading-[1.5] text-ink placeholder:text-subtle focus:border-purple-700 focus:outline-none"
                    />
                  </Field>
                </ItemCard>
              ))}
            </div>
          </Section>

          <Section
            title="Education"
            action={<AddButton onClick={addEducation}>Add education</AddButton>}
          >
            <div className="flex flex-col gap-10">
              {education.length === 0 && (
                <EmptyItem text="No education added yet." />
              )}
              {education.map((item, idx) => (
                <ItemCard
                  key={idx}
                  onRemove={() => removeEducation(idx)}
                  removeLabel={`Remove education ${idx + 1}`}
                >
                  <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <Field label="Degree">
                      <Input
                        value={item.degree}
                        onChange={(v) => updateEducation(idx, { degree: v })}
                        placeholder="e.g. M.Sc. in Biology Education"
                      />
                    </Field>
                    <Field label="Institution">
                      <Input
                        value={item.institution}
                        onChange={(v) => updateEducation(idx, { institution: v })}
                        placeholder="University or college"
                      />
                    </Field>
                    <Field label="Period">
                      <Input
                        value={item.period}
                        onChange={(v) => updateEducation(idx, { period: v })}
                        placeholder="e.g. 2015 — 2017"
                      />
                    </Field>
                    <Field label="Grade">
                      <Input
                        value={item.grade ?? ""}
                        onChange={(v) => updateEducation(idx, { grade: v })}
                        placeholder="e.g. 8.9 / 10 GPA"
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea
                      value={item.description}
                      onChange={(e) => updateEducation(idx, { description: e.target.value })}
                      rows={3}
                      placeholder="What did you focus on?"
                      className="w-full resize-y rounded-md border border-line bg-white px-15 py-[10px] text-sm leading-[1.5] text-ink placeholder:text-subtle focus:border-purple-700 focus:outline-none"
                    />
                  </Field>
                </ItemCard>
              ))}
            </div>
          </Section>

        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-10 border-t border-line bg-white px-25 py-15">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[40px] items-center rounded-pill border border-line-soft bg-white px-20 text-sm font-medium text-ink transition-colors hover:bg-canvas"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            className="inline-flex h-[40px] items-center rounded-pill bg-ink px-20 text-sm font-medium text-white transition-colors hover:bg-black/85"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── internals ─── */

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-medium text-ink leading-none">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function AddButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-[32px] items-center gap-5 rounded-pill border border-line-soft bg-white px-15 text-xs font-medium text-ink transition-colors hover:bg-canvas"
    >
      <Plus className="h-[14px] w-[14px]" strokeWidth={2} />
      {children}
    </button>
  );
}

function ItemCard({
  children,
  onRemove,
  removeLabel,
}: {
  children: React.ReactNode;
  onRemove: () => void;
  removeLabel: string;
}) {
  return (
    <div className="relative flex flex-col gap-10 rounded-md border border-line bg-canvas p-15">
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className="absolute right-10 top-10 inline-flex h-[28px] w-[28px] items-center justify-center rounded-pill text-muted transition-colors hover:bg-white hover:text-[#c0392b]"
      >
        <Trash2 className="h-[14px] w-[14px]" strokeWidth={1.8} />
      </button>
      {children}
    </div>
  );
}

function EmptyItem({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-line bg-canvas/60 px-15 py-20 text-center text-xs text-subtle">
      {text}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-[6px]">
      <span className="text-xs font-medium text-subtle">{label}</span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  onKeyDown,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="h-[40px] w-full rounded-md border border-line bg-white px-15 text-sm text-ink placeholder:text-subtle focus:border-purple-700 focus:outline-none"
    />
  );
}

function PreviewTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-10 border-t border-line pt-10">
      <span className="text-xs font-medium text-subtle">Preview:</span>
      {tags.map((t) => (
        <Tag key={t} tone="neutral" size="md">
          {t}
        </Tag>
      ))}
    </div>
  );
}
