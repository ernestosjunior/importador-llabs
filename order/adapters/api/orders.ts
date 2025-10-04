import { api } from "encore.dev/api";
import busboy from "busboy";
import { URL } from "node:url";
import { AggregateOrders } from "../../application/aggregate-orders";
import { OrdersRepository } from "../repositories/orders";
import { IncomingMessage, ServerResponse } from "node:http";

const aggregateOrdersUseCase = new AggregateOrders(new OrdersRepository());

const sendJsonResponse = (
  res: ServerResponse<IncomingMessage>,
  statusCode: number,
  data: any
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const aggregate = api.raw(
  { expose: true, method: "POST", path: "/orders", bodyLimit: null },
  async (req, res) => {
    const contentType = req.headers["content-type"] ?? "";

    if (!contentType.startsWith("multipart/form-data")) {
      sendJsonResponse(res, 415, {
        error: "Content-Type must be multipart/form-data",
      });

      return;
    }

    const bb = busboy({ headers: req.headers, limits: { files: 3 } });

    let content: string = "";
    let typeError: string | null = null;

    bb.on("file", (_field, file, info) => {
      const { filename, mimeType } = info;

      const isTxt = filename ? /\.txt$/i.test(filename) : true;
      const isTextPlain = (mimeType ?? "").toLowerCase() === "text/plain";
      if (!isTxt || !isTextPlain) {
        typeError = "Only .txt files with Content-Type text/plain are accepted";
        file.resume();
        return;
      }

      file.setEncoding("utf8");
      file.on("data", (chunk: string) => (content += chunk));
      file.on("error", (err) => bb.emit("error", err));
    });

    bb.on("finish", async () => {
      try {
        if (typeError) {
          sendJsonResponse(res, 415, { error: typeError });
          return;
        }
        const url = new URL(req.url ?? "", "http://localhost");
        const filters = {
          order_id: url.searchParams.get("order_id")
            ? Number(url.searchParams.get("order_id"))
            : undefined,
          start_date: url.searchParams.get("start_date") ?? undefined,
          end_date: url.searchParams.get("end_date") ?? undefined,
        };

        const users = await aggregateOrdersUseCase.execute(content, filters);

        sendJsonResponse(res, 200, users);
      } catch (err) {
        sendJsonResponse(res, 400, { error: (err as Error).message });
      }
    });

    bb.on("error", (err) => {
      const message = (err as Error).message;

      if (message === "Unexpected end of form") {
        sendJsonResponse(res, 400, { error: "No file uploaded" });

        return;
      }

      sendJsonResponse(res, 500, { error: (err as Error).message });
    });

    req.pipe(bb);
  }
);
