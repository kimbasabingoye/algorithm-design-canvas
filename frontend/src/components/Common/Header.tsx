import {
    Flex,
    IconButton,
    Button,
    Link,
    Heading,
    useColorMode,
} from '@chakra-ui/react'

import {
    MoonIcon,
    SunIcon,
} from '@chakra-ui/icons'

export const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="ghost"
        />
    );
};

export const Header = () => {
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
                <Link href='/' _hover={{ textDecoration: 'none' }}>
                    <Heading size="lg" color="blue.500">AlgoDesignCanvas</Heading>
                </Link>
            </Flex>
            <Flex gap={2}>
                <ColorModeToggle />
                <Button variant="outline">
                    Login
                </Button>
                <Button variant="outline">
                    Sign up
                </Button>
            </Flex>
        </Flex>
    );
};