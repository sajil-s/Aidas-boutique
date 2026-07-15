import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";


import { getUserById,updateUserRole } from "../../services/adminUserService.js";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      
      const response = await getUserById(id);
      setData(response);
      setRole(response.user.role);
    } catch (error) {
      console.error("NO user found",error);
    } finally {
      setLoading(false);
    }
  };
 

  if (loading) return <h1>Loading...</h1>;
  if (!data) {
  return <h1>No user data found.</h1>;
}

  const { user, totalOrders, totalSpent, orders } = data;
 
  return (
    <div>

      <button
        onClick={() => navigate("/admin/users")}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Users
      </button>

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold">
          {user.name}
        </h1>

        <p className="text-slate-600 mt-2">
          {user.email}
        </p>

        <p className="mt-4">
          <strong>Role:</strong> {user.role}
        </p>

        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold">
            Total Orders
          </h2>

          <p className="text-3xl mt-3">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold">
            Total Spent
          </h2>

          <p className="text-3xl mt-3">
            ₹{totalSpent}
          </p>
        </div>

      </div>
      <div className="bg-white rounded-xl shadow p-6 mt-6">

  <h2 className="text-xl font-bold mb-4">
    Change Role
  </h2>

  <div className="flex items-center gap-4">

    <select
      value={role}
      onChange={(e) =>
        setRole(e.target.value)
      }
      className="border rounded-lg p-3"
    >
      <option value="user">
        User
      </option>

      <option value="admin">
        Admin
      </option>

    </select>

    <button
      onClick={async () => {
        try {
          await updateUserRole(
            user._id,
            role
          );

          toast.success(
            "Role updated"
          );

          fetchUser();

        } catch (error) {
          toast.error(
            error.response?.data?.message ||
              "Update failed"
          );
        }
      }}
      className="bg-black text-white px-5 py-3 rounded-lg"
    >
      Update Role
    </button>

  </div>

</div>

      <div className="bg-white rounded-xl shadow p-6 mt-6">

        <h2 className="text-xl font-bold mb-4">
          Recent Orders
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Order ID
              </th>

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-left py-3">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b"
              >
                <td className="py-4">
                  #{order._id.slice(-6).toUpperCase()}
                </td>

                <td className="capitalize">
                  {order.orderStatus}
                </td>

                <td>
                  ₹{order.finalPrice}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserDetails;