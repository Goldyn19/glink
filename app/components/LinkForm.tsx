import React, { useState } from "react";
import Image from "next/image";

interface Option {
  value: string;
  icon: string;
  color: string;
}

interface LinkFormProps {
  id: number;
  updateLink: (id: number, option: Option) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ id, updateLink }) => {
  const options: Option[] = [
    { value: "GitHub", icon: "/images/githubicon.svg", color: "#1A1A1A" },
    { value: "Frontend Mentor", icon: "/images/frontendmentor.svg", color: "#FFFFFF" },
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
    { value: "Stack Overflow", icon: "/images/stackoverflow.svg", color: "#EC7100" }
  ];

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = (option: Option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    updateLink(id, option);
  };

  return (
    <div className="w-full bg-light-grey my-5 p-5 rounded-lg">
      <div className="flex justify-between">
        <h1 className="flex align-middle justify-center">
          <Image
            src="/images/doubleLine.svg"
            alt="logo"
            className="h-auto w-auto"
            height={6}
            width={12}
          />
          <span className="text-heading-s text-light-black ml-2">Link #{id}</span>
        </h1>
        <h1 className="text-body-m text-light-black">Remove</h1>
      </div>
      <div className="relative mx-auto mt-4">
        <label htmlFor="custom-dropdown" className="block mb-2 text-body-s">
          Platform
        </label>
        <button
          id="custom-dropdown"
          onClick={toggleDropdown}
          className="rounded-lg w-full p-2.5 border border-light-black text-left flex justify-between items-center"
        >
          <div className="flex items-center">
            <Image
              src={selectedOption.icon}
              alt={selectedOption.value}
              className="h-auto w-auto"
              height={15}
              width={13}
            />
            <span className="ml-2">{selectedOption.value}</span>
          </div>
          <svg
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          >
            <path d="M1 1L7 7L13 1" stroke="#633CFF" strokeWidth="2" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute mt-1 w-full rounded-lg border border-light-black bg-white z-10">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => selectOption(option)}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              >
                <Image
                  src={option.icon}
                  alt={option.value}
                  className="h-auto w-auto"
                  height={15}
                  width={13}
                />
                <span className="ml-2">{option.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <label htmlFor="email-address-icon" className="block text-body-s mb-[-10px]">
        Link
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image
            src="/images/link.svg"
            alt="link image"
            className="h-auto w-auto"
            height={16}
            width={17}
          />
        </div>
        <input
          type="text"
          id="email-address-icon"
          className="rounded-lg block w-full pl-10 border border-dark-grey text-body-m"
          placeholder="e.g. alex@email.com"
        />
      </div>
    </div>
  );
};

export default LinkForm;
