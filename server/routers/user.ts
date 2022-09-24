import { z } from "zod";
import { User } from "../../interfaces";
import { t } from "../trpc";

const users: User[] = [
  { id: 1, name: "SampleA" },
  { id: 2, name: "SampleB" },
];

export const userRouter = t.router({
  list: t.procedure.query(async () => users),
  add: t.procedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => {
      users.push({ id: users.length + 1, name: input.name });
      return users;
    }),
});
