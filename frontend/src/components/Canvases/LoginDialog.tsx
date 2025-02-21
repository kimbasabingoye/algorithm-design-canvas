import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    VStack,
    Input,
    Button,
} from '@chakra-ui/react';

interface LoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
    username: string;
    password: string;
    onUsernameChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    isLoading: boolean;
}

export const LoginDialog = ({
    isOpen,
    onClose,
    onLogin,
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    isLoading,
}: LoginDialogProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Login to AlgoCanvas</ModalHeader>
                <ModalBody>
                    <VStack spacing={4} py={4}>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => onUsernameChange(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                        />
                        <Button
                            w="full"
                            onClick={onLogin}
                            isLoading={isLoading}
                        >
                            Login
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};