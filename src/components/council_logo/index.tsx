import React from "react";
import Image from "next/image";
import fs from "fs";
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
  const logoExists = fs.existsSync(logoPath);

  return logoExists ? (
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

export default CouncilLogo;
