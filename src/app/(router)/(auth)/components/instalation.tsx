"use client"
import Image from "next/image";
import Link from "next/link";
import googlePlay from "./google_play.png";
import microsoft from "./microsoft.png";
import { useTranslation } from "react-i18next";

export default function Instalations({ loginError }: { loginError?: string }) {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <p className="text-[gray] text-[16px] text-center mt-[10px]">
          {t("authentication.login.download")}
        </p>
        {loginError && (
          <p className="text-red-500 text-center mt-2">{loginError}</p>
        )}

        <div className="w-[100%] flex items-center gap-[10px] mt-[20px] mb-[30px] justify-center m-auto">
          <Link
            href={
              "https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D81B80A29-CADC-4537-976B-61B3F9BCA545%26utm_campaign%3DsignupPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge"
            }
          >
            <Image src={googlePlay} alt="Google Play" className="w-[134px]" />
          </Link>
          <Link
            href={
              "https://apps.microsoft.com/detail/9nblggh5l9xt?hl=en-US&gl=US"
            }
          >
            <Image src={microsoft} alt="App Store" className="w-[115px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
