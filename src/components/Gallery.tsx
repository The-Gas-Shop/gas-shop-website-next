"use client";
import { MouseEventHandler, MutableRefObject, useState } from "react";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Image } from "@mantine/core";

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>,
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

function Arrow(props: {
  left?: boolean;
  onClick: MouseEventHandler<SVGSVGElement>;
}) {
  return (
    <svg
      onClick={props.onClick}
      className={`w-8 h-8 absolute top-[50%] transform-[translateY(-50%)] cursor-pointer fill-white ${
        props.left ? "left-1.5" : "right-1.5 left-auto"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default function Gallery(props: { images: string[] }) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      created() {
        setLoaded(true);
      },
    },
    [],
  );
  const [loaded, setLoaded] = useState(false);
  const [thumbnailRef, thumbInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );

  const images = props.images.map((image, index) => (
    <div
      key={index}
      className="keen-slider__slide text-3xl mt-2.5 cursor-pointer"
    >
      <Image src={image} alt={`Slide ${index + 1}`} />
    </div>
  ));

  return (
    <>
      <div className="grid">
        <div ref={sliderRef} className="keen-slider">
          {images}
        </div>

        <div className="relative grid">
          <div ref={thumbnailRef} className="keen-slider thumbnail">
            {images}
          </div>
          {loaded && thumbInstanceRef.current && (
            <>
              <Arrow left onClick={() => thumbInstanceRef.current?.prev()} />

              <Arrow onClick={() => thumbInstanceRef.current?.next()} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
