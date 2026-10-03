import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

type Task = {
  title: string;
  description: string;
};

const tasks: Task[] = [];

export function registerTaskTools(server: McpServer) {
  console.log("Registering task tools...");

  server.tool(
    "add_task",
    "Add a new task",
    {
      title: z.string(),
      description: z.string(),
    },
    async ({ title, description }) => {
      tasks.push({
        title,
        description,
      });

      return {
        content: [
          {
            type: "text",
            text: `Task added: ${title} - ${description}`,
          },
        ],
      };
    }
  );

  server.tool(
    "list_tasks",
    "List all tasks",
    {},
    async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(tasks),
          },
        ],
      };
    }
  );
}