// ─── Update the main page list  ────────────────────────────────────────────────────────────

export const assets = {
   tutorials: {
      infinite3DGallery: {
         image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/blog_demo/demo.png",
         gif: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/blog_demo/3d_gallery_demo%20_Compress.mp4",
        
      },
      waterRipple: {
         image: "https://res.cloudinary.com/dbgee370f/image/upload/v1772525777/Screenshot_2026-03-03_124655_lgc6rs.png",
         gif: "https://res.cloudinary.com/dbgee370f/image/upload/v1772560969/water-ripple_comp_lxukvj.gif",
        
      },
      loaderSplitCounter: {
         image: "https://res.cloudinary.com/dbgee370f/image/upload/v1772610618/Screenshot_2026-03-04_131933_wkmqqm.png", // Placeholder
         gif: "https://res.cloudinary.com/dbgee370f/image/upload/v1772658902/split_loader_comp_qra2tg.gif", // Placeholder
        
      },
      scrollGallery: {
         image: "https://res.cloudinary.com/dbgee370f/image/upload/v1773086721/demp_scrool_Gallery_ilnemr.png", // Placeholder
         gif:"https://res.cloudinary.com/dbgee370f/image/upload/v1773207684/scroll_gallery_demo_compress_l2hnnt.gif",
      },
   },
   products: {
      template: "/assets/building2.png",
      bgDesign: "/assets/building1.png",
   },
   placeholders: {
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=placeholder",
      gif: "https://media.giphy.com/media/xUPGcSgTq2N24jInD2/giphy.gif",
   }
};

// ─── Icon SVG path data ───────────────────────────────────────────────────────
// Use with: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" ...>
//             <path d={icons.copy} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
//           </svg>

export const icons = {
   /** Two overlapping squares — copy to clipboard */
   copy: "M1 9.5C1 8.67157 1.67157 8 2.5 8H4V6.5C4 5.67157 4.67157 5 5.5 5H7V3.5C7 2.67157 7.67157 2 8.5 2H12.5C13.3284 2 14 2.67157 14 3.5V7.5C14 8.32843 13.3284 9 12.5 9H11V10.5C11 11.3284 10.3284 12 9.5 12H8V13.5C8 14.3284 7.32843 15 6.5 15H2.5C1.67157 15 1 14.3284 1 13.5V9.5ZM2.5 9C2.22386 9 2 9.22386 2 9.5V13.5C2 13.7761 2.22386 14 2.5 14H6.5C6.77614 14 7 13.7761 7 13.5V12H5.5C4.67157 12 4 11.3284 4 10.5V9H2.5ZM5 10.5C5 10.7761 5.22386 11 5.5 11H9.5C9.77614 11 10 10.7761 10 10.5V6.5C10 6.22386 9.77614 6 9.5 6H8V7.5C8 8.32843 7.32843 9 6.5 9H5V10.5ZM6.5 8C6.22386 8 6 7.77614 6 7.5V3.5C6 3.22386 6.22386 3 6.5 3H10.5C10.7761 3 11 3.22386 11 3.5V7.5C11 7.77614 10.7761 8 10.5 8H6.5Z",

   /** Tick / checkmark */
   check: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",

   /** Half-circle globe — used for "Medium" difficulty label */
   globe: "M7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5ZM0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5ZM7.5 2.5V12.5C10.2614 12.5 12.5 10.2614 12.5 7.5C12.5 4.73858 10.2614 2.5 7.5 2.5Z",

   /** Arrow pointing up-right — external link */
   arrowUpRight: "M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z",

   /** Arrow pointing right → */
   arrowRight: "M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z",

};

// ─── Convenience icon component type ─────────────────────────────────────────
// Usage in TSX:
//   import { icons } from "@/src/lib/asset_data";
//   <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
//     <path d={icons.copy} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
//   </svg>
