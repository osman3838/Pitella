export type ServerErrors =
  | Record<string, string | string[]>
  | Array<{ field?: string; message?: string }>
  | string
  | undefined;
