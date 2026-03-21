"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import languages from "./languages";

function Page() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState(i18n.language);

  return (
    <div className="py-[49px] px-[8px] flex flex-col gap-5 h-screen">
      <div className="flex gap-2 items-center">
        <svg
          aria-label="Назад"
          className="rotate-[-90deg] cursor-pointer"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Назад</title>
          <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
        </svg>
        <h1 className="font-black text-2xl">{t("language_preferences")}</h1>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold">{t("app_language")}</h2>
        <p className="text-gray-500">{t("app_language_description")}</p>
      </div>
      <div className="flex-1 overflow-y-auto w-[90%]">
        <div className="sticky top-0 py-2 z-10 bg-white dark:bg-black">
          <input
            type="text"
            className="w-[100%] h-[40px] rounded-[22px] indent-4 outline-0 bg-[#eaedf1] dark:bg-[#3b3b3b]"
            placeholder={t("search1")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          {languages
            .filter((elem) =>
              elem.label.toLowerCase().includes(search.toLowerCase().trim()),
            )
            .map((lang, i) => (
              <div
                className="w-[98%] flex justify-between items-center rounded-[12px] py-3 px-3 cursor-pointer hover:bg-[#f1f1f1] dark:hover:bg-[#353434]"
                key={i}
                onClick={() => {
                  setLanguage(lang.code);
                  i18n.changeLanguage(lang.code);
                }}
              >
                <span>{lang.label}</span>
                {language == lang.code ? (
                  <div
                    className="flex-shrink-0 h-6 w-6 bg-[#000] dark:bg-white [mask-image:url('https://i.instagram.com/static/images/bloks/icons/generated/circle-check__filled__24-4x.png')] [mask-size:contain]"
                    data-bloks-name="ig.components.Icon"
                  ></div>
                ) : (
                  <div
                    className="flex-shrink-0 h-6 w-6 bg-[rgb(219,219,219)] [mask-image:url('https://i.instagram.com/static/images/bloks/icons/generated/circle__outline__24-4x.png')] [mask-size:contain]"
                    data-bloks-name="ig.components.Icon"
                  ></div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
