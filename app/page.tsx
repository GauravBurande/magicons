"use client";

import logo from "@/app/icon.png";
import { BorderBeam } from "@/components/magicui/border-beam";
import Image from "next/image";
import anime from "animejs/lib/anime.es.js";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Initialize Anime.js animation
    anime({
      targets: "#icon1",
      scale: [1, 1.2],
      duration: 500,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    anime({
      targets: "#icon2",
      translateY: [
        { value: -15, duration: 300, easing: "easeOutCubic" },
        { value: 0, duration: 500, easing: "easeInCubic" },
        { value: -7, duration: 200, easing: "easeOutCubic" },
        { value: 0, duration: 300, easing: "easeInCubic" },
      ],
      loop: true,
    });

    const animation3 = anime.timeline({
      targets: "#icon3",
      easing: "easeInOutQuad",
      loop: true,
      autoplay: true,
    });

    animation3
      .add({
        translateX: -10,
        opacity: 0,
        duration: 0,
      })
      .add({
        translateX: 0,
        opacity: 1,
        duration: 1000,
      })
      .add({
        translateX: 0,
        opacity: 1,
        duration: 1000,
      })
      .add({
        translateX: 10,
        opacity: 0,
        duration: 1000,
      });

    anime({
      targets: "#icon4",
      scale: [
        { value: 1, duration: 1000 },
        { value: 1.1, duration: 1000 },
        { value: 1, duration: 1000 },
      ],
      opacity: [
        { value: 1, duration: 1000 },
        { value: 0.5, duration: 1000 },
        { value: 1, duration: 1000 },
      ],
      easing: "easeInOutQuad",
      loop: true,
    });

    const animation5 = anime.timeline({
      targets: "#icon5",
      loop: true,
    });

    animation5
      .add({
        translateX: "-5px",
        rotateZ: "-5deg",
        duration: 100,
        easing: "easeInOutQuad",
      })
      .add({
        translateX: "5px",
        rotateZ: "5deg",
        duration: 100,
        easing: "easeInOutQuad",
      })
      .add({
        translateX: "-3px",
        rotateZ: "-3deg",
        duration: 100,
        easing: "easeInOutQuad",
      })
      .add({
        translateX: "3px",
        rotateZ: "3deg",
        duration: 100,
        easing: "easeInOutQuad",
      })
      .add({
        translateX: "0px",
        rotateZ: "0deg",
        duration: 100,
        easing: "easeInOutQuad",
      })
      .add({
        duration: 1000, // Pause duration
      });

    return () => {
      anime.remove(["#icon1", "#icon2", "#icon3", "#icon4", "#icon5"]);
    };
  });

  return (
    <main className="px-10 md:px-20 py-20 space-y-10">
      <header className="flex gap-4 items-center">
        <div className="w-12 h-12 relative rounded-xl">
          <BorderBeam duration={5} borderWidth={2} />
          <Image src={logo} alt="logo" className="w-full h-full" />
        </div>
        <p className="text-3xl">Magicons</p>
      </header>

      <h1 className="text-6xl font-bold">
        Animate your icons such that they grab viewers attention
      </h1>

      <div className="text-lg">
        <p>
          sometimes when viewers see your brand logo or icons they just
          don&apos;t notice it, animated icons can get more attention.
        </p>

        <p>
          when you&apos;re launching on{" "}
          <a
            href="https://producthunt.com"
            target="_blank"
            className="font-bold hover:underline"
          >
            producthunt
          </a>{" "}
          and there&apos;s so much to see, you need your product icon to be
          different.
        </p>
      </div>

      <div className="flex items-center justify-center w-full max-w-2xl">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload icon</span> or
              drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or AVIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>

      <div className="flex items-center gap-14 flex-wrap">
        <div className="border p-3">
          <Image
            id="icon1"
            src="/buildspace.png"
            width={512}
            height={512}
            className="w-20 h-20 rounded-xl"
            alt="buildpsace"
          />
        </div>
        <div className="border p-3">
          <Image
            id="icon2"
            src="/producthunt.png"
            width={512}
            height={512}
            className="w-20 h-20 rounded-xl"
            alt="producthunt"
          />
        </div>
        <div className="border p-3">
          <Image
            id="icon3"
            src="/figma.webp"
            width={512}
            height={512}
            className="w-20 h-20 rounded-xl"
            alt="figma"
          />
        </div>
        <div className="border p-3">
          <Image
            id="icon4"
            src="/moimoi.avif"
            width={512}
            height={512}
            className="w-20 h-20 rounded-xl"
            alt="moimoi"
          />
        </div>
        <div className="border p-3">
          <Image
            id="icon5"
            src="/notion.avif"
            width={512}
            height={512}
            className="w-20 h-20 rounded-xl"
            alt="notion"
          />
        </div>
      </div>
    </main>
  );
}
