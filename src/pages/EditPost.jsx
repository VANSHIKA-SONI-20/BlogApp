import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams(); // slug is assumed to be post._id
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      fetch(`http://localhost:5000/api/posts/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) {
            setPost(data);
          } else {
            navigate("/");
          }
        })
        .catch(() => navigate("/"));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
