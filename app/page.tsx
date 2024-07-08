/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/components/header";
import { cn } from "@/lib/utils";
import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import GIF from "gif.js.optimized";

type BaseAnimationConfig = {
  loop?: boolean;
  easing?: string;
  duration?: number;
};

type StandardAnimationConfig = BaseAnimationConfig & {
  [key: string]: any; // This allows for any additional anime.js properties
};

type TimelineAnimationConfig = BaseAnimationConfig & {
  timeline: anime.AnimeParams[];
};

type AnimationConfig = StandardAnimationConfig | TimelineAnimationConfig;

const animationConfigs: Record<string, AnimationConfig> = {
  icon1: {
    scale: [1, 1.2],
    duration: 500,
    loop: true,
    direction: "alternate",
    easing: "easeInOutSine",
  },
  icon2: {
    translateY: [
      { value: -15, duration: 300, easing: "easeOutCubic" },
      { value: 0, duration: 500, easing: "easeInCubic" },
      { value: -7, duration: 200, easing: "easeOutCubic" },
      { value: 0, duration: 300, easing: "easeInCubic" },
    ],
    loop: true,
  },
  icon3: {
    easing: "easeInOutQuad",
    loop: true,
    timeline: [
      { translateX: -10, opacity: 0, duration: 0 },
      { translateX: 0, opacity: 1, duration: 1000 },
      { translateX: 0, opacity: 1, duration: 1000 },
      { translateX: 10, opacity: 0, duration: 1000 },
    ],
  },
  icon4: {
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
  },
  icon5: {
    loop: true,
    timeline: [
      {
        translateX: "-5px",
        rotateZ: "-5deg",
        duration: 100,
        easing: "easeInOutQuad",
      },
      {
        translateX: "5px",
        rotateZ: "5deg",
        duration: 100,
        easing: "easeInOutQuad",
      },
      {
        translateX: "-3px",
        rotateZ: "-3deg",
        duration: 100,
        easing: "easeInOutQuad",
      },
      {
        translateX: "3px",
        rotateZ: "3deg",
        duration: 100,
        easing: "easeInOutQuad",
      },
      {
        translateX: "0px",
        rotateZ: "0deg",
        duration: 100,
        easing: "easeInOutQuad",
      },
      { duration: 1000 }, // Pause duration
    ],
  },
};

