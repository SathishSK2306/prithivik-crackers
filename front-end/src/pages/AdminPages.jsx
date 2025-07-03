import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#11212D] text-[#CCDDCF] p-4">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `block p-2 rounded hover:bg-[#259745] ${
              isActive ? "bg-[#4A6C6A]" : ""
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `block p-2 rounded hover:bg-[#259745] ${
              isActive ? "bg-[#4A6C6A]" : ""
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `block p-2 rounded hover:bg-[#259745] ${
              isActive ? "bg-[#4A6C6A]" : ""
            }`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `block p-2 rounded hover:bg-[#259745] ${
              isActive ? "bg-[#4A6C6A]" : ""
            }`
          }
        >
          Users
        </NavLink>
      </nav>
    </div>
  );
}
