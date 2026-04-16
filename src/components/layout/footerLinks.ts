export type FooterLinkItem = {
  label: string;
  href: string;
};

export const footerExploreLinks: FooterLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

export const footerAboutLinks: FooterLinkItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our Team", href: "/about#team" },
];

export const footerSupportLinks: FooterLinkItem[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "Community", href: "/contact" },
  { label: "Support", href: "/contact" },
];
