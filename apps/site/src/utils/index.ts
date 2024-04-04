export const keys = <T extends Record<string, unknown>>(obj: T) =>
	Object.keys(obj) as (keyof typeof obj)[];

// eslint-disable-next-line @typescript-eslint/ban-types
export type Pretty<T> = { [K in keyof T]: T[K] } & {};
