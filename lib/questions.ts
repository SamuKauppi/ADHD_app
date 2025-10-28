type QuestionType = {
    question: string
    options: string[]
}


export const QUESTIONS: Record<string, QuestionType> = {
    q1: {
        question: "Kysymys 1",
        options: [
            "Sinun on vaikea keskittyä tylsiin tai vaikealta tuntuviin asioihin (tulet levottomaksi)",
            "Sinun on vaikea keskittyä yhtään mihinkään varsinkin silloin kun olet kuormittunut",
            "Ajatuksesi harhailee niin, että on vaikea keskittyä jopa kivoihin asiohin (esim. seksi)",
            "Sinun on vaikea keskittyä kun olet tunnekuohun vallassa",
            "Sinun on vaikea hahmottaa monipolvisia ja monimutkaisia ohjeita."],
    },
    q2: {
        question: "Kysymys 2",
        options: [
            "Olet fyysisesti levoton silloin kun sinulla on tylsää tai olet valtavan innostunut",
            "Et pysty olemaan paikallasi vaikka haluaisit ja yrittäisit, koska kehosi “sätkii”",
            "Liikut ympäriinsä “zombina” omissa ajatuksissasi niin ettet muista mitä tapahtui",
            "Saat välillä raivareita viiveellä (kun olet ensin pitänyt sisällä tunteita ehkä huomaamatta)",
            "Olet motorisesti kömpelö ja kolhit usein itseäsi, koska et hahmota kehosi ääriviivoja"],
    },
    q3: {
        question: "Kysymys 3",
        options: [
            "Puhut muiden päälle koska et jaksa odottaa vuoroasi tai kuunnella “jaarittelua”",
            "Yllätyt välillä itsekin omista möläytyksistäsi, koska et koe ajatelleesi niitä ensin",
            "Kuulet tai käyt mielessäsi keskusteluja (ehkä jopa kuviteltujen tyyppien kanssa)",
            "Yliavaudut omista asioistasi puolitutuille ja tuntematto-mille kiusallisella tavalla",
            "Puhut muiden päälle koska pelkäät unohtavasi mieleesi tulleen “tärkeän” ajatuksen"],
    },
    q4: {
        question: "Kysymys 4",
        options: [
            "Jos olet ylikeskittynyt kiinnostavan asiaan (viime hetken paniikissa), et kuule mitä muut sanovat",
            "Saat poissaolokohtauksia, joista et muista mitään jälkeenpäin",
            "Kun olet syvällä omissa ajatuksissasi, et kuule mitä muut sanovat",
            "Tunnekuohun vallassa sinun on vaikea kuunnella muita etkä muista jälkeenpäin mitä olet sanonut esim. vihaisena",
            "Sanot “mitä?”, koska koet  ettet ymmärtänyt mitä toinen sanoi – mutta heti perään tajuat mitä hän sanoi."],
    },
    q5: {
        question: "Kysymys 5",
        options: [
            "Toimit impulsiivisesti erityi-sesti kun olet innostunut (esim. ideasta) tai haluat päästä äkkiä eroon tylsästä tai ikävästä tilanteesta",
            "Yllätyt välillä itsekin omasta toiminnastasi, koska sinusta tuntuu että kehosi toimii (esim. tarttuu esineisiin, puhuu) kuin itsestään",
            "Omat mielikuvasi tai “sisäinen puhe” voi olla niin “elävää”, ettet ole varma tapahtuiko joku asia oikeasti vain vai mielessäsi.",
            "Toimit impulsiivisesti tunnekuohun vallassa – niin ihastuessasi, ahdistuessasi kuin suuttuessasi (esim. menet nopeasti suhteeseen)",
            "Pudottelet ja rikot esineitä, koska kätesi tarttuu niihin huonosti tai liian kovakourai-sesti, tönäiset ne lattialle kun sinun piti tarttua niihin jne."],
    },

    q6: {
        question: "Kysymys 6",
        options: [
            "Vitkuttelet tylsien tai hankalien asioiden aloittamista",
            "Kärsit kirkkaista valoista, kovista äänistä tai muista vahvoista aistielämyksistä",
            "Käytät todella paljon aikaa haaveiluun tai menneisyyden tai tulevan murehtimiseen",
            "Puhut liikaa, koska haluat että toiset tykkäisivät sinusta tai ymmärtäisivät sinua",
            "Puhut usein tavallista kovemmalla äänellä (vaikket huomaa itse)"],
    },
    q7: {
        question: "Kysymys 7",
        options: [
            "Sinua ei huvita mennä ajoissa nukkumaan, vaan esim. selaat somea myöhään",
            "Et saa unta koska olosi on liian levoton tai “sähköinen”. Sätkit myös unissasi.",
            "Et saa unta koska päässäsi on niin paljon ajatuksia (esim. menneestä tai tulevasta)",
            "Et saa unta jos olet yhä tunnekuohun vallassa ja esim. mietit muiden sanoja",
            "Sinun on vaikea pitää montaa sanaa tai numeroa kerralla mielessä"],
    },
    q8: {
        question: "Kysymys 8",
        options: [
            "Yllät “ihmesuorituksiin” viime tingassa ylikeskittymistilassa",
            "Kärsit  “paineesta päässä”, migreeneistä tai vatsakivuista",
            "Ajaudut tarinoita kertoessasi helposti harhapoluille",
            "Otat torjutuksi tulemisen todella raskaasti",
            "Opit todella hitaasti uusia liikesarjoja"],
    },
    q9: {
        question: "Kysymys 9",
        options: [
            "Et saa vietyä asioita loppuun (esim. tavaroita paikalleen)",
            "Pidät kodin siistinä, koska et pysty keskittymää sotkussa",
            "Hukkailet usein tavaroita koska olet hajamielinen",
            "“Ihastut överisti” uusiin ihmisiin (myös ystäviin)",
            "Sinulla on todella huono ajantaju"],
    },
    q10: {
        question: "Kysymys 10",
        options: [
            "Teet huolimattomuusvirheitä koska et viitsi lukea ohjeita tai tarkastaa tehtäviä",
            "Oireesi pahenevat stressaan-tuneena, kuormittuneena ja stimulaatiosta (ml. lääkkeet)",
            "Saat välillä aistiharhoja (esim. kuulet tai näet olemattomia asioita)",
            "Väsyt sosiaalisissa tilanteissa, koska tarkkailet ja “luet” koko ajan muiden reaktoita",
            "Tunnistat huonosti “kevyitä” kosketuksia (ja tykkäät siksi “kovemmista otteista”)"],
    },

}