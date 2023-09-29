const Layout = ({ children }) => {
  return (
    <div className="bg-[#0D8C81] p-16 h-screen w-screen">
      <div className="bg-white h-full rounded shadow-custom">
        <div className="h-4/5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;