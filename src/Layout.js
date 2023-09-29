const Layout = ({ children }) => {
  return (
    <div className="bg-[#0D8C81] p-16 h-screen w-screen">
      <div className="bg-white h-full rounded shadow-custom">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;