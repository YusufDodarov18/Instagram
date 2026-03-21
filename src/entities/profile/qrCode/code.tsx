"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Trans, useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

const themes = {
  pink: {
    body: "from-[#1e88ff] via-[#6a4dff] to-[#7b3fe4]",
    id: "PinkGradient",
    colors: ["#6a4dff", "#7b3fe4"],
  },

  black: {
    body: "from-[#0f0f0f] via-[#1c1c1c] to-[#2a2a2a]",
    id: "DarkBlack",
    colors: ["#0f0f0f", "#2a2a2a"],
  },

  sky: {
    body: "from-[#00c6ff] via-[#0072ff] to-[#005bea]",
    id: "SkyBlue",
    colors: ["#00c6ff", "#0072ff"],
  },

  sunset: {
    body: "from-[#ff512f] via-[#f09819] to-[#ffb347]",
    id: "Sunset",
    colors: ["#ff512f", "#ffb347"],
  },

  emerald: {
    body: "from-[#11998e] via-[#38ef7d] to-[#2af598]",
    id: "EmeraldGreen",
    colors: ["#11998e", "#38ef7d"],
  },

  violet: {
    body: "from-[#654ea3] via-[#8e2de2] to-[#b06ab3]",
    id: "VioletDream",
    colors: ["#8e2de2", "#b06ab3"],
  },
};

function QrCode({
  open,
  onClose,
  name,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
}) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(themes.pink);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRcode = async () => {
    if (!qrCodeRef.current) return;

    const dataUrl = await toPng(qrCodeRef.current, {
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = dataUrl;
    link.click();
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;
  return (
    <div className={`min-h-screen fixed inset-0 z-[1000] w-full flex flex-col text-white bg-gradient-to-br ${theme.body}`}>
      <header className="flex justify-end p-4">
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
      </header>

      <main className="flex flex-1 flex-col md:flex-row items-center justify-center gap-10 px-6">
        <div
          className="flex flex-col items-center gap-3 bg-white rounded-xl p-5"
          ref={qrCodeRef}
        >
          <svg width="180" height="180">
            <defs>
              <linearGradient id={theme.id} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.colors[0]} />
                <stop offset="100%" stopColor={theme.colors[1]} />
              </linearGradient>
            </defs>
            <QRCodeSVG
              size={180}
              fgColor={`url(#${theme.id})`}
              bgColor="white"
              value="Yusuf"
            />
          </svg>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {name}
          </Typography>
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="h4">
            <Trans i18nKey="qr.title" components={{ br: <br /> }} />
          </Typography>

          <Typography>
            <Trans i18nKey="qr.description" components={{ br: <br /> }} />
          </Typography>

          <div className="flex gap-1">
            {Object.values(themes).map((t, i) => (
              <button
                key={i}
                onClick={() => setTheme(t)}
                className={`w-7 h-7 rounded-full cursor-pointer border-1 border-black bg-gradient-to-br ${t.body}`}
              />
            ))}
          </div>
          <Button
            onClick={downloadQRcode}
            className="bg-white cursor-pointer mt-2 w-full sm:w-30 text-black hover:bg-white hover:text-black"
          >
            {t("qr.download")}
          </Button>
        </div>
      </main>
    </div>
  );
}

export default QrCode;
