import { Post } from "@prisma/client";
import { z } from "zod";
import { postFormSchema } from "./schema";

export type PostFormValues = z.infer<typeof postFormSchema>;

export type PostInfiniteQuery = {
  data: Post[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};
