export const maybeArr = <T>(val: T | T[]) => (Array.isArray(val) ? val : [val])

export const maybeArg = <A, R>(fn: (arg: A) => R, arg?: A) => (arg ? fn(arg) : undefined)

export type Arrayable<T> = T | T[]

export type ArrayElement<T> = T extends Array<infer U> ? U : never

export const noopFn = (...args: any[]): any => ({})

export type Replace<T, U> = Omit<T, keyof U> & U
