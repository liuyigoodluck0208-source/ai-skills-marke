'use client';

interface FilterBarProps {
  platforms: { id: string; name: string }[];
  activePlatform: string;
  sortBy: string;
  onPlatformChange: (platform: string) => void;
  onSortChange: (sort: string) => void;
  sortLabels: { newest: string; stars: string; favorites: string };
}

export default function FilterBar({
  platforms,
  activePlatform,
  sortBy,
  onPlatformChange,
  onSortChange,
  sortLabels,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onPlatformChange('all')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            activePlatform === 'all'
              ? 'bg-brand-500/20 text-brand-300'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          All
        </button>
        {platforms.map(p => (
          <button
            key={p.id}
            onClick={() => onPlatformChange(p.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activePlatform === p.id
                ? 'bg-brand-500/20 text-brand-300'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="h-5 w-px bg-white/10 hidden sm:block" />

      <div className="flex gap-1.5">
        {[
          { key: 'stars', label: sortLabels.stars },
          { key: 'newest', label: sortLabels.newest },
          { key: 'favorites', label: sortLabels.favorites },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => onSortChange(s.key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              sortBy === s.key
                ? 'bg-white/10 text-white'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
