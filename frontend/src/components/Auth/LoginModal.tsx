import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react";
import { LoginForm } from "./LoginForm";

export const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log In</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <LoginForm onClose={onClose} />
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};