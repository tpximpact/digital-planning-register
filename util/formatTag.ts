export const formatTag = (tag: string) => {
  if (tag.includes(".")) {
    const parts = tag.split(".");
    const lastPart = parts.pop();
    return [lastPart, parts.join(" ")]
      .map((part) =>
        part
          ?.split(/(?=[A-Z])/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      )
      .join(" ");
  } else {
    return tag
      .split(/(?=[A-Z])/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
};
