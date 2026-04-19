"use client";

type Option = { value: string; label: string; description?: string };

type Props = {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  variant?: "card" | "chip";
};

export default function IntakeChips({ options, value, onChange, variant = "chip" }: Props) {
  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                active
                  ? "border-[#946B66] bg-[#F5F0EB] shadow-md"
                  : "border-[#E8D5D2] bg-white hover:border-[#C4A4A0]"
              }`}
            >
              <div className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-base mb-1">
                {opt.label}
              </div>
              {opt.description && (
                <div className="text-xs text-[#5E524F] leading-relaxed">{opt.description}</div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active
                ? "bg-[#946B66] text-white shadow-md"
                : "bg-[#F5F0EB] text-[#5E524F] hover:bg-[#E8D5D2]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
