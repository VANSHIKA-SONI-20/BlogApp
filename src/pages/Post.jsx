import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams(); // slug = post._id
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.author === userData._id : false;

  useEffect(() => {
    if (slug) {
      fetch(`http://localhost:5000/api/posts/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) setPost(data);
          else navigate("/");
        })
        .catch(() => navigate("/"));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/posts/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      navigate("/");
    } else {
      alert("Failed to delete post");
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="rounded-xl max-h-[400px] object-cover"
            />
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post._id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
