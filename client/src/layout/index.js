import Logo from "../assets/logo.png";

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className="flex items-center justify-center py-3 h-20 shadow-md">
        <img src={Logo} alt="logo" width={180} height={60} />
      </header>
      {children}
    </>
  );
};
export default AuthLayout;
