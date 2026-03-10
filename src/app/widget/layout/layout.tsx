"use client";

import { I18nextProvider } from "react-i18next";
import React from "react";
import i18n from "../../../i18n.js"; 

const TranslatorProvider = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslatorProvider;
