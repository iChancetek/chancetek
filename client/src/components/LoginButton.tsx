import React from 'react';
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

export default function LoginButton() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <Button variant="ghost" onClick={logout}>Logout</Button>
      ) : (
        <Button variant="ghost" onClick={() => login("google")}>Login</Button>
      )}
    </div>
  );
}
