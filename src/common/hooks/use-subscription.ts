import { useEffect } from 'react';
import { Observable } from 'rxjs';

export const useSubscription = <T>(observable: Observable<T>, callback: (value: T) => void) => {
    useEffect(() => {
        const sub = observable.subscribe(callback);
        return () => sub.unsubscribe();
    }, []);
};
