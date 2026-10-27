import { Box, Package, Palette, PenTool, Ruler, Tag, type LucideIcon } from "lucide-react";
import type { ServicePage } from "@/content/servicePages";

export const serviceIcons: Record<ServicePage["icon"], LucideIcon> = {
  palette: Palette,
  pen: PenTool,
  package: Package,
  tag: Tag,
  ruler: Ruler,
  box: Box,
};
