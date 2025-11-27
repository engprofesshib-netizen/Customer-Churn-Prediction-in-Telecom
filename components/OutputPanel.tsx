
import React from 'react';
import Spinner from './Spinner';

interface OutputPanelProps {
  output: string;
  isLoading: boolean;
  error: string | null;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
          <Spinner />
          <p className="text-lg">The AI is thinking...</p>
          <p className="text-sm max-w-md text-center">Please wait while your academic assistance is being generated. This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-red-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-lg font-semibold">An Error Occurred</p>
          <p className="text-center">{error}</p>
        </div>
      );
    }
    
    if (!output) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <h3 className="text-xl font-bold text-gray-400">Your AI-Generated Content Will Appear Here</h3>
          <p className="mt-2 max-w-lg">Select an assistance type, enter your query in the panel on the left, and click "Generate Assistance" to get started.</p>
        </div>
      );
    }

    // A simple parser to format the response.
    // It finds markdown-style code blocks and wraps them in styled divs.
    const parts = output.split(/(\`\`\`[\w\s]*\n[\s\S]*?\n\`\`\`)/g);

    return (
        <div className="prose prose-invert prose-lg max-w-none p-1">
            {parts.map((part, index) => {
                if (part.startsWith('```')) {
                    const lines = part.split('\n');
                    const language = lines[0].substring(3).trim();
                    const code = lines.slice(1, -1).join('\n');
                    return (
                        <div key={index} className="bg-gray-900 rounded-md my-4 shadow-inner">
                            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-t-md">
                                <span className="text-xs font-sans text-gray-400 uppercase">{language || 'Code'}</span>
                                <button
                                    onClick={() => navigator.clipboard.writeText(code)}
                                    className="text-xs text-gray-400 hover:text-white transition-colors"
                                >
                                    Copy
                                </button>
                            </div>
                            <pre className="p-4 overflow-x-auto"><code className={`language-${language}`}>{code}</code></pre>
                        </div>
                    );
                }
                return <p key={index} className="whitespace-pre-wrap">{part}</p>;
            })}
        </div>
    );
  };
  
  return (
    <div className="w-full lg:w-2/3 bg-gray-800 rounded-lg shadow-md p-6">
      <div className="h-full min-h-[60vh] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default OutputPanel;
