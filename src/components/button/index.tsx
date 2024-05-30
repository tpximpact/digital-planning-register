export const BackLink = ({ href }: { href?: string }) => {
  return (
    <a href={href} className="govuk-back-link">
      Back
    </a>
  );
};

export const Button = ({
  content,
  icon,
  className,
  type = "button",
  iconClass,
}: {
  iconClass?: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={type}
      className={`govuk-button ${className}`}
      data-module="govuk-button"
    >
      {content}
      {icon && (
        <span
          style={{ marginLeft: "10px", verticalAlign: "middle" }}
          className={`${iconClass}`}
        >
          {icon}
        </span>
      )}
    </button>
  );
};
