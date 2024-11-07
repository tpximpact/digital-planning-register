import "./ExampleComponent.scss";

export interface ExampleComponentProps {
  councilName: string;
}

export const ExampleComponent = ({ councilName }: ExampleComponentProps) => {
  return <p>hello {councilName}</p>;
};
