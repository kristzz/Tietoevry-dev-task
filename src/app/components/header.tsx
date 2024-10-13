'use client'

import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isPaintingPage = pathname.startsWith("/painting/");

  return (
    <div className="flex items-center w-screen px-4">
      {isPaintingPage && (
        <button
          className="flex items-center mb-4 p-2 text-black rounded left-0"
          onClick={() => router.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
          </svg>
        </button>
      )}
      <h1 className="text-2xl mt-4 mb-8">Rijksmuseum shuffle</h1>
    </div>
  );
}
