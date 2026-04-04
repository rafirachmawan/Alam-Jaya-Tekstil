import { prisma } from "../lib/prisma";

export const getAllPosts = () => prisma.post.findMany();

export const getPostById = (id: number) =>
  prisma.post.findUnique({
    where: { id },
  });

export const createPost = (data: { title: string; content?: string }) =>
  prisma.post.create({
    data,
  });

export const updatePost = (id: number, data: { title?: string; content?: string }) =>
  prisma.post.update({
    where: { id },
    data,
  });

export const deletePost = (id: number) =>
  prisma.post.delete({
    where: { id },
  });
