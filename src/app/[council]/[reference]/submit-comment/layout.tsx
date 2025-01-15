export async function generateMetadata() {
  return {
    title: {
      template: "%s",
    },
  };
}

export default function CommentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
