"use client";

import { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CustomDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[11px] font-bold text-slate uppercase tracking-wider mb-1 px-1">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-mist/60 px-3.5 py-2.5 text-xs sm:text-sm font-medium transition text-left focus:outline-none focus:ring-2 focus:ring-blue/30 ${
          isOpen ? "border-blue bg-white shadow-xs" : "border-line hover:border-slate/40 hover:bg-white"
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && <span className="shrink-0 text-blue">{selectedOption.icon}</span>}
          <span className="truncate text-ink font-semibold">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <svg
          className={`h-4 w-4 shrink-0 text-slate transition-transform duration-200 ${isOpen ? "rotate-180 text-blue" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Floating Rounded Dropdown Card */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-50 origin-top rounded-2xl border border-line bg-white p-1.5 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="max-h-60 overflow-y-auto space-y-0.5">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs sm:text-sm transition ${
                    isSelected
                      ? "bg-ice text-blue font-semibold"
                      : "text-ink hover:bg-mist"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {opt.icon && (
                      <span className={`shrink-0 ${isSelected ? "text-blue" : "text-slate"}`}>
                        {opt.icon}
                      </span>
                    )}
                    <div>
                      <p className="truncate font-medium">{opt.label}</p>
                      {opt.sublabel && (
                        <p className="text-[10px] text-slate font-normal">{opt.sublabel}</p>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <svg className="h-4 w-4 shrink-0 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
