import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const CouncilLogo = ({
  councilName,
  logoFileName,
}: {
  councilName: string;
  logoFileName?: string;
}) => {
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
    />
  ) : (
    <span>{councilName}</span>
  );
};

export default CouncilLogo;
