'use client';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span role="img" aria-label="crystal ball" className="text-2xl">🏡</span>
              Property Creator
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
