"use client";

import { IconEye, IconEyeSlashFill } from "@/assets/icons";
import { useState } from "react";

export default function SingleInput({ type = "text", placeholder, name }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6 flex gap-4 border-b px-2 py-2">
      <input
        type={type === "password" ? (showPassword ? "text" : type) : type}
        placeholder={placeholder}
        name={name}
        className="grow focus:outline-none"
      />
      {type === "password" && (
        <div
          className="text-2xl text-gray-400 duration-300 hover:cursor-pointer hover:text-hoverButton1"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IconEyeSlashFill /> : <IconEye />}
        </div>
      )}
    </div>
  );
}
