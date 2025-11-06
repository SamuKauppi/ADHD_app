type ADHDParagraph = {
    title: string;
    text: string[];
};

type ADHDType = {
    [key: string]: ADHDParagraph; // p1, p2, etc.
};

// Generic function to get ADHD type from any dataset
export function getAdhdType<T extends Record<string, ADHDType>>(
  data: T,
  typeKey: string
): ADHDType | null {
  return typeKey in data ? data[typeKey as keyof T] : null;
}

export function getAdhdPart(type: ADHDType, index: number): ADHDParagraph | null {
  const keys = Object.keys(type);
  const key = keys[index];
  return key ? type[key] ?? null : null;
}