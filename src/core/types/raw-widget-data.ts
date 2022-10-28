export type RawPelletData = {
    x: number;
    y: number;
    scale: number;
    size: number;
    color: number;
    zIndex: number;
};

type TypeWidgetData = {
    type: string;
};

export type RawWidgetData = TypeWidgetData & RawPelletData;
