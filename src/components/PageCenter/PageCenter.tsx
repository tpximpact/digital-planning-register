interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageCenter = ({ children }: PageWrapperProps) => {
  return <div className="govuk-width-container">{children}</div>;
};
