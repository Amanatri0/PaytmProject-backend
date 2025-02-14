import z from "zod";

const SignupSchema = z.object({
  email: z.string().email("Please enter a valid email").nonempty(),
  username: z
    .string()
    .min(3, { message: "Username cannot be less than 3 letters." })
    .nonempty(),
  firstname: z
    .string()
    .min(3, { message: "Firstname must contain alteast 3 letters" })
    .nonempty(),
  password: z.string().nonempty().min(8, {
    message:
      "Please enter atleast 8 characters as password with alphaneumeric eg:- Examplae@10972?",
  }),
});

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email").nonempty(),
  password: z.string().nonempty().min(8, {
    message:
      "Please enter atleast 8 characters as password with alphaneumeric eg:- Examplae@10972?",
  }),
});

export { SignupSchema, LoginSchema };
