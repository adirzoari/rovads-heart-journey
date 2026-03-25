import { motion } from "framer-motion";

interface HouseProgressProps {
  progress: number; // 0 to 1
}

const HouseProgress = ({ progress }: HouseProgressProps) => {
  const segments = 8;
  const filledSegments = Math.floor(progress * segments);

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-[10px] font-bold text-accent/80 tracking-widest uppercase">בניין עדי עד</p>
      <svg viewBox="0 0 120 100" className="w-16 h-12 sm:w-20 sm:h-16" xmlns="http://www.w3.org/2000/svg">
        {/* Roof */}
        <motion.polygon
          points="60,8 15,45 105,45"
          fill={filledSegments >= 8 ? "hsl(348, 55%, 65%)" : "none"}
          stroke="hsl(220, 15%, 22%)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, fill: filledSegments >= 8 ? "hsl(348, 55%, 65%)" : "none" }}
          transition={{ duration: 0.5 }}
        />
        {/* Body segments - 2 columns x 3 rows + door + window */}
        {/* Left wall */}
        <motion.rect x="20" y="45" width="38" height="20" rx="1"
          fill={filledSegments >= 1 ? "hsl(348, 55%, 65%)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 1 ? "hsl(348, 55%, 65%)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Right wall top */}
        <motion.rect x="62" y="45" width="38" height="20" rx="1"
          fill={filledSegments >= 2 ? "hsl(348, 55%, 65%)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 2 ? "hsl(348, 55%, 65%)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Left wall bottom */}
        <motion.rect x="20" y="67" width="38" height="20" rx="1"
          fill={filledSegments >= 3 ? "hsl(348, 55%, 65%)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 3 ? "hsl(348, 55%, 65%)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Right wall bottom */}
        <motion.rect x="62" y="67" width="38" height="20" rx="1"
          fill={filledSegments >= 4 ? "hsl(348, 55%, 65%)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 4 ? "hsl(348, 55%, 65%)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Window left */}
        <motion.rect x="28" y="50" width="14" height="12" rx="2"
          fill={filledSegments >= 5 ? "hsl(24, 90%, 72%)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1"
          animate={{ fill: filledSegments >= 5 ? "hsl(24, 90%, 72%)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Window right */}
        <motion.rect x="78" y="50" width="14" height="12" rx="2"
          fill={filledSegments >= 6 ? "hsl(24, 90%, 72%)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1"
          animate={{ fill: filledSegments >= 6 ? "hsl(24, 90%, 72%)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Door */}
        <motion.rect x="50" y="70" width="20" height="18" rx="2"
          fill={filledSegments >= 7 ? "hsl(348, 55%, 65%)" : "none"}
          stroke="hsl(220, 15%, 22%)" strokeWidth="1.5"
          animate={{ fill: filledSegments >= 7 ? "hsl(348, 55%, 65%)" : "none" }}
          transition={{ duration: 0.6 }}
        />
        {/* Door knob */}
        <circle cx="66" cy="80" r="1.5" fill="hsl(220, 15%, 22%)" />
        {/* Base line */}
        <line x1="10" y1="89" x2="110" y2="89" stroke="hsl(220, 15%, 22%)" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export default HouseProgress;
