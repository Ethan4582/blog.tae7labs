/**
 * Shared interfaces for all tutorial/page content in blog.tae7labs.
 * Navigation structure lives in mockData.ts
 * Per-tutorial rich content lives in src/lib/data/<category>/<slug>.data.ts
 */

export interface ContentBlock {
   type: "paragraph" | "image" | "code" | "list" | "heading";
   text?: string;
   src?: string;
   alt?: string;
   language?: string;
   code?: string;
   name?: string; // e.g., filename for single code block
   items?: string[];
   tabs?: { name: string; language: string; code: string }[]; // For multi-file code blocks
}

export interface PostSection {
   id: string;
   title: string;
   content: ContentBlock[];
}

export interface PostContent {
   author?: string;
   date?: string;
   difficulty?: string;
   subtitle?: string;
   introduction?: string;
   liveDemo?: string;
   image?: string;
   sourceCode?: string;
   videoDemo?: string;
   gif?: string;
   sections: PostSection[];
}
