import { motion } from "framer-motion";

interface HouseProgressProps {
  progress: number; // 0 to 1
}

const HouseProgress = ({ progress }: HouseProgressProps) => {
  const segments = 8;
  const filledSegments = Math.floor(progress * segments);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] sm:text-xs md:text-sm font-bold text-foreground tracking-widest uppercase">בניין עדי עד</p>
      <div className="glass-button rounded-2xl p-3 md:p-4 card-shadow">
        <svg viewBox="0 0 120 100" className="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 lg:w-28 lg:h-24" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 2px 8px rgba(255, 215, 0, 0.2))" }}>
        {/* Roof */}
        <motion.polygon
          points="60,8 15,45 105,45"
          fill={filledSegments >= 8 ? "url(#goldGradient)" : "none"}
          stroke="hsl(220, 15%, 22%)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, fill: filledSegments >= 8 ? "url(#goldGradient)" : "none" }}
          transition={{ duration: 0.5 }}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(45, 100%, 60%)" />
            <stop offset="100%" stopColor="hsl(48, 100%, 67%)" />
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(350, 100%, 88%)" />
            <stop offset="100%" stopColor="hsl(350, 100%, 92%)" />
          </linearGradient>
        </defs>
        {/* Body segments - 2 columns x 3 rows + door + window */}
        {/* Left wall */}
        <motion.rect x="20" y="45" width="38" height="20" rx="1"
          fill={filledSegments >= 1 ? "url(#goldGradient)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 1 ? "url(#goldGradient)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Right wall top */}
        <motion.rect x="62" y="45" width="38" height="20" rx="1"
          fill={filledSegments >= 2 ? "url(#goldGradient)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 2 ? "url(#goldGradient)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Left wall bottom */}
        <motion.rect x="20" y="67" width="38" height="20" rx="1"
          fill={filledSegments >= 3 ? "url(#goldGradient)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 3 ? "url(#goldGradient)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Right wall bottom */}
        <motion.rect x="62" y="67" width="38" height="20" rx="1"
          fill={filledSegments >= 4 ? "url(#goldGradient)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 4 ? "url(#goldGradient)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Window left */}
        <motion.rect x="28" y="50" width="14" height="12" rx="2"
          fill={filledSegments >= 5 ? "url(#pinkGradient)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1"
          animate={{ fill: filledSegments >= 5 ? "url(#pinkGradient)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Window right */}
        <motion.rect x="78" y="50" width="14" height="12" rx="2"
          fill={filledSegments >= 6 ? "url(#pinkGradient)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1"
          animate={{ fill: filledSegments >= 6 ? "url(#pinkGradient)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Door */}
        <motion.rect x="50" y="70" width="20" height="18" rx="2"
          fill={filledSegments >= 7 ? "url(#goldGradient)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 7 ? "url(#goldGradient)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Door knob */}
        <circle cx="66" cy="80" r="1.5" fill="hsl(220, 15%, 22%)" />
        {/* Base line */}
        <line x1="10" y1="89" x2="110" y2="89" stroke="hsl(220, 15%, 22%)" strokeWidth="1.5" />
      </svg>
      </div>
    </div>
  );
};

export default HouseProgress;
