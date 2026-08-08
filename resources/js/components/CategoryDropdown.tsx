import { Check, ChevronDown, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CategoryDropdownProps {
    value: string;
    options: Array<string | { value: string; label: string }>;
    onChange: (value: string) => void;
    onAddCategory?: () => void;
    placeholder?: string;
}

export function CategoryDropdown({
    value,
    options,
    onChange,
    onAddCategory,
    placeholder = 'Pilih Kategori',
}: Readonly<CategoryDropdownProps>) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const closeOnOutsideClick = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
        };

        document.addEventListener('mousedown', closeOnOutsideClick);
        return () => document.removeEventListener('mousedown', closeOnOutsideClick);
    }, []);

    const selectCategory = (category: string) => {
        onChange(category);
        setIsOpen(false);
    };

    const selectedLabel = options.find((option) =>
        (typeof option === 'string' ? option : option.value) === value,
    );
    const displayValue = selectedLabel
        ? (typeof selectedLabel === 'string' ? selectedLabel : selectedLabel.label)
        : value;

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className={`flex w-full items-center justify-between rounded-xl border bg-slate-50/50 px-4 py-2.5 text-left text-sm transition ${
                    isOpen
                        ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/15'
                        : 'border-slate-200 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/40'
                }`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className={value ? 'font-medium text-slate-800' : 'text-slate-400'}>{displayValue || placeholder}</span>
                <ChevronDown className={`size-4 shrink-0 text-emerald-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-emerald-100 bg-white p-1.5 shadow-xl shadow-emerald-950/10" role="listbox">
                    <div className="max-h-56 overflow-y-auto py-1">
                        {options.map((option) => {
                            const category = typeof option === 'string' ? option : option.value;
                            const label = typeof option === 'string' ? option : option.label;
                            const isSelected = value === category;
                            return (
                                <button
                                    key={category}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => selectCategory(category)}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                        isSelected
                                            ? 'bg-emerald-600 font-semibold text-white'
                                            : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                                    }`}
                                >
                                    {label}
                                    {isSelected && <Check className="size-4" />}
                                </button>
                            );
                        })}
                    </div>
                    {onAddCategory && (
                        <div className="border-t border-slate-100 pt-1.5">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    onAddCategory();
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                            >
                                <Plus className="size-4" /> Tambah Kategori Baru
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
