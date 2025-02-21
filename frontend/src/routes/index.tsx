import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, ChevronRight } from 'lucide-react';

import { CodeEditor, MultilineEditor } from '../components/Canvases/Editor';
import { Header } from '../components/Common/Header/Header';

export const Route = createFileRoute('/')({
  component: () => <ProblemSolvingGrid />
});

interface Canvas {
  id: string;
  problem_name: string;
  problem_url: string;
  constraints: string;
  ideas: string;
  test_cases: string;
  code: string;
}

// Sample data
const canvasList: Canvas[] = [
  {
    id: '1',
    problem_name: 'Two Sum',
    problem_url: 'https://leetcode.com/problems/two-sum/',
    constraints: '- Array length between 2 and 104\n- Numbers between -109 and 109\n- Exactly one solution exists',
    ideas: '1. Use a hash map to store complements\n2. Single pass solution possible\n3. Handle edge cases with same numbers',
    test_cases: 'nums = [2,7,11,15], target = 9\nnums = [3,2,4], target = 6\nnums = [3,3], target = 6',
    code: 'def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i\n    return []'
  },
  {
    id: '2',
    problem_name: 'Valid Parentheses',
    problem_url: 'https://leetcode.com/problems/valid-parentheses/',
    constraints: '- String length between 1 and 104\n- Contains only (){}[]',
    ideas: '1. Use stack to track opening brackets\n2. Map closing to opening brackets\n3. Early return on invalid cases',
    test_cases: 's = "()"\ns = "()[]{}"\ns = "(]"',
    code: 'def isValid(s):\n    stack = []\n    pairs = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in pairs:\n            if not stack or stack[-1] != pairs[char]:\n                return False\n            stack.pop()\n        else:\n            stack.append(char)\n    return len(stack) == 0'
  }
];

const emptyCanvas: Canvas = {
  id: '',
  problem_name: '',
  problem_url: '',
  constraints: '',
  ideas: '',
  test_cases: '',
  code: ''
};

const ProblemSolvingGrid = () => {
  const [content, setContent] = useState(emptyCanvas);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCanvas, setSelectedCanvas] = useState<Canvas | null>(null);

  const handleChange = (section: keyof Canvas, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: value
    }));
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 relative`}>
          <div className="p-4">
            <h2 className="text-xl font-medium mb-4">Canvases</h2>
            <div className="space-y-1">
              {canvasList.map((canvas) => (
                <div
                  key={canvas.id}
                  className={`px-3 py-2 rounded-sm cursor-pointer text-sm ${selectedCanvas?.id === canvas.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                    }`}
                  onClick={() => {
                    setSelectedCanvas(canvas);
                    setContent(canvas);
                  }}
                >
                  {canvas.problem_name}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-0 top-2 translate-x-full bg-white p-2 rounded-r border border-l-0 border-gray-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {!isSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute left-0 top-2 bg-white p-2 rounded-r border border-l-0 border-gray-200"
            >
              <Menu size={16} />
            </button>
          )}

          {/* Grid Layout */}
          <div className="grid grid-cols-3 gap-1 h-full">
            {/* First column taking 1/3 of space */}
            <div className="col-span-1">
              <div className="grid grid-rows-3 h-full gap-1">
                {/* Constraints section */}
                <div className="bg-white">
                  <div className="px-4 py-2 border-b">
                    <h5 className="font-medium text-sm text-gray-600">Constraints</h5>
                  </div>
                  <MultilineEditor
                    value={content.constraints}
                    onChange={(e) => handleChange('constraints', e.target.value)}
                    placeholder="Enter constraints..."
                  />
                </div>

                {/* Test Cases section */}
                <div className="bg-white">
                  <div className="px-4 py-2 border-b">
                    <h5 className="font-medium text-sm text-gray-600">Test Cases</h5>
                  </div>
                  <MultilineEditor
                    value={content.test_cases}
                    onChange={(e) => handleChange('test_cases', e.target.value)}
                    placeholder="Enter test cases..."
                  />
                </div>

                {/* Ideas section */}
                <div className="bg-white">
                  <div className="px-4 py-2 border-b">
                    <h5 className="font-medium text-sm text-gray-600">Ideas</h5>
                  </div>
                  <MultilineEditor
                    value={content.ideas}
                    onChange={(e) => handleChange('ideas', e.target.value)}
                    placeholder="Enter ideas..."
                  />
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="col-span-2">
              <div className="px-4 py-2 border-b border-gray-700 bg-gray-900">
                <h5 className="font-medium text-sm text-gray-400">Code</h5>
              </div>
              <CodeEditor
                value={content.code}
                onChange={(e) => handleChange('code', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};