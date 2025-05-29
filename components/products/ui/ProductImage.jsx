import Image from "next/image";

export function ProductImage({ src, alt }) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover scale-125 -translate-y-6"
        />
    );
}