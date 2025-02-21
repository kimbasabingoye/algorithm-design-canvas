import { VStack, Button } from '@chakra-ui/react';
import { CanvasPublic } from '../../client/models';

interface CanvasListProps {
    canvases: CanvasPublic[];
    onSelectCanvas: (canvas: CanvasPublic) => void;
}

export const CanvasList = ({ canvases, onSelectCanvas }: CanvasListProps) => {
    return (
        <VStack spacing={2} align="stretch">
            {canvases.map((canvas, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    justifyContent="flex-start"
                    onClick={() => onSelectCanvas(canvas)}
                >
                    {canvas.problem_name || 'Untitled Canvas'}
                </Button>
            ))}
        </VStack>
    );
};