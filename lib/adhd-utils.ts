type Part = {
  title: string;
  text: string[];
  bold: string[];
};

type Type = {
  [key: string]: Part; // p1, p2, etc.
};

// Generic function to get ADHD type from any dataset
export function getAdhdType<T extends Record<string, Type>>(
  data: T,
  typeKey: string
): Type | null {
  return typeKey in data ? data[typeKey as keyof T] : null;
}

// Gets a part from a type with index
export function getAdhdPart(type: Type, index: number): Part | null {
  const keys = Object.keys(type);
  const key = keys[index];
  return key ? type[key] ?? null : null;
}