import React from 'react';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { CodeEditor, MultilineEditor } from './Editor';
import { useCanvas } from '../../context/CanvasContext';

const CanvasEditor: React.FC = () => {
    const { selectedCanvas, updateCanvas } = useCanvas();

    if (!selectedCanvas) {
        return <Text>Select a canvas to edit</Text>;
    }

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="1" h="full">
            <GridItem colSpan={1}>
                <Grid templateRows="repeat(3, 1fr)" h="full" gap="1">
                    <Box bg="white" rounded="md" boxShadow="sm">
                        <Box px="4" py="2" borderBottom="1px" borderColor="gray.200">
                            <Text fontWeight="medium" fontSize="sm" color="gray.600">Constraints</Text>
                        </Box>
                        <MultilineEditor
                            value={selectedCanvas.constraints}
                            onChange={(e) => updateCanvas('constraints', e.target.value)}
                            placeholder="Enter constraints..."
                        />
                    </Box>
                    <Box bg="white" rounded="md" boxShadow="sm">
                        <Box px="4" py="2" borderBottom="1px" borderColor="gray.200">
                            <Text fontWeight="medium" fontSize="sm" color="gray.600">Ideas</Text>
                        </Box>
                        <MultilineEditor
                            value={selectedCanvas.ideas}
                            onChange={(e) => updateCanvas('ideas', e.target.value)}
                            placeholder="Enter ideas..."
                        />
                    </Box>
                    <Box bg="white" rounded="md" boxShadow="sm">
                        <Box px="4" py="2" borderBottom="1px" borderColor="gray.200">
                            <Text fontWeight="medium" fontSize="sm" color="gray.600">Test Cases</Text>
                        </Box>
                        <MultilineEditor
                            value={selectedCanvas.test_cases}
                            onChange={(e) => updateCanvas('test_cases', e.target.value)}
                            placeholder="Enter test cases..."
                        />
                    </Box>
                </Grid>
            </GridItem>
            <GridItem colSpan={2}>
                <Box px="4" py="2" borderBottom="1px" borderColor="gray.700" bg="gray.900" rounded="md" boxShadow="sm">
                    <Text fontWeight="medium" fontSize="sm" color="gray.400">Code</Text>
                </Box>
                <CodeEditor
                    value={selectedCanvas.code}
                    onChange={(e) => updateCanvas('code', e.target.value)}
                />
            </GridItem>
        </Grid>
    );
};

export default CanvasEditor;