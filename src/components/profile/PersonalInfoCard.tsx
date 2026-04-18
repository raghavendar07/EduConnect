import { AtSign, Cake, Globe, Languages, MapPin, Phone } from "lucide-react";
import type { PersonalInfo } from "../../types/profile";

export function PersonalInfoCard({ info }: { info: PersonalInfo }) {
  return (
    <section className="relative overflow-hidden rounded-md border border-line bg-white">
      {/* Decorative gradient band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-green-50 via-sand-100/60 to-purple-50"
      />

      <div className="relative flex flex-col gap-20 p-20">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-eyebrow text-subtle">
              About
            </span>
            <h2 className="font-display text-2xl font-medium text-ink leading-none">
              Personal Information
            </h2>
          </div>
          <div className="hidden items-center gap-5 rounded-pill border border-line bg-white px-15 py-5 text-xs font-medium text-muted md:inline-flex">
            <span className="h-[6px] w-[6px] rounded-pill bg-green-500" />
            Up to date
          </div>
        </div>

        {/* Content: Two columns of key-value "slabs" */}
        <div className="grid grid-cols-1 gap-15 md:grid-cols-2">
          {/* Contact */}
          <div className="flex flex-col gap-15 rounded-md border border-line bg-canvas p-20">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-subtle">
              Contact
            </p>
            <SlabRow icon={<AtSign className="h-4 w-4" />} label="Email" value={info.email} />
            <SlabRow icon={<Phone className="h-4 w-4" />} label="Phone" value={info.phone} />
            <SlabRow icon={<Globe className="h-4 w-4" />} label="Website" value={info.website} accent="green" />
          </div>

          {/* Personal */}
          <div className="flex flex-col gap-15 rounded-md border border-line bg-canvas p-20">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-subtle">
              Personal
            </p>
            <SlabRow icon={<MapPin className="h-4 w-4" />} label="Location" value={info.location} />
            <SlabRow icon={<Cake className="h-4 w-4" />} label="Birthday" value={info.birthday} />
            <SlabRow
              icon={<Languages className="h-4 w-4" />}
              label="Languages"
              valueNode={
                <div className="flex flex-wrap gap-5 pt-[2px]">
                  {info.languages.map((l) => (
                    <span
                      key={l}
                      className="inline-flex items-center rounded-pill bg-white border border-line px-10 py-[4px] text-xs font-medium text-ink"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SlabRow({
  icon,
  label,
  value,
  valueNode,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  valueNode?: React.ReactNode;
  accent?: "green" | "purple" | "sand";
}) {
  const accentText = accent === "green" ? "text-green-500" : "text-ink";
  return (
    <div className="flex items-start gap-15">
      <span className="mt-[2px] inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-pill bg-white text-subtle shadow-soft">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-subtle leading-none">
          {label}
        </span>
        {valueNode ? (
          valueNode
        ) : (
          <p className={`truncate text-sm font-medium ${accentText}`}>{value}</p>
        )}
      </div>
    </div>
  );
}
