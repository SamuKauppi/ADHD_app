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
            title: "Miten kuormittuva sähköjänis näkyy",
            text: [
                "Kehosi käy ylikierroksilla tai aistisi huutavat hoosiannaa. Olet kuin herkkä instrumentti, joka menee epävireeseen liian kovasta käsittelystä.",
                "Tämä tyyppi ilmenee kahdella päätavalla, jotka voivat myös sekoittua:",
                "Sähköjänis ei pysty pysähtymään edes unissaan. Keho sätkii, kädet vispaavat ja olo on jatkuvasti levoton. Saatat möläyttää asioita tai tehdä liikkeitä \"tahtomattasi\".",
                "Kuormittuva tyyppi puolestaan kärsii aistiyliherkkyydestä. Kirkkaat valot sattuvat silmiin, kovat äänet uuvuttavat ja vaatteet puristavat. Kärsit todennäköisesti migreeneistä tai vatsavaivoista ja väsyt nopeasti hälyisissä paikoissa.",
                "Molemmille on yhteistä ajoittaiset \"poissaolokohtaukset\", joissa aivot menevät hetkeksi täysin jumiin – valot ovat päällä, mutta ketään ei ole kotona."
            ],
            bold: ["Keho sätkii, kädet vispaavat", "kärsii aistiyliherkkyydestä"]
        },
        p1: {
            title: "Mistä johtuu?",
            text: [
                "Taustalla on aivojen sähköisen toiminnan yliaktiivisuus, jota voisi kutsua eräänlaiseksi \"miniepilepsiaksi\".",
                "Kyseessä on epätasapaino aivojen kaasun ja jarrun välillä – glutamaatti kiihdyttää ja GABA jarruttaa. Aivojen tietyt osat käyvät liian kuumina, mikä johtaa joko motoriseen levottomuuteen ja tahattomaan ääntelyyn tai siihen, etteivät aivot jaksa suodattaa aistiärsykkeitä.",
                "Koska aistialueet tai liikekeskukset ovat yliärtyneet, ne ylireagoivat stressiin, valoihin tai verensokerin heilahteluihin."
            ],
            bold: ["epätasapaino aivojen kaasun ja jarrun välillä"]
        },
        p2: {
            title: "Mitä voi tehdä?",
            text: [
                "Tämän tyypin ensisijainen hoito on hermoston rauhoittaminen, ei sen kiihdyttäminen.",
                "Perinteiset stimulanttilääkkeet voivat joskus jopa pahentaa oireita (erityisesti migreeniherkillä), koska ne lisäävät vireystilaa.",
                "Kuormittuvat sähköjänikset hyötyvät kaikesta, mikä lisää GABA-välittäjäaineen toimintaa.",
                "Tämä tarkoittaa säännöllistä elämänrytmiä ja riittävää unta sekä stressin minimointia. Myös ruokavalio, joka pitää verensokerin tasaisena, on kriittinen aivojen sähkötoiminnan rauhoittamisessa.",
                "Liikunta auttaa, kunhan varot ylikuormittumista. Luonnossa oleilu on yksi parhaista tavoista rauhoittaa hermostoa."
            ],
            bold: ["lisää GABA-välittäjäaineen toimintaa", "säännöllistä elämänrytmiä ja riittävää unta", "Luonnossa oleilu on yksi parhaista tavoista"]
        },
        p3: {
            title: "Herkkyys terveysmittarina",
            text: [
                "Vaikka \"miniepilepsia\" ei itsessään ole hyödyllinen ominaisuus, se pakottaa sinut kuuntelemaan kehoasi tarkemmin kuin muut.",
                "Herkkä hermostosi toimii armottomana varoitusjärjestelmänä: se ilmoittaa välittömästi kivulla, säpsyillä tai uupumuksella, jos laiminlyöt unta, syöt huonosti tai annat muiden kävellä ylitsesi.",
                "Kun opit kunnioittamaan näitä rajoja, tämä pakottaa sinut elämään poikkeuksellisen terveellisesti ja tasapainoisesti. Tämä \"pakotettu\" hyvinvointi voi pitkässä juoksussa suojata monilta elintasosairauksilta ja uupumukselta, pidentäen ikääsi ja parantaen elämänlaatuasi merkittävästi."
            ],
            bold: ["armottomana varoitusjärjestelmänä", "suojata monilta elintasosairauksilta ja uupumukselta"]
        }
    },

    // Hajamielinen haaveilija
    t2: {
        p0: {
            title: "Miten hajamielinen haaveilija näkyy",
            text: [
                "Olet fyysisesti paikalla, mutta mielesi on aivan muualla. Et kuule mitä sinulle sanotaan, koska olet omissa ajatuksissasi.",
                "Sisäinen televisio pauhaa päässäsi niin kovalla, että on vaikea keskittyä edes kivoihin asioihin. Kuljet kotona, kaupoissa ja kaupungilla \"zombina\" omissa ajatuksissasi, etkä jälkikäteen muista mitä tapahtui tai minne laskit tavarasi.",
                "Katoat omiin maailmoihisi kesken keskustelun, mutta jatkat näön vuoksi nyökyttelyä ja vastaat \"joo\", vaikka et kuule kysymystä. Havahdut siihen, ettet ole kuunnellut, vasta kun toinen kysyy kuunteletko häntä. Tajuat kesken kirjan lukemisen miettineesi omiasi monen sivun ajan etkä tiedä mitä siinä sanottiin.",
                "Elät pääsi sisällä rikasta ja kiinnostavaa elämää samaan aikaan kun ulkomaailman odotukset ja tiedotteet, kuten aikataulut ja ohjeet, \"menevät yhdestä korvasta sisään ja toisesta ulos\"."
            ],
            bold: ["Sisäinen televisio pauhaa päässäsi", "Katoat omiin maailmoihisi kesken keskustelun"]
        },
        p1: {
            title: "Mistä johtuu?",
            text: [
                "Ongelman ytimessä on aivojen lepotilaverkosto (Default Mode Network), joka jää \"päälle\" silloinkin kun pitäisi keskittyä tähän hetkeen.",
                "Normaalisti tämä verkosto hiljenee, kun alamme suorittaa tehtävää, mutta hajamielisellä haaveilijalla se jatkaa toimintaansa kuin taustalla täysillä huutava televisio.",
                "Siksi haaveilija \"ei kuule eikä näe\" ulkomaailman tapahtumia, vaikka aistit toimivatkin normaalisti – aivot ovat vain liian kiireiset prosessoimaan sisäisiä ajatuksia, muistoja ja kuvitelmia."
            ],
            bold: ["aivojen lepotilaverkosto (Default Mode Network)"]
        },
        p2: {
            title: "Mitä voi tehdä?",
            text: [
                "Hajamieliset haaveilijat hyötyvät eniten keinoista, jotka palauttavat aivot tähän hetkeen ja käsillä olevaan tehtävään.",
                "Tietoinen läsnäolo eli mindfulness ja meditaatio ovat haaveilijalle kuin kuntosalitreeniä aivoille: ne vahvistavat kykyä huomata ajatusten harhailu ja palauttaa huomio takaisin tähän hetkeen.",
                "Myös nopeat liikuntapyrähdykset, kuten kävely, portaiden juoksu tai pienet tanssihetket työnteon lomassa, auttavat pitämään vireystilaa yllä.",
                "Kuormittuminen pahentaa oireilua, joten hermoston rauhoittaminen esim. luonnossa oleillen auttaa säätämään sisäistä telkkaria tarkemmin."
            ],
            bold: ["Tietoinen läsnäolo eli mindfulness", "nopeat liikuntapyrähdykset", "hermoston rauhoittaminen"]
        },
        p3: {
            title: "Mielikuvituksen supervoima",
            text: [
                "Vaikka yliaktiivinen lepotilaverkosto haittaa tylsiin tehtäviin keskittymistä, se on samalla valtava voimavara.",
                "Se mahdollistaa elävän mielikuvituksen ja luovan ongelmanratkaisun sekä kyvyn kuvitella tulevaisuuden skenaarioita tai eläytyä tarinoihin.",
                "Kun hajamielinen haaveilija oppii \"vaihtamaan kanavaa\" sisäisen ja ulkoisen maailman välillä, hän voi hyödyntää rikasta sisäistä maailmaansa visionäärisenä ajatteluna ja taiteellisena luovuutena tai syvällisenä itsetuntemuksena."
            ],
            bold: ["elävän mielikuvituksen ja luovan ongelmanratkaisun", "visionäärisenä ajatteluna ja taiteellisena luovuutena"]
        }
    },

    // Kuohuva herkkis
    t3: {
        p0: {
            title: "Miten kuohuva herkkis näkyy",
            text: [
                "Tunteesi menevät nollasta sataan sekunneissa. Olet kuin kävelevä tutka, joka skannaa jatkuvasti muiden ilmeitä ja äänensävyjä.",
                "Koet hylkäämisen – todellisen tai kuvitellun – fyysisenä kipuna. Saatat loukkaantua verisesti tilanteissa, jotka muut kokevat neutraaleina, tai luulet toisen olevan vihainen, vaikka hänellä on vain kiire.",
                "Tunteiden säätely on vaikeaa: kiukku saattaa patoutua sisälle ja purkautua valtavana räjähdyksenä, joka yllättää jopa sinut itsesi. Toisaalta saatat nauraa hermostuksissasi väärällä hetkellä, koska et tunnista tai osaa nimetä omia tunnetilojasi."
            ],
            bold: ["Koet hylkäämisen – todellisen tai kuvitellun – fyysisenä kipuna", "Tunteiden säätely on vaikeaa"]
        },
        p1: {
            title: "Mistä johtuu?",
            text: [
                "Aivojesi tunneverkosto ja \"hälytyskeskus\" (mantelitumake) ovat yliherkkiä ja reagoivat liian voimakkaasti.",
                "Aivosi eivät suodata \"turhaa\" tunnedataa, vaan kiinnittävät huomiota kaikkiin vähänkin tunneperäiseltä vaikuttaviin viesteihin. Mantelitumake tulkitsee epäselvät tilanteet varmuuden vuoksi uhaksi, ennen kuin järkevä \"komentokeskus\" (etuotsalohko) ehtii väliin.",
                "Yhteys tunteiden ja järjen välillä on kuin pätkivä nettiyhteys: rauhoittava viesti (\"ei hätää, kaverilla on vain huono päivä\") tulee perille liian myöhään, kun olet jo ehtinyt pahoittaa mielesi tai suuttua."
            ],
            bold: ["Mantelitumake tulkitsee epäselvät tilanteet", "Yhteys tunteiden ja järjen välillä on kuin pätkivä nettiyhteys"]
        },
        p2: {
            title: "Mitä voi tehdä?",
            text: [
                "Tärkein taito on oppia tunnistamaan omat tunteet ja pysäyttämään automaattireaktio.",
                "Koska tunteiden tukahduttaminen ei toimi, opettele tunteiden uudelleenarviointia. Se tarkoittaa tilanteen tarkastelua uudessa valossa ennen reagointia.",
                "Opettelemalla tunnistamaan kehosi varoitusmerkit (kuten käsien puristuminen nyrkkiin tai kuumotus) voit painaa \"stop-nappulaa\" ennen räjähdystä. Myös hengitysharjoitukset ovat tehokkaita, sillä ne viestivät suoraan hermostolle, ettei kyseessä ole hengenvaara."
            ],
            bold: ["opettele tunteiden uudelleenarviointia", "tunnistamaan kehosi varoitusmerkit"]
        },
        p3: {
            title: "Tunneherkkyys vahvuutena",
            text: [
                "Se sama ominaisuus, joka tekee ihmissuhteista välillä raskaita, voi olla valtava voimavara.",
                "Aivojesi kyky poimia ympäristöstä hienovaraisia emotionaalisia vihjeitä on pohja poikkeukselliselle empatialle ja ihmistuntemukselle. Kun opit erottamaan omat pelkosi ja väärät tulkintasi toisen todellisista tunteista, sinusta voi tulla mestarillinen ihmistuntija.",
                "Tämä on korvaamaton taito toimiessa niiden kanssa, jotka eivät pysty ilmaisemaan itseään sanallisesti – esimerkiksi pienten lasten, muistisairaiden vanhusten tai eläinten kanssa. Sinä \"kuulet\" sen mitä ei sanota ääneen, ja aistit tunnelman muutokset ennen muita."
            ],
            bold: ["poikkeukselliselle empatialle ja ihmistuntemukselle", "\"kuulet\" sen mitä ei sanota ääneen"]
        }
    },
    
    // Kömpelö jumittaja
    t4: {
        p0: {
            title: "Miten kömpelö jumittaja näkyy",
            text: [
                "Jalkasi ovat mustelmilla, tiputtelet tavaroita, unohdat asioita ja sanot \"häh?\" ennen kuin tajuat, että kuulitkin asian.",
                "Arkesi on täynnä pieniä törmäyksiä – kirjaimellisesti. Kehosi ei tunnu hahmottavan rajojaan, minkä vuoksi kolhit itseäsi huonekaluihin tai puristat esineitä liian kovaa (tai liian löysästi).",
                "Työmuistisi on lyhyt kuin kultakalalla: unohdat juuri kuulemasi lauseen alun ennen kuin puhuja on päässyt loppuun. Uusien liikkeiden tai monivaiheisten ohjeiden oppiminen tuntuu tuskaisen hitaalta.",
                "Sinulle sanotaan jatkuvasti \"älä huuda\", vaikka omasta mielestäsi olet puhunut normaalilla äänellä."
            ],
            bold: ["Kehosi ei tunnu hahmottavan rajojaan", "Työmuistisi on lyhyt kuin kultakalalla"]
        },
        p1: {
            title: "Mistä johtuu?",
            text: [
                "Kyse on aivojen \"tietoliikenneyhteyksien\" pätkimisestä ja sensorimotorisen integraation haasteista.",
                "Kömpelöiden jumittajien aivoissa viestit eivät kulje aivojen eri osien välillä yhtä sujuvasti kuin muilla. Erityisesti yhteys aistihavaintojen ja kehon liikkeiden välillä on hidas.",
                "Valkoinen aivokudos eli aivojen \"kaapelointi\" saattaa olla rakenteeltaan sellaista, että signaali kulkee hitaammin (\"pitkät piuhat\"). Siksi reaktiosi tulevat viiveellä ja hienomotoriikka takkuaa.",
                "Työmuistin kapeus ja huono ajantaju liittyvät osin samaan tiedonkäsittelyn pullonkaulaan."
            ],
            bold: ["yhteys aistihavaintojen ja kehon liikkeiden välillä", "Valkoinen aivokudos eli aivojen \"kaapelointi\""]
        },
        p2: {
            title: "Mitä voi tehdä?",
            text: [
                "Ratkaisu ei ole yrittää \"skarpata\" muistia, vaan hyväksyä sen rajallisuus ja ulkoistaa se.",
                "Koska aivosi eivät pidä asioita \"tallella\" luotettavasti, sinun on rakennettava systeemejä jotka tekevät sen puolestasi. Tekoäly voi auttaa suunnittelemaan ajankäyttöä ja hahmottamaan paremmin eri tehtävien vaatimaa aikaa.",
                "Stimulanttilääkitys ja erilaiset lisäravinteet kuten siiliorakas (Lion's mane) ja Bacopa voivat auttaa parantamaan signaalin kulkua ja työmuistia, mutta eivät poista tarvetta apuvälineille.",
                "Fyysisellä puolella toimintaterapia ja kehonhallintaa kehittävät lajit (kuten jooga, taiji tai pilates) ovat hyödyllisempiä kuin nopeatempoiset joukkuelajit."
            ],
            bold: ["rakennettava systeemejä jotka tekevät sen puolestasi", "siiliorakas (Lion's mane) ja Bacopa", "toimintaterapia ja kehonhallintaa kehittävät lajit"]
        },
        p3: {
            title: "Tietoinen oppiminen ja aitous",
            text: [
                "Koska et opi asioita \"itsestään\" tai automaattisesti matkimalla, joudut purkamaan uudet taidot pieniin loogisiin osiin – olipa kyse sitten tanssiaskeleista tai työtehtävästä.",
                "Tämä tekee sinusta usein erinomaisen systeemiajattelijan ja selkeän opettajan. Kun olet joutunut opettelemaan jonkin asian kantapään kautta ja tietoisesti, ymmärrät sen mekaniikan usein syvällisemmin kuin he, joille se oli helppoa.",
                "Lisäksi kömpelöys ja \"suodattamattomuus\" (kuten kova ääni tai suoruus) tekevät sinusta usein helposti lähestyttävän ja aidon. Sinussa ei ole teennäisyyttä, koska et pysty ylläpitämään monimutkaisia sosiaalisia kulisseja samalla kun yrität olla kaatamatta kahvikuppia. Tämä aitous ja sinnikkyys (\"kaadun, mutta nousen taas\") ovat arvostettuja piirteitä."
            ],
            bold: ["systeemiajattelijan ja selkeän opettajan", "helposti lähestyttävän ja aidon"]
        }
    }
};
