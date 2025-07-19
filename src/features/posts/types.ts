import { z } from "zod";
import { postFormSchema } from "./schema";

export type PostFormValues = z.infer<typeof postFormSchema>;
