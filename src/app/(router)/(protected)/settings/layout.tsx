"use client";

import { meta } from "@/app/widget/icons/svg";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { ChevronLeft } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Setting({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const mobile = pathname === "/settings" || pathname === "/settings/";
  return (
    <div className="flex min-h-screen bg-background pb-10 md:pb-0">
      {(!isMobile || mobile) && (
        <aside className={`${isMobile ? "w-[100%]" : "w-[340px] min-w-[340px] border-r border-border"} h-screen sticky top-0 overflow-hidden`}>
          <nav className="h-[100%] flex flex-col px-5 overflow-y-auto pb-8">
            <div className="px-4 pt-6 pb-4">
              <h1 className="text-xl font-bold text-foreground">{t("layout.mores.setting")}</h1>
            </div>

            <div className="flex flex-col justify-center gap-3 w-full">
                  <Link className="hidden md:block" href={`https://accountscenter.instagram.com/?entry_point=app_settings`}>
                      <div className="flex flex-col px-7 pt-6 pb-3 cursor-pointer rounded-2xl gap-3 shadow-xl bg-white hover:bg-[#f0eeee] dark:bg-[#262626] hover:dark:bg-[#2e2d2d] dark:text-white">
                            <Typography>{meta}</Typography>
                            <Typography sx={{ fontWeight: 900 }} variant="body1">{t("setting.Account Center")}</Typography>
                            <p className="text-[#6A717A] dark:text-[#A8A8A8]">{t("setting.Manage cross-service features and account settings on Meta platforms.")}</p>
                            <div className="flex flex-col gap-3">
                                  <div className="flex gap-3 text-[#6A717A] dark:text-[#A8A8A8] items-center">
                                     <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
                                        <title>Личная информация</title>
                                        <path d="M15.5 6.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Zm2 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-5.5 7c3.955 0 7.465 1.88 9.552 4.77 1.015 1.406.219 3.252-1.361 3.69-1.705.473-4.518 1.04-8.192 1.04-3.67 0-6.488-.57-8.2-1.046-1.587-.44-2.356-2.295-1.351-3.686 2.086-2.89 5.597-4.768 9.551-4.768Zm0 2c-3.32 0-6.223 1.575-7.93 3.939a.332.332 0 0 0-.046.324.44.44 0 0 0 .308.264C5.898 20.462 8.537 21 12 21c3.467 0 6.1-.536 7.657-.968a.46.46 0 0 0 .32-.27.327.327 0 0 0-.045-.322C18.225 17.076 15.32 15.5 12 15.5Z" fill="currentColor"></path>
                                     </svg>
                                     <p>{t("setting.Personal Information")}</p>
                                  </div>
                                  <div className="flex gap-3 text-[#6A717A] dark:text-[#A8A8A8] items-center">
                                     <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16">
                                           <title>Пароль и безопасность</title>
                                           <polyline fill="none" points="16.723 8.93 10.498 15.155 7.277 11.933" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.978"></polyline>
                                           <path d="M3 13.5a9 9 0 0 0 18 0V4.488A17.848 17.848 0 0 1 12 1.5a17.848 17.848 0 0 1-9 2.988Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.978"></path>
                                     </svg>
                                     <p>{t("setting.Password and Security")}</p>
                                  </div>
                                  <div className="flex gap-3 text-[#6A717A] dark:text-[#A8A8A8] items-center">
                                        <svg aria-label="" className="x1lliihq x1n2onr6 x1roi4f4" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16">
                                            <title>Рекламные предпочтения</title>
                                            <path d="M18.44 1H5.56A4.565 4.565 0 0 0 1 5.561v12.878A4.565 4.565 0 0 0 5.56 23h12.88A4.566 4.566 0 0 0 23 18.44V5.56A4.566 4.566 0 0 0 18.44 1ZM21 18.44A2.564 2.564 0 0 1 18.44 21H5.56A2.563 2.563 0 0 1 3 18.44V5.56A2.563 2.563 0 0 1 5.56 3h12.88A2.564 2.564 0 0 1 21 5.561Z"></path>
                                            <path d="M12 16H6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm6-10H6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm-1 6H7V8h10Zm1 4h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Z"></path>
                                        </svg>
                                        <p>{t("setting.Ad Preference")}</p>
                                  </div>
                            </div>
                            <h5 className="text-[#4150F7] dark:text-[#708DFF]">{t("setting.More settings in Account Center")}</h5>
                      </div>
                  </Link>

              <div className="flex flex-col gap-2 mt-5">
                  <div className="flex flex-col gap-2">
                        <Typography sx={{color:"gray",fontWeight:500}} variant="body2">{t("setting.How you use Instagram")}</Typography>
                        <Link href={`/settings/accounts/edit`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/accounts/edit"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="25" role="img" viewBox="0 0 24 24" width="25">
                                  <title>Редактировать профиль</title>
                                  <path d="M12 .5C5.66.5.5 5.66.5 12S5.66 23.5 12 23.5 23.5 18.34 23.5 12 18.34.5 12 .5Zm0 21a9.428 9.428 0 0 1-4.95-1.407c1.109-1.634 2.936-2.62 4.95-2.62s3.841.986 4.95 2.62A9.428 9.428 0 0 1 12 21.5Zm6.534-2.621c-1.484-2.125-3.885-3.406-6.534-3.406s-5.05 1.281-6.534 3.406A9.466 9.466 0 0 1 2.5 12c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5a9.466 9.466 0 0 1-2.966 6.879ZM12 4.75c-2.62 0-4.75 2.13-4.75 4.75s2.13 4.75 4.75 4.75 4.75-2.13 4.75-4.75S14.62 4.75 12 4.75Zm0 7.5c-1.517 0-2.75-1.233-2.75-2.75S10.483 6.75 12 6.75s2.75 1.233 2.75 2.75-1.233 2.75-2.75 2.75Z"></path>
                            </svg>
                            <p>{t("setting.Edit profile")}</p>
                        </Link>
                        <Link href={`/settings/accounts/notification`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/accounts/notification"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Уведомления</title>
                                  <path d="m21.306 14.019-.484-.852A6.358 6.358 0 0 1 20 9.997a7.953 7.953 0 0 0-4.745-7.302 3.971 3.971 0 0 0-6.51.002 7.95 7.95 0 0 0-4.74 7.323 6.337 6.337 0 0 1-.83 3.175l-.468.823a4.001 4.001 0 0 0 3.476 5.983h1.96a3.98 3.98 0 0 0 7.716 0h1.964a4.004 4.004 0 0 0 3.482-5.982Zm-9.304 6.983a1.993 1.993 0 0 1-1.722-1.001h3.444a1.993 1.993 0 0 1-1.722 1.001Zm7.554-3.997a1.986 1.986 0 0 1-1.732.996H6.184a2.002 2.002 0 0 1-1.74-2.993l.47-.822a8.337 8.337 0 0 0 1.093-4.174 5.962 5.962 0 0 1 3.781-5.584.996.996 0 0 0 .494-.426 1.976 1.976 0 0 1 3.439 0 1 1 0 0 0 .494.425 5.989 5.989 0 0 1 3.786 5.634 8.303 8.303 0 0 0 1.082 4.094l.483.852a1.984 1.984 0 0 1-.01 1.998Z"></path>
                            </svg>
                            <p>{t("layout.notification")}</p>
                        </Link>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                        <Typography sx={{color:"gray",fontWeight:500}} variant="body2">{t("setting.Who can see your content")}</Typography>
                        <Link href={`/settings/account_privacy`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/account_privacy"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Конфиденциальность аккаунта</title>
                                  <path d="M6.71 9.555h10.581a2.044 2.044 0 0 1 2.044 2.044v8.357a2.044 2.044 0 0 1-2.043 2.043H6.71a2.044 2.044 0 0 1-2.044-2.044V11.6A2.044 2.044 0 0 1 6.71 9.555Zm1.07 0V6.222a4.222 4.222 0 0 1 8.444 0v3.333" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                            </svg>
                            <p>{t("setting.account_privacy.Account privacy")}</p>
                        </Link>
                        <Link href={`/settings/close_friends`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/close_friends"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Близкие друзья</title>
                                  <path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Zm4.691-11.82L13.91 9.35l-1.08-2.537a.893.893 0 0 0-1.66 0L10.086 9.35l-2.783.334a.963.963 0 0 0-.493 1.662l2.095 1.905-.606 2.837a.918.918 0 0 0 1.363 1.018l2.335-1.504 2.335 1.504a.918.918 0 0 0 1.363-1.018l-.605-2.837 2.094-1.905a.962.962 0 0 0-.493-1.662Z" fill-rule="evenodd"></path>
                            </svg>
                            <p>{t("setting.Close friends")}</p>
                        </Link>
                        <Link href={`/settings/blocked_accounts`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/blocked_accounts"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Заблокированные</title>
                                  <path d="M20.153 20.106A11.493 11.493 0 0 0 3.893 3.858c-.007.007-.016.009-.023.016s-.009.016-.015.023a11.493 11.493 0 0 0 16.247 16.26c.01-.009.022-.012.03-.02.01-.01.012-.022.021-.031Zm1.348-8.102a9.451 9.451 0 0 1-2.119 5.968L6.033 4.622a9.49 9.49 0 0 1 15.468 7.382Zm-19 0a9.451 9.451 0 0 1 2.118-5.967l13.35 13.35A9.49 9.49 0 0 1 2.5 12.003Z"></path>
                            </svg>
                            <p>{t("setting.Blocked")}</p>
                        </Link>
                        <Link href={`/settings/hide_story_and_live`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/hide_story_and_live"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>История и местоположение</title>
                                    <path d="M1.545 13.386a1 1 0 0 0 .961-1.037Q2.5 12.174 2.5 12a9.514 9.514 0 0 1 .467-2.955 1 1 0 0 0-1.902-.62A11.53 11.53 0 0 0 .5 12c0 .142.002.283.008.425a1 1 0 0 0 .998.962.52.52 0 0 0 .04-.001Zm1.742 2.424a1 1 0 1 0-1.834.798 11.588 11.588 0 0 0 3.163 4.23A1 1 0 1 0 5.9 19.307a9.581 9.581 0 0 1-2.614-3.497Zm12.828 4.757a9.575 9.575 0 0 1-7.113.45 1 1 0 1 0-.629 1.899 11.545 11.545 0 0 0 8.607-.546 1 1 0 0 0-.865-1.803Zm4.69-1.176A11.495 11.495 0 0 0 12.002.5a1 1 0 0 0 0 2 9.492 9.492 0 0 1 7.382 15.469L2.207.793A1 1 0 0 0 .793 2.207l21 21a1 1 0 0 0 1.414-1.414Z"></path>
                              </svg>
                              <p>{t("setting.Story and location")}</p>
                        </Link>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                        <Typography sx={{color:"gray",fontWeight:500}} variant="body2">{t("setting.Interaction with you")}</Typography>
                        <Link href={`/settings/messages_and_story_replies`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/messages_and_story_replies"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Сообщения и ответы на истории</title>
                                  <path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                  <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
                            </svg>
                            <p>{t("setting.messages_and_story_replies")}</p>
                        </Link>
                        <Link href={`/settings/tags_and_mentions`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/tags_and_mentions"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Метки и упоминания</title>
                                  <path d="M15.108 13.652a3.342 3.342 0 0 1-3.341 3.342h-.661a2.246 2.246 0 0 1-2.246-2.246v-.634a2.246 2.246 0 0 1 2.246-2.246h3.654" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path>
                                  <path d="M17.521 22h-7.368a6.95 6.95 0 0 1-3.695-.642 4.356 4.356 0 0 1-1.813-1.812 6.96 6.96 0 0 1-.64-3.696v-7.7a6.964 6.964 0 0 1 .64-3.697 4.36 4.36 0 0 1 1.813-1.812A6.952 6.952 0 0 1 10.153 2h3.74a6.95 6.95 0 0 1 3.694.64 4.356 4.356 0 0 1 1.814 1.813 6.956 6.956 0 0 1 .64 3.696v6.464a2.38 2.38 0 0 1-2.38 2.38h-.13a2.423 2.423 0 0 1-2.422-2.422V9.019a2.471 2.471 0 0 0-2.47-2.471h-.994a2.471 2.471 0 0 0-2.47 2.47v.268" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path>
                            </svg>
                            <p>{t("setting.tags_and_mentions")}</p>
                        </Link>
                        <Link href={`/settings/comments`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/comments"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Комментарии</title>
                                  <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                            </svg>  
                            <p>{t("setting.comments")}</p>
                        </Link>
                        <Link href={`/settings/sharing_and_reuse`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/sharing_and_reuse"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Репосты и повторное использование</title>
                                  <path d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"></path>
                            </svg>
                            <p>{t("setting.reposts_and_reuse")}</p>
                        </Link>
                        <Link href={`/settings/restricted_accounts`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/restricted_accounts"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Аккаунты с ограничениями</title>
                                  <path d="M16.546 21.468A10.505 10.505 0 0 1 2.532 7.454m2.043-2.879a10.5 10.5 0 1 1 14.85 14.85" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                  <path d="M8.027 8.028a4.266 4.266 0 1 1 5.53 5.529m-8.959 5.891a4.27 4.27 0 0 1 4.017-2.822h3.09" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                  <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="1.5" x2="22.5" y1="1.5" y2="22.5"></line>
                            </svg>
                            <p>{t("setting.restricted_accounts")}</p>
                        </Link>
                        <Link href={`/settings/hidden_words`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/hidden_words"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Скрытые слова</title>
                                  <path d="M12.596 20.797h-2.178l-.009-.039-.815-3.735H4.7l-.825 3.774H1.673l.014-.061L5.744 3.203h2.78l.01.038Zm-7.449-5.823h4L7.134 5.835Zm11.813 6.123a3.198 3.198 0 0 1-3.274-3.473c0-1.881 1.011-3.056 3.185-3.698l1.8-.524c.754-.212 1.163-.486 1.163-1.327a1.732 1.732 0 0 0-1.95-1.775 1.746 1.746 0 0 0-1.9 1.9v.524h-2.048V12.2a3.61 3.61 0 0 1 3.949-3.75c2.578 0 3.998 1.323 3.998 3.724v8.623h-2v-1.569a2.998 2.998 0 0 1-2.923 1.87Zm2.874-6.427a2.914 2.914 0 0 1-1.26.577l-1.126.325a1.996 1.996 0 0 0-1.714 1.976 1.565 1.565 0 0 0 1.675 1.7c2.189 0 2.425-2.237 2.425-3.199Z"></path>
                            </svg>
                            <p>{t("setting.hidden_words")}</p>
                        </Link>
                  </div>
                   <div className="flex flex-col gap-2 mt-2">
                        <Typography sx={{color:"gray",fontWeight:500}} variant="body2">{t("what_you_see")}</Typography>
                        <Link href={`/settings/muted_accounts`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/muted_accounts"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Скрытые аккаунты</title>
                                  <path d="m22.957 21.543-2.527-2.527a4.02 4.02 0 0 0 1.149-1.625 3.988 3.988 0 0 0-.273-3.371l-.484-.853a6.364 6.364 0 0 1-.82-3.17 7.953 7.953 0 0 0-4.746-7.302C14.51 1.642 13.292 1 12.001 1s-2.507.642-3.254 1.697A7.963 7.963 0 0 0 6.065 4.65L2.457 1.043a1 1 0 1 0-1.414 1.414l20.5 20.5a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414Zm-3.252-4.852c-.14.373-.385.68-.69.91L7.484 6.068a5.975 5.975 0 0 1 2.305-1.641 1 1 0 0 0 .493-.426A1.982 1.982 0 0 1 12.002 3c.71 0 1.353.375 1.72 1.002a.996.996 0 0 0 .493.425c2.3.914 3.786 3.1 3.786 5.634 0 1.434.374 2.85 1.081 4.094l.485.852c.298.526.348 1.124.138 1.684Zm-4.915 1.603a1 1 0 0 0-.707-.293H6.184c-.722 0-1.368-.372-1.73-.996s-.367-1.37-.01-1.996l.47-.823a8.344 8.344 0 0 0 1.093-4.171v-.09h-1l-1 .095a6.344 6.344 0 0 1-.83 3.175l-.47.823c-.714 1.253-.708 2.746.017 3.992s2.019 1.991 3.46 1.991h1.943a4.008 4.008 0 0 0 3.874 3 4.011 4.011 0 0 0 3.854-2.923.999.999 0 0 0-.256-.975l-.809-.81Zm-2.789 2.708a2.002 2.002 0 0 1-1.732-1.001h3.4l.041.041a2.01 2.01 0 0 1-1.709.96Z"></path>
                            </svg>
                            <p>{t("setting.hidden_accounts")}</p>
                        </Link>
                        <Link href={`/settings/content_preferences`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/content_preferences"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Настройки контента</title>
                                  <path d="m18.509 14.757-4.285-2.474a.857.857 0 0 0-1.286.743v4.948a.857.857 0 0 0 1.286.742l4.285-2.474a.857.857 0 0 0 0-1.485ZM5.225 3.977a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25ZM19.5 7.5h-3v-3a4.004 4.004 0 0 0-4-4h-8a4.004 4.004 0 0 0-4 4v8a4.004 4.004 0 0 0 4 4h3v3a4.004 4.004 0 0 0 4 4h8a4.004 4.004 0 0 0 4-4v-8a4.004 4.004 0 0 0-4-4Zm-12 7h-3a1.997 1.997 0 0 1-1.882-1.349l2.607-2.607L7.5 12.819Zm.23-4.28L6.41 8.9a1.679 1.679 0 0 0-2.37 0L2.5 10.44V4.5a2.003 2.003 0 0 1 2-2h8a2.003 2.003 0 0 1 2 2v3h-3a3.992 3.992 0 0 0-3.77 2.72ZM21.5 19.5a2.003 2.003 0 0 1-2 2h-8a2.003 2.003 0 0 1-2-2v-8a2.003 2.003 0 0 1 2-2h8a2.003 2.003 0 0 1 2 2Z"></path>
                            </svg>
                            <p>{t("setting.content_settings")}</p>
                        </Link>
                        <Link href={`/settings/like_count`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/like_count"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                            <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                  <title>Число отметок "Нравится" и репостов</title>
                                  <path d="m18.474 17.56.038-.033c2.338-2.004 4.988-4.276 4.988-7.87 0-3.947-3.01-7.157-6.708-7.157-1.97 0-3.546.692-4.797 2.11C10.735 3.192 9.162 2.5 7.21 2.5c-1.088 0-2.113.28-3.021.774L2.207 1.293A1 1 0 1 0 .793 2.707l20 20a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414l-3.733-3.733ZM7.209 4.5c1.887 0 2.936.898 3.674 1.919.84 1.16.98 1.741 1.12 1.741.14 0 .278-.58 1.11-1.745.732-1.023 1.768-1.915 3.679-1.915 2.596 0 4.708 2.313 4.708 5.156 0 2.736-2.156 4.522-4.445 6.485L5.705 4.791A4.179 4.179 0 0 1 7.209 4.5Zm6.18 14.944-1.053.928-.336.294-.336-.295-6.917-6.094A6.632 6.632 0 0 1 2.5 9.304c0-.41.05-.816.152-1.204a1 1 0 0 0-1.935-.504A6.8 6.8 0 0 0 .5 9.304a8.635 8.635 0 0 0 2.925 6.474l6.917 6.094c.472.417 1.065.625 1.658.625s1.186-.208 1.658-.625l1.053-.927a1 1 0 0 0-1.322-1.501Z"></path>
                            </svg>
                            <p>{t("setting.likes_and_reposts_count")}</p>
                        </Link>
                        <Link href={`/settings/subscriptions`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/subscriptions"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Платные подписки</title>
                                    <path d="M19.269 20H4.73a1 1 0 0 1-.973-.77L1.026 7.641A1 1 0 0 1 2.82 6.84a3.674 3.674 0 0 0 3.666 1.725c1.992-.308 3.74-2.13 4.56-4.754a1 1 0 0 1 1.908 0c.82 2.625 2.567 4.446 4.56 4.754A3.674 3.674 0 0 0 21.18 6.84a1 1 0 0 1 1.794.802L20.242 19.23a1 1 0 0 1-.973.77ZM5.523 18h12.954l1.857-7.878a5.439 5.439 0 0 1-3.126.419A7.506 7.506 0 0 1 12 6.611a7.506 7.506 0 0 1-5.208 3.93 5.437 5.437 0 0 1-3.126-.42Z"></path>
                              </svg>
                              <p>{t("setting.paid_subscriptions")}</p>
                        </Link>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                        <Typography sx={{color:"gray",fontWeight:500}} variant="body2">{t("your_app_and_media")}</Typography>
                        <Link href={`/settings/archiving_and_downloading`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/archiving_and_downloading"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Архивирование и скачивание</title>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="11.914" x2="11.914" y1="15.195" y2="2"></line>
                                    <polyline fill="none" points="16.013 11.095 11.914 15.195 7.814 11.095" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="3.277" x2="20.55" y1="22" y2="22"></line>
                              </svg>
                              <p>{t("setting.archiving_and_download")}</p>
                        </Link>
                        <Link href={`/settings/accessibility`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/accessibility"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Специальные возможности</title>
                                    <path d="M12 .5A11.5 11.5 0 1 0 23.5 12 11.513 11.513 0 0 0 12 .5zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5zm0-13.684a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5zm4.553.513a32.103 32.103 0 0 1-9.106 0 1 1 0 0 0-.292 1.978c.774.114 1.567.2 2.37.257l-.415 7.57a1 1 0 0 0 .944 1.053l.055.001a1 1 0 0 0 .998-.945l.23-4.178h1.327l.23 4.178a1 1 0 0 0 .997.945l.055-.001a1 1 0 0 0 .944-1.054l-.415-7.569a31.927 31.927 0 0 0 2.37-.257 1 1 0 0 0-.292-1.978z"></path>
                              </svg>
                              <p>{t("setting.accessibility")}</p>
                        </Link>
                        <Link href={`/settings/language/preferences`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/language/preferences"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Язык</title>
                                    <path d="M13.25 5.124h-2.875v-.372a.875.875 0 0 0-1.75 0v.372H5.759a.875.875 0 1 0 0 1.75h.643a8.794 8.794 0 0 0 1.712 2.723 4.84 4.84 0 0 1-1.481.536.875.875 0 0 0 .116 1.742.891.891 0 0 0 .113-.007 6.982 6.982 0 0 0 2.659-1.081 6.99 6.99 0 0 0 2.608 1.08.87.87 0 0 0 .984-.741.878.878 0 0 0-.736-.992 4.846 4.846 0 0 1-1.453-.537 8.57 8.57 0 0 0 1.681-2.723h.645a.875.875 0 0 0 0-1.75Zm-3.73 3.41a6.78 6.78 0 0 1-1.196-1.66h2.37a6.583 6.583 0 0 1-1.175 1.66ZM20 5a1 1 0 0 0 0 2 1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-6a1 1 0 0 0-1 1v1.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l4 4A1 1 0 0 0 15 22v-3h5a3.003 3.003 0 0 0 3-3V8a3.003 3.003 0 0 0-3-3Zm-5 10a3.003 3.003 0 0 0 3-3V4a3.003 3.003 0 0 0-3-3H4a3.003 3.003 0 0 0-3 3v8a3.003 3.003 0 0 0 3 3v3a1 1 0 0 0 1.625.781L10.351 15Zm-5.625-1.781L6 15.919V14a1 1 0 0 0-1-1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-5a1.002 1.002 0 0 0-.625.219Z"></path>
                              </svg>
                              <p>{t("setting.language")}</p>
                        </Link>
                        <Link href={`/settings/website_permissions`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/website_permissions"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Разрешения сайта</title>
                                    <path d="M3.642 16.11V6.033a1.192 1.192 0 0 1 1.192-1.192h13.433a1.192 1.192 0 0 1 1.192 1.192m-5.343 13.125H3.778A1.778 1.778 0 0 1 2 17.38v-1.27h11.917" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                    <path d="M22 17.832v.16a1.322 1.322 0 0 1-.121.7.826.826 0 0 1-.343.345 1.316 1.316 0 0 1-.7.121h-2.755a1.315 1.315 0 0 1-.7-.121.826.826 0 0 1-.343-.344 1.321 1.321 0 0 1-.12-.7V10.2a1.321 1.321 0 0 1 .12-.7.826.826 0 0 1 .344-.344 1.315 1.315 0 0 1 .699-.122h2.755a1.315 1.315 0 0 1 .7.122.826.826 0 0 1 .343.343A1.322 1.322 0 0 1 22 10.2v7.632Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                              </svg>
                              <p>{t("setting.site_permissions")}</p>
                        </Link>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                        <Typography sx={{color:"gray",fontWeight:500}} variant="body2">{t("family_center")}</Typography>
                        <Link href={`/settings/supervision_web`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/supervision_web"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="36" role="img" viewBox="0 0 24 24" width="36">
                                    <title>Родительский контроль для аккаунтов подростков</title>
                                    <path d="M3.504 21H3v-9.03l9-8.588 9.31 8.885a1 1 0 1 0 1.38-1.448l-10-9.543a1.001 1.001 0 0 0-1.38 0l-10 9.543c-.198.19-.31.45-.31.724V22a1 1 0 0 0 1 1h1.504a1 1 0 1 0 0-2Zm17.195-2h-2.403a2.804 2.804 0 0 0-2.8 2.8v.2a1 1 0 0 0 1 1H22.5a1 1 0 0 0 1-1v-.2c0-1.544-1.257-2.8-2.8-2.8ZM9.256 13.553a3.255 3.255 0 0 0 3.25 3.25c1.792 0 3.25-1.458 3.25-3.25s-1.458-3.25-3.25-3.25a3.255 3.255 0 0 0-3.25 3.25Zm10.242-.053a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-8.955 4.303a4.044 4.044 0 0 0-4.04 4.04v.357a.8.8 0 0 0 .8.8h6.376a2.965 2.965 0 0 1-.184-1v-.2c0-1.584.782-2.981 1.97-3.856-.32-.083-.65-.14-.997-.14h-3.925Z" fill-rule="evenodd"></path>
                              </svg>
                              <p>{t("setting.parental_control_for_teen_accounts")}</p>
                        </Link>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                        <Typography sx={{color:"gray",fontWeight:500}} variant="body2">{t("for_professional_accounts")}</Typography>
                        <Link href={`/settings/account_type_and_tools`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Тип аккаунта и инструменты</title>
                                    <path d="M8 12a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1Zm8-3a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1Zm-4-2a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Z"></path>
                                    <path d="M18.44 1H5.567a4.565 4.565 0 0 0-4.56 4.56v12.873a4.565 4.565 0 0 0 4.56 4.56H18.44a4.565 4.565 0 0 0 4.56-4.56V5.56A4.565 4.565 0 0 0 18.44 1ZM21 18.433a2.563 2.563 0 0 1-2.56 2.56H5.567a2.563 2.563 0 0 1-2.56-2.56V5.56A2.563 2.563 0 0 1 5.568 3H18.44A2.563 2.563 0 0 1 21 5.56v12.873Z"></path>
                              </svg>
                              <p>{t("setting.account_type_and_tools")}</p>
                        </Link>
                        <Link href={`/settings/meta_verified`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" aria-label="icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Подтвердите свой профиль</title>
                                    <path d="m21.884 12 1.458-2.273a1 1 0 0 0-.383-1.43l-2.4-1.24.127-2.697a1.001 1.001 0 0 0-.292-.754.97.97 0 0 0-.754-.292l-2.698.126-1.24-2.399a1 1 0 0 0-1.428-.383L12 2.116 9.726.658a1 1 0 0 0-1.428.383l-1.24 2.4-2.698-.127a.972.972 0 0 0-.754.292 1 1 0 0 0-.292.754l.126 2.698-2.4 1.24a1.001 1.001 0 0 0-.382 1.429L2.116 12 .658 14.273a1.001 1.001 0 0 0 .383 1.43l2.399 1.24-.126 2.697a1 1 0 0 0 .292.754.98.98 0 0 0 .754.292l2.698-.126 1.24 2.399a.997.997 0 0 0 .63.507 1.008 1.008 0 0 0 .798-.124L12 21.884l2.274 1.458a.997.997 0 0 0 .54.158 1.016 1.016 0 0 0 .258-.034.997.997 0 0 0 .63-.507l1.24-2.4 2.698.127a.98.98 0 0 0 .754-.292 1.001 1.001 0 0 0 .292-.754l-.126-2.698 2.399-1.24a1 1 0 0 0 .383-1.429Zm-2.03.54 1.211 1.89-1.993 1.03a1.001 1.001 0 0 0-.54.936l.105 2.24-2.242-.104a1 1 0 0 0-.935.54l-1.03 1.993-1.89-1.21a1 1 0 0 0-1.08 0l-1.89 1.21-1.03-1.993a.98.98 0 0 0-.935-.54l-2.242.105.105-2.241a1.002 1.002 0 0 0-.54-.936l-1.994-1.03 1.212-1.89a1 1 0 0 0 0-1.08L2.934 9.57l1.994-1.03a1.002 1.002 0 0 0 .54-.936l-.105-2.24 2.242.104a.952.952 0 0 0 .935-.54l1.03-1.993 1.89 1.21a1 1 0 0 0 1.08 0l1.89-1.21 1.03 1.993a.968.968 0 0 0 .935.54l2.242-.105-.105 2.241a1.001 1.001 0 0 0 .54.936l1.993 1.03-1.21 1.89a1 1 0 0 0 0 1.08Zm-4.49-4.046-4.891 4.89-1.837-1.835a1 1 0 0 0-1.414 1.414l2.544 2.543a1 1 0 0 0 1.414 0l5.598-5.598a1 1 0 0 0-1.414-1.414Z"></path>
                              </svg>
                              <p>{t("setting.verify_your_profile")}</p>
                        </Link>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                        <Typography sx={{color:"gray",fontWeight:500}} variant="body2">{t("information_and_support")}</Typography>
                        <Link href={`/settings/help`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/help"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Помощь</title>
                                    <path d="M12 .5A11.5 11.5 0 1 0 23.5 12 11.513 11.513 0 0 0 12 .5Zm5.786 14.458a6.486 6.486 0 0 0 0-5.916l2.188-2.188a9.438 9.438 0 0 1 0 10.292Zm-8.968.224A4.499 4.499 0 1 1 12 16.5a4.468 4.468 0 0 1-3.182-1.318Zm8.328-11.156-2.188 2.188a6.485 6.485 0 0 0-5.916 0L6.854 4.026a9.438 9.438 0 0 1 10.292 0ZM4.026 6.855l2.188 2.187a6.486 6.486 0 0 0 0 5.916l-2.188 2.187a9.438 9.438 0 0 1 0-10.29Zm2.828 13.119 2.188-2.188a6.486 6.486 0 0 0 5.916 0l2.188 2.188a9.438 9.438 0 0 1-10.292 0Z"></path>
                              </svg>
                              <p>{t("setting.help")}</p>
                        </Link>
                        <Link href={`/settings/privacy_center`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/privacy_center"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Центр конфиденциальности</title>
                                    <path d="M3 13.5a9 9 0 0 0 18 0V4.488A17.848 17.848 0 0 1 12 1.5a17.848 17.848 0 0 1-9 2.988Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                    <path d="m11.283 7.925-.934 2.094-2.403.277a.785.785 0 0 0-.425 1.372l1.808 1.572-.523 2.342a.785.785 0 0 0 1.177.839L12 15.18l2.017 1.241a.785.785 0 0 0 1.177-.84l-.523-2.341 1.808-1.572a.785.785 0 0 0-.425-1.372l-2.403-.277-.934-2.094a.785.785 0 0 0-1.434 0Z" fill-rule="evenodd"></path>
                              </svg>
                              <p>{t("setting.privacy_center")}</p>
                        </Link>
                        <Link href={`/settings/help/account_status`} className={`w-[100%] flex items-center py-3 gap-3 px-3 rounded-lg hover:bg-[#ececec] dark:hover:bg-[#282828] ${pathname==="/settings/help/account_status"?"bg-[#f3f2f2] hover:bg-[#f3f2f2] dark:bg-[#2d2c2c] hover:dark:bg-[#2d2c2c]":""}`}>
                              <svg className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <title>Статус аккаунта</title>
                                    <path d="M15.5 6.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Zm2 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-5.5 7c3.955 0 7.465 1.88 9.552 4.77 1.015 1.406.219 3.252-1.361 3.69-1.705.473-4.518 1.04-8.192 1.04-3.67 0-6.488-.57-8.2-1.046-1.587-.44-2.356-2.295-1.351-3.686 2.086-2.89 5.597-4.768 9.551-4.768Zm0 2c-3.32 0-6.223 1.575-7.93 3.939a.332.332 0 0 0-.046.324.44.44 0 0 0 .308.264C5.898 20.462 8.537 21 12 21c3.467 0 6.1-.536 7.657-.968a.46.46 0 0 0 .32-.27.327.327 0 0 0-.045-.322C18.225 17.076 15.32 15.5 12 15.5Z" fill="currentColor"></path>
                              </svg>
                              <p>{t("setting.account_status")}</p>
                        </Link>
                  </div>
               </div>
            </div>
          </nav>
        </aside>
      )}

      {(!isMobile || !mobile) && (
        <main className="flex-1 min-h-screen">
          {isMobile && !mobile && (
            <button className="flex items-center gap-1 px-4 py-3 w-[100%] border-b text-sm font-medium text-primary border-border hover:bg-ig-hover" onClick={() => router.push("/settings")}>
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="max-w-2xl mx-auto">{children}</div>
        </main>
      )}
    </div>
  );
};