type Part = {
    title: string;
    text: string[];
    bold: string[];
};

type Type = {
    [key: string]: Part; // p1, p2, etc.
};

export const ADHD_DATA: Record<string, Type> = {
    //Kärsimätön vitkuttelija
    t0: {
        p0: {
            title: "Miten kärsimätön vitkuttelija näkyy",
            text: [
                "Sählää, säätää, selittää. Ensin vitkuttelee viikkokaupalla - ja sitten tekee kaiken kahdessa tunnissa kovalla kiireellä.",
                "Ei jaksa odottaa vuoroaan - tai mitään muutakaan. Hutiloi koska ei viitsi lukea ohjeita loppuun tai tarkastaa asioita kahteen kertaan.",
                "Innostuu nopeasti ja syöksyy toimintaan miettimättä mitä kannattaisi tehdä ensin. Jättää hommat kesken kun kyllästyy tai innostuu jostain muusta.",
                "Elämä tuntuu joskus yhdeltä kaaoskierteeltä, mutta ikuinen optimismi auttaa jaksamaan.",
            ],
            bold: ["Jättää hommat kesken", "Hutiloi"]
        },
        p1: {
            title: "Mistä johtuu?",
            text: [
                "Oireiden takana on motivaatiohormoni dopamiinin ja valppautta lisäävän soturi-hormoni noradrenaliinin epätasapaino.",
                "Niitä voi erittyä normaalisti, mutta ne eivät pääse hermo-solusta toiseen tai ehdi vai-kuttaa tarpeeksi kauan vastaanottavassa hermosolussa.",
                "Siksi kärsimättömät vitkuttelijat jaksavat keskittyä vain heitä aidosti kiinnostaviin, uusiin tai jännittäviin juttuihin, jotka vapauttavat tavallista enemmän dopamiinia.",
                '"Viime hetken paniikki", puolestaan aiheuttaa noradre-naliinipiikin, joka auttaa aivoja "heräämään".',
            ],
            bold: [""]
        },
        p2: {
            title: "Mitä voi tehdä",
            text: [
                "Kärsimättömät vitkuttelijat hyötyvät eniten perinteisistä ADHD-lääkkeistä kuten metyylifendiaatista joka estää noradrenaliinin ja dopamiinin kaappaamista eli takaisinottoa.",
                "Amfetamiinijohdannaiset ADHD-lääkkeet kuten Elvanse lisäävät myös dopamiinin ja nodadrenaliinin eritystä.",
                "Liikunta on kaikkein tehokkain kotikonsti dopamiini- ja noradrenaliinitasojen nostamiseen.",
                "Jo muutaman minuutin reipas liikuntasessio kuten yhden biisin tanssiminen lempimusiikin tahdissa, voi auttaa."
            ],
            bold: [""]
        },
        p3: {
            title: "Ylikeskittyminen avuksi",
            text: [
                "Kärsimättömien vitkuttelijoiden kannattaa myös järjestää elämänsä niin, että he voivat tehdä mahdollisimman paljon mielenkiintoisia ja tärkeältä tuntuvia tehtäviä.",
                'Ne nimittäin voivat auttaa heitä pääsemään ns. ylikeskittymis- tilaan, jossa heidän huomionsa "lukittuu" tehtävään tehtävään.',
                'Tässä tilassa ADHD-ihminen voi saada ns. ihmeitä aikaan ja jaksaa työskennellä tuntikausia saman asian parissa.',
                'Ylikeskittymistilan kääntöpuolena on se, että ADHD-ihminen unohtaa usein syödä, juoda ja jopa käydä vessassa.'
            ],
            bold: [""]
        }
    },

    // Kuormittuva sähköjänis
    t1: {
        p0: {
            title: "",
            text: [],
            bold: [""]
        }
    },

    // Hajamielinen haaveilija
    t2: {
        p0: {
            title: "",
            text: [],
            bold: [""]
        }
    },

    // Kuohuva herkkis
    t3: {
        p0: {
            title: "",
            text: [],
            bold: [""]
        }
    },
    
    // Kömpelö jumittaja
    t4: {
        p0: {
            title: "",
            text: [],
            bold: [""]
        }
    }
}