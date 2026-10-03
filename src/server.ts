import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import createMcpServer from "./services/mcpServer.js";

const app = express();

app.use(express.json());

app.post("/mcp", async (req, res) => {
  console.log("MCP request received");

  try {
    const server = createMcpServer();

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    await server.connect(transport);

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
});

app.listen(3000, () => {
  console.log("MCP Server running on http://localhost:3000/mcp");
});