import React, { useState, useCallback } from 'react';
import { TaskType } from './types';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import OutputPanel from './components/OutputPanel';
import { generateContent } from './services/geminiService';

const App: React.FC = () => {
  const [taskType, setTaskType] = useState<TaskType>(TaskType.DATA_PREPROCESSING_AND_TRAINING);
  const [userInput, setUserInput] = useState<string>('Preprocess the attached customer churn dataset. Handle missing values, encode categorical variables, and scale numerical features. Then, train a logistic regression model to predict churn and evaluate its accuracy. Present the entire process as a LaTeX report, including the Python code for each step.');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a query or topic.');
      return;
    }
     if (taskType === TaskType.DATA_PREPROCESSING_AND_TRAINING && !fileContent) {
        setError('Please upload a dataset for this task.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const responseText = await generateContent(taskType, userInput, fileContent);
      setOutput(responseText);
    } catch (err) {
      setError('An error occurred while communicating with the AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [taskType, userInput, fileContent]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row p-4 md:p-6 lg:p-8 gap-6 max-w-screen-2xl mx-auto w-full">
        <ControlPanel
          taskType={taskType}
          setTaskType={setTaskType}
          userInput={userInput}
          setUserInput={setUserInput}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
          handleFileChange={handleFileChange}
          fileName={fileName}
        />
        <OutputPanel
          output={output}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;