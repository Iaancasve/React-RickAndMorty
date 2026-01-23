interface Props {
  title: string;
  description?: string;
}

export const CustomHeader = ({ title, description }: Props) => {
  return (
    <header>
      <h1>{ title }</h1>
      { description && <p>{ description }</p> }
    </header>
  );
};