"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  icon: string;
  label?: string;
};
export const FooterButton = ({ href, icon, label }: Props) => {
  const footerHandleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Link href={href} onClick={footerHandleClick}>
      <div className="flex items-center gap-4 border border-gray-700 rounded-sm p-4 hover:bg-gray-900">
        <Image src={icon} alt="" width={24} height={24} />
        {label && <div className="flex-1">{label}</div>}
      </div>
    </Link>
  );
};
