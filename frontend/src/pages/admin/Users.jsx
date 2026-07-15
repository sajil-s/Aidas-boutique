import { useEffect, useState } from "react";

import { getAllUsers } from "../../services/adminUserService.js";
import UsersTable from "../../components/admin/users/UsersTable.jsx";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("found an error",error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full max-w-md border rounded-lg p-3 mb-6"
      />

      <UsersTable users={filteredUsers} />
    </div>
  );
}

export default Users;