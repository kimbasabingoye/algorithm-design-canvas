import { Box, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';
import { CanvasList } from './CanvasList';
import { CanvasPublic } from '../../client/models';

interface SidebarProps {
    isOpen: boolean;
    canvases: CanvasPublic[];
    onSelectCanvas: (canvas: CanvasPublic) => void;
}

export const Sidebar = ({ isOpen, canvases, onSelectCanvas }: SidebarProps) => {
    if (!isOpen) return null;

    return (
        <Box w="72">
            <Card>
                <CardHeader>
                    <Heading size="md">My Canvases</Heading>
                </CardHeader>
                <CardBody maxH="70vh" overflowY="auto">
                    <CanvasList canvases={canvases} onSelectCanvas={onSelectCanvas} />
                </CardBody>
            </Card>
        </Box>
    );
};