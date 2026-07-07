export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  alt: string;
  description?: string;
  featured?: boolean;
  tags?: string[];
};

const img = (p: string) => `/assets/${p}`;

const humanize = (name: string) =>
  name
    .replace(/\.[a-z]+$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

// Branding — subcategorised
const brandingCatalogue = ["1.jpg", "2.jpg", "2_.jpg", "3.jpg"].map((f, i) => ({
  id: `catalogue-${i + 1}`,
  title: `Catalogue Design ${i + 1}`,
  category: "Branding",
  subcategory: "Catalogue",
  type: "image" as const,
  src: img(`branding/catalogue/${f}`),
  alt: `Premium catalogue print design piece ${i + 1} by Creativeskroll`,
}));

const brandingLetterhead = [
  {
    id: "letterhead-chhaunk",
    title: "Chhaunk Letterhead",
    category: "Branding",
    subcategory: "Letter Head",
    type: "image" as const,
    src: img("branding/letterhead/Chhaunk_letterhead.jpg"),
    alt: "Chhaunk restaurant corporate letterhead stationery design",
  },
];

const brandingMenu = [
  {
    id: "menu-restaurant",
    title: "Restaurant Menu Design",
    category: "Branding",
    subcategory: "Restaurant Menu",
    type: "image" as const,
    src: img("branding/menu/menu.jpg"),
    alt: "Editorial restaurant menu card design",
  },
  {
    id: "menu-zomato",
    title: "Zomato Menu Mockup",
    category: "Branding",
    subcategory: "Restaurant Menu",
    type: "image" as const,
    src: img("branding/menu/zomato_menu_mockup.jpg"),
    alt: "Zomato-ready restaurant menu mockup",
  },
];

const brandingTags = ["tag.jpg", "tag_1.jpg"].map((f, i) => ({
  id: `tag-${i + 1}`,
  title: `Product Tag ${i + 1}`,
  category: "Branding",
  subcategory: "Tags",
  type: "image" as const,
  src: img(`branding/tags/${f}`),
  alt: `Premium product hangtag design ${i + 1}`,
}));

const social = [
  "1199_ad.jpg","347.jpg","3rd_Aug.jpg","599_ad.jpg","999_ad.jpg","App_Design_1.jpg",
  "Distance_post.jpg","FLAVOUR.jpg","Get_featured_post.jpg","Instagram_Mockup_01.jpg",
  "Jacqueline_1.jpg","aso.jpg","christmas_post.jpg","christmas_sale_2.jpg","coffee_day.jpg",
  "contactless.jpg","cookie_day.jpg","coolers_poster.jpg","cs_post.jpg","dussehra.jpg",
  "fav._burger.jpg","fiery_post.jpg","friendship4.jpg","give_away.jpg","handwash_day.jpg",
  "ipl_2.jpg","kick_2.jpg","king_2.jpg","match1.jpg","open_now.jpg","opening_soon.jpg",
  "order.jpg","order_online.jpg","order_online_swiggy.jpg","this_or_that.jpg","unique.jpg",
  "valentine_half_s_collection_10.jpg","valentine_half_s_collection_8.jpg","wfh_post_white2.jpg",
].map((f, i) => ({
  id: `social-${i + 1}`,
  title: humanize(f),
  category: "Social Media",
  type: "image" as const,
  src: img(`social/${f}`),
  alt: `Instagram social media creative — ${humanize(f)}`,
}));

const metaAds = [
  "Magazine_ad.jpg","My_Ace_Ad_2.jpg","Networking.jpg","PR_Post.jpg",
  "PR_Services_1.jpg","Top_leaders.jpg","Video_Interview_post.jpg",
].map((f, i) => ({
  id: `meta-${i + 1}`,
  title: humanize(f),
  category: "Meta Ads",
  type: "image" as const,
  src: img(`meta_ads/${f}`),
  alt: `Meta / Facebook ad creative — ${humanize(f)}`,
}));

const photography = Array.from({ length: 12 }, (_, i) => ({
  id: `photo-${i + 1}`,
  title: `Photography ${i + 1}`,
  category: "Photography",
  type: "image" as const,
  src: img(`photography/${i + 1}.jpg`),
  alt: `Product & lifestyle photography ${i + 1}`,
}));

const youtube = [
  "AI_Tools.jpg","Beware_of_Human_Eaters!.jpg","Byjus.jpg","DUNKI_Disclosed.jpg",
  "Dating_Apps.jpg","Duty-Free_Retail.jpg","Lights,_Camera,_Toxicity.jpg","MLA_Salary.jpg",
  "OLA_&_Uber.jpg","Political_Acrobat.jpg","Political_merry-go_round.jpg",
  "Ragging_Thumbnail.jpg","Suicide.jpg",
].map((f, i) => ({
  id: `yt-${i + 1}`,
  title: humanize(f),
  category: "YouTube Thumbnails",
  type: "image" as const,
  src: img(`youtube/${f}`),
  alt: `YouTube thumbnail design — ${humanize(f)}`,
}));

const banners = [
  "Solid_2_1.jpg","Valentine_banner.jpg","christmas_sale_banner.jpg",
  "lowers_and_shorts.jpg","pink_tracksuit_banner.jpg","womens_collection_summer.jpg",
].map((f, i) => ({
  id: `banner-${i + 1}`,
  title: humanize(f),
  category: "Banner Designs",
  type: "image" as const,
  src: img(`banners/${f}`),
  alt: `Web / e-commerce banner design — ${humanize(f)}`,
}));

const illustrations = ["1.jpg", "2.jpg", "3.jpg", "4_1.jpg", "4_2.jpg"].map((f, i) => ({
  id: `illus-${i + 1}`,
  title: `Hand Illustration ${i + 1}`,
  category: "Hand Illustrations",
  type: "image" as const,
  src: img(`illustrations/${f}`),
  alt: `Hand-drawn illustration ${i + 1}`,
}));

const socialCampaign = ["allow_c.jpg", "share_c.jpg", "upload_c.jpg"].map((f, i) => ({
  id: `camp-${i + 1}`,
  title: humanize(f),
  category: "Social Campaign",
  type: "image" as const,
  src: img(`social_campaign/${f}`),
  alt: `Social campaign creative — ${humanize(f)}`,
}));

const logos = [
  "50_shades_of_noodles_sticker.jpg","All_Stuff_Social_LOGO_2.jpg","Artful_Desire_final.jpg",
  "Biryani_&_Rolls_1.jpg","IVM_logo_12.jpg","Maria_maria_logo_1.jpg","Tokyoto_logo.jpg",
  "chatwala_logo.jpg","mm_1.jpg","yaya_logo.jpg",
].map((f, i) => ({
  id: `logo-${i + 1}`,
  title: humanize(f).replace(/\bLogo\b/i, "Logo"),
  category: "Logo Design",
  type: "image" as const,
  src: img(`logos/${f}`),
  alt: `Brand logo design — ${humanize(f)}`,
  featured: i < 4,
}));

const tedx = ["TED_X_1.jpg", "TED_X_2.jpg", "TED_X_3.jpg"].map((f, i) => ({
  id: `tedx-${i + 1}`,
  title: `TEDx Design ${i + 1}`,
  category: "TEDx",
  type: "image" as const,
  src: img(`tedx/${f}`),
  alt: `TEDx event design ${i + 1}`,
}));

export const portfolio: PortfolioItem[] = [
  ...logos,
  ...brandingCatalogue,
  ...brandingLetterhead,
  ...brandingMenu,
  ...brandingTags,
  ...social,
  ...metaAds,
  ...youtube,
  ...banners,
  ...illustrations,
  ...socialCampaign,
  ...photography,
  ...tedx,
];

export const categories = [
  "All",
  "Logo Design",
  "Branding",
  "Social Media",
  "Meta Ads",
  "YouTube Thumbnails",
  "Banner Designs",
  "Hand Illustrations",
  "Social Campaign",
  "Photography",
  "TEDx",
] as const;

export type MotionItem = {
  id: string;
  driveId: string;
  title: string;
  category: "Event Films" | "Brand Promotions";
};

export const motionReel: MotionItem[] = [
  { id: "ev-1", driveId: "16MbFYTveJG7Uwxfr0zE4Teed-gAIDav1", title: "Event Film I", category: "Event Films" },
  { id: "ev-2", driveId: "1BApyDeLIg1-jrPSbbbZ0G0wk8gYAEV9p", title: "Event Film II", category: "Event Films" },
  { id: "ev-3", driveId: "1cPT1QgsZc7FLn8cd1Wr8oyls_joPOfUi", title: "Event Film III", category: "Event Films" },
  { id: "ev-4", driveId: "1uSkxDAi-pSbI1i9G48haOTfk3ODChwxt", title: "Event Film IV", category: "Event Films" },
  { id: "ev-5", driveId: "1sLb4wc4qY2zbPOT9b3GU12bPnnu3aHj8", title: "Event Film V", category: "Event Films" },
  { id: "bp-1", driveId: "1_zeAX9JV45L6cOZDrepGck0AVeM1gKT9", title: "Brand Promotion I", category: "Brand Promotions" },
  { id: "bp-2", driveId: "1LK6soAYOjpgJzV-8djneeSbwp9fgfdlB", title: "Brand Promotion II", category: "Brand Promotions" },
];

export const socials = {
  whatsapp:
    "https://wa.me/917891447123?text=Hi%20Sanchita%2C%20I%20came%20across%20your%20portfolio%20at%20creativeskroll.com%20and%20would%20love%20to%20discuss%20a%20project!",
  instagram: "https://instagram.com/creativeskroll",
  behance: "https://www.behance.net/sanchitabhatiadesign",
  linkedin: "https://www.linkedin.com/in/sanchita-bhatia-0099b3135/",
};