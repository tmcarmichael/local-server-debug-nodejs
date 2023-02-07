import morgan from "morgan";
import chalk from "chalk";
// import logger from "./logger";
// import stream from "./stream";

// export default morgan(
//   ":method :url :status :res[content-length] - :response-time ms",
//   {
//     stream: {
//       write: (message) => logger.http(message.trim())
//     }
//   }
// );

export const logMiddleware = morgan(function (tokens, req, res) {
  return [
    chalk.hex("#2ed573").bold("HTTP:"),
    chalk.hex("#FF6F61").bold(tokens.method(req, res)),
    chalk.hex("#EFC050").bold(tokens.status(req, res)),
    chalk
      .hex("#92A8D1")
      .bold(
        `http://${process.env.HOST}:${process.env.PORT}` + tokens.url(req, res)
      ),
    chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
    chalk.hex("#2ed573").bold("@ " + tokens.date(req, res))
  ].join(" ");
});
