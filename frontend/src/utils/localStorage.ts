import { CanvasPublic as Canvas } from "../client";

const CANVAS_STORAGE_KEY = 'canvases';

export const saveCanvasesToLocalStorage = (canvases: Canvas[]) => {
  localStorage.setItem(CANVAS_STORAGE_KEY, JSON.stringify(canvases));
};

export const loadCanvasesFromLocalStorage = (): Canvas[] => {
  const canvases = localStorage.getItem(CANVAS_STORAGE_KEY);
  return canvases ? JSON.parse(canvases) : [];
};