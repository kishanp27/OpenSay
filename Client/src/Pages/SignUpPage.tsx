/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Navigate } from "react-router-dom";
import MaxWidthWrapper from "../Layout/MaxWidthWrapper";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/useAuthContext";
import OAuth from "../Components/OAuth";

const SignInPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const[error, setError] = useState<string | null>(null);

  const { currentUser, setCurrentUser } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordMatch(true);
    setError(null);
    const { email, password, confirmPassword } = userDetails;
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setUserDetails((prev) => ({ ...prev, confirmPassword: "" }));
      return;
    }

    try{
      const response = await axios.post(
        "/users/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCurrentUser(() => response.data.user.userId);
    }catch(error:any){
      if(error.response.data.message.includes('duplicate')){
        const errorMessage = "Email is already registered, please signin";
        setError(errorMessage);
      }
    }
  };

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <MaxWidthWrapper>
      <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8">
      {error && <p className='text-red-500 font-medium text-2xl text-center mt-4'>{error}.</p>}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userDetails?.email}
                  onChange={(event) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  minLength={4}
                  value={userDetails?.password}
                  onChange={(event) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userDetails?.confirmPassword}
                  onChange={(event) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      confirmPassword: event.target.value,
                    }))
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
                {!passwordMatch && (
                  <p className="text-red-500 font-medium">
                    Password did not match
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <OAuth endpoint="register" setError={setError}/>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sing In
            </Link>
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SignInPage;
