/**
 * Tool Registry - Central registry for all available tools
 */

export interface ToolParameter {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  description: string;
  required: boolean;
  default?: any;
}

export interface Tool {
  name: string;
  description: string;
  category: "code" | "web" | "data" | "image" | "file" | "system";
  parameters: ToolParameter[];
  execute: (params: Record<string, any>) => Promise<any>;
}

export const toolRegistry: Map<string, Tool> = new Map();

/**
 * Register a tool
 */
export function registerTool(tool: Tool) {
  toolRegistry.set(tool.name, tool);
}

/**
 * Get a tool by name
 */
export function getTool(name: string): Tool | undefined {
  return toolRegistry.get(name);
}

/**
 * Get all tools
 */
export function getAllTools(): Tool[] {
  return Array.from(toolRegistry.values());
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: Tool["category"]): Tool[] {
  return getAllTools().filter((tool) => tool.category === category);
}

/**
 * Execute a tool
 */
export async function executeTool(
  name: string,
  params: Record<string, any>
): Promise<{ success: boolean; result?: any; error?: string }> {
  const tool = getTool(name);

  if (!tool) {
    return {
      success: false,
      error: `Tool "${name}" not found`,
    };
  }

  try {
    // Validate required parameters
    for (const param of tool.parameters) {
      if (param.required && !(param.name in params)) {
        return {
          success: false,
          error: `Missing required parameter: ${param.name}`,
        };
      }
    }

    const result = await tool.execute(params);
    return {
      success: true,
      result,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Tool execution failed",
    };
  }
}

/**
 * Convert tools to OpenAI function calling format
 */
export function toolsToFunctions(): any[] {
  return getAllTools().map((tool) => ({
    name: tool.name,
    description: tool.description,
    parameters: {
      type: "object",
      properties: tool.parameters.reduce(
        (acc, param) => {
          acc[param.name] = {
            type: param.type,
            description: param.description,
          };
          return acc;
        },
        {} as Record<string, any>
      ),
      required: tool.parameters
        .filter((p) => p.required)
        .map((p) => p.name),
    },
  }));
}
