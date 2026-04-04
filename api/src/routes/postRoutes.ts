import { Router } from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../controller/postController";

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
