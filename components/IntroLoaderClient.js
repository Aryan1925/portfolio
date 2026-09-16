"use client";

import dynamic from "next/dynamic";

const IntroLoader = dynamic(() => import("./IntroLoader"), { ssr: false });

export default IntroLoader;
