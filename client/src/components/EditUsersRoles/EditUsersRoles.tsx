import api from "../../services/api";
import "./EditUsersRoles.css";
import UserInfosPopup from "../UserInfosPopup/UserInfosPopup";
import { useEffect, useCallback, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  birthdate: string;
  tel: string;
}

const UserManagement = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur de chargement", err);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      fetchUsers();
    }
  }, [fetchUsers, authLoading]);

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      await api.put(`/api/users/${id}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert("Errerur lors du changement de rôle");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (
      window.confirm("Etes-vous surs de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await api.delete("/api/users", { data: { idToDelete: id } });
        fetchUsers();
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (authLoading) return <p>Chargement...</p>;

  return (
    <div className="edit-users-control">
      <h1>Gestion des utilisateurs</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>
                <select
                  className="select-btn"
                  value={u.role}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    e.key === "Enter";
                  }}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleRoleChange(u.id, e.target.value);
                  }}
                  disabled={currentUser?.id === u.id}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="actions">
                <button
                  type="button"
                  className="infos-btn"
                  onClick={() => setSelectedUser(u)}
                >
                  Voir les informations
                </button>
                <button
                  className="delete-btn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUser(u.id);
                  }}
                  disabled={currentUser?.id === u.id}
                >
                  {currentUser?.id === u.id ? "X" : "Supprimer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <UserInfosPopup
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;
