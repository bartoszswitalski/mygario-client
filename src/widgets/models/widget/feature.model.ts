export enum WidgetFeature {
    Transform,
    ZIndex,
    Pellet,
}

export interface RenderableFeature {
    render(): void;
}

export const FEATURES_FACTORY = Symbol('FEATURES_FACTORY');
