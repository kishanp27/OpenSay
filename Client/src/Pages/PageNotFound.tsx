import { Link } from "react-router-dom";
import MaxWidthWrapper from "../Layout/MaxWidthWrapper";

type Props = {
  error: string;
};

const ErrorPage = ({ error }: Props) => {
  return (
    <MaxWidthWrapper className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center my-10">
        {error}
        <Link className='text-2xl py-3 px-4 bg-blue-600 shadow-lg rounded-lg text-gray-100 mt-10 hover:scale-105 transition-all hover:bg-blue-500 block w-fit mx-auto' to={'/homepage'}>
            Back To Homepage
          </Link>
    </MaxWidthWrapper>
  );
};

export default ErrorPage;
