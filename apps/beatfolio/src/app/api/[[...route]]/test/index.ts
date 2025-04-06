import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { createApiServerClient } from "../../../../../../api-server/src/utils/client";

const messageSchema = z.object({
  message: z.string(),
});

const app = new Hono().get(
  "/",
  zValidator("json", messageSchema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid!", 400);
    }
  }),
  async (c) => {
    const client = createApiServerClient();
    const res = await client.api.test.$get();

    return c.json({ message: "Hello World" });
  }
);

export default app;
