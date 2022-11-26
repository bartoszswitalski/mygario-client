export enum WidgetFeature {
    Transform,
    ZIndex,
    Pellet,
}

export interface RenderableFeature {
    render(): void;
}
