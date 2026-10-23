import Image from "next/image";
import { images } from "@/lib/site";

// next/image over a pre-built derivative from scripts/build-images.py.
// Intrinsic width/height come from the manifest so layout never shifts.
export default function Photo({ name, alt, priority = false, sizes = "100vw", style, className }) {
  const img = images[name];
  return (
    <Image
      src={img.src}
      width={img.width}
      height={img.height}
      alt={alt}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
      style={style}
    />
  );
}
