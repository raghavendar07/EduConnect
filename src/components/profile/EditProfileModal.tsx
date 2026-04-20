import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Plus,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
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

type SectionKey =
  | "basic"
  | "experience"
  | "teams"
  | "web"
  | "about"
  | "links";

const SECTIONS: Array<{ key: SectionKey; label: string }> = [
  { key: "basic", label: "Basic Information" },
  { key: "experience", label: "Work Experience" },
  { key: "teams", label: "Teams" },
  { key: "web", label: "On The Web" },
  { key: "about", label: "About Me" },
  { key: "links", label: "Links" },
];

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "United Arab Emirates",
  "Germany",
  "France",
  "Japan",
];

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

function splitName(full: string): [string, string] {
  const parts = full.trim().split(/\s+/);
  if (parts.length <= 1) return [parts[0] ?? "", ""];
  return [parts[0], parts.slice(1).join(" ")];
}

function splitLocation(loc: string): { city: string; country: string } {
  const parts = loc
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return { city: "", country: "" };
  if (parts.length === 1) {
    const one = parts[0];
    if (COUNTRIES.includes(one)) return { city: "", country: one };
    return { city: one, country: "" };
  }
  const country = parts[parts.length - 1];
  const city = parts.slice(0, -1).join(", ");
  return { city, country };
}

