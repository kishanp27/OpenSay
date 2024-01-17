import MaxWidthWrapper from "../Layout/MaxWidthWrapper";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";

const LandingPage = () => {
  const { currentUser, error } = useAuthContext();
  return (
    <MaxWidthWrapper>
      {error && (
        <p className="text-red-500 font-medium text-2xl text-center mt-4">
          {error}, Please try again later.
        </p>
      )}
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your place to get it off your chest.{" "}
          <span className="text-blue-600 sm:text-6xl text-2xl">
            Anonymous Confessions.
          </span>
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to <span className="font-medium text-blue-700">OpenSay</span> . Every thing you say is 100% anonymous. Your place to let it out.
        </p>
        <p className="text-gray-500 font-medium">*Delete anytime</p>
        {currentUser ? (
          <Link
            className="text-2xl py-3 px-4 bg-teal-700 shadow-xl rounded-lg text-gray-100 mt-10 hover:scale-105 "
            to={"/homepage"}
          >
            Start Sharing
          </Link>
        ) : (
          <div className="mt-10">
            <Link
              className="text-2xl font-semibold py-3 px-4 bg-blue-600 shadow-lg rounded-lg text-gray-100  hover:scale-105"
              to={"/sign-up"}
            >
              Sign Up Now
            </Link>
            <p className="mt-5 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sing In
              </Link>
            </p>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default LandingPage;
