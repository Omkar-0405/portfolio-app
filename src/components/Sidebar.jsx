import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Portfolios", path: "/portfolio" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 pb-6">
      <div className="sticky top-0">
        <div className="text-xl font-semibold pt-6 mb-8 ">
          Porfolio <span className="text-green-600">premium</span>
        </div>

        <nav className="space-y-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
