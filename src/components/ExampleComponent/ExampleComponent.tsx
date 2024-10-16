export interface ExampleComponentProps {
  councilName: string;
}

export const ExampleComponent = ({
  councilName,
}: Required<ExampleComponentProps>) => {
  return <p>hello {councilName}</p>;
};
