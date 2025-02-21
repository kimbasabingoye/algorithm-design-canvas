import { Grid, VStack, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { CanvasPublic } from '../../client/models';

interface CanvasFormProps {
    canvas: CanvasPublic;
    onChange: (canvas: CanvasPublic) => void;
    onSave: () => void;
    isLoading: boolean;
}

export const CanvasForm = ({ canvas, onChange, onSave, isLoading }: CanvasFormProps) => {
    const handleChange = (field: keyof CanvasPublic) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange({ ...canvas, [field]: e.target.value });
    };

    return (
        <VStack spacing={6}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <Input
                    placeholder="Problem name"
                    value={canvas.problem_name}
                    onChange={handleChange('problem_name')}
                />
                <Input
                    placeholder="Problem URL"
                    value={canvas.problem_url}
                    onChange={handleChange('problem_url')}
                />
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <FormControl>
                    <FormLabel>Constraints</FormLabel>
                    <Textarea
                        minH="200px"
                        value={canvas.constraints}
                        onChange={handleChange('constraints')}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Code</FormLabel>
                    <Textarea
                        minH="200px"
                        fontFamily="mono"
                        value={canvas.code}
                        onChange={handleChange('code')}
                    />
                </FormControl>
            </Grid>

            <FormControl>
                <FormLabel>Ideas</FormLabel>
                <Textarea
                    minH="150px"
                    value={canvas.ideas}
                    onChange={handleChange('ideas')}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Test Cases</FormLabel>
                <Textarea
                    minH="150px"
                    value={canvas.test_cases}
                    onChange={handleChange('test_cases')}
                />
            </FormControl>

            <Button
                w="full"
                onClick={onSave}
                isLoading={isLoading}
            >
                Save Canvas
            </Button>
        </VStack>
    );
};
