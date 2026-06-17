import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#111113]">
      <div className="relative mb-6 h-14 w-48 animate-pulse">
        <Image
          src="/logo/logo-white.png"
          alt="Loading..."
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative h-[2px] w-36 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute top-0 bottom-0 h-full w-1/2 bg-[#FF8A00]"
          style={{
            backgroundImage: "linear-gradient(90deg, transparent, #FF8A00, transparent)",
            animation: "shimmer 1.5s infinite linear",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
    </div>
  );
}
