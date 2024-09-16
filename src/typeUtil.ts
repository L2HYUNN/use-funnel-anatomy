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

type TestBase = {
  이름?: string;
  주민등록번호?: string;
  휴대폰번호?: string;
};
// 주민등록번호_입력: {
//   이름: string;
//   주민등록번호?: string;
//   휴대폰번호?: string;
// };

type TestResult = {
  이름: string;
  주민등록번호?: string;
  휴대폰번호?: string;
  회사번호: string;
  // 주민등록번호_입력: {
  //   이름: string;
  //   주민등록번호?: string;
  //   휴대폰번호?: string;
  // };
  // 휴대폰번호_입력: { 이름: string; 주민등록번호: string; 휴대폰번호?: string };
};

type TBase = {
  a: string;
  b?: number;
  c: boolean;
};

type TResult = {
  a: string;
  b: number;
  d: Date;
};

const required: RequiredCompareKeys<TestBase, TestResult> = "이름";
const optional: OptionalCompareKeys<TestBase, TestResult> = "주민등록번호";

const required2: RequiredCompareKeys<TBase, TResult> = "b"; // "b" | "d"
const optional2: OptionalCompareKeys<TBase, TResult> = "a"; // "a"

type Merged = CompareMergeContext<TBase, TResult>;

const merged: Merged = {
  a: "a",
  b: 1,
  d: new Date(),
};
