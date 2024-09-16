type RequiredCompareKeys<TBase, TResult> = {
  [K in keyof TBase | keyof TResult]: K extends keyof TResult
    ? K extends keyof TBase
      ? TBase[K] extends TResult[K]
        ? never
        : K
      : undefined extends TResult[K]
      ? never
      : K
    : never;
}[keyof TBase | keyof TResult];

type OptionalCompareKeys<TBase, TResult> = {
  [K in keyof TBase | keyof TResult]: K extends keyof TResult
    ? K extends keyof TBase
      ? TBase[K] extends TResult[K]
        ? K
        : never
      : undefined extends TResult[K]
      ? K
      : never
    : never;
}[keyof TBase | keyof TResult];

export type CompareMergeContext<TBase, TResult> = {
  [K in RequiredCompareKeys<TBase, TResult>]: K extends keyof TResult
    ? TResult[K]
    : K extends keyof TBase
    ? TBase[K]
    : never;
} & {
  [K in OptionalCompareKeys<TBase, TResult>]?: K extends keyof TBase
    ? TBase[K]
    : K extends keyof TResult
    ? TResult[K]
    : never;
};
