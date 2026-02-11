import { ZodFormattedError } from "zod";

export function getZodErrorMessages<T>(
  error: ZodFormattedError<T, string>
): string[] {
  return Object.values(error)
    .map((field: any) => {
      if (Array.isArray(field)) return field;
      return field?._errors || [];
    })
    .flat()
    .filter(Boolean);
}
