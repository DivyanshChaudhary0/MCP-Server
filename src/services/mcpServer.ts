import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { registerCalculatorTools } from "../tools/calculator";
import { registerTaskTools } from "../tools/tasks";

function createMcpServer() {
  const server = new McpServer({
    name: "task-mcp-server",
    version: "1.0.0",
  });

  registerCalculatorTools(server);
  registerTaskTools(server);

  return server;
}

export default createMcpServer;