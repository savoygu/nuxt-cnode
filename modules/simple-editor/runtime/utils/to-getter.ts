// 泛型类型：将对象的所有属性转换为函数
export type Prettier<T> = {
  [K in keyof T]: T[K];
} & {}

export type ToFullGetter<T> = Prettier<{
  [K in keyof T as T[K] extends ((...args: any[]) => any) | undefined ? never : K]-?: () => T[K];
} & {
  [K in keyof T as T[K] extends ((...args: any[]) => any) | undefined ? K : never]: T[K];
}>

export type ToPartialGetter<T> = Prettier<{
  [K in keyof T as T[K] extends ((...args: any[]) => any) | undefined ? never : K]: () => T[K];
} & {
  [K in keyof T as T[K] extends ((...args: any[]) => any) | undefined ? K : never]: T[K];
}>

export type ToGetter<T, Required extends boolean = true> = Required extends true ? ToFullGetter<T> : ToPartialGetter<T>

// 工具函数：实际执行转换
export function fromGetterConfig<T extends object>(config: ToGetter<T, true> | ToGetter<T, false>): T {
  const result = {} as any

  for (const key in config) {
    const value = (config as any)[key]
    result[key] = typeof value === 'function' ? value() : value
  }

  return result
}
