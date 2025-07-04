import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (userStatus) {
      fetch("http://localhost:5000/api/posts")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPosts(data);
          }
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
        });
    }
  }, [userStatus]);

  if (!userStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Welcome To Blog App
              </h1>
              <p className="text-gray-600">No posts available yet.</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post._id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