export function EditProfileModal({
  profile,
  onClose,
  onSave,
}: {
  profile: Profile;
  onClose: () => void;
  onSave: (patch: ProfileEditablePatch) => void;
}) {
  const initialName = useMemo(() => splitName(profile.name), [profile.name]);
  const initialLoc = useMemo(() => splitLocation(profile.location), [profile.location]);

  const [active, setActive] = useState<SectionKey>("basic");

  const [firstName, setFirstName] = useState(initialName[0]);
  const [lastName, setLastName] = useState(initialName[1]);
  const [role, setRole] = useState(profile.role);
  const [school, setSchool] = useState(profile.school);
  const [country, setCountry] = useState(
    initialLoc.country || (COUNTRIES.includes(profile.location) ? profile.location : "India")
  );
  const [city, setCity] = useState(initialLoc.city);
  const [bio, setBio] = useState(profile.bio);
  const [email, setEmail] = useState(profile.personalInfo.email);
  const [phone, setPhone] = useState(profile.personalInfo.phone);
  const [website, setWebsite] = useState(profile.personalInfo.website);
  const [avatar, setAvatar] = useState(profile.avatar ?? "");
  const [tags, setTags] = useState<string[]>(profile.tags);
  const [tagDraft, setTagDraft] = useState("");
  const [links, setLinks] = useState<Array<{ label: string; url: string }>>(() => {
    const out: Array<{ label: string; url: string }> = [];
    if (profile.personalInfo.website)
      out.push({ label: "Website", url: profile.personalInfo.website });
    return out;
  });
  const [experience, setExperience] = useState<ExperienceItem[]>(profile.experience);
  const [education, setEducation] = useState<EducationItem[]>(profile.education);

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

  const updateLink = (idx: number, patch: Partial<{ label: string; url: string }>) =>
    setLinks((prev) => prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  const removeLink = (idx: number) =>
    setLinks((prev) => prev.filter((_, i) => i !== idx));
  const addLink = () =>
    setLinks((prev) => [...prev, { label: "", url: "" }]);

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();
    const mergedName = `${firstName.trim()} ${lastName.trim()}`.trim() || profile.name;
    const loc = [city.trim(), country.trim()].filter(Boolean).join(", ");
    const primaryLink = links.find((l) => l.url.trim());
    onSave({
      name: mergedName,
      role: role.trim() || profile.role,
      school: school.trim() || profile.school,
      location: loc || profile.location,
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
        website: primaryLink ? primaryLink.url.trim() : website.trim(),
      },
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Edit profile"
      className="fixed inset-0 z-[100] flex flex-col bg-canvas animate-[fadeIn_120ms_ease-out]"
    >
      {/* Top bar */}
      <header className="flex h-[64px] shrink-0 items-center justify-between border-b border-line bg-white px-30">
        <div className="flex items-center gap-15">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-pill text-muted transition-colors hover:bg-canvas"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <h1 className="font-display text-2xl text-ink leading-none">Edit profile</h1>
        </div>
        <div className="flex items-center gap-10">
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
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav
          aria-label="Edit profile sections"
          className="flex w-[280px] shrink-0 flex-col border-r border-line bg-white"
        >
          <ul className="flex flex-col">
            {SECTIONS.map((s, i) => {
              const isActive = s.key === active;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setActive(s.key)}
                    className={`relative flex w-full items-center px-25 py-20 text-left text-[15px] transition-colors ${
                      isActive
                        ? "font-semibold text-[#2563eb]"
                        : "font-medium text-subtle hover:text-ink"
                    } ${i < SECTIONS.length - 1 ? "border-b border-line" : ""}`}
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-full w-[3px] bg-[#2563eb]"
                      />
                    )}
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => alert("Custom sections coming soon")}
            className="mt-[1px] flex items-center gap-[6px] border-t border-line bg-white px-25 py-20 text-left text-[15px] font-medium text-subtle transition-colors hover:text-ink"
          >
            <Plus className="h-[16px] w-[16px]" strokeWidth={2} />
            Add a custom section
          </button>
        </nav>

        {/* Content */}
        <form
          id="edit-profile-form"
          onSubmit={handleSave}
          className="flex-1 overflow-y-auto bg-white"
        >
          <div className="mx-auto max-w-[860px] px-45 py-30">
            {active === "basic" && (
              <BasicSection
                firstName={firstName}
                lastName={lastName}
                role={role}
                school={school}
                country={country}
                city={city}
                website={website}
                avatar={avatar}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setRole={setRole}
                setSchool={setSchool}
                setCountry={setCountry}
                setCity={setCity}
                setWebsite={setWebsite}
                setAvatar={setAvatar}
                fallbackName={profile.name}
              />
            )}

            {active === "experience" && (
              <ExperienceSection
                experience={experience}
                education={education}
                addExperience={addExperience}
                updateExperience={updateExperience}
                removeExperience={removeExperience}
                addEducation={addEducation}
                updateEducation={updateEducation}
                removeEducation={removeEducation}
              />
            )}

            {active === "teams" && (
              <TeamsSection
                tags={tags}
                tagDraft={tagDraft}
                setTagDraft={setTagDraft}
                addTag={addTag}
                removeTag={removeTag}
              />
            )}

            {active === "web" && (
              <OnTheWebSection
                email={email}
                phone={phone}
                website={website}
                setEmail={setEmail}
                setPhone={setPhone}
                setWebsite={setWebsite}
              />
            )}

            {active === "about" && (
              <AboutMeSection bio={bio} setBio={setBio} />
            )}

            {active === "links" && (
              <LinksSection
                links={links}
                addLink={addLink}
                updateLink={updateLink}
                removeLink={removeLink}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ───────────── Sections ───────────── */

function BasicSection(props: {
  firstName: string;
  lastName: string;
  role: string;
  school: string;
  country: string;
  city: string;
  website: string;
  avatar: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setRole: (v: string) => void;
  setSchool: (v: string) => void;
  setCountry: (v: string) => void;
  setCity: (v: string) => void;
  setWebsite: (v: string) => void;
  setAvatar: (v: string) => void;
  fallbackName: string;
}) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") props.setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="flex flex-col gap-25">
      <Eyebrow>Basic Information</Eyebrow>
      <div className="grid grid-cols-[160px_1fr] gap-45">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-10">
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-pill bg-[#edf1f5] shadow-soft">
            {props.avatar ? (
              <img
                src={props.avatar}
                alt={props.fallbackName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="inline-flex h-full w-full items-center justify-center font-display text-2xl text-ink">
                {initials(props.fallbackName)}
              </span>
            )}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-[6px] text-sm font-semibold text-[#2563eb] transition-colors hover:text-[#1d4ed8]">
            <UploadCloud className="h-[16px] w-[16px]" strokeWidth={2} />
            Replace
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-20">
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            <Field label="First Name">
              <Input
                value={props.firstName}
                onChange={props.setFirstName}
                placeholder="First name"
              />
            </Field>
            <Field label="Last Name">
              <Input
                value={props.lastName}
                onChange={props.setLastName}
                placeholder="Last name"
              />
            </Field>
          </div>

          <Field label="Headline">
            <Input
              value={props.role}
              onChange={props.setRole}
              placeholder="e.g. Biology Teacher"
            />
          </Field>

          <Field label="Company">
            <Input
              value={props.school}
              onChange={props.setSchool}
              placeholder="School or organization"
            />
          </Field>

          <Field label="Location">
            <Select
              value={props.country}
              onChange={props.setCountry}
              options={COUNTRIES}
              placeholder="Select a country"
            />
          </Field>

          <Field label="City">
            <Input
              value={props.city}
              onChange={props.setCity}
              placeholder="City"
            />
          </Field>

          <Field label="Website URL">
            <Input
              value={props.website}
              onChange={props.setWebsite}
              placeholder="https://"
            />
          </Field>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({
  experience,
  education,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
}: {
  experience: ExperienceItem[];
  education: EducationItem[];
  addExperience: () => void;
  updateExperience: (idx: number, patch: Partial<ExperienceItem>) => void;
  removeExperience: (idx: number) => void;
  addEducation: () => void;
  updateEducation: (idx: number, patch: Partial<EducationItem>) => void;
  removeEducation: (idx: number) => void;
}) {
  return (
    <section className="flex flex-col gap-30">
      <Eyebrow>Work Experience</Eyebrow>

      <SubSection title="Experience" action={<AddButton onClick={addExperience}>Add experience</AddButton>}>
        {experience.length === 0 ? (
          <EmptyItem text="No experience added yet." />
        ) : (
          experience.map((item, idx) => (
            <ItemCard
              key={idx}
              onRemove={() => removeExperience(idx)}
              removeLabel={`Remove experience ${idx + 1}`}
            >
              <div className="grid grid-cols-1 gap-15 md:grid-cols-2">
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
                <TextArea
                  value={item.description}
                  onChange={(v) => updateExperience(idx, { description: v })}
                  rows={3}
                  placeholder="What did you do in this role?"
                />
              </Field>
            </ItemCard>
          ))
        )}
      </SubSection>

      <SubSection title="Education" action={<AddButton onClick={addEducation}>Add education</AddButton>}>
        {education.length === 0 ? (
          <EmptyItem text="No education added yet." />
        ) : (
          education.map((item, idx) => (
            <ItemCard
              key={idx}
              onRemove={() => removeEducation(idx)}
              removeLabel={`Remove education ${idx + 1}`}
            >
              <div className="grid grid-cols-1 gap-15 md:grid-cols-2">
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
                <TextArea
                  value={item.description}
                  onChange={(v) => updateEducation(idx, { description: v })}
                  rows={3}
                  placeholder="What did you focus on?"
                />
              </Field>
            </ItemCard>
          ))
        )}
      </SubSection>
    </section>
  );
}

function TeamsSection({
  tags,
  tagDraft,
  setTagDraft,
  addTag,
  removeTag,
}: {
  tags: string[];
  tagDraft: string;
  setTagDraft: (v: string) => void;
  addTag: () => void;
  removeTag: (t: string) => void;
}) {
  return (
    <section className="flex flex-col gap-20">
      <Eyebrow>Teams</Eyebrow>
      <p className="text-sm text-muted">
        Add the teams, subjects or communities you're a part of.
      </p>
      <div className="flex flex-wrap gap-[8px]">
        {tags.length === 0 && (
          <span className="text-xs text-subtle">No teams added yet.</span>
        )}
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-5 rounded-pill border border-line bg-canvas px-15 py-[6px] text-xs font-medium text-ink"
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
          placeholder="Add a team and press Enter"
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
          className="inline-flex h-[44px] shrink-0 items-center rounded-md border border-line bg-white px-20 text-sm font-medium text-ink transition-colors hover:bg-canvas disabled:opacity-40"
        >
          Add
        </button>
      </div>
    </section>
  );
}

function OnTheWebSection({
  email,
  phone,
  website,
  setEmail,
  setPhone,
  setWebsite,
}: {
  email: string;
  phone: string;
  website: string;
  setEmail: (v: string) => void;
  setPhone: (v: string) => void;
  setWebsite: (v: string) => void;
}) {
  return (
    <section className="flex flex-col gap-20">
      <Eyebrow>On The Web</Eyebrow>
      <Field label="Email">
        <Input value={email} onChange={setEmail} placeholder="you@school.edu" type="email" />
      </Field>
      <Field label="Phone">
        <Input value={phone} onChange={setPhone} placeholder="+91 ..." />
      </Field>
      <Field label="Website">
        <Input value={website} onChange={setWebsite} placeholder="yourname.edu" />
      </Field>
    </section>
  );
}

function AboutMeSection({ bio, setBio }: { bio: string; setBio: (v: string) => void }) {
  return (
    <section className="flex flex-col gap-20">
      <Eyebrow>About Me</Eyebrow>
      <Field label="About you">
        <TextArea
          value={bio}
          onChange={setBio}
          rows={8}
          placeholder="Tell the community about yourself"
        />
      </Field>
    </section>
  );
}

function LinksSection({
  links,
  addLink,
  updateLink,
  removeLink,
}: {
  links: Array<{ label: string; url: string }>;
  addLink: () => void;
  updateLink: (idx: number, patch: Partial<{ label: string; url: string }>) => void;
  removeLink: (idx: number) => void;
}) {
  return (
    <section className="flex flex-col gap-20">
      <div className="flex items-center justify-between">
        <Eyebrow>Links</Eyebrow>
        <AddButton onClick={addLink}>Add link</AddButton>
      </div>
      {links.length === 0 ? (
        <EmptyItem text="No links added yet." />
      ) : (
        <div className="flex flex-col gap-15">
          {links.map((l, idx) => (
            <ItemCard
              key={idx}
              onRemove={() => removeLink(idx)}
              removeLabel={`Remove link ${idx + 1}`}
            >
              <div className="grid grid-cols-1 gap-15 md:grid-cols-[200px_1fr]">
                <Field label="Label">
                  <Input
                    value={l.label}
                    onChange={(v) => updateLink(idx, { label: v })}
                    placeholder="e.g. Portfolio"
                  />
                </Field>
                <Field label="URL">
                  <Input
                    value={l.url}
                    onChange={(v) => updateLink(idx, { url: v })}
                    placeholder="https://"
                  />
                </Field>
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </section>
  );
}

/* ───────────── Primitives ───────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
      {children}
    </h2>
  );
}

function SubSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-15">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-medium text-ink leading-none">{title}</h3>
        {action}
      </div>
      <div className="flex flex-col gap-15">{children}</div>
    </div>
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
    <div className="relative flex flex-col gap-15 rounded-md border border-line bg-canvas p-20">
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
    <div className="rounded-md border border-dashed border-line bg-canvas/60 px-15 py-25 text-center text-xs text-subtle">
      {text}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-[6px]">
      <span className="text-[13px] font-medium text-subtle">{label}</span>
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
      className="h-[44px] w-full rounded-md border border-line bg-white px-15 text-[15px] font-medium text-ink placeholder:font-normal placeholder:text-subtle focus:border-[#2563eb] focus:outline-none"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full resize-y rounded-md border border-line bg-white px-15 py-[10px] text-[15px] leading-[1.55] text-ink placeholder:text-subtle focus:border-[#2563eb] focus:outline-none"
    />
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[44px] w-full appearance-none rounded-md border border-line bg-white px-15 pr-[44px] text-[15px] font-medium text-ink focus:border-[#2563eb] focus:outline-none"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-15 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-subtle"
        strokeWidth={1.8}
      />
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
