type Type = {
    title: string;
    text: string[];
    link: string;
};

const ADHD_READ_MORE: Record<string, Type> = {
    t0: {
        title: "Lisää luettavaa",
        text: [
            "Löydät lisää tietoa ja käytännön vinkkejä kutri.net:in ilmaisilta ADHD-jäsensivuilta ja maksullisesta ADHD haltuun -puuhakirjasta.",
            "Lue lisää molemmista täältä:",
            "kutri.net/ADHD"
        ],
        link: "https://kutri.net/"
    },
    t1: {
        title: "Lisää luettavaa",
        text: [
            "Löydät lisää tietoa ja käytännön vinkkejä kutri.net:in ilmaisilta ADHD-jäsensivuilta ja maksullisesta ADHD haltuun -puuhakirjasta.",
            "Lue lisää molemmista täältä:",
            "kutri.net/ADHD"
        ],
        link: "https://kutri.net/"
    },
    t2: {
        title: "Lisää luettavaa",
        text: [
            "Löydät lisää tietoa ja käytännön vinkkejä kutri.net:in ilmaisilta ADHD-jäsensivuilta ja maksullisesta ADHD haltuun -puuhakirjasta.",
            "Lue lisää molemmista täältä:",
            "kutri.net/ADHD"
        ],
        link: "https://kutri.net/"
    },
    t3: {
        title: "Lisää luettavaa",
        text: [
            "Löydät lisää tietoa ja käytännön vinkkejä kutri.net:in ilmaisilta ADHD-jäsensivuilta ja maksullisesta ADHD haltuun -puuhakirjasta.",
            "Lue lisää molemmista täältä:",
            "kutri.net/ADHD"
        ],
        link: "https://kutri.net/"
    },
    t4: {
        title: "Lisää luettavaa",
        text: [
            "Löydät lisää tietoa ja käytännön vinkkejä kutri.net:in ilmaisilta ADHD-jäsensivuilta ja maksullisesta ADHD haltuun -puuhakirjasta.",
            "Lue lisää molemmista täältä:",
            "kutri.net/ADHD"
        ],
        link: "https://kutri.net/"
    }
};

export function getReadMoreType(typeKey: string): Type | null {
    const type = ADHD_READ_MORE[typeKey];
    return type ?? null;
}
