"use client";
import { Button } from "@/components/ui/button";
import { Container } from "@mui/material";
import React, { useState } from "react";
import CreatePostModal from "./createPost";
import { useTranslation } from "react-i18next";

export default function page() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <Container>
      <Button variant="outline" onClick={() => setOpen(true)}>{t("layout.create")}</Button>
      <CreatePostModal open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
