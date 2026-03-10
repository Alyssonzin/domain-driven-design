import z from "zod";

export const EnvSchema = z.object({
  PG_HOST: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string(),
  PORT: z.string().default("8000"),
})