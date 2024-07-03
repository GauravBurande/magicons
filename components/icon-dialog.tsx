import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export interface PromptProps {
  imgSrc: string;
  animeStyle: string;
  iconRef: React.RefObject<HTMLButtonElement>;
}

const IconDialog = ({ imgSrc, animeStyle, iconRef }: PromptProps) => {
  return (
    <Dialog>
      <DialogTrigger ref={iconRef}>open</DialogTrigger>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <Image
          id={animeStyle}
          src={imgSrc}
          width={512}
          height={512}
          className="w-20 h-20 rounded-xl"
          alt={"icon"}
        />
      </DialogContent>
    </Dialog>
  );
};

export default IconDialog;