export default function Home() {
  const [iconImage, setIconImage] = useState<string | null>(null);
  const [animeStyle, setAnimeStyle] = useState<string>("");

  const iconRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Initialize Anime.js animations
    const animations = Object.entries(animationConfigs).map(([key, config]) => {
      const targets = `.${key}`;
      if (config.timeline) {
        const timeline = anime.timeline({ targets, loop: config.loop });
        config.timeline.forEach((keyframe: anime.AnimeAnimParams) =>
          timeline.add(keyframe)
        );
        return timeline;
      } else {
        return anime({ targets, ...config });
      }
    });

    return () => {
      animations.forEach((anim) => anim.pause());
      anime.remove([".icon1", ".icon2", ".icon3", ".icon4", ".icon5"]);
    };
  }, [iconImage, animeStyle]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (animeStyle === "") {
        alert("Please select an icon before uploading.");
        return;
      }
      // Validate file type (optional)
      const allowedTypes = [
        "image/svg+xml",
        "image/png",
        "image/webp",
        "image/jpeg",
        "image/avif",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only SVG, PNG, JPG, or AVIF files are allowed.");
        return;
      }

      // Validate file dimensions (optional)
      const maxDimensions = { width: 1200, height: 1200 };
      const image = new Image();
      image.onload = () => {
        if (
          image.width > maxDimensions.width ||
          image.height > maxDimensions.height
        ) {
          alert(
            `Image dimensions should be within ${maxDimensions.width}x${maxDimensions.height}px.`
          );
          return;
        }
        setIconImage(URL.createObjectURL(file)); // Store image in state
      };
      image.src = URL.createObjectURL(file);
    }
  };

  const handleExport = () => {
    const img = iconRef.current;
    if (!img) {
      console.error("Image reference is null");
      return;
    }

    const gif = new GIF({
      workers: 4,
      quality: 5,
      width: img.clientWidth,
      height: img.clientHeight,
      workerScript: "/gifjs/gif.worker.js",
    });

    const fps = 24;
    const duration = 2000; // 2 seconds in milliseconds
    const totalFrames = fps * (duration / 1000);
    const frameDelay = 1000 / fps;

    // Recreate the animation based on the selected style
    const config = animationConfigs[animeStyle];
    if (!config) {
      console.error("Unknown animation style");
      return;
    }

    let animation: any;
    if ("timeline" in config) {
      animation = anime.timeline({
        targets: img,
        loop: true,
        autoplay: true,
      });
      config.timeline.forEach((keyframe: any) => animation.add(keyframe));
    } else {
      animation = anime({ targets: img, ...config, autoplay: true });
    }

    let frameCount = 0;

    function captureFrame() {
      if (!img) {
        console.error("Image reference is null");
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = img.clientWidth;
      canvas.height = img.clientHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
        gif.addFrame(ctx, { copy: true, delay: frameDelay });
      }

      frameCount++;

      if (frameCount < totalFrames) {
        requestAnimationFrame(captureFrame);
      } else {
        gif.render();
        // Clean up
        document.body.removeChild(img);
        animation.pause();
      }
    }

    // Start capturing frames
    requestAnimationFrame(captureFrame);

    gif.on("finished", (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "animated-icon.gif";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <main className="px-10 md:px-20 py-10 space-y-6 md:space-y-10">
      <Header />

      <h1 className="text-3xl md:text-6xl font-bold">
        Animate your icons such that they grab viewers attention
      </h1>

      <div className="md:text-lg">
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

      <p className="md:text-lg font-semibold">
        chooose any of the animated icons you like
      </p>
      <div className="flex items-center gap-14 flex-wrap">
        {[
          { id: "icon1", src: "/buildspace.png", alt: "buildspace" },
          { id: "icon2", src: "/producthunt.png", alt: "producthunt" },
          { id: "icon3", src: "/figma.webp", alt: "figma" },
          { id: "icon4", src: "/moimoi.avif", alt: "moimoi" },
          { id: "icon5", src: "/notion.avif", alt: "notion" },
        ].map(({ id, src, alt }) => (
          <div
            key={id}
            className={cn(
              "border p-3 hover:cursor-pointer",
              animeStyle === id ? "border-black" : ""
            )}
            onClick={() => {
              !iconImage && setAnimeStyle(id);
            }}
          >
            <img
              src={src}
              width={512}
              height={512}
              className={cn("w-20 h-20 rounded-xl", id)}
              alt={alt}
            />
          </div>
        ))}
      </div>

      <img src="/animated-icon.gif" alt="icon" />

      {iconImage ? (
        <div>
          <p className="md:text-lg font-semibold mb-5">here&apos;s your icon</p>
          <div className="flex items-start gap-2">
            <div className="border p-3 w-fit">
              <img
                ref={iconRef}
                src={iconImage}
                width={512}
                height={512}
                className={cn("w-20 h-20 rounded-xl", animeStyle)}
                alt={"icon"}
              />
            </div>
            <div className="space-y-2">
              <div onClick={handleExport} title="export">
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 17V3" />
                  <path d="m6 11 6 6 6-6" />
                  <path d="M19 21H5" />
                </svg>
              </div>
              <div onClick={() => setIconImage(null)} title="change icon">
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m2 9 3-3 3 3" />
                  <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                  <path d="m22 15-3 3-3-3" />
                  <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                </svg>{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full max-w-2xl">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload icon</span> or
                drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, WEBP, JPG or AVIF (MAX. 1200x1200px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".svg,.png,.webp,.jpg,.jpeg,.avif"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      )}
    </main>
  );
}
