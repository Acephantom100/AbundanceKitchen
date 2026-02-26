import { ImagePlus } from "lucide-react";

interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: "square" | "video" | "wide" | "portrait";
  className?: string;
}

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
};

const ImagePlaceholder = ({ label, aspectRatio = "video", className = "" }: ImagePlaceholderProps) => {
  return (
    <div
      className={`relative bg-muted border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center ${aspectClasses[aspectRatio]} ${className}`}
    >
      <ImagePlus className="w-12 h-12 text-muted-foreground/50 mb-3" />
      <p className="text-muted-foreground/70 text-sm font-medium text-center px-4">
        {label}
      </p>
      <p className="text-muted-foreground/50 text-xs mt-1">Upload image here</p>
    </div>
  );
};

export default ImagePlaceholder;
