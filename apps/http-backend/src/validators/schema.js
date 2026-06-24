const z = require("zod");

const signupSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(25)
});

const signinSchema = z.object({
    username: z.string().min(3).max(50),
  password: z.string().min(6).max(25)
});

const messageSchema = z.object({
  content: z.string().min(1),
  roomId: z.number().max(25),
  userId: z.number().max(25)
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