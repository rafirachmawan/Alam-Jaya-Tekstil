import type { Request, Response } from "express";
import * as postService from "../services/postService";

const parseId = (value: string | string[] | undefined) => {
  if (!value) return null;
  const rawValue = Array.isArray(value) ? value[0] : value;
  const id = Number(rawValue);
  return Number.isNaN(id) ? null : id;
};

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    return res.json({ message: "Success", data: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching posts" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ message: "Invalid post id" });

  try {
    const post = await postService.getPostById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.json({ message: "Success", data: post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching post" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  try {
    const newPost = await postService.createPost({ title, content });
    return res.status(201).json({ message: "Post created", data: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ message: "Invalid post id" });

  const { title, content } = req.body;
  if (title === undefined && content === undefined) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  try {
    const updatedPost = await postService.updatePost(id, { title, content });
    return res.json({ message: "Post updated", data: updatedPost });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ message: "Invalid post id" });

  try {
    await postService.deletePost(id);
    return res.json({ message: "Post deleted" });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(500).json({ message: "Error deleting post" });
  }
};
