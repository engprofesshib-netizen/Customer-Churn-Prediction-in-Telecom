import React from 'react';
import { TaskType } from '../types';

interface ControlPanelProps {
  taskType: TaskType;
  setTaskType: (task: TaskType) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  handleGenerate: () => void;
  isLoading: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  taskType,
  setTaskType,
  userInput,
  setUserInput,
  handleGenerate,
  isLoading,
  handleFileChange,
  fileName,
}) => {
  const taskOptions = Object.values(TaskType);

  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-4">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col gap-6 sticky top-24">
        <div>
          <label htmlFor="task-type" className="block text-sm font-medium text-gray-300 mb-2">
            Select Assistance Type
          </label>
          <div className="relative">
            <select
              id="task-type"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as TaskType)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {taskOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        {taskType === TaskType.DATA_PREPROCESSING_AND_TRAINING && (
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
              Upload Dataset (.csv)
            </label>
            <label className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg shadow-sm tracking-wide uppercase border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white">
                <svg className="w-6 h-6 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4 4-4-4h3V9h2v2z" />
                </svg>
                <span className="text-sm leading-normal truncate">{fileName || "Select a file"}</span>
                <input type='file' id="file-upload" className="hidden" accept=".csv" onChange={handleFileChange} />
            </label>
          </div>
        )}

        <div>
          <label htmlFor="user-input" className="block text-sm font-medium text-gray-300 mb-2">
            Your Query or Topic
          </label>
          <textarea
            id="user-input"
            rows={taskType === TaskType.DATA_PREPROCESSING_AND_TRAINING ? 8 : 12}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`For example: "Draft an abstract for a customer churn prediction project using logistic regression and random forest models."`}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
            ${isLoading 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : 'Generate Assistance'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;