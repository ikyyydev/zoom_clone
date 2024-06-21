"use client";

import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { avatarImages } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();
  return (
    <section className="flex min-h-[258px] w-full rounded-[14px] flex-col justify-between bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="Upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative")}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              src={img}
              key={index}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex justify-center items-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            5+
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="rounded bg-primary px-6 hover:bg-primary-hover"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="Feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                  duration: 2000,
                  className: "bg-success border-none text-white",
                });
              }}
              className="bg-dark-4 px-6 opacity-100 hover:bg-dark-4 hover:opacity-90"
            >
              <Image
                src="/icons/copy.svg"
                alt="Feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
