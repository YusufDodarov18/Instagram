"use client";
import { Button } from "@/components/ui/button";
import { Container } from "@mui/material";
import React, { useState } from "react";
import CreatePostModal from "./createPost";

export default function page() {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Button variant={"outline"} onClick={() => setOpen(true)}>create</Button>
      <CreatePostModal open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
