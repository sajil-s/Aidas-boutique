import { Link } from "react-router-dom";

function UsersTable({ users }) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{user.name}</p>
              <span className="capitalize text-sm bg-slate-100 px-2.5 py-1 rounded-full">
                {user.role}
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-1 truncate">
              {user.email}
            </p>

            <div className="flex items-center justify-between text-sm mt-3">
              <span className="text-slate-500">
                {user.totalOrders} orders
              </span>
              <span className="font-semibold">₹{user.totalSpent}</span>
            </div>

            <Link
              to={`/admin/users/${user._id}`}
              className="mt-3 block text-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              View
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Orders</th>
              <th className="text-left p-4">Spent</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-slate-50">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4">{user.totalOrders}</td>
                <td className="p-4">₹{user.totalSpent}</td>
                <td className="p-4">
                  <Link
                    to={`/admin/users/${user._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UsersTable;