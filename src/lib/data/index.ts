/**
 * Central registry for all tutorial data.
 * Add new tutorial imports here as you create them.
 *
 * Pattern: import { <name>Data } from "./<category>/<slug>.data";
 *          then add it to tutorialsData under its slug key.
 */

import type { PostContent } from "../types";
import { waterRippleData } from "./shader/water-ripple.data";
import { loaderSplitCounterData } from "./page_reveal/loader_split_counter";
import { scrollGalleryData } from "./scroll_animation/scroll_motion_gallery";

export type { PostContent };

export const tutorialsData: Record<string, PostContent> = {
   "scroll-motion-gallery": scrollGalleryData,
   "water-ripple-hover-effect": waterRippleData,
   "loader-split-counter": loaderSplitCounterData,
  
};

export function getTutorialData(slug: string): PostContent | null {
   return tutorialsData[slug] ?? null;
}
