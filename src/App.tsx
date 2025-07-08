import React, { useState, useEffect, useRef } from 'react';
// Import Chart.js
import { Chart as ChartJS } from 'chart.js/auto'; // Import ChartJS type and TooltipItem for type hinting
import type { TooltipItem } from 'chart.js';

// Define the color palette for consistent use
const colors = {
  primaryBg: '#FDFDFB', // Very light, warm off-white
  secondaryBg: '#FFFFFF', // Pure white for cards/panels
  tertiaryBg: '#F5F5F5', // Light gray for input/output backgrounds
  textColor: '#1a1a1a',
  lightTextColor: '#6b7280', // Tailwind gray-500
  accentColor: '#C0846E', // Muted terracotta/rust accent
  borderColor: '#EAEAEA', // Light border for elements
};

// Define types for props and state
interface InputSectionProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface OutputSectionProps {
  output: string;
}

// Input Section Component
const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmitClick = async (): Promise<void> => {
    if (input.trim()) {
      onSubmit(input);
      setInput(''); // Clear input after submission
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) { // Submit on Enter, but allow Shift+Enter for new line
      e.preventDefault();
      handleSubmitClick();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Query</h2>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-color resize-y bg-gray-50 text-gray-800 placeholder-gray-400"
        rows={5}
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your query or command for the AGI..."
        disabled={isLoading}
      />
      <div className="flex justify-end mt-4 space-x-3">
        <button
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors duration-200 shadow-sm"
          onClick={() => setInput('')}
          disabled={isLoading}
        >
          Clear
        </button>
        <button
          className={`${colors.accentColor.replace('#', 'bg-')} text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity duration-300 shadow-md flex items-center justify-center`}
          onClick={handleSubmitClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Submit to AGI'
          )}
        </button>
      </div>
    </div>
  );
};

