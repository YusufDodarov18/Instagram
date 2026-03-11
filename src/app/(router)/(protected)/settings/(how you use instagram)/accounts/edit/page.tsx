"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import defaultProfile from "../profile.png";
import { API } from "@/shared/utils/config";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Select from "./genderGroup";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProfile } from "@/app/store/pages/profile/myProfile/profile";

function page() {
  const {
    getMyProfile,
    myProfile,
    updateProfile,
    deleteImageProfile,
    updateImageProfile,
    loading,
  } = useProfile();
  const [aboutText, setAboutText] = useState("");
  const [gender, setGender] = useState("male");
  const [customGender, setCustomGender] = useState("");
  const [modalImage, setModalImage] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  let maxLenght = 150;
  let inputFile = useRef<HTMLInputElement | null>(null);

  const genderOptions = [
    { value: "female", label: t("setting.account.Female") },
    { value: "male", label: t("setting.account.Male") },
    { value: "custom", label: t("setting.account.Custom") },
    {
      value: "prefer_not_to_say",
      label: t("setting.account.Prefer not to say"),
    },
  ];

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  const genderMap = {
    0: "female",
    1: "male",
    2: "custom",
    3: "prefer_not_to_say",
  };

  useEffect(() => {
    if (myProfile) {
      setAboutText(myProfile?.about || "");
      const gender = genderMap[myProfile?.gender] || "male";
      setGender(gender);
      if (gender === "custom") {
        setCustomGender(myProfile?.customGender || "");
      }
    }
  }, [myProfile]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length <= maxLenght) {
      setAboutText(e.target.value);
    }
  }

  const genderReverseMap = {
    female: 0,
    male: 1,
    custom: 2,
    prefer_not_to_say: 3,
  };

  async function editProfile() {
    if (!myProfile) return;

    const newProfile = {
      about: aboutText,
      gender: genderReverseMap[gender],
      customGender: gender === "custom" ? customGender : null,
    };

    const GenderMap = {
      Female: 0,
      Male: 1,
      Custom: 2,
      PreferNotToSay: 3,
    };

    const oldProfile = {
      about: myProfile.about || "",
      gender: GenderMap[myProfile.gender],
      customGender: myProfile.customGender || null,
    };

    const isChanged =
      newProfile.about !== oldProfile.about ||
      newProfile.gender !== oldProfile.gender ||
      newProfile.customGender !== oldProfile.customGender;

    if (!isChanged) {
      return;
    }

    try {
      await updateProfile(newProfile);
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  }

  const getFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files[0];

    if (!file) return;

    await updateImageProfile(file);
    setModalImage(false);
  };

  //   const getFileImage = (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files) {
  //       setFile(e.target?.files[0]);
  //     }
  //   };

  const changePhoto = (image: string) => {
    if (image.trim() === "") {
      inputFile.current?.click();
    } else {
      setModalImage(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-[100%] py-0 md:py-20">
        <div className="flex flex-col gap-12 px-6 py-5">
          <h1 className="font-black text-2xl">{t("setting.Edit profile")}</h1>
          <div className="w-[100%] flex justify-between items-center px-9 py-6 rounded-2xl bg-[#F3F5F7] dark:bg-[#262626]">
            <div className="flex items-center gap-3">
              <div className="relative w-[47px] h-[47px]">
                <img
                  src={
                    myProfile?.image
                      ? `${API}/images/${myProfile.image}`
                      : defaultProfile.src
                  }
                  alt="profile"
                  className="w-[47px] h-[47px] rounded-full object-cover cursor-pointer"
                  onClick={() => changePhoto(myProfile?.image || "")}
                />
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg aria-label="Загрузка…" role="img" viewBox="0 0 100 100" className="w-6 h-6 animate-spin">
                      <rect height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.08" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.16" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.33" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.41" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.58" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.66" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.83" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"/>
                      <rect height="6" opacity="0.91" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"/>
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-xl">{myProfile?.userName}</h2>
                <h3 className="text-[#6A717A] dark:text-[#A8A8A8]">
                  {myProfile?.firstName + " " + myProfile?.lastName}
                </h3>
              </div>
            </div>
            <div>
              <Button
                onClick={() => changePhoto(myProfile?.image || "")}
                className="bg-[#4A5DF9] hover:bg-[#4a56f9] text-white font-bold w-[120px] h-[36px] cursor-pointer"
              >
                {t("setting.account.Change photo")}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">
              {t("setting.account.Website")}
            </h1>
            <div className="w-[100%] cursor-no-drop px-9 py-6 rounded-2xl bg-[#F3F5F7] dark:bg-[#262626] select-none text-[17px] text-[#6A717A] dark:text-[#A8A8A8]">
              {t("setting.account.Website")}
            </div>
            <p className="text-[#6A717A] dark:text-[#A8A8A8] indent-3">
              {t(
                "setting.account.Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.",
              )}
            </p>
          </div>
          <div className="flex flex-col gap-1 relative">
            <h1 className="font-bold text-xl">{t("setting.account.Bio")}</h1>
            <div className="relative">
              <textarea
                name="about"
                value={aboutText}
                onChange={handleChange}
                maxLength={maxLenght}
                className="resize-none w-full border border-gray-300 text-xl px-5 py-2 dark:border-white rounded-2xl"
              />
              <p className="absolute bottom-2 right-3 text-sm text-gray-500 dark:text-gray-300">
                {aboutText.length}/{maxLenght}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">{t("setting.account.Gender")}</h1>
            <Select
              value={gender}
              onChange={setGender}
              customGender={customGender}
              onCustomGenderChange={setCustomGender}
              genderOptions={genderOptions}
            />
            <p className="text-[#6A717A] dark:text-[#A8A8A8] indent-1">
              {t("setting.account.This won’t be part of your public profile.")}
            </p>
          </div>
          <div className="flex flex-col gap-4.5 justify-start">
            <h1 className="font-bold text-xl">
              {t("setting.account.Show account suggestions on profiles")}
            </h1>
            <div className="rounded-2xl border-1 flex items-center py-5 px-5 gap-10 justify-between">
              <div>
                <h1 className="text-xl">
                  {t("setting.account.Prefer not to say")}
                </h1>
                <p className="text-[#6A717A] dark:text-[#A8A8A8] text-wrap">
                  {t(
                    "setting.account.Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.",
                  )}
                </p>
              </div>
              <Switch className="scale-[1.3] cursor-pointer" />
            </div>
            <p className="text-[#6A717A] dark:text-[#A8A8A8] indent-1">
              {t(
                "setting.account.Certain profile info, like your name, bio and links, is visible to everyone.",
              )}
              <Link
                className="text-[#3d60ec] dark:text-[#708DFF] hover:underline"
                href={`https://help.instagram.com/347751748650214?ref=igweb`}
              >
                {t("setting.account.See what profile info is visible")}
              </Link>
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-[#4A5DF9] hover:bg-[#4A5DF9] text-white font-black w-70 h-15 cursor-pointer"
              onClick={editProfile}
            >
              {t("setting.account.Submit")}
            </Button>
          </div>
        </div>
      </div>

      <input
        type="file"
        className="hidden"
        ref={inputFile}
        accept="image/*"
        onChange={getFile}
      />

      <Dialog open={modalImage} onOpenChange={() => setModalImage(false)}>
        <DialogContent className="p-0 m-0 py-4 bg-white dark:bg-[#262626] !max-w-[500px] w-full [&>button]:hidden rounded-lg overflow-hidden">
          <div className="flex justify-center w-full py-3 ">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t("setting.account.Change your profile photo")}
            </h1>
          </div>
          <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-700 text-lg text-center">
            <div
              className="py-3 text-blue-700 font-black cursor-pointer "
              onClick={() => inputFile.current?.click()}
            >
              {t("setting.account.Upload photo")}
            </div>
            <div
              className="py-3 text-red-600 cursor-pointer font-black "
              onClick={async () => {
                await deleteImageProfile();
                setModalImage(false);
              }}
            >
              {t("setting.account.Delete current photo")}
            </div>
            <div
              className="py-3 cursor-pointer"
              onClick={() => setModalImage(false)}
            >
              {t("Cancel")}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default page;
