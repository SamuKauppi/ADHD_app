type ADHDParagraph = {
    title: string;
    text: string[];
};

type ADHDType = {
    [key: string]: ADHDParagraph; // p1, p2, etc.
};

export const ADHD_DATA_OTHER: Record<string, ADHDType> = {
    t0: {
        p0: {
            title: "Tee siitä hauskempaa",
            text: [
                "Mieti miten voisit tehdä tylsästä tehtävästä hauskempaa tai viihdyttävämpää.",
                'Voisitko kuunnella esim. musiikkia, äänikirjoja tai podcasteja? Pyydä kaveria seuraksesi tai puhu hänen kanssaan puhelimessa kun teet tehtävää.'
            ]
        },
        p1: {
            title: 'Luo kiireen tuntu',
            text: [
                "Kiireen tuntu saa aivosi erittämään soturihormoni noradrenaliinia. Tavoite, joka on sopivan vaikea saavuttaa tuottaa dopamiinia.",
                "Ota aikaa, katso kuinka nopeasti pystyt tekemään tehtävän ja kokeile lyödä aiempi ennätyksesi. Aseta 5–25 minuutin aikaraja tehtävän tekemiselle.",
                "Lupaa maksaa kaverillesi rahaa, jos et tee tehtävää tiettyyn päivään mennessä.",
            ]
        },
        p2: {
            title: 'Hanki helppoja voittoja',
            text: [
                'Tavoitteen saavuttaminen saa aivot tuottamaan dopamiinia. Aloita tehtävän tekeminen naurettavan pienillä tehtävillä, joiden tekeminen vie vain muutaman minuutin.',
                'Juhli jokaista saavutusta vaikka taputtamalla itseäsi olalle. Näin saamasi dopamiinibuusti voi auttaa aloittamaan seuraavia, vaikeampia tehtäviä.'
            ]
        }
    },
    t2: {
        p0: {
            title: "",
            text: []
        }
    },
    t3: {
        p0: {
            title: "",
            text: []
        }
    },
    t4: {
        p0: {
            title: "",
            text: []
        }
    }
};