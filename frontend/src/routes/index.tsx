import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, ChevronRight } from 'lucide-react';
import { Box, Button, Flex, Collapsible, Heading, Link, LuExternalLink, Text, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { CodeEditor, MultilineEditor } from '../components/Canvases/Editor';
import { Header } from '../components/Common/Header';

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CanvasesService } from "../../client"
import { z } from "zod"
import { CanvasPublic } from '../client';

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

  const onNewCanvas = () => {
    // Logic to add a new canvas
    const newCanvas: Canvas = {
      id: `${canvasList.length + 1}`,
      problem_name: 'New Canvas',
      problem_url: '',
      constraints: '',
      ideas: '',
      test_cases: '',
      code: ''
    };
    canvasList.push(newCanvas);
    setSelectedCanvas(newCanvas);
    setContent(newCanvas);
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Box
          w={isSidebarOpen ? '16rem' : '0'}
          transition="width 0.3s"
          bg="white"
          borderRight="1px"
          borderColor="gray.200"
          position="relative"
          overflow="hidden"
          boxShadow="lg"
        >
          <Box p="4" display={isSidebarOpen ? 'block' : 'none'}>
            <Heading size="lg" mb="6">Canvases</Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              variant="solid"
              mb="6"
              onClick={onNewCanvas}
              width="full"
            >
              New Canvas
            </Button>
            <VStack spacing="3" align="stretch">
              {canvasList.map((canvas) => (
                <Box
                  key={canvas.id}
                  px="3"
                  py="2"
                  rounded="md"
                  cursor="pointer"
                  fontSize="sm"
                  bg={selectedCanvas?.id === canvas.id ? 'blue.50' : 'transparent'}
                  color={selectedCanvas?.id === canvas.id ? 'blue.600' : 'inherit'}
                  _hover={{ bg: 'gray.100' }}
                  onClick={() => {
                    setSelectedCanvas(canvas);
                    setContent(canvas);
                  }}
                  boxShadow="sm"
                >
                  {canvas.problem_name}
                </Box>
              ))}
            </VStack>
          </Box>
          <Button
            onClick={() => setSidebarOpen(false)}
            position="absolute"
            right="0"
            top="2"
            transform="translateX(100%)"
            bg="white"
            p="2"
            roundedRight="md"
            border="1px"
            borderColor="gray.200"
            borderLeft="0"
          >
            <ChevronRight />
          </Button>
        </Box>

        {/* Main content */}
        <div className="flex-1">
          {/* Problem Name Link */}
          <div>
            <Flex justify="space-between" align="center" bg="white" px="4" py="2" borderBottom="1px" borderColor="gray.200">
              <Text fontWeight="medium" fontSize="lg" color="gray.600">The Algorithm Design Canvas</Text>
              <Link href={selectedCanvas?.problem_url} isExternal color="blue.600">
                {selectedCanvas?.problem_name || 'Problem Name'}
              </Link>
            </Flex>
          </div>

          {!isSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute left-0 top-2 bg-white p-2 rounded-r border border-l-0 border-gray-200"
            >
              <Menu size={16} />
            </button>
          )}

          {/* Grid Layout */}
          <div className="grid grid-cols-3 h-full">
            {/* First column taking 1/3 of space */}
            <div className="col-span-1">
              <div className="grid grid-rows-3 h-full gap-1">
                {/* Constraints section */}
                <div className="bg-white">
                  <div className="px-4 py-2 border border-gray-700">
                    <h5 className="font-medium text-sm text-gray-600">Constraints</h5>
                  </div>
                  <MultilineEditor
                    value={content.constraints}
                    onChange={(e) => handleChange('constraints', e.target.value)}
                    placeholder="Enter constraints..."
                  />
                </div>

                {/* Ideas section */}
                <div className="bg-white">
                  <div className="px-4 py-2 border border-gray-700">
                    <h5 className="font-medium text-sm text-gray-600">Ideas</h5>
                  </div>
                  <MultilineEditor
                    value={content.ideas}
                    onChange={(e) => handleChange('ideas', e.target.value)}
                    placeholder="Enter ideas..."
                  />
                </div>

                {/* Test Cases section */}
                <div className="bg-white">
                  <div className="px-4 py-2 border border-gray-700">
                    <h5 className="font-medium text-sm text-gray-600">Test Cases</h5>
                  </div>
                  <MultilineEditor
                    value={content.test_cases}
                    onChange={(e) => handleChange('test_cases', e.target.value)}
                    placeholder="Enter test cases..."
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