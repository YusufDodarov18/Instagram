import Link from "next/link";
import SelectLanguages from "./selectLanguages";
import { useTranslation } from "react-i18next";

  const links = [
    {
      href: "https://www.meta.com/about/?utm_source=about.meta.com&utm_medium=redirect",
      label: "other.meta",
    },
    { href: "https://about.instagram.com/", label: "other.information" },
    { href: "https://about.instagram.com/blog/", label: "other.blog" },
    { href: "https://about.instagram.com/about-us/careers", label: "other.vacancy" },
    { href: "https://help.instagram.com/", label: "other.help" },
    {
      href: "https://developers.facebook.com/docs/instagram-platform",
      label: "other.api",
    },
    {
      href: "https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect",
      label: "other.confidentiality",
    },
    { href: "https://help.instagram.com/581066165581870/", label: "other.conditions" },
    { href: "https://www.instagram.com/explore/locations/", label: "other.places" },
    { href: "https://www.instagram.com/web/lite/", label: "other.instagramLite" },
    {
      href: "https://www.facebook.com/help/instagram/261704639352628",
      label: "other.download",
    },
    {
      href: "https://www.meta.com/meta-verified/?utm_source=about.meta.com&utm_medium=redirect",
      label: "other.metaVerified",
    },
  ];

export const Footer = () => {
  const {t}=useTranslation()
  return (
    <div className="w-full flex flex-col items-center pb-2 px-3">
      <div className="flex flex-wrap justify-center gap-3 text-[#5D6C7B] dark:text-[#A8A8A8]">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="hover:underline">
            {t(link.label)}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 py-4 items-center flex-col md:flex-row">
        <SelectLanguages />
        <p className="text-[14px] text-[#5D6C7B] dark:text-[#A8A8A8]">© 2026 Instagram from Meta</p>
      </div>
    </div>
  );
};
