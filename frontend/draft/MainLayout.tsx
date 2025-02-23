import React from 'react';
import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Menu, ChevronRight } from 'lucide-react';
import { Header } from '../Common/Header';
import CanvasList from './CanvasList';
import CanvasEditor from './CanvasEditor';
import { useCanvas } from '../../context/CanvasContext';

const MainLayout: React.FC = () => {
    const { isSidebarOpen, setSidebarOpen, selectedCanvas } = useCanvas();

    return (
        <>
            <Header />
            <Flex h="100vh" bg="gray.50">
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
                    <CanvasList />
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
                <Box flex="1" position="relative">
                    {!isSidebarOpen && (
                        <Button
                            onClick={() => setSidebarOpen(true)}
                            position="absolute"
                            left="0"
                            top="2"
                            bg="white"
                            p="2"
                            roundedRight="md"
                            border="1px"
                            borderColor="gray.200"
                            borderLeft="0"
                        >
                            <Menu size={16} />
                        </Button>
                    )}
                    <Box>
                        <Flex justify="space-between" align="center" bg="white" px="4" py="2" borderBottom="1px" borderColor="gray.200">
                            <Text fontWeight="medium" fontSize="lg" color="gray.600">The Algorithm Design Canvas</Text>
                            <Link href={selectedCanvas?.problem_url} isExternal color="blue.600">
                                {selectedCanvas?.problem_name || 'Problem Name'}
                            </Link>
                        </Flex>
                    </Box>
                    <CanvasEditor />
                </Box>
            </Flex>
        </>
    );
};

export default MainLayout;