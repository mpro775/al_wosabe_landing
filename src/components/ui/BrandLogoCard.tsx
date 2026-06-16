import Image from "next/image";

export function BrandLogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="card-hover-glow group relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-black/6 bg-white p-6 shadow-sm transition-all duration-300">
      {/* Gradient accent on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      
      <div className="relative h-16 w-full transition-all duration-300">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
          className="object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}
