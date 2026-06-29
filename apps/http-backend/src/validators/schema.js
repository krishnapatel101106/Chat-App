const z = require("zod");

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  email: z.email("Invalid email").max(25),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signinSchema = z.object({
  email: z.email("Invalid email").max(25),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const messageSchema = z.object({
  content: z.string().min(1),
  roomId: z.number().max(25),
});

const roomSchema = z.object({
  name: z.string().max(25),

});

module.exports = {
  signupSchema,
  signinSchema,
  messageSchema,
  roomSchema
};