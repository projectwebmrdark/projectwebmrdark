import { registerTool, type Tool } from "./registry";

/**
 * Execute Python code
 */
async function executePython(code: string): Promise<{ output: string; error?: string }> {
  try {
    // In production, this would call a sandboxed execution environment
    // For now, we'll return a mock response
    return {
      output: "Python execution not yet implemented in production",
      error: "Feature coming soon",
    };
  } catch (error: any) {
    return {
      output: "",
      error: error.message,
    };
  }
}

/**
 * Execute JavaScript code
 */
async function executeJavaScript(code: string): Promise<{ output: string; error?: string }> {
  try {
    // In production, this would call a sandboxed execution environment
    // For now, we'll use eval (NOT SAFE for production)
    const result = eval(code);
    return {
      output: String(result),
    };
  } catch (error: any) {
    return {
      output: "",
      error: error.message,
    };
  }
}

/**
 * Code Execution Tool
 */
const codeExecutionTool: Tool = {
  name: "execute_code",
  description: "Execute code in Python or JavaScript",
  category: "code",
  parameters: [
    {
      name: "language",
      type: "string",
      description: "Programming language (python or javascript)",
      required: true,
    },
    {
      name: "code",
      type: "string",
      description: "Code to execute",
      required: true,
    },
  ],
  execute: async (params) => {
    const { language, code } = params;

    if (language === "python") {
      return await executePython(code);
    } else if (language === "javascript") {
      return await executeJavaScript(code);
    } else {
      throw new Error(`Unsupported language: ${language}`);
    }
  },
};

// Register the tool
registerTool(codeExecutionTool);

export { codeExecutionTool };
