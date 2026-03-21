import { Dialog, styled,  } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const BootstrapDialog = styled(Dialog)(({theme})=>({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Menu = ({ open, onClose}: {open: boolean;onClose:()=>void}) => {
  const {t} = useTranslation();
  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col justify-center gap-3 w-70 py-6 items-center bg-white dark:bg-[#1f1d1d]">
          <div className="text-red-500 border-b border-b-1 w-full justify-center flex pb-3 cursor-pointer">{t("report")}</div>
          <div className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3" onClick={onClose}>{t("not Interesed")}</div>
          <div className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3" onClick={onClose}>{t("Go to post")}</div>
          <div className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3" onClick={onClose}>{t("share")}</div>
          <div className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3" onClick={onClose}>{t("Copy link")}</div>
          <div className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3" onClick={onClose}>{t("Embed on website")}</div>
          <div className="text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 cursor-pointer w-full text-center pb-3" onClick={onClose}>{t("aboutThisAccount")}</div>
          <div className="text-gray-900 dark:text-gray-100 w-full text-center pb-1 cursor-pointer" onClick={onClose}>{t("cancel")}</div>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default Menu;