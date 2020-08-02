export type SagaType<T, A> = {
  [P in keyof T]: P
} & {
  type: T
}
