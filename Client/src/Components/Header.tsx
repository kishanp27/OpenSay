import { Link, Outlet, useNavigate } from "react-router-dom";
import MaxWidthWrapper from "../Layout/MaxWidthWrapper";
import axios from "axios";
import { useAuthContext } from "../contexts/useAuthContext";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const navigate = useNavigate();

  const userLogoutHandler = async () => {
    const response = await axios.post("/users/logout");
    if (response.status == 200) {
      setCurrentUser(null);
    }
  };

  const homePageHandler = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex justify-center items-center h-16 top-0 sticky z-50 bg-gray-100">
       {currentUser && <MaxWidthWrapper className="flex justify-between items-center z-10 text-2xl font-semibold">
            <button className="text-blue-800 font-bold" onClick={homePageHandler}>
              Open<span className="text-blue-400">Say</span>
            </button>
          {!currentUser && (
            <Link to={"sign-in"} className='text-xl py-2 px-4 bg-blue-600 shadow-lg rounded-lg text-gray-100 hover:scale-105 transition-all hover:bg-blue-500'>
              Sign in
            </Link>
          )}
          {currentUser && <button className='text-xl py-2 px-4 bg-blue-600 shadow-lg rounded-lg text-gray-100 hover:scale-105 transition-all hover:bg-blue-500' onClick={userLogoutHandler}>Sign out</button>}
        </MaxWidthWrapper>}

        {!currentUser && <MaxWidthWrapper className="text-center z-10 text-2xl font-semibold">
            <button className="text-blue-800 font-bold" onClick={homePageHandler}>
              Open<span className="text-blue-400">Say</span>
            </button>
            
            </MaxWidthWrapper> }
      </div>
      <Outlet />
    </>
  );
};

export default Header;
