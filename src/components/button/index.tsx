export const BackLink = ({ href }: { href: string }) => {
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
  onClick,
  iconClass,
}: {
  iconClass?: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`govuk-button ${className}`}
      data-module="govuk-button"
      onClick={onClick}
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
