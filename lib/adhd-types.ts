type ADHDType = {
  name: string;
  images: {
    src: any;         // React Native `require()` result
    imgType: string; // For your string reference
  }[];
};

export const ADHD_TYPE: Record<string, ADHDType> = {
  t0: {
    name: "Kärsimätön vitkuttelija",
    images: [
      { src: require("../assets/images/kuormittuvajanis.png"), imgType: "result-mini" },
      { src: require("../assets/images/kuormittuvajanis.png"), imgType: "kuormittuvajanis.png" },
    ],
  },
  t1: {
    name: "Kuormittuva sähköjänis",
    images: [
      { src: require("../assets/images/kuormittuvajanis.png"), imgType: "result-mini" },
      { src: require("../assets/images/kuormittuvajanis.png"), imgType: "kuormittuvajanis.png" },
    ],
  },
  t2: {
    name: "Hajamielinen haaveilija",
    images: [
      { src: require("../assets/images/kuormittuvajanis.png"), imgType: "result-mini" },
    ],
  },
  t3: {
    name: "Kuohuva herkkis",
    images: [
      { src: require("../assets/images/kuormittuvajanis.png"), imgType: "result-mini" },
    ],
  },
  t4: {
    name: "Kömpelö jumittaja",
    images: [
      { src: require("../assets/images/kuormittuvajanis.png"), imgType: "result-mini" },
      { src: require("../assets/images/kuormittuvajanis.png"), imgType: "kuormittuvajanis.png" },
    ],
  },
};


export const getADHDImages = (
  typeKey: keyof typeof ADHD_TYPE,
  filename?: string
): { src: any; filename?: string } => {

  // Get type
  const entry = ADHD_TYPE[typeKey];
  if (!entry) throw new Error(`Invalid ADHD type key: ${typeKey}`);

  // Get image
  if (filename) {
    const found = entry.images.find(img => img.imgType == filename);
    if (found) return found.src;
    throw new Error(`Image "${filename}" not found for ADHD type "${typeKey}"`);
  }

  // Fallback, return first image
  return entry.images[0].src;
};
