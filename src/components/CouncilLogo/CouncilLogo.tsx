import React from "react";
import Image from "next/image";
import path from "path";

interface CouncilLogoProps {
  councilName: string;
  logoFileName?: string;
}

export const CouncilLogo = ({
  councilName,
  logoFileName,
}: CouncilLogoProps) => {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "logos",
    logoFileName ?? "",
  );

  if (!logoFileName) {
    return <span>{councilName}</span>;
  }

  return (
    <Image
      src={`/images/logos/${logoFileName}`}
      alt="" // Empty alt since the link's aria-label provides the context
      width={350}
      height={75}
    />
  );
};
