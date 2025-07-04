// controllers/postController.js
import Post from "../models/Post.js";

// @desc    Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, slug, content, status, userId } = req.body;
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : "";


    const post = new Post({
      title,
      slug,
      content,
      status,
      author: userId,
      featuredImage,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// @desc    Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get posts" });
  }
};

// @desc    Get single post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

// @desc    Delete post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.slug = req.body.slug || post.slug;
    post.status = req.body.status || post.status;
    
    if (req.file) {
      post.featuredImage = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

