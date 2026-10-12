import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  estado: "optimo" | "degradado" | "critico";
  size?: "sm" | "md" | "lg";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  estado,
  size = "md",
}) => {
  const sizeMap = {
    sm: "text-[10px] px-2 py-1",
    md: "text-[11px] px-3 py-2",
    lg: "text-[12px] px-4 py-3",
  };

  const statusMap = {
    optimo: {
      bg: "rgba(34, 197, 94, 0.15)",
      border: "rgba(34, 197, 94, 0.3)",
      text: "#4ade80",
    },
    degradado: {
      bg: "rgba(250, 204, 21, 0.15)",
      border: "rgba(250, 204, 21, 0.3)",
      text: "#fbbf24",
    },
    critico: {
      bg: "rgba(239, 68, 68, 0.15)",
      border: "rgba(239, 68, 68, 0.3)",
      text: "#f87171",
    },
  };

  const s = statusMap[estado];
  const sz = sizeMap[size];

  return (
    <span className={cn(
      "inline-flex items-center rounded",
      `px-2 py-1 ${sz}`,
      `bg-${s.bg.split(",")[0].split("rgba(")[1].trim()}/15`,
      `border-${s.border.split(",")[0].split("rgba(")[1].trim()}/30`,
      `text-${s.text.split("/")[0]}`,
    )}>
      {estado.toUpperCase()}
    </span>
  );
};