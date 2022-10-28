export class InjectionToken {
    constructor(public readonly value: string) {
        if (!/^[a-zA-Z-_]+$/g.test(value)) {
            throw new Error('Invalid injection token value');
        }
    }
}
