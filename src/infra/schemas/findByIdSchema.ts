import z from "zod";

export const FindByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})