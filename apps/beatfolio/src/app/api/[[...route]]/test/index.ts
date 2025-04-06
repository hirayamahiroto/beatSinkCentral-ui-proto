import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { createApiServerClient } from "../../../../../../api-server/src/utils/client";

const messageSchema = z.object({
  message: z.string(),
});

const app = new Hono().get("/", async (c) => {
  const client = createApiServerClient();

  const res = await client.api.test.$get();
  const json = await res.json();

  return c.json({ bffMessage: " bff test", apiMessage: json.message });
});

export default app;
