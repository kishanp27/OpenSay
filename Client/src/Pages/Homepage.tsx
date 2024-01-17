import { Navigate } from "react-router-dom";
import MaxWidthWrapper from "../Layout/MaxWidthWrapper";
import { useAuthContext } from "../contexts/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaGhost, FaRegTrashAlt } from "react-icons/fa";

interface Post {
  postId: string;
  text: string;
  userId: string;
}

const Homepage = () => {
  const [postText, setPostText] = useState<string>("");
  const [allOtherUserPosts, setAllOtherUserPosts] = useState<Post[]>([]);
  const [allCurrentUserPosts, setAllCurrentUserPosts] = useState<Post[]>([]);
  const [showCurrentUserPosts, setShowCurrentUserPosts] = useState(false);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    getAllUserPosts();
  }, []);

  const getAllUserPosts = async () => {
    const response = await axios.get("/posts/get-all-posts");

    const posts = response.data.posts.map((post: Record<string, string>) => {
      return {
        text: post.text,
        userId: post.userId,
        postId: post._id,
      };
    });

    function shuffleArray(array: Post[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    if (currentUser) {
      const currentUserPosts = posts
        .filter(
          (post: Record<string, string>) => post.userId === currentUser.userId
        )
        .reverse();

      const otherUserPosts = posts.filter(
        (post: Record<string, string>) => post.userId !== currentUser.userId
      );

      shuffleArray(otherUserPosts);

      setAllOtherUserPosts(() => {
        return [...otherUserPosts];
      });
      setAllCurrentUserPosts(() => {
        return [...currentUserPosts];
      });
    }
  };

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCurrentUserPosts(true);
    const response = await axios.post("/posts/create", { text: postText });
    setAllCurrentUserPosts((prev) => {
      return [response.data.post, ...prev];
    });
    setPostText(() => "");
  };

  const handlePostDelete = async (post: Post) => {
    window.confirm("The post will be deleted permanentely, are you sure?");
    console.log(post);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await axios.delete("/posts/delete/" + post.postId);
    setAllCurrentUserPosts((prev) =>
      prev.filter((fetchedPost) => post.postId !== fetchedPost.postId)
    );
  };

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <MaxWidthWrapper className="mb-40">
      <div className="my-10 text-center card">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Do you have a secret, confession or an experience to share?
          <span className="text-blue-500 block sm:text-5xl">
            Write and share it down below
          </span>
        </h1>
      </div>
      <div className="mt-2">
        <form className="sm:w-4/5 mx-auto" onSubmit={handlePostSubmit}>
          <div className="flex flex-col items-end border-b-4 gap-2 border-slate-300 w-full p-2 rounded-md bg-slate-100 shadow-lg">
            <textarea
              value={postText}
              onChange={(e) => setPostText(() => e.target.value)}
              placeholder="Share a secret..."
              rows={3}
              required
              className="w-full outline-none bg-slate-100 resize-none p-3"
            ></textarea>
            <button className="px-4 py-2 rounded-xl border mr-3 shadow-lg font-medium text-white bg-blue-500 hover:scale-105 transition-all">
              Share
            </button>
          </div>
        </form>
      </div>
      <div className="h-[2px] w-full bg-slate-300 m-4"></div>

      <button
        className="w-full text-center text-slate-600 font-medium text-[15px] hover:scale-110 hover:underline transition-all"
        onClick={() => setShowCurrentUserPosts((prev) => !prev)}
      >
        {!showCurrentUserPosts ? "See your posts" : "Collapse"}
      </button>

      <section className="grid pb-8 lg:grid-cols-2 grid-cols-1 gap-y-1">
        {showCurrentUserPosts &&
          (allCurrentUserPosts.length > 0 ? (
            allCurrentUserPosts.map((post) => (
              <div key={post.postId}>
                <div className="h-fit lg:text-[1.1rem] text-[1.2rem] lg:w-3/4 md:w-6/7 w-full border-1 border-slate-400 bg-blue-100 rounded-md mt-8 mx-auto p-3 card shadow-lg">
                  <div className="h-10 w-10 bg-gray-800 flex justify-center items-center rounded-full text-white hover:cursor-pointer hover:scale-125 transition-all hover:text-red-600 mb-2 hover:bg-red-200">
                    <FaRegTrashAlt
                      onClick={() => handlePostDelete(post)}
                      className="h-5 "
                    />
                  </div>

                  {post.text}
                </div>
              </div>
            ))
          ) : (
            <p className="block text-center my-5 font-medium text-gray-400">
              You have not shared anything yet.
            </p>
          ))}
      </section>
      <section className="grid pb-10 lg:grid-cols-2 grid-cols-1 gap-y-1">
        {allOtherUserPosts.map((post) => (
          <div
            className="h-fit lg:text-[1.1rem] text-[1.2rem] lg:w-3/4 md:w-6/7 w-full border-1 border-slate-400 bg-slate-100 rounded-md mt-8 mx-auto p-3 card shadow-lg"
            key={post.postId}
          >
            <div className="h-10 w-10 bg-gray-800 flex justify-center items-center rounded-full text-white">
              <FaGhost height={5} />
            </div>

            {post.text}
          </div>
        ))}
      </section>
    </MaxWidthWrapper>
  );
};

export default Homepage;
