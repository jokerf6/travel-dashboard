"use client";
import DesStore from "@/store/watchlist";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";

export default function ImageUpload(props: {
  setFile: any;
  setImg: any;
  img: string;
}) {
  const { setFile, setImg, img } = props;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImg(result);
      };
      reader.readAsDataURL(file);
    }
  };
  //
  const fileInputRef = useRef<HTMLInputElement>(null);

  //
  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="w-full px-12 rounded-lg cursor-pointer border p-2 border-input flex flex-col items-center justify-center"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/*  */}
      {img !== "" ? (
        <div className="w-36 h-20 rounded-xl mb-2 border-input border relative">
          <Image
            layout="fill"
            objectFit="contain"
            src={img}
            alt="Selected Image"
            className="rounded-xl"
          />
        </div>
      ) : (
        <div className="w-fit p-1 rounded-xl mb-2 border-input border">
          <IoImageOutline className="text-gray-600 text-3xl" />
        </div>
      )}

      <p className="text-main text-xs">
        <span className="font-bold mr-1">Click to upload</span>or drag and drop
      </p>
      <p className="text-main text-xs">PNG, JPG or PDF</p>
    </div>
  );
}
