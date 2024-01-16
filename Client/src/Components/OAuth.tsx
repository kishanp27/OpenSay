/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useAuthContext } from "../contexts/useAuthContext";
const OAuth = ({
  endpoint,
  setError,
}: {
  endpoint: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { setCurrentUser } = useAuthContext();
  const handleGoogleClick = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const response = await axios.post(
        `/users/${endpoint}`,
        {
          email: result.user.email,
          authType: "google",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCurrentUser(() => response.data.user);
    } catch (error: any) {
      if (error.response.data.message.includes("duplicate")) {
        const errorMessage = "Email is already registered, please signin";
        setError(errorMessage);
      } else {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="flex w-full justify-center rounded-md bg-slate-100 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-md hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
    >
      Continue with {' '}<img className="h-6" src="/google.svg" alt="Google icon" />
    </button>
  );
};

export default OAuth;
