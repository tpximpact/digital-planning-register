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

  return logoFileName ? (
    <Image
      src={`/images/logos/${logoFileName}`}
      alt={`${councilName} Logo`}
      width={350}
      height={75}
      aria-label={`${councilName} Logo`}
      role="img"
    />
  ) : (
    <span>{councilName}</span>
  );
};
