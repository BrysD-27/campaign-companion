// Inline SVG icons. Stroke-based, 1.5px, currentColor.
const Icon = ({ d, size = 16, fill, stroke = "currentColor", strokeWidth = 1.5, children, viewBox = "0 0 24 24", style }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill || "none"} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {d ? <path d={d} /> : children}
  </svg>
);

const I = {
  Search:   (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Icon>,
  Plus:     (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Eye:      (p) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></Icon>,
  EyeOff:   (p) => <Icon {...p}><path d="M3 3l18 18"/><path d="M10.5 6.2A10 10 0 0 1 12 6c6.5 0 10 6 10 6a18 18 0 0 1-3.2 3.9"/><path d="M6.6 6.6A18 18 0 0 0 2 12s3.5 6 10 6a10 10 0 0 0 3.4-.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></Icon>,
  Filter:   (p) => <Icon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></Icon>,
  Grid:     (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></Icon>,
  List:     (p) => <Icon {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></Icon>,
  Sort:     (p) => <Icon {...p}><path d="M3 6h18M6 12h12M10 18h4"/></Icon>,
  Chevron:  (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>,
  ChevronD: (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>,
  Link:     (p) => <Icon {...p}><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 1 0 7 7l1-1"/></Icon>,
  Trash:    (p) => <Icon {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></Icon>,
  Edit:     (p) => <Icon {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></Icon>,
  Bold:     (p) => <Icon {...p}><path d="M7 4h7a4 4 0 0 1 0 8H7zM7 12h8a4 4 0 0 1 0 8H7z"/></Icon>,
  Italic:   (p) => <Icon {...p}><path d="M19 4h-9M14 20H5M15 4 9 20"/></Icon>,
  Quote:    (p) => <Icon {...p}><path d="M7 7v6H4V7h3zm0 0a3 3 0 0 1-3 3M17 7v6h-3V7h3zm0 0a3 3 0 0 1-3 3"/></Icon>,
  Heading:  (p) => <Icon {...p}><path d="M6 4v16M18 4v16M6 12h12"/></Icon>,
  More:     (p) => <Icon {...p}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></Icon>,
  Compass:  (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-3 7-3-7 6 0z"/></Icon>,
  Scroll:   (p) => <Icon {...p}><path d="M5 4h11a3 3 0 0 1 3 3v10a3 3 0 0 0 3 3H8a3 3 0 0 1-3-3V4z"/><path d="M5 4a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3"/></Icon>,
  Users:    (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>,
  Map:      (p) => <Icon {...p}><path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2zM9 3v16M15 5v16"/></Icon>,
  Calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M16 3v4M8 3v4M3 10h18"/></Icon>,
  Settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>,
  Book:     (p) => <Icon {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/></Icon>,
  Sword:    (p) => <Icon {...p}><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6"/><path d="m16 16 4 4"/><path d="m19 21 2-2"/></Icon>,
  Shield:   (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>,
  Gem:      (p) => <Icon {...p}><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></Icon>,
  Flask:    (p) => <Icon {...p}><path d="M9 3h6M10 3v7L4 20a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3"/></Icon>,
  Box:      (p) => <Icon {...p}><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></Icon>,
  Check:    (p) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>,
  X:        (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12"/></Icon>,
  Star:     (p) => <Icon {...p}><path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5-4.9 7-1z"/></Icon>,
  Cmd:      (p) => <Icon {...p}><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></Icon>,
};

window.I = I;
