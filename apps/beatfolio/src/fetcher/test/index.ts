import { createBffServerClient } from "../../utils/client/index";

const client = createBffServerClient();

const res = await client.api.test.$get();

console.log(res);
