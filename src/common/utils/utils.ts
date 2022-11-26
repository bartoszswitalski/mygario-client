export const switchCase =
    <T>(cases: { [valueCase: string | number]: T }) =>
    (value: string | number) => {
        return cases.hasOwnProperty(value) ? cases[value] : cases['default'];
    };

export const clamp =
    (min: number, max: number): ((arg: number) => number) =>
    (value: number): number =>
        Math.min(Math.max(value, min), max);
