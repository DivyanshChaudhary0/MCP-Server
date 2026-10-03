import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerCalculatorTools(server: McpServer) {
    console.log("Inside the calculator");
    
  server.tool(
    "add",
    "Adds two numbers together",
    {
      a: z.number(),
      b: z.number(),
    },
    async ({ a, b }) => {
      return {
        content: [
          {
            type: "text",
            text: String(a + b),
          },
        ],
      };
    },
  );
}
