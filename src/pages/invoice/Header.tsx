

type HeaderProps = {
  handlePrint: () => void;
};

// export const Header: React.FC<HeaderProps> = ({ handlePrint }) => {
export const Header: React.FC<HeaderProps> = () => {
  // Aquí puedes usar handlePrint
  return (
      <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
      </header>
  );
};
