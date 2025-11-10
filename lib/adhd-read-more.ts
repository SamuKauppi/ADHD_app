type Type = {
    title: string;
    text: string[];
};

const ADHD_READ_MORE: Record<string, Type> = {
    t0: {
        title: "Lisää luettavaa",
        text: [
            "Löydät lisää tietoa ja käytännön vinkkejä kutri.net:in ilmaisilta ADHD-jäsensivuilta ja maksullisesta ADHD haltuun -puuhakirjasta.",
            "Lue lisää molemmista täältä:",
            "kutri.net/ADHD"
        ]
    },
    t1: {
        title: "",
        text: [""]
    },
    t2: {
        title: "",
        text: [""]
    },
    t3: {
        title: "",
        text: [""]
    },
    t4: {
        title: "",
        text: [""]
    }
};

export function getReadMoreType(typeKey: string): Type | null {
    const type = ADHD_READ_MORE[typeKey];
    return type ?? null;
}