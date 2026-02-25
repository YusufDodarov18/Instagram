import Link from "next/link";
import SelectLanguages from "./selectLanguages";

const links = [
  {
    href: "https://www.meta.com/about/?utm_source=about.meta.com&utm_medium=redirect",
    label: "Meta",
  },
  { href: "https://about.instagram.com/", label: "About" },
  { href: "https://about.instagram.com/blog/", label: "Blog" },
  { href: "https://about.instagram.com/about-us/careers", label: "Jobs" },
  { href: "https://help.instagram.com/", label: "Help" },
  {
    href: "https://developers.facebook.com/docs/instagram-platform",
    label: "API",
  },
  {
    href: "https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect",
    label: "Privacy",
  },
  { href: "https://help.instagram.com/581066165581870/", label: "Terms" },
  { href: "https://www.instagram.com/explore/locations/", label: "Locations" },
  { href: "https://www.instagram.com/web/lite/", label: "Instagram Lite" },
  {
    href: "https://www.facebook.com/help/instagram/261704639352628",
    label: "Contact Uploading & Non-Users",
  },
  {
    href: "https://www.meta.com/meta-verified/?utm_source=about.meta.com&utm_medium=redirect",
    label: "Meta Verified",
  },
];

export const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center pb-2 px-3">
      <div className="flex flex-wrap justify-center gap-3 text-[#5D6C7B] dark:text-[#A8A8A8]">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 py-4 items-center flex-col md:flex-row">
        <SelectLanguages />

        <p className="text-[14px] text-[#5D6C7B] dark:text-[#A8A8A8]">
          © 2026 Instagram from Meta
        </p>
      </div>
    </div>
  );
};