// Knowledge Graph Component (Conceptual Visualization)
const KnowledgeGraph: React.FC = () => {
  // Static conceptual nodes for demonstration
  const nodes = [
    { id: 'A', label: 'Core Concepts', color: '#60A5FA' }, // Blue
    { id: 'B', label: 'Data Streams', color: '#34D399' }, // Green
    { id: 'C', label: 'Decision Models', color: '#FCD34D' }, // Yellow
    { id: 'D', label: 'External Interfaces', color: '#FB923C' }, // Orange
    { id: 'E', label: 'Emergent Behaviors', color: '#A78BFA' }, // Purple
  ];

  /*const edges = [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'A' },
    { from: 'C', to: 'D' },
    { from: 'D', to: 'E' },
    { from: 'A', to: 'E' },
  ];*/

  return (
    <div className="bg-white min-h-[600px] p-6 rounded-lg shadow-md border border-gray-100 h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Knowledge Graph</h2>
      <p className="text-sm text-gray-500 mb-4">Visualizing the interconnected web of information within the AGI's understanding.</p>
      <div className="flex-grow relative bg-gray-50 rounded-md p-4 overflow-hidden flex items-center justify-center">
        {/* Simple conceptual graph layout using absolute positioning for nodes */}
        {nodes.map(node => (
          <div
            key={node.id}
            className="absolute p-2 rounded-full text-xs font-medium text-white shadow-md flex items-center justify-center"
            style={{
              backgroundColor: node.color,
              width: `${node.label.length * 8 + 30}px`, // Dynamic width based on label length
              height: '40px',
              top: `${Math.random() * 80 + 10}%`, // Random positions for visual variety
              left: `${Math.random() * 80 + 10}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            {node.label}
          </div>
        ))}
        {/* Conceptual lines for edges - purely visual, not dynamic */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute w-px h-1/2 bg-gray-400 transform rotate-45 top-1/4 left-1/4"></div>
          <div className="absolute w-px h-1/2 bg-gray-400 transform -rotate-45 top-1/4 right-1/4"></div>
          <div className="absolute w-px h-1/2 bg-gray-400 transform rotate-90 top-1/2 left-1/2"></div>
        </div>
        <p className="text-gray-400 italic text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">Conceptual Visualization</p>
      </div>
    </div>
  );
};

// Task Manager Component
const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Analyze input query', completed: true },
    { id: 2, text: 'Retrieve relevant data', completed: false },
    { id: 3, text: 'Formulate initial response', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    // Calculate conceptual processing load
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const processingLoad = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const data = {
      labels: ['Processing Load'],
      datasets: [
        {
          label: 'Current Load',
          data: [processingLoad],
          backgroundColor: [colors.accentColor],
          borderColor: [colors.accentColor],
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false, // Crucial for responsiveness within container
      indexAxis: 'y' as const, // Horizontal bar chart, 'as const' for Chart.js type safety
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Percentage (%)',
            color: colors.lightTextColor,
          },
          ticks: {
            color: colors.lightTextColor,
          },
          grid: {
            color: colors.borderColor,
          },
        },
        y: {
          ticks: {
            color: colors.lightTextColor,
          },
          grid: {
            color: colors.borderColor,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context: TooltipItem<'bar'>) { // Explicitly type context as TooltipItem<'bar'>
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              // Ensure context.parsed exists and has an x property
              if (context.parsed && typeof context.parsed.x === 'number') {
                label += context.parsed.x + '%';
              }
              return label;
            }
          }
        }
      },
    };

    if (chartInstance.current) {
      chartInstance.current.data = data;
      chartInstance.current.update();
    } else {
      if (chartRef.current) {
        chartInstance.current = new ChartJS(chartRef.current, { // Use ChartJS for type safety
          type: 'bar',
          data: data,
          options: options,
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [tasks]); // Re-render chart when tasks change

  const handleTaskToggle = (id: number): void => {
    setTasks(tasks.map((task: Task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (): void => {
    if (newTaskText.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTaskText.trim(), completed: false }]);
      setNewTaskText('');
    }
  };

  const handleClearCompleted = (): void => {
    setTasks(tasks.filter((task: Task) => !task.completed));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Task Manager</h2>
      <p className="text-sm text-gray-500 mb-4">Monitoring the AGI's internal processing tasks.</p>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Current Tasks</h3>
        <ul className="bg-gray-50 p-4 rounded-md border border-gray-200 max-h-48 overflow-y-auto">
          {tasks.length > 0 ? (
            tasks.map((task: Task) => (
              <li key={task.id} className="flex items-center mb-2 last:mb-0">
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onChange={() => handleTaskToggle(task.id)}
                  className="mr-3 h-4 w-4 text-accent-color rounded focus:ring-accent-color border-gray-300 cursor-pointer"
                />
                <label htmlFor={`task-${task.id}`} className={`text-gray-700 ${task.completed ? 'line-through text-gray-500' : ''} flex-grow`}>
                  {task.text}
                </label>
              </li>
            ))
          ) : (
            <p className="text-gray-400 italic">No tasks currently.</p>
          )}
        </ul>
        <div className="flex mt-3">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent-color bg-gray-50 text-gray-800 placeholder-gray-400"
            placeholder="Add new task..."
            value={newTaskText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskText(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            className={`${colors.accentColor.replace('#', 'bg-')} text-white px-4 py-2 rounded-r-md font-medium hover:opacity-90 transition-opacity duration-300 shadow-sm`}
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
        <button
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition-colors duration-200 shadow-sm text-sm"
          onClick={handleClearCompleted}
        >
          Clear Completed Tasks
        </button>
      </div>

      <div className="mt-auto"> {/* Push to bottom */}
        <h3 className="text-lg font-medium mb-2 text-gray-700">Processing Load</h3>
        <div className="chart-container w-full max-w-xl mx-auto h-24 md:h-32 max-h-[150px] relative">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

// Output Section Component
const OutputSection: React.FC<OutputSectionProps> = ({ output }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">AGI Output</h2>
      <div className="bg-gray-50 p-4 rounded-md min-h-[150px] border border-gray-200 overflow-y-auto text-gray-700 leading-relaxed">
        {output ? (
          <p className="content-fade-in whitespace-pre-wrap">{output}</p>
        ) : (
          <p className="text-gray-400 italic">AGI response will appear here after submission.</p>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (input: string): Promise<void> => {
    setIsLoading(true);
    setOutput(''); // Clear previous output

    try {
      // For production
      const res = await fetch("https://scomaton-backend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: input, max_tokens: 1000, tag: "brain_interface" })
      });

      // For development
      /*
      const res = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt: input, max_tokens: 1000, tag: "brain_interface" })
      })
      */

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        setOutput("Error: Invalid response format.");
        console.warn("Raw response:", text);
        setIsLoading(false);
        return;
      }

      setOutput(data.response || "No valid reply field.");
    } catch (err) {
      setOutput("Error: Unable to reach the assistant.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[${colors.primaryBg}] text-[${colors.textColor}] font-inter antialiased py-8`}>
      {/* Custom styles for the component, typically in a separate CSS file in a React project */}
      <style>{`
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .accent-color {
            color: ${colors.accentColor};
        }
        .bg-accent-color {
            background-color: ${colors.accentColor};
        }
        .focus\\:ring-accent-color:focus {
            --tw-ring-color: ${colors.accentColor};
        }
        .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            border-color: ${colors.borderColor};
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            border-color: ${colors.accentColor};
        }
        .card.active {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(192, 132, 110, 0.2);
            border-color: ${colors.accentColor};
        }
        .content-fade-in {
            animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px; /* Max width for chart container */
            margin-left: auto;
            margin-right: auto;
            height: 100px; /* Base height, adjust with media queries or use Tailwind for responsive heights */
            max-height: 150px; /* Max height for chart container */
        }
        @media (min-width: 768px) { /* Medium screens and up */
            .chart-container {
                height: 120px;
            }
        }
        @media (min-width: 1024px) { /* Large screens and up */
            .chart-container {
                height: 150px;
            }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900 tracking-tight">AGI Brain Interface</h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Explore and interact with the interface for the Advanced General Intelligence,
          visualizing its input, processing, knowledge, and task management.
        </p>


        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8">

          {/* Left Column: Input and Output */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            <InputSection onSubmit={handleSubmit} isLoading={isLoading} />
            <OutputSection output={output} />
            <div className='ml-4 mb-8 mt-7 font-light text-gray-600'>
              <h2 className='font-bold text-center text-2xl'>Info</h2>
              <br />
              <p>The AGI Brain represents an advanced artificial general intelligence system, designed to execute complex logical operations simultaneously through robust asynchronous functionality. Engineered primarily in Python, its comprehensive knowledge base is currently managed by ChromaDB, with a strategic transition to Supabase planned for enhanced scalability and dynamic evolution. This architecture features distinct logical partitions, allowing for independent task routing across diverse subjects. The system is structured into three specialized modules: a forward-focused communication segment for human interaction, a powerful core module for intricate reasoning, automation, and integrated tool use, and a dedicated 'suites' module for specialized functions like coding, research, and skill creation. This design fundamentally optimizes the Brain for rapid advancements in AI reasoning capabilities.</p>
            <a href='https://github.com/PokePiece/AGI-Brain' target='_blank'>
              <button className='bg-blue-700 mt-5 text-white cursor-pointer active:scale-95 py-2 px-4 rounded hover:bg-blue-600'>
                View the Brain Core
              </button>
            </a>
            </div>
            
          </div>

          {/* Right Column: Knowledge Graph and Task Manager */}
          <div className="lg:col-span-1  flex flex-col gap-8">
            <KnowledgeGraph />
            <TaskManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;