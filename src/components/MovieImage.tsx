import Image from "next/image";

interface MovieImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}
  
export default function MovieImage({ 
    src, 
    alt, 
    className, 
    width = 160, 
    height = 224 
}: MovieImageProps) {
    return (
      <Image 
        src={src} 
        alt={alt} 
        className={className}
        width={width}
        height={height}
      />
    );
}