import React from "react";
import { Progress } from "./ui/progress";
import Quotes from "./Quotes";
import { User } from "@/types";
import Link from "next/link";

const OverviewContent = ({ profile }: { profile: User }) => {
  return (
    <div className="bg-[#071224] px-5 py-5 text-white rounded-xl">
      <div>
        <p className="font-medium mb-4">Assessment Analysis</p>
      </div>
      <div className="flex space-x-4">
        <div className="px-5 py-5 bg-[#e6eeff] text-gray-950 font-bold text-sm rounded-xl lg:min-w-[260px]">
          <div className="flex justify-between items-center">
            <p>Anxiety</p>
            <div className="bg-[#071224] px-1 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#ffffff"
                  d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM338.7 395.9c6.6-5.9 7.1-16 1.2-22.6C323.8 355.4 295.7 336 256 336s-67.8 19.4-83.9 37.3c-5.9 6.6-5.4 16.7 1.2 22.6s16.7 5.4 22.6-1.2c11.7-13 31.6-26.7 60.1-26.7s48.4 13.7 60.1 26.7c5.9 6.6 16 7.1 22.6 1.2zM176.4 272c17.7 0 32-14.3 32-32c0-1.5-.1-3-.3-4.4l10.9 3.6c8.4 2.8 17.4-1.7 20.2-10.1s-1.7-17.4-10.1-20.2l-96-32c-8.4-2.8-17.4 1.7-20.2 10.1s1.7 17.4 10.1 20.2l30.7 10.2c-5.8 5.8-9.3 13.8-9.3 22.6c0 17.7 14.3 32 32 32zm192-32c0-8.9-3.6-17-9.5-22.8l30.2-10.1c8.4-2.8 12.9-11.9 10.1-20.2s-11.9-12.9-20.2-10.1l-96 32c-8.4 2.8-12.9 11.9-10.1 20.2s11.9 12.9 20.2 10.1l11.7-3.9c-.2 1.5-.3 3.1-.3 4.7c0 17.7 14.3 32 32 32s32-14.3 32-32z"
                />
              </svg>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg text-right mb-2">
              {profile.anxiety?.toFixed() ?? 0}%
            </p>
            <Progress value={profile.anxiety ?? 0} />
          </div>
        </div>
        <div className="px-5 py-5 bg-[#ffefe7] text-gray-950 font-bold text-sm rounded-xl lg:min-w-[260px]">
          <div className="flex justify-between items-center">
            <p>Depression</p>
            <div className="bg-[#071224] px-1 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#ffffff"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM159.3 388.7c-2.6 8.4-11.6 13.2-20 10.5s-13.2-11.6-10.5-20C145.2 326.1 196.3 288 256 288s110.8 38.1 127.3 91.3c2.6 8.4-2.1 17.4-10.5 20s-17.4-2.1-20-10.5C340.5 349.4 302.1 320 256 320s-84.5 29.4-96.7 68.7zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg text-right mb-2">
              {profile.depression?.toFixed() ?? 0}%
            </p>
            <Progress value={profile.depression ?? 0} />
          </div>
        </div>
        <div className="px-5 py-5 bg-[#d2d4ff] text-gray-950 font-bold text-sm rounded-xl lg:min-w-[260px]">
          <div className="flex justify-between items-center">
            <p>Addiction</p>
            <div className="bg-[#071224] px-1 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#ffffff"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-224a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM100.7 132.7c6.2-6.2 16.4-6.2 22.6 0L160 169.4l36.7-36.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L182.6 192l36.7 36.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L160 214.6l-36.7 36.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L137.4 192l-36.7-36.7c-6.2-6.2-6.2-16.4 0-22.6zm192 0c6.2-6.2 16.4-6.2 22.6 0L352 169.4l36.7-36.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L374.6 192l36.7 36.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L352 214.6l-36.7 36.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L329.4 192l-36.7-36.7c-6.2-6.2-6.2-16.4 0-22.6z"
                />
              </svg>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg text-right mb-2">
              {profile.gamingAddiction?.toFixed() ?? 0}%
            </p>
            <Progress value={profile.gamingAddiction ?? 0} />
          </div>
        </div>
        <div className="px-5 py-5 bg-[#d2d4ff] text-gray-950 font-bold text-sm rounded-xl w-full">
          <div className="flex justify-center items-center w-full h-full">
            {/* <Quotes /> */}
            <div className="flex items-center flex-col">
              <Link href={"/assessment"}>
                <span className="font-bold text-xl">Retake Assessment</span>
              </Link>
              <div>Track your progress by retaking the assesments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
