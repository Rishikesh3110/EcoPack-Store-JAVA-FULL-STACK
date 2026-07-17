import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("ecopack-auth");
    const storedUsers = localStorage.getItem("ecopack-users");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const demoUsers = [
        {
          id: 1,
          name: "Admin Eco",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
          address: "Green Tower, Bengaluru",
          phone: "+91 98765 43210",
        },
        {
          id: 2,
          name: "Asha Rao",
          email: "user@example.com",
          password: "user123",
          role: "user",
          address: "3rd Main, Hyderabad",
          phone: "+91 91234 56789",
        },
      ];

      localStorage.setItem("ecopack-users", JSON.stringify(demoUsers));
      setUsers(demoUsers);
    }
  }, []);

  const login = (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPassword = password.trim();

    const foundUser = users.find((entry) => {
      const emailMatches = entry.email.toLowerCase() === normalizedEmail;
      const aliasMatches =
        (entry.email.toLowerCase() === "admin@ecopack.com" && normalizedEmail === "admin@example.com") ||
        (entry.email.toLowerCase() === "user@ecopack.com" && normalizedEmail === "user@example.com");

      return (emailMatches || aliasMatches) && entry.password === normalizedPassword;
    });

    if (!foundUser) {
      return { success: false, message: "Invalid email or password." };
    }

    const sessionUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      address: foundUser.address,
      phone: foundUser.phone,
    };

    localStorage.setItem("ecopack-auth", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true, message: "Welcome back!" };
  };

  const signup = (formData) => {
    const normalizedEmail = formData.email.toLowerCase();
    const exists = users.some((entry) => entry.email.toLowerCase() === normalizedEmail);

    if (exists) {
      return { success: false, message: "An account already exists for this email." };
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: normalizedEmail,
      password: formData.password,
      role: "user",
      address: formData.address,
      phone: formData.phone,
    };

    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    localStorage.setItem("ecopack-users", JSON.stringify(nextUsers));

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      address: newUser.address,
      phone: newUser.phone,
    };

    localStorage.setItem("ecopack-auth", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true, message: "Account created successfully." };
  };

  const logout = () => {
    localStorage.removeItem("ecopack-auth");
    setUser(null);
  };

  const updateProfile = (updatedProfile) => {
    if (!user) return { success: false, message: "No active session." };

    const nextUser = {
      ...user,
      ...updatedProfile,
    };

    const nextUsers = users.map((entry) => (entry.id === user.id ? { ...entry, ...updatedProfile } : entry));

    setUser(nextUser);
    setUsers(nextUsers);
    localStorage.setItem("ecopack-auth", JSON.stringify(nextUser));
    localStorage.setItem("ecopack-users", JSON.stringify(nextUsers));
    return { success: true, message: "Profile updated." };
  };

  const value = useMemo(
    () => ({ user, users, login, signup, logout, updateProfile }),
    [user, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
