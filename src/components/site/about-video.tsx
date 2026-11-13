"use client";

import { useRef, useState } from "react";

/** Vídeo vertical do Destaque Empresarial: capa com botão e, ao clicar, o player nativo. */
export default function AboutVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <figure className="relative mx-auto w-full max-w-[360px] min-w-0 flex-[0_1_360px]">
      <video
        ref={video}
        src="/destaque-empresarial.mp4"
        poster="/destaque-empresarial.jpg"
        preload="none"
        playsInline
        controls={started}
        className="block aspect-[9/16] w-full bg-ink object-cover"
        aria-label="Vídeo da JacoSeg no Destaque Empresarial"
      />
      {!started && (
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            video.current?.play();
          }}
          className="absolute bottom-5 left-5 inline-flex min-h-12 cursor-pointer items-center gap-2.5 bg-safety pr-[18px] pl-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-[#ffc51a]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
          Assistir · 1:15
        </button>
      )}
    </figure>
  );
}
