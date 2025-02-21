import { Flex, Heading, Button, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, AddIcon } from '@chakra-ui/icons';
import { ColorModeToggle } from './ColorModeToggle';

interface HeaderProps {
    onToggleSidebar: () => void;
    onNewCanvas: () => void;
    onOpenLogin: () => void;
}

export const Header = ({ onToggleSidebar, onNewCanvas, onOpenLogin }: HeaderProps) => {
    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            py={4}
            px={6}
            borderBottomWidth={1}
        >
            <Flex align="center" gap={4}>
                <IconButton
                    aria-label="Toggle sidebar"
                    icon={<HamburgerIcon />}
                    variant="ghost"
                    onClick={onToggleSidebar}
                />
                <Heading size="lg" color="blue.500">AlgoCanvas</Heading>
                <Button leftIcon={<AddIcon />} variant="outline" onClick={onNewCanvas}>
                    New Canvas
                </Button>
            </Flex>
            <Flex gap={2}>
                <ColorModeToggle />
                <Button variant="outline" onClick={onOpenLogin}>
                    Login
                </Button>
            </Flex>
        </Flex>
    );
};