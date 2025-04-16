interface MovieImageProps {
    src: string;
    alt: string;
    className?: string; 
  }
  
  export default function MovieImage({ src, alt, className }: MovieImageProps) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
      />
    );
  }