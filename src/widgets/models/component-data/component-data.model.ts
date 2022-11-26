import { uuid } from 'src/core/types/uuid';

export enum WidgetComponentData {
    Transform,
    Size,
    ZIndex,
    Color,
}

export type TransformComponentData = {
    x: number;
    y: number;
    scale: number;
};

export type SizeComponentData = {
    size: number;
};

export type ZIndexComponentData = {
    zIndex: number;
};

export type ColorComponentData = {
    color: number;
};

export type ComponentData = {
    [WidgetComponentData.Transform]: { [widgetId: uuid]: TransformComponentData };
    [WidgetComponentData.Size]: { [widgetId: uuid]: SizeComponentData };
    [WidgetComponentData.ZIndex]: { [widgetId: uuid]: ZIndexComponentData };
    [WidgetComponentData.Color]: { [widgetId: uuid]: ColorComponentData };
};

export const componentDataInitialValue: ComponentData = {
    [WidgetComponentData.Transform]: {},
    [WidgetComponentData.Size]: {},
    [WidgetComponentData.ZIndex]: {},
    [WidgetComponentData.Color]: {},
};
