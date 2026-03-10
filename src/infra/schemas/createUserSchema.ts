import z from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    cpf: z.string().length(11, "CPF must be exactly 11 characters"),
  })
})