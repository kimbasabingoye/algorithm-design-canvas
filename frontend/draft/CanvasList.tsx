import React from 'react';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useCanvas } from '../context/CanvasContext';

const CanvasList: React.FC = () => {
  const { canvases, selectedCanvas, setSelectedCanvas, addCanvas } = useCanvas();

  return (
    <Box p="4">
      <Heading size="lg" mb="6">Canvases</Heading>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        variant="solid"
        mb="6"
        onClick={addCanvas}
        width="full"
      >
        New Canvas
      </Button>
      <VStack spacing="3" align="stretch">
        {canvases.map((canvas) => (
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
            onClick={() => setSelectedCanvas(canvas)}
            boxShadow="sm"
          >
            {canvas.problem_name}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CanvasList;