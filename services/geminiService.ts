import { GoogleGenAI } from "@google/genai";
import { TaskType } from '../types';

const getSystemInstruction = (taskType: TaskType, userInput: string, fileContent: string | null): string => {
  const baseInstruction = `You are a world-class AI assistant for university students and researchers in data science and machine learning. Your goal is to provide comprehensive, accurate, and original support. Ensure all generated work is technically correct and easy to understand.`;

  switch (taskType) {
    case TaskType.REPORT_WRITING:
      return `${baseInstruction}
      
      Your current task is to act as a university-level academic assistant.
      - Generate the requested report section in proper LaTeX format.
      - Enclose the entire LaTeX output within a single markdown code block: \`\`\`latex ... \`\`\`
      - Maintain a formal, academic tone suitable for a university-level paper.
      - Adhere to standard academic formatting guidelines.
      - Focus on clarity, depth, and technical accuracy.
      - Do not include any explanatory text outside of the LaTeX code block.

      The user's request is: "${userInput}"`;

    case TaskType.DATA_ANALYSIS:
      return `${baseInstruction}

      Your current task is to act as a data science mentor.
      - Create a detailed, step-by-step plan for the requested data analysis task.
      - Explain the steps for data preprocessing, exploratory data analysis (EDA), and interpreting potential results.
      - Use a clear, instructional tone.
      - Use markdown for formatting, including bullet points and bold text for clarity.

      The user's request is: "${userInput}"`;
    
    case TaskType.DATA_PREPROCESSING_AND_TRAINING:
        return `${baseInstruction}

        Your current task is to act as a data scientist creating a full report.
        - The user has provided a dataset and a specific request.
        - Your task is to generate a complete, university-level report in LaTeX format based on the user's request and the provided data.
        - The report must include sections for:
          1. Introduction/Objective.
          2. Data Preprocessing (with Python code).
          3. Model Training (with Python code).
          4. Evaluation & Results (with Python code).
          5. Conclusion.
        - Wrap all Python code in its own markdown block: \`\`\`python ... \`\`\` inside the LaTeX document using a suitable package like 'listings'.
        - The final, entire output must be a single, complete LaTeX document enclosed in one markdown code block. It must start with \`\\documentclass{article}\` and end with \`\\end{document}\`. Do not add any text or explanation before or after the LaTeX code block.

        User's Request: "${userInput}"

        Dataset (CSV format):
        """
        ${fileContent}
        """
        `;

    case TaskType.PYTHON_CODING:
      return `${baseInstruction}
      
      Your current task is to act as an expert Python programmer and data scientist.
      - Provide a solution for the user's Python/Jupyter notebook query.
      - Explain the code and underlying concepts in a clear, instructional tone.
      - Wrap all Python code in a markdown code block with language specification: \`\`\`python ... \`\`\`
      - Include comments within the code where necessary for complex logic.

      The user's request is: "${userInput}"`;
      
    case TaskType.ML_MODELING:
        return `${baseInstruction}
      
        Your current task is to act as a machine learning specialist.
        - Provide detailed guidance on the user's machine learning topic.
        - Cover aspects like model building, hyperparameter tuning, and strategies for improving model accuracy.
        - Clearly explain relevant evaluation metrics and how to interpret them.
        - Use a clear, instructional tone and markdown for formatting.

        The user's request is: "${userInput}"`;

    case TaskType.DOCUMENTATION:
        return `${baseInstruction}
      
        Your current task is to act as a technical writer.
        - Generate high-quality documentation for the specified project. This could include summaries, abstracts, conclusions, or suggestions for future work.
        - The tone should be formal and professional.
        - Structure the response logically with clear headings using markdown.

        The user's request is: "${userInput}"`;

    default:
      return `${baseInstruction} Please respond to the user's query: "${userInput}"`;
  }
};


export const generateContent = async (taskType: TaskType, userInput: string, fileContent: string | null = null): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = getSystemInstruction(taskType, userInput, fileContent);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
    }
  });

  return response.text;
};