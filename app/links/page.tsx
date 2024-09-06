"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
import Emptylink from "../components/emptylink";
import LinkForm from "../components/LinkForm";

type Link = {
  id: number;
  value: string;
  icon: string;
  color: string;
  url: string;
};

// Define the possible values for the links
const possibleLinks = [
  { value: "GitHub", icon: "/images/githubicon.svg", color: "#1A1A1A" },
  { value: "Frontend Mentor", icon: "/images/frontendmentor.svg", color: "#FFFFFF" },
  { value: "Twitter", icon: "/images/twitter.svg", color: "#43B7E9" },
  { value: "Linkedin", icon: "/images/linkedin.svg", color: "#2D68FF" },
  { value: "Youtube", icon: "/images/youtube.svg", color: "#EE3939" },
  { value: "Facebook", icon: "/images/facebook.svg", color: "#2442AC" },
  { value: "twitch", icon: "/images/twitch.svg", color: "#EE3FC8" },
  { value: "dev.to", icon: "/images/devto.svg", color: "#333333" },
  { value: "Codewars", icon: "/images/codewars.svg", color: "#8A1A50" },
  { value: "Codepen", icon: "/images/codepen.svg", color: "#198F51" },
  { value: "freeCodeCamp", icon: "/images/freecodecamp.svg", color: "#302267" },
  { value: "GitLab", icon: "/images/gitlab.svg", color: "#EB4925" },
  { value: "Hashnode", icon: "/images/hashnode.svg", color: "#0330D1" },
  { value: "Stack Overflow", icon: "/images/stackoverflow.svg", color: "#EC7100" }
];

// Function to fetch and map links
const fetchAndMapLinks = async (accessToken: string): Promise<Link[]> => {
  try {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/link/user-links`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data.map((item: {id:string; label: string; link: string }) => {
      const match = possibleLinks.find(l => l.value === item.label);

      if (!match) {
        throw new Error(`No matching link data found for value: ${item.label}`);
      }

      return {
        id: item.id, // Generate a unique ID
        value: match.value,
        icon: match.icon,
        color: match.color,
        url: item.link
      };
    });
  } catch (error) {
    console.error('Error fetching and mapping links:', error);
    return [];
  }
};

const Page: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch and set links when the component mounts
    const loadLinks = async () => {
      if (session?.accessToken) {
        const fetchedLinks = await fetchAndMapLinks(session.accessToken);
        setLinks(fetchedLinks);
      }
    };

    loadLinks();
  }, [session]);

  const addNewLink = () => {
    setLinks([
      ...links,
      {
        id: links.length + 1,
        value: "GitHub",
        icon: "/images/githubicon.svg",
        color: "#1A1A1A",
        url: "",
      },
    ]);
  };

  const updateLink = (
    id: number,
    selectedOption: { value: string; icon: string; color: string },
    url: string
  ) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, ...selectedOption, url } : link
      )
    );
  };

  const removeLink = (id: number) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    const resetLinks = updatedLinks.map((link, index) => ({
      ...link,
      id: index + 1,
    }));
    setLinks(resetLinks);
  };

  const renderLinks = () => {
    const filledLinks = [
      ...links,
      ...Array(Math.max(0, 5 - links.length)).fill({
        id: -1,
        value: "",
        icon: "",
        color: "#E5E5E5",
      }),
    ];

    return filledLinks.map((link, index) => (
      <div
        key={index}
        className={`bg-[#EEEEEE] rounded-lg h-[45px] w-[240px] z-10 flex items-center justify-between px-2 border border-dark-grey ${
          link.text ? "text-" + link.text : "text-white"
        }`}
        style={{ backgroundColor: link.color }}
      >
        <div className="flex text-body-s">
          {link.icon && (
            <Image src={link.icon} alt={link.value} width={16} height={16} className="" />
          )}
          <span className="ml-2">{link.value}</span>
        </div>
        <div>
        {link.icon && (
            <Image src="/images/arrowright.svg" alt={link.value} width={16} height={16} className="" />
          )}
        
        </div>
      </div>
    ));
  };

  const handleSubmit = async () => {
    if (!session) return;
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/link/create-link`;

    // Check for empty URLs
    const hasEmptyUrls = links.some((link) => link.url.trim() === "");
    if (hasEmptyUrls) {
      setError("Please fill in all URL fields.");
      return;
    }

    setError("");

    for (const link of links) {
      const body = {
        label: link.value,
        link: link.url,
        link_id: link.id
      };

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(body),
      });
    }
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
          <div className="bg-[#EEEEEE] rounded-full h-[100px] w-[100px] z-10 flex justify-between absolute top-32"></div>
          <div className="bg-[#EEEEEE] rounded-lg h-[16px] w-[160px] z-10 flex justify-between absolute top-60 mt-3 "></div>
          <div className="bg-[#EEEEEE] rounded-lg h-[8px] w-[72px] z-10 flex justify-between absolute top-72  "></div>
          <div className="p-5 space-y-4 z-10 flex flex-col justify-between absolute bottom-28 h-[300px] overflow-y-scroll scrollbar-hide">
            {renderLinks()}
          </div>
        </div>
        <div className="px-5 bg-white col-span-3 ml-2 pb-24 relative">
          <h1 className="text-heading-m pt-5">Customize your links</h1>
          <p className="text-body-m text-light-black">
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
          <button
            className="text-heading-s text-custom-blue border border-custom-blue w-full rounded-lg mt-8 mb-5 z-10 "
            onClick={addNewLink}
          >
            + Add new link
          </button>
          <div className="lg:h-[400px] overflow-y-scroll scrollbar-hide">
            {links.map((link) => (
              <LinkForm
                key={link.id}
                id={link.id}
                selectedOption={{ value: link.value, icon: link.icon, color: link.color }}
                url={link.url}
                updateLink={updateLink}
                removeLink={removeLink}
              />
            ))}
            {links.length === 0 && <Emptylink />}
          </div>
         
          <hr className="w-full mt-8 mb-5 border-light-black" />
          <button
            className={`py-4 rounded-lg px-5 absolute right-5 ${links.length > 0 ? 'bg-custom-blue' : 'bg-light-purple'}`}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
