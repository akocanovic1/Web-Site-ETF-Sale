var mjesec = 11; //defaultna vrijednost mjeseca

let Kalendar = (function(){
    var nazivMjeseca = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
    var naziviDana = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var pocetnaKolona;
    var pohraniVanredna = [];
    var pohraniRedovna = [];

    function obrisiZauzeca(){
        var kalendarRef = document.getElementById("calendar");
        for(var i = 1; i <= kalendarRef.childNodes[5].childElementCount; i++){
            kalendarRef.childNodes[5].childNodes[i*2 - 1].style.backgroundImage = 'linear-gradient(bottom, #08F709, #08F709, transparent 0%, transparent 100%)';
            kalendarRef.childNodes[5].childNodes[i*2 - 1].style.backgroundImage = '-webkit-linear-gradient(bottom, #08F709, #08F709 40%, transparent 0%, transparent 100%)';
        }
    }

    function mjesecSemestra(mjesec){
        if(mjesec == 0 || mjesec == 1 || mjesec == 10 || mjesec == 11 || mjesec == 9) return "zimski"
        if(mjesec == 2 || mjesec == 3 || mjesec == 4 || mjesec == 5 || mjesec == 6) return "ljetni"
    }

    function obojiZauzecaImpl(kalendarRef, mjesecProslijedjeni, sala, pocetak, kraj){ 
        var checkedValue = document.getElementById("check").checked; 
        var selektorSala = document.getElementById("sale");
        var sala = selektorSala.options[selektorSala.selectedIndex].value; 
        
        obrisiZauzeca(); 
        if(pocetak == null) pocetak = "";
        if(kraj == null) kraj = "";

        //unesei pocetak se nalazi izmedju pocetka i kraja
        
       
//KADA JE UNCHECKED CHECKBOX IMAMO PRIKAZ SAMO VANREDNIH ZAUZECA//
        function obojiDan(parsirajDan){
            var datum = parseInt(parsirajDan.substring(0, 2), 10);
            var daniMjeseca = kalendarRef.childNodes[5].childNodes[datum*2-1];
            daniMjeseca.style.backgroundImage = 'linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            daniMjeseca.style.backgroundImage = '-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
        }

        //prikazi sva vanredna zauzeca za selektovanu salu       
        if(!checkedValue)  {
            pohraniVanredna.forEach(x => { 
                if(x['naziv'] == sala && (parseInt(x['datum'].substring(3, 5), 10) - 1) == mjesec && pocetak >= x['pocetak'] && pocetak <= x['kraj'] && pocetak != ""){
                    obojiDan(x['datum']);
                }

                else if(x['naziv'] == sala && (parseInt(x['datum'].substring(3, 5), 10) - 1) == mjesec && kraj <= x['kraj'] && kraj >= x['pocetak'] && kraj != ""){
                    obojiDan(x['datum']);
                }

                else if(x['naziv'] == sala && (parseInt(x['datum'].substring(3, 5), 10) - 1) == mjesec && pocetak <= x['pocetak'] && kraj >= x['kraj'] && kraj != ""&& pocetak != ""){
                    obojiDan(x['datum']);
                }

                else if(x['naziv'] == sala && (parseInt(x['datum'].substring(3, 5), 10) - 1) == mjesec && (pocetak == "" || pocetak == x['pocetak']) && (kraj == "" || kraj == x['kraj'])) { 
                    obojiDan(x['datum']);
                }
            });
        }

        function obojiDaneRedovne(dani){
            var dan = parseInt(dani, 10);
            var element;

                    //selektujemo kolonu dana kojih svake sedmice zelimo da zauzmemo
            if(pocetnaKolona  < dan){
                    element = document.querySelectorAll('.brojDana:nth-of-type(7n +' + (dan - pocetnaKolona + 1) + ')');
            }
            else if(pocetnaKolona  > dan){
                    element = document.querySelectorAll('.brojDana:nth-of-type(7n +' + (8 - pocetnaKolona  + dan) + ')');
            } 
            else if (pocetnaKolona == dan) {
                    element = document.querySelectorAll('.brojDana:nth-of-type(7n +' + (8-pocetnaKolona+dan)+ ')');
            }

            for(var i = 0; i < element.length; i++){
                    element[i].style.backgroundImage = 'linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
                    element[i].style.backgroundImage = '-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            }
        }
        

//NAMJESTENA JE FUNKCIONALNOST CHECKBOXA - KADA KLIKNEMO CHECKBOX PRIKAZU SE PERIODICNA ZAUZECA//

        if(checkedValue){ 
            //prikazi sva redovna zauzeca za selektovanu salu 
            pohraniRedovna.forEach(x => {
                if(x['naziv'] == sala && mjesecSemestra(mjesec) == x['semestar'] && pocetak >= x['pocetak'] && pocetak <= x['kraj'] && pocetak != ""){
                    obojiDaneRedovne(x['dan']);
                }

                else if(x['naziv'] == sala && mjesecSemestra(mjesec) == x['semestar']  && kraj <= x['kraj'] && kraj >= x['pocetak'] && kraj != ""){
                    obojiDaneRedovne(x['dan']);
                }

                else if(x['naziv'] == sala && mjesecSemestra(mjesec) == x['semestar'] && x['pocetak'] >= pocetak && x['kraj'] <= kraj && kraj != "" && pocetak != ""){
                    obojiDaneRedovne(x['dan']);
                }

                else if(x['naziv'] == sala && mjesecSemestra(mjesec) == x['semestar'] && (pocetak == "" || pocetak == x['pocetak']) && (kraj == "" || kraj == x['kraj'])) { 
                    obojiDaneRedovne(x['dan']);
                }
            });
        } 
    }

    //pohrani u privatne atribute array redovna i vanredna zauzeca
    function ucitajPodatkeImpl(periodicna, vanredna){
            pohraniVanredna = vanredna; 
            pohraniRedovna = periodicna;
    }

    //funkcija koja nam daje broj dana u mjesecu i broj prve kolone od koje ide 1. dan u mjesecu
    function daysInMonth(mjesec) {
        var now = new Date();
        var datumString = new Date(now.getFullYear(), mjesec , 1).toString().substring(0, 3);
        
        for(var i = 0; i <naziviDana.length; i++){
            if (datumString == naziviDana[i]){
                pocetnaKolona = i;
                proba = i;
                break;
            }
        }

        return new Date(now.getFullYear(), mjesec + 1, 0).getDate();
    }


    function iscrtajKalendarImpl(kalendarRef, mjesec){
        //postavimo naziv mjeseca shodno parametru mjesec

        var postaviNazivMjeseca = kalendarRef.childNodes; 
        postaviNazivMjeseca[1].textContent = nazivMjeseca[mjesec];
                    
        var current = daysInMonth(mjesec);
                    
        //sakrij suvisne dane mjeseca   
        for(var i = 0; i <= postaviNazivMjeseca[5].childElementCount; i++){

            if(i > current){
                var pozicija = 2*i - 1;
                postaviNazivMjeseca[5].childNodes[pozicija].style.visibility = 'hidden';
            } 
            
            //uslov koji nam pomaze da sakrivene dane mjeseca prikazemo ako mjesec ima vise dana od prethodno prikazanog mjeseca
            else if(i <= current && i >= 28){
                var pozicija = 2*i - 1;
                postaviNazivMjeseca[5].childNodes[pozicija].style.visibility = 'visible';
            }
        }     
    
        postaviNazivMjeseca[5].childNodes[1].style.gridColumnStart = pocetnaKolona + 1;         
        
            if(mjesec == 0) document.getElementById("back").disabled = true;
            else 
                document.getElementById("back").disabled = false;
            
                if(mjesec == 11) document.getElementById("next").disabled = true;
            else 
                document.getElementById("next").disabled = false;
        
        obojiZauzecaImpl(kalendarRef); 
                    
    }

    return {
        obojiZauzeca: obojiZauzecaImpl,
        ucitajPodatke: ucitajPodatkeImpl,
        iscrtajKalendar: iscrtajKalendarImpl
    }
}());

//hardkodirani podaci za poziv funkcije ucitaj podatke
Kalendar.ucitajPodatke([{"dan":"0", "semestar":"zimski", "pocetak":"13:00", "kraj":"14:00", "naziv":"1-01", "predavac":"xx"},
                        {"dan":"2", "semestar":"ljetni", "pocetak":"14:00", "kraj":"15:00", "naziv":"1-02", "predavac":"xy"},
                        {"dan":"4", "semestar":"ljetni", "pocetak":"13:00", "kraj":"14:00", "naziv":"0-02", "predavac":"xy"},
                        {"dan":"2", "semestar":"zimski", "pocetak":"12:00", "kraj":"13:00", "naziv":"MA", "predavac":"xy"}], 
                       [{"datum":"17.11.2019", "pocetak":"14:00", "kraj":"15:00", "naziv":"1-02", "predavac":"xx"},
                        {"datum":"20.11.2019", "pocetak":"15:00", "kraj":"18:00", "naziv":"1-02", "predavac":"xx"},
                        {"datum":"21.11.2019", "pocetak":"14:00", "kraj":"15:00", "naziv":"1-03", "predavac":"xx"},
                        {"datum":"21.09.2019", "pocetak":"14:00", "kraj":"15:00", "naziv":"EE1", "predavac":"xx"},
                        {"datum":"09.11.2019", "pocetak":"18:00", "kraj":"20:00", "naziv":"MA", "predavac":"xx"}]);

Kalendar.iscrtajKalendar(document.getElementById('calendar'), mjesec);