import { z } from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(100, "제목은 100자 이하여야 합니다"),
  url: z.string().url("올바른 URL을 입력해주세요"),
  content: z
    .string()
    .min(1, "내용을 입력해주세요")
    .max(1000, "내용은 1000자 이하여야 합니다"),
});
