/* eslint-disable no-param-reassign */
export type Args = any[]
export type Property = string | number
export type Segment = [Property, Args[]]

const idSegments: Segment[] = []

const $proxy = () => ({})

export const fluentProxy = <T = any>(): T & { state: Segment[][] } => {
  const proxies: any[] = []

  return new Proxy($proxy as any, {
    get: (target, key) => {
      if (key === 'state') {
        return proxies.map(proxy => proxy.state)
      }

      if (typeof key === 'string' || typeof key === 'number') {
        const nested = fluentProxyOne([[key, []]], 0)
        proxies.push(nested)
        return nested
      }

      throw Error(`Unexpected proxy method ${String(key)}`)
    },
  })
}

export const fluentProxyOne = <T = any>(state: Segment[] = idSegments, level = -1): T => {
  return new Proxy($proxy as any, {
    apply: (target, thisArg, argArray) => {
      state[level][1] = [...state[level][1], argArray]

      return fluentProxyOne(state, level)
    },
    get: (target, key) => {
      if (key === 'state') {
        return state
      }

      if (typeof key === 'string' || typeof key === 'number') {
        state[level + 1] = [key, []]

        return fluentProxyOne(state, level + 1)
      }

      throw Error(`Unexpected proxy method ${String(key)}`)
    },
  })
}

export const fluentProxyApply = (target: any, state: Segment[][]) => {
  return state.map(segments => fluentProxyApplyOne(target, segments))
}

export const fluentProxyApplyOne = (target: any, state: Segment[]) => {
  return state.reduce((prev, [key, args]) => {
    const prop = prev[key]

    if (args.length === 0) return prop

    return args.reduce(arg => prop(...args), prop)
  }, target)
}
