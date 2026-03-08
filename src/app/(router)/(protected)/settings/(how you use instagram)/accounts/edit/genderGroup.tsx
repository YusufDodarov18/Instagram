"use client"
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface GenderSelectProps {
  value: string;
  onChange: (value: string) => void;
  customGender: string;
  onCustomGenderChange: (value: string) => void;
  genderOptions: { value: string; label: string }[];
}

export default function Select({
  value,
  onChange,
  customGender,
  onCustomGenderChange,
  genderOptions,
}: GenderSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel =
    genderOptions.find((o) => o.value === value)?.label || "Выберите пол";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center  justify-between rounded-lg border border-border bg-background px-4 py-3 cursor-pointer text-xl text-foreground"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 dark:bg-[#272727] right-0 top-full z-50 mt-1 rounded-xl border border-border bg-background shadow-lg">
          <div className="py-2">
            {genderOptions.map((option) => (
              <div key={option.value}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-3.5 text-xl  cursor-pointer text-foreground hover:bg-accent transition-colors"
                  onClick={() => {
                    onChange(option.value);
                    if (option.value !== "custom") {
                      setIsOpen(false);
                    }
                  }}
                >
                  <span>{option.label}</span>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                      value === option.value
                        ? "border-foreground"
                        : "border-muted-foreground/40"
                    }`}
                  >
                    {value === option.value && (
                      <div className="h-3.5 w-3.5 rounded-full bg-foreground" />
                    )}
                  </div>
                </button>

                {option.value === "custom" && value === "custom" && (
                  <div className="px-5 pb-3">
                    <input
                      type="text"
                      value={customGender}
                      onChange={(e) => onCustomGenderChange(e.target.value)}
                      className="w-full rounded-lg border border-border bg-ig-light-bg px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
