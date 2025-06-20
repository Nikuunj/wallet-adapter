import { cn } from "@/lib/utils";
import React from "react";

export function GridSmallBackground() {
  return (
    <div className=" fixed top-0 left-0 z-10  flex min-h-[50rem] w-screen items-center justify-center bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:5px_5px]",
          "[background-image:linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] bg-black"></div>
    </div>
  );  
}
