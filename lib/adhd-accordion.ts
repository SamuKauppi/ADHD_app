type Part = {
    title: string;
    text: string[];
    bold: string[];
};

type Type = {
    [key: string]: Part; // p1, p2, etc.
};

export const ADHD_ACCORDION: Record<string, Type> = {
    //Kärsimätön vitkuttelija
    t0: {
        p0: {
            title: "Tee siitä hauskempaa",
            text: [
                "Mieti miten voisit tehdä tylsästä tehtävästä hauskempaa tai viihdyttävämpää.",
                "Voisitko kuunnella esim. musiikkia, äänikirjoja tai podcasteja? Pyydä kaveria seuraksesi tai puhu hänen kanssaan puhelimessa kun teet tehtävää."
            ],
            bold: []
        },
        p1: {
            title: "Luo kiireen tuntu",
            text: [
                "Kiireen tuntu saa aivosi erittämään soturihormoni noradrenaliinia. Tavoite, joka on sopivan vaikea saavuttaa tuottaa dopamiinia.",
                "Ota aikaa, katso kuinka nopeasti pystyt tekemään tehtävän ja kokeile lyödä aiempi ennätyksesi. Aseta 5–25 minuutin aikaraja tehtävän tekemiselle.",
                "Lupaa maksaa kaverillesi rahaa, jos et tee tehtävää tiettyyn päivään mennessä."
            ],
            bold: []
        },
        p2: {
            title: "Hanki helppoja voittoja",
            text: [
                "Tavoitteen saavuttaminen saa aivot tuottamaan dopamiinia. Aloita tehtävän tekeminen naurettavan pienillä tehtävillä, joiden tekeminen vie vain muutaman minuutin.",
                "Juhli jokaista saavutusta vaikka taputtamalla itseäsi olalle. Näin saamasi dopamiinibuusti voi auttaa aloittamaan seuraavia, vaikeampia tehtäviä."
            ],
            bold: []
        }
    },

    // Kuormittuva sähköjänis
    t1: {
        p0: {
            title: "Uni on ykköslääkkeesi",
            text: [
                "Huono uni pahentaa sähköhäiriöitä välittömästi. Pyhitä makuuhuoneesi pimeäksi, viileäksi ja hiljaiseksi.",
                "Kokeile painopeittoa levottomuuden rauhoittamiseen, ja käytä unimaskia tai korvatulppia blokataksesi aistiärsykkeet."
            ],
            bold: ["painopeittoa levottomuuden rauhoittamiseen"]
        },
        p1: {
            title: "Rauhoita aistit ja ympäristö",
            text: [
                "Suojele aivojasi ylikuormitukselta. Käytä meluisissa paikoissa vastamelukuulokkeita tai korvatulppia.",
                "Jos valot häikäisevät, käytä aurinkolaseja tai säädä näyttöjen kirkkautta. Vältä välkkyviä kirkkaita valoja.",
                "Opettele sanomaan \"ei\" tilanteille, jotka tiedät liian kuormittaviksi."
            ],
            bold: ["vastamelukuulokkeita tai korvatulppia"]
        },
        p2: {
            title: "Tasaa verensokeri ja nesteytä",
            text: [
                "Aivosi tarvitsevat tasaista polttoainetta. Vältä sokeria ja kofeiinia, jotka aiheuttavat piikkejä ja romahduksia aivotoiminnassa.",
                "Panosta runsaaseen kuidun saantiin ja fermentoituihin ruokiin kuten hapankaaliin ja jugurttiin, sillä ne parantavat suoliston mikrobiomia ja sitä kautta rauhoittavat hermostoasi.",
                "Syö säännöllisesti proteiinipitoista ruokaa (3–4 tunnin välein) ja muista juoda vettä johon on lisätty elektrolyyttejä – nälkä ja nestehukka ovat myrkkyä sähköjäniksen aivoille."
            ],
            bold: ["runsaaseen kuidun saantiin ja fermentoituihin ruokiin", "juoda vettä johon on lisätty elektrolyyttejä"]
        }
    },

    // Hajamielinen haaveilija
    t2: {
        p0: {
            title: "Ankkuroi itsesi aisteihin",
            text: [
                "Kun tunnet aivosumua tai ajatuksesi harhailevat, pysähdy ja pakota aivosi nykyhetkeen aistien avulla.",
                "Käytä 5-4-3-2-1-tekniikkaa: Nimeä mielessäsi 5 asiaa jotka näet, 4 jotka tunnet kehollasi, 3 jotka kuulet, 2 jotka haistat ja 1 jonka maistat. Tämä katkaisee \"sisäisen television\" virran hetkeksi."
            ],
            bold: ["5-4-3-2-1-tekniikkaa"]
        },
        p1: {
            title: "Tee tietoinen siirtymä",
            text: [
                "Luo lyhyt rituaali ennen keskittymistä vaativaa tehtävää. Sulje silmät 30 sekunniksi, hengitä syvään ja sano mielessäsi selkeästi: \"Nyt aion keskittyä tähän tehtävään seuraavat 15 minuuttia.\"",
                "Avaa silmät ja aloita heti. Tämä auttaa aivoja vaihtamaan lepotilasta suorittavaan tilaan."
            ],
            bold: ["vaihtamaan lepotilasta suorittavaan tilaan"]
        },
        p2: {
            title: "Puhu ja nimeä ääneen",
            text: [
                "Jos ajatukset meinaavat karata, ala selostaa tekemisiäsi ääneen kuin urheiluselostaja. \"Nyt otan kynän käteen, nyt avaan sähköpostin, nyt kirjoitan otsikon.\"",
                "Oman äänen kuuleminen auttaa pitämään fokuksen ulkoisessa tekemisessä sisäisen sijaan."
            ],
            bold: ["selostaa tekemisiäsi ääneen"]
        }
    },

    // Kuohuva herkkis
    t3: {
        p0: {
            title: "Testaa tulkintasi",
            text: [
                "Älä usko sokeasti ensimmäistä ajatustasi (\"hän vihaa minua\"). Pysähdy ja kirjoita se ylös.",
                "Listaa kolme vaihtoehtoista selitystä toisen käytökselle (esim. \"hänellä on päänsärky\", \"hän ei huomannut minua\", \"hän on ujo\"). Tämä opettaa aivojasi harkitsemaan vaihtoehtoisia selityksiä."
            ],
            bold: ["Listaa kolme vaihtoehtoista selitystä"]
        },
        p1: {
            title: "Bongaa fyysiset merkit",
            text: [
                "Tunteet alkavat kehosta. Opettele tunnistamaan, missä kohtaa kehoa tuntuu kun olet hermostumassa.",
                "Kun tunnistat merkin, sano mielessäsi tai ääneen \"STOP\". Jos pystyt, muuta kehon reaktiota eli esimerkiksi avaa nyrkkiin menneet kädet tai rentouta kiristyneet leukaperät. Tämä pieni aikalisä voi estää ylilyönnin."
            ],
            bold: ["missä kohtaa kehoa tuntuu"]
        },
        p2: {
            title: "Hengitä tunne tasaiseksi",
            text: [
                "Kun tunnekuohu iskee, käytä fysiologista huokausta: vedä keuhkot nopeasti nenän kautta täyteen ilmaan, vedä vielä napakka \"lisänokkaisu\" ja hengitä sitten piiiiiitkään hitaasti ulos suun kautta kuin puhaltaisit kynttilää.",
                "Toista harjoitus kuusi kertaa ja rentouta samalla hartiasi, niskasi ja kasvosi ja lopulta koko kehosi. Tämä on nopein tapa kertoa aivojen hälytyskeskukselle, että vaara on ohi."
            ],
            bold: ["fysiologista huokausta", "rentouta samalla hartiasi, niskasi ja kasvosi"]
        }
    },

    // Kömpelö jumittaja
    t4: {
        p0: {
            title: "Ulkoista aivosi",
            text: [
                "Lopeta luottamasta siihen, että \"kyllä minä tämän muistan\". Et muista.",
                "Kirjoita kaikki ylös heti. Käytä listoja, kalentereita ja muistutuksia. Jos jokin ei ole paperilla tai kalenterissa, jota katsot päivittäin, sitä ei ole olemassa."
            ],
            bold: ["Kirjoita kaikki ylös heti"]
        },
        p1: {
            title: "Ota aikalisä kommunikaatiossa",
            text: [
                "Kun joku puhuu sinulle, opettele pitämään pieni tietoinen tauko ennen kuin reagoit.",
                "Tämä antaa pidemmille \"piuhoillesi\" aikaa prosessoida kuulemasi, jolloin vältyt sanomasta turhaan \"mitä?\" ennen kuin tajuat mitä sinulle sanottiin."
            ],
            bold: ["pitämään pieni tietoinen tauko"]
        },
        p2: {
            title: "Hidasta fysiikkaa",
            text: [
                "Törmäilet, koska aivosi luulevat kehosi olevan eri kohdassa kuin se on.",
                "Hidasta liikkumista tietoisesti ahtaissa paikoissa. Kun tartut esineeseen, katso sitä ja keskity ottamaan siitä ote – älä tee sitä \"sivusilmällä\".",
                "Tarvittaessa selosta ääneen tekemisiäsi, jolloin tieto siitä mitä olet tekemässä menee useampaa reittiä perille liikettä koordinoiviin aivojen osiin."
            ],
            bold: ["Hidasta liikkumista tietoisesti ahtaissa paikoissa"]
        }
    }
};
