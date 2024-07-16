import { z } from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(130),
  explanation: z.string().min(10),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3), // * maksimal 1 pertanyaan ada 3 tags -> 1 tag isi nya harus string
});
