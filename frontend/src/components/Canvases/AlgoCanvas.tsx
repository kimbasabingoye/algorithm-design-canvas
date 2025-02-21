import { useState, useEffect } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { Header } from '../Common/Header/Header';
import { Sidebar } from './Sidebar';
import { CanvasForm } from './CanvasForm';
import { LoginDialog } from './LoginDialog';
import AddCanvas  from './AddCanvas';
import { CanvasPublic } from '../../client/models';

const API_BASE_URL = 'http://localhost:8000/api/v1/';

const emptyCanvas: CanvasPublic = {
    problem_name: '',
    problem_url: '',
    constraints: '',
    ideas: '',
    test_cases: '',
    code: ''
};

export const AlgoCanvas = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { isOpen: isLoginOpen, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
    const { isOpen: isNewCanvasOpen, onOpen: onOpenNewCanvas, onClose: onCloseNewCanvas } = useDisclosure();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [canvases, setCanvases] = useState<CanvasPublic[]>([]);
    const [currentCanvas, setCurrentCanvas] = useState<CanvasPublic>(emptyCanvas);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const formData = new URLSearchParams();
            formData.append('grant_type', 'password');
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(`${API_BASE_URL}login/access-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            });
            const data = await response.json();

            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                onCloseLogin();
                fetchCanvases();
            }
        } catch (error) {
            console.error('Login Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCanvases = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}canvases`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setCanvases(data.data);
            }
        } catch (error) {
            console.error('Error fetching canvases:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveCanvas = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            onOpenLogin();
            return;
        }

        setIsLoading(true);
        try {
            await fetch(`${API_BASE_URL}canvases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(currentCanvas)
            });
            fetchCanvases();
        } catch (error) {
            console.error('Error saving canvas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const createNewCanvas = () => {
        setCurrentCanvas(emptyCanvas);
        onCloseNewCanvas();
    };

    useEffect(() => {
        fetchCanvases();
    }, []);

    return (
        <Box minH="100vh">
            <Header
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                onNewCanvas={onOpenNewCanvas}
                onOpenLogin={onOpenLogin}
            />

            <Box maxW="7xl" mx="auto" px={6} py={8}>
                <Flex gap={8}>
                    <Sidebar
                        isOpen={isSidebarOpen}
                        canvases={canvases}
                        onSelectCanvas={setCurrentCanvas}
                    />

                    <Box flex={1}>
                        <CanvasForm
                            canvas={currentCanvas}
                            onChange={setCurrentCanvas}
                            onSave={saveCanvas}
                            isLoading={isLoading}
                        />
                    </Box>
                </Flex>
            </Box>

            <LoginDialog
                isOpen={isLoginOpen}
                onClose={onCloseLogin}
                onLogin={handleLogin}
                username={username}
                password={password}
                onUsernameChange={setUsername}
                onPasswordChange={setPassword}
                isLoading={isLoading}
            />

            <AddCanvas
                isOpen={isNewCanvasOpen}
                onClose={onCloseNewCanvas}
                onCreate={createNewCanvas}
                canvas={currentCanvas}
                onChange={setCurrentCanvas}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default AlgoCanvas;