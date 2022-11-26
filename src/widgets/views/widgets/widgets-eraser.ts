import { useEffect } from 'react';
import { takeUntil } from 'rxjs';
import { useInjection } from 'src/infrastructure/injection/use-injection';
import type { PixiCanvasApplication } from 'src/pixi/models';
import { PIXI_APP } from 'src/pixi/models';
import { WIDGETS_STORAGE_STATE, WidgetsStorageState } from 'src/widgets/states';

export const useWidgetsEraser = (): void => {
    const widgetsStorageState = useInjection<WidgetsStorageState>(WIDGETS_STORAGE_STATE);
    const pixiApp = useInjection<PixiCanvasApplication>(PIXI_APP);

    useEffect(() => {
        _observeWidgetRemoved();
    }, []);

    const _observeWidgetRemoved = (): void => {
        widgetsStorageState
            .removedWidget$()
            .pipe(takeUntil(widgetsStorageState.widgetsDisposed$()))
            .subscribe((widget) => {
                pixiApp.mainContainer.removeChildren();
                widget.destroy();
            });
    };
};
