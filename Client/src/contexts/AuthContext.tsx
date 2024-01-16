/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

type CurrentUser = {
  userId: string;
};

type AuthContext = {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/users/current-user", {
        withCredentials: true,
      });

      if (response && response.status === 200) {
        const { userId } = response.data.user;
        setCurrentUser(() => ({
          userId,
        }));
      } else {
        throw new Error("Internal server error");
      }
    } catch (err: any) {
      if(err.message == "Network Error"){
        setError("Internal Server Error")
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
