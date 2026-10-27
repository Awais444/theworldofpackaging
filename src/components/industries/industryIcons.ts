import { Candy, Cookie, Cpu, Flame, Gem, Gift, Leaf, Package, Pill, Shirt, Sparkles, SprayCan, Watch, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  cosmetics: SprayCan,
  perfume: Sparkles,
  jewelry: Gem,
  watches: Watch,
  supplements: Pill,
  "food-bakery": Cookie,
  chocolates: Candy,
  cbd: Leaf,
  candles: Flame,
  apparel: Shirt,
  electronics: Cpu,
  "gifts-pr-kits": Gift,
};

export const industryIcon = (slug: string): LucideIcon => icons[slug] ?? Package;
