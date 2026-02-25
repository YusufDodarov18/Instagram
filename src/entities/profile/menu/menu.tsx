import { Dialog, DialogContent } from "@/components/ui/dialog";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Logout } from "@/api/token";
import QrCode from "../qrCode/code";
import { DecodedToken } from "@/app/(router)/types";

const itemClass =
  "w-full h-[48px] text-sm text-center leading-[48px] cursor-pointer border-b border-gray-300";

const Menu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  const [decode, setDecode] = useState<DecodedToken | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  
  useEffect(() => {
    let token = localStorage.getItem("access_token");
    if (!token) return;
    const decoded = jwtDecode(token);
    setDecode(decoded);
  }, []);

  // console.log(decode)
  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="p-0 max-w-md rounded-2xl overflow-hidden [&>button]:hidden">
          <div className={itemClass}>{t("appsAndWebsites")}</div>
          <div
            onClick={() => {
              (handleOpen(), onClose());
            }}
            className={itemClass}
          >
            {t("qrCode")}
          </div>
          <div className={itemClass}>{t("notifications")}</div>
          <div className={itemClass}>{t("settingsPrivacy")}</div>
          <div className={itemClass}>{t("metaVerified")}</div>
          <Link
            href={`https://familycenter.instagram.com/accounts/17841477594845292/?entrypoint=supervision_web&fc_session_id=60c36e7c-6870-489c-97f0-302cda05e8de&account_type=INSTAGRAM&is_home_entry=1`}
          >
            <div className={itemClass}>{t("supervision")}</div>
          </Link>
          <div className={itemClass}>{t("loginActivity")}</div>
          <div
            onClick={() => {
              Logout();
              onClose();
            }}
            className={itemClass}
          >
            {t("logout")}
          </div>
          <div
            onClick={onClose}
            className="w-full h-[48px] text-sm text-center leading-[48px] cursor-pointer"
          >
            {t("cancel")}
          </div>
        </DialogContent>
      </Dialog>
      <QrCode name={decode?.name || ""} open={openModal} onClose={handleClose}/>
    </>
  );
};

export default Menu;
