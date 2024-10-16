"use client";

import { useSearchParams } from "next/navigation";

export default function Country({ params }: { params: { country: string } }) {
  const searchParams = useSearchParams();
  const svgPath = searchParams.get("svgPath");

  return (
    <div>
      <h1>Country: {params.country}</h1>
      {svgPath && (
        <div>
          <svg width="500" height="500" viewBox="0 0 1000 1000">
            <path
              fill="#33393f"
              stroke="#ffffff"
              d={svgPath}
              id="sm_state sm_state_MZ"
              opacity="1"
              strokeOpacity={1}
              strokeWidth="1.5"
              strokeLinejoin="round"
              transform="matrix(2,0,0,2,0,0)"
              className="
          transition-all duration-1000
        "
              fillOpacity="1"
            />
          </svg>
          <p>{svgPath}</p>
        </div>
      )}
    </div>
  );
}
