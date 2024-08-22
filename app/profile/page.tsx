"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
import { useSession } from "next-auth/react";

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



const fetchAndMapLinks = async (accessToken: string): Promise<Link[]> => {
  try {
    
    const response = await fetch("http://127.0.0.1:8008/link/user-links", {
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

const Page: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-user`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${session?.accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        console.log('Form submitted successfully!');
      } else {
        console.error('Form submission error.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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
  const filePreviewUrl = file ? URL.createObjectURL(file) : '';

  return (
    <div className="p-0">
      <Navbar />
      <div className="lg:grid lg:grid-cols-5 block h-full mt-3">
        <div className="hidden lg:flex justify-center col-span-2 w-full h-full bg-white mx-auto align-middle items-center relative">
          <Image
            src="/images/mobile-preview.svg"
            alt="logo"
            className="h-auto w-auto"
            height={632}
            width={308}
          />
          <div className="bg-[#EEEEEE] rounded-full h-[100px] min-w-[100px] text-center z-10 flex justify-between absolute top-32">
            {filePreviewUrl && (
               <Image
               src={filePreviewUrl}
               alt="profile"
               className="h-[100px] w-[100px] rounded-full"
               height={100}
               width={100}
             />
            )}
          </div>
          <div className={`rounded-lg min-h-[16px] max-h-[21px] min-w-[96px] max-w-[280px]  z-10 flex justify-between absolute top-60 text-heading-s 
            ${firstName || lastName ? "bg-white text-custom-black" : "bg-[#EEEEEE]"}`}>
              {firstName} {lastName}
            </div>
          <div
            className={`rounded-lg min-h-[8px] max-h-[21px] min-w-[72px] max-w-[280px]  z-10 text-center flex justify-between absolute top-64 mt-5 text-body-s 
            ${email ? "bg-white text-light-black" : "bg-[#EEEEEE]"}`}
          >
            {email}
          </div>
          <div className="p-5 space-y-4 z-10 flex flex-col justify-between absolute bottom-28 h-[300px] overflow-y-scroll scrollbar-hide">
            {renderLinks()}
          </div>
        </div>
        <div className="px-5 bg-white col-span-3 ml-2 pb-24 relative ">
          <h1 className="text-heading-m pt-5">Profile Details</h1>
          <h1 className="text-body-m text-light-black">
            Add your details to create a personal touch to your profile.
          </h1>
          <form action="" className="">
          <div className="mt-5 bg-light-grey px-3 rounded-md ">
            <div className="md:flex  justify-start items-center py-3">
              <h1 className="text-body-m text-light-black w-full md:w-1/4 mx-5">
                Profile picture
              </h1>
              <button 
               type="button"
               onClick={handleButtonClick}
               className="bg-light-purple flex flex-col items-center px-5 py-8 rounded-md m-5">
                <Image
                  src="/images/image.svg"
                  alt="logo"
                  className="mt-2 h-auto w-auto"
                  height={40}
                  width={40}
                />
                <h1 className="text-heading-s text-custom-blue">
                  +Upload Image
                </h1>
              </button>
              <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
              <div className="text-body-s text-light-black w-full md:w-1/4 leading-tight pl-3">
                <h1>Image must be below 1024x1024px.</h1>
                <h1> Use PNG or JPG format.</h1>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-light-grey p-5 rounded-md">
            
              <div className="md:flex block justify-between">
                <label htmlFor="" className=" text-body-m text-light-black">
                  First Name*
                </label>
                <input
                  type="text"
                  id="email-address-icon"
                  className=" rounded-lg block md:w-[450px] w-full pl-5 md:my-2 border border-dark-grey text-body-m  focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
                  placeholder="e.g. John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="md:flex block justify-between">
                <label htmlFor="" className="text-body-m text-light-black">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="email-address-icon"
                  className=" rounded-lg block md:w-[450px] w-full pl-5 border md:my-2 border-dark-grey text-body-m focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
                  placeholder="e.g. Appleseed"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="md:flex block justify-between">
                <label htmlFor="" className=" text-body-m text-light-black">
                  Email
                </label>
                <input
                  type="text"
                  id="email-address-icon"
                  className=" rounded-lg block md:w-[450px] w-full pl-5 md:my-2 border border-dark-grey text-body-m focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
                  placeholder="e.g email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            
          </div>

          <hr className="w-full mt-8 mb-5 border-light-black" />
          <button type="submit" onClick={handleSubmit} className="bg-custom-blue text-white py-4 rounded-lg px-5 md:absolute w-full md:w-auto  right-5">
            save
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
