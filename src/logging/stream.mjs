import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { join } from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const stream = createWriteStream(join(__dirname, "../../out.log"), {
  flags: "a",
});
