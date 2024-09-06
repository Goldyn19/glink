'use client'
import React, {useEffect, useState} from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image';

const Page = () => {

  type Link = {
    id: number;
    value: string;
    icon: string;
    color: string;
    url: string;
    text: string | null
  };

  const possibleLinks = [
    { value: "GitHub", icon: "/images/githubicon.svg", color: "#1A1A1A" },
    {
      value: "Frontend Mentor",
      icon: "/images/frontendmentor.svg",
      color: "#FFFFFF",
    },
    { value: "Twitter", icon: "/images/twitter.svg", color: "#43B7E9" },
    { value: "Linkedin", icon: "/images/linkedin.svg", color: "#2D68FF" },
    { value: "Youtube", icon: "/images/youtube.svg", color: "#EE3939" },
    { value: "Facebook", icon: "/images/facebook.svg", color: "#2442AC" },
    { value: "twitch", icon: "/images/twitch.svg", color: "#EE3FC8" },
    { value: "dev.to", icon: "/images/devto.svg", color: "#333333" },
    { value: "Codewars", icon: "/images/codewars.svg", color: "#8A1A50" },
    { value: "Codepen", icon: "/images/codepen.svg", color: "#1A1A1A" },
    { value: "freeCodeCamp", icon: "/images/freecodecamp.svg", color: "#302267" },
    { value: "GitLab", icon: "/images/gitlab.svg", color: "#EB4925" },
    { value: "Hashnode", icon: "/images/hashnode.svg", color: "#0330D1" },
    {
      value: "Stack Overflow",
      icon: "/images/stackoverflow.svg",
      color: "#EC7100",
    },
  ];

  const { data: session } = useSession();
  const [links, setLinks] = useState<Link[]>([]);

  const fetchAndMapLinks = async (accessToken: string): Promise<Link[]> => {
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/link/user-links`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
  
      return data.map((item: { id: string; label: string; link: string }) => {
        const match = possibleLinks.find((l) => l.value === item.label);
  
        if (!match) {
          throw new Error(`No matching link data found for value: ${item.label}`);
        }
  
        return {
          id: item.id, // Generate a unique ID
          value: match.value,
          icon: match.icon,
          color: match.color,
          url: item.link,
        };
      });
    } catch (error) {
      console.error("Error fetching and mapping links:", error);
      return [];
    }
  };

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

  const renderLinks = () => {
    const filledLinks = [
      ...links,
      
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
            <Image
              src={link.icon}
              alt={link.value}
              width={16}
              height={16}
              className=""
            />
          )}
          <span className="ml-2">{link.value}</span>
        </div>
        <div>
          <Image
            src="/images/arrowright.svg"
            alt={link.value}
            width={16}
            height={16}
            className=""
          />
        </div>
      </div>
    ));
  };
  return (
    <div className='relative m-0 flex flex-col justify-center items-center align-middle min-h-screen'>
      <div className='absolute top-0  h-[357px] bg-custom-blue w-full rounded-b-[32px]'>
      <nav className='relative flex bg-white justify-between m-8 p-6  z-20 rounded-lg'>
        <button className='bg-white text-heading-s px-4 text-custom-blue rounded-[8px] border border-custom-blue'>
          Back to Editor 
        </button>
        <button className='bg-custom-blue text-white text-heading-s rounded-[8px] px-4'>
          Share Link
        </button>
      </nav>
      </div>
      <div className='flex flex-col w-[350px] bg-white z-10 h-[570px] shadow-2xl rounded-[24px] items-center p-10 md:mb-24 xl:mb-0'>
        <div className='rounded-full h-[105px] w-[105px] border border-custom-blue'></div>
        <div className='text-custom-black text-heading-m bg-[#EEEEEE] h-[48px]'></div>
        <div className='text-body-m text-light-black bg-[#EEEEEE] h-[24px]'></div>
        <div className='overflow-scroll scrollbar-hide'>
        {renderLinks()}
        </div>
      </div>
    </div>
  )
}

export default Page
