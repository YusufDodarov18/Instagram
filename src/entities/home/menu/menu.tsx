import { Dialog, styled,  } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Menu = ({ open, onClose}: {open: boolean;onClose:()=>void}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="flex flex-col justify-center gap-3 w-70 py-6 items-center bg-white dark:bg-[#1f1d1d]">
            <div className="text-red-500 border-b border-b-1 cursor-pointer w-full justify-center flex pb-3">{t("report")}</div>
            <div onClick={onClose} className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3">{t("not Interesed")}</div>
            <div onClick={onClose} className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3">{t("Go to post")}</div>
            <div onClick={onClose} className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3">{t("share")}</div>
            <div onClick={onClose} className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3">{t("Copy link")}</div>
            <div onClick={onClose} className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3">{t("Embed on website")}</div>
            <div onClick={onClose} className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3">{t("aboutThisAccount")}</div>
          <div onClick={onClose} className="text-gray-900 dark:text-gray-100 cursor-pointer w-full text-center pb-1">{t("cancel")}</div>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default Menu;