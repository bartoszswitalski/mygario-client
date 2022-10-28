export enum WidgetFeatures {
    Transform,
    ZIndex,
    Pellet,
}

export interface RenderableFeature {
    render(): void;
}
