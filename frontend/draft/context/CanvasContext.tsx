import React, { createContext, useContext, useState } from 'react';
import { CanvasPublic as Canvas } from '../client/models';
import { emptyCanvas } from '../types';

interface CanvasContextProps {
    canvases: Canvas[];
    selectedCanvas: Canvas | null;
    setSelectedCanvas: (canvas: Canvas | null) => void;
    addCanvas: () => void;
    updateCanvas: (section: keyof Canvas, value: string) => void;
}

const CanvasContext = createContext<CanvasContextProps | undefined>(undefined);

export const CanvasProvider: React.FC = ({ children }) => {
    const [canvases, setCanvases] = useState<Canvas[]>([]);
    const [selectedCanvas, setSelectedCanvas] = useState<Canvas | null>(null);

    const addCanvas = () => {
        const newCanvas: Canvas = {
            ...emptyCanvas,
            id: `${canvases.length + 1}`,
            problem_name: 'New Canvas'
        };
        setCanvases([...canvases, newCanvas]);
        setSelectedCanvas(newCanvas);
    };

    const updateCanvas = (section: keyof Canvas, value: string) => {
        if (selectedCanvas) {
            const updatedCanvas = { ...selectedCanvas, [section]: value };
            setSelectedCanvas(updatedCanvas);
            setCanvases(canvases.map(canvas => (canvas.id === updatedCanvas.id ? updatedCanvas : canvas)));
        }
    };

    return (
        <CanvasContext.Provider value={{ canvases, selectedCanvas, setSelectedCanvas, addCanvas, updateCanvas }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error('useCanvas must be used within a CanvasProvider');
    }
    return context;
};