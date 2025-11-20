export interface APIResponse<T = any> {
  success: boolean
  data: T
  msg?: string
}
