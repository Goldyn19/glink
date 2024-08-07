"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
import Emptylink from "../components/emptylink";
import LinkForm from "../components/LinkForm";

type Link = {
  id: number;
  value: string;
  icon: string;
  color: string;
};

const Page: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);

  const addNewLink = () => {
    setLinks([
      ...links,
      { id: links.length + 1, value: "GitHub", icon: "/images/githubicon.svg", color: "#1A1A1A" }
    ]);
  };

  const updateLink = (id: number, selectedOption: { value: string; icon: string; color: string }) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => (link.id === id ? { ...link, ...selectedOption } : link))
    );
  };

  const renderLinks = () => {
    const filledLinks = [
      ...links,
      ...Array(Math.max(0, 5 - links.length)).fill({
        id: -1,
        value: "",
        icon: "",
        color: "#E5E5E5"
      })
    ];

    return filledLinks.map((link, index) => (
      <div
        key={index}
        className="bg-[#EEEEEE] rounded-lg h-[45px] w-[240px] z-10 flex items-center justify-between px-2 "
        style={{ backgroundColor: link.color }}
      >
        <div className="flex text-body-s text-white">
        {link.icon && <Image src={link.icon} alt={link.value} width={16} height={16} className=""/>}
        <span className="ml-2">{link.value}</span>
        </div>
        <div></div>
      </div>
    ));
  };

  return (
    <div className="p-0">
      <Navbar />
      <div className="lg:grid lg:grid-cols-5 block h-full mt-3">
        <div className="hidden lg:flex justify-center col-span-2 w-full h-full bg-white mx-auto items-center relative">
          <Image
            src="/images/mobile-preview.svg"
            alt="Mobile Preview"
            className="h-auto w-auto"
            height={632}
            width={308}
          />
          <div className='bg-[#EEEEEE] rounded-full h-[100px] w-[100px] z-10 flex justify-between absolute top-32'></div>
          <div className='bg-[#EEEEEE] rounded-lg h-[16px] w-[160px] z-10 flex justify-between absolute top-60 mt-3 '></div>
          <div className='bg-[#EEEEEE] rounded-lg h-[8px] w-[72px] z-10 flex justify-between absolute top-72  '></div>
          <div className="p-5 space-y-4 z-10 flex flex-col justify-between absolute bottom-24">
            {renderLinks()}
          </div>
        </div>
        <div className="px-5 bg-white col-span-3 ml-2 pb-24 relative">
          <h1 className="text-heading-m pt-5">Customize your links</h1>
          <p className="text-body-m text-light-black">
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
          <button
            className="text-heading-s text-custom-blue border border-custom-blue w-full rounded-lg mt-8"
            onClick={addNewLink}
          >
            + Add new link
          </button>
          <div className="pt-5 lg:h-[400px] overflow-y-scroll scrollbar-hide">
            {links.map((link) => (
              <LinkForm key={link.id} id={link.id} updateLink={updateLink} />
            ))}
            {links.length === 0 && <Emptylink />}
          </div>
          <hr className="w-full mt-8 mb-5 border-light-black" />
          <button className="bg-light-purple py-4 rounded-lg px-5 absolute right-5">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
