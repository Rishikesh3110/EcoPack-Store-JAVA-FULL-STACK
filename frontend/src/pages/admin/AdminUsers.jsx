import { useAuth } from "../../context/AuthContext";

function AdminUsers() {
  const { users } = useAuth();

  return (
    <div>
      <h2 className="text-success mb-4">Manage Customers</h2>
      <div className="card p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;