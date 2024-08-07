import React from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
const page = () => {
  return (
    <div className="p-0">
      <Navbar />
      <div className="lg:grid lg:grid-cols-5 block h-full mt-3">
        <div className="hidden lg:flex justify-center col-span-2 w-full h-full bg-white mx-auto align-middle items-center">
          <Image
            src="/images/mobile-preview.svg"
            alt="logo"
            className="h-auto w-auto"
            height={632}
            width={308}
          />
        </div>
        <div className="px-5 bg-white col-span-3 ml-2 pb-24 relative ">
          <h1 className="text-heading-m pt-5">Profile Details</h1>
          <h1 className="text-body-m text-light-black">
            Add your details to create a personal touch to your profile.
          </h1>

          <div className="mt-5 bg-light-grey px-3 rounded-md ">
            <div className="md:flex  justify-start items-center">
              <h1 className="text-body-m text-light-black w-full md:w-1/4 ">
                Profile picture
              </h1>
              <button className="bg-light-purple flex flex-col items-center px-5 py-8 rounded-md m-5">
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
              <div className="text-body-s text-light-black w-full md:w-1/4 leading-tight pl-3">
                <h1>Image must be below 1024x1024px.</h1>
                <h1> Use PNG or JPG format.</h1>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-light-grey p-5 rounded-md">
            <form action="" className="">
              <div className="md:flex block justify-between">
                <label htmlFor="" className=" text-body-m text-light-black">
                  First Name*
                </label>
                <input
                  type="text"
                  id="email-address-icon"
                  className=" rounded-lg block md:w-[450px] w-full pl-5 md:my-2 border border-dark-grey text-body-m  focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
                  placeholder="e.g. John"
                />
              </div>
              <div className="md:flex block justify-between">
                <label
                  htmlFor=""
                  className="text-body-m text-light-black"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="email-address-icon"
                  className=" rounded-lg block md:w-[450px] w-full pl-5 border md:my-2 border-dark-grey text-body-m focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
                  placeholder="e.g. Appleseed"
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
                />
              </div>
            </form>
          </div>
          <hr className="w-full mt-8 mb-5 border-light-black" />
          <button className="bg-custom-blue text-white py-4 rounded-lg px-5 md:absolute w-full md:w-auto  right-5">
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
