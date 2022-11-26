export interface Camera {
    setPosition(x: number, y: number, scale: number): void;

    getPosition(): { x: number; y: number };
}
