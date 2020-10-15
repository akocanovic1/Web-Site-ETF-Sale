var p=[];
var v=[];
var i=0;
var j=1;
var k=2;
var br=0;

let Pozivi=(function(){
  function slikeSljedeciImpl(){
    var nizSlika=['/assets/spongebob.png','/assets/patrickSp.png', '/assets/spongebob.png', '/assets/plankton.png','/assets/all.png','/assets/sandy.png','/assets/puff.png', '../assets/squid.png','../assets/gary.png','../assets/krab.png'];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("prethodni").style.visibility= 'visible';
        
        if(k==8){
            document.getElementById("slika1").src = nizSlika[k+1];
            document.getElementById("slika2").style.visibility = ' hidden';
            document.getElementById("slika3").style.visibility = 'hidden';
            document.getElementById("sljedeci").style.visibility= 'hidden';
        }
        else{
      document.getElementById("slika1").src = nizSlika[i+3];
      document.getElementById("slika2").src = nizSlika[j+3];
      document.getElementById("slika3").src = nizSlika[k+3];
      i+=3;
      j+=3;
      k+=3;
        }
    }
  };
  xhttp.open("GET", "pocetna.html", true);
  xhttp.send();
  
  var sljedeci= document.getElementById("sljedeci");
  var prethodni= document.getElementById("prethodni");
  document.getElementById("prethodni").onclick=function() {
    if(sljedeci.style.visibility=='hidden' && k==8){
        sljedeci.style.visibility= 'visible';
        document.getElementById("slika3").style.visibility= 'visible';
        document.getElementById("slika2").style.visibility = ' visible';
        document.getElementById("slika1").src = nizSlika[6];
        document.getElementById("slika2").src = nizSlika[7];
        document.getElementById("slika3").src = nizSlika[8];
        i-=3;
        j-=3;
        k-=3;
      }
       else{
        document.getElementById("slika1").src = nizSlika[i];
        document.getElementById("slika2").src = nizSlika[j];
        document.getElementById("slika3").src = nizSlika[k];
        if(i==0){
        prethodni.style.visibility='hidden';}
        i-=3;
        j-=3;
        k-=3;
       } 
  }
}
// UCITAVANJE POCETNOG JSONA
function ucitajImpl(){
  var xhttp=new XMLHttpRequest();
  xhttp.open("GET", "../assets/zauzeca.json", true);
  xhttp.onload= function(){
    data= JSON.parse(xhttp.responseText);
   
  
    for(var i=0;i<data.periodicna.pocetak.length;i++){
      p[i]={"dan":data.periodicna.dan[i], "semestar":data.periodicna.semestar[i], "pocetak":data.periodicna.pocetak[i], "kraj":data.periodicna.kraj[i], "naziv":data.periodicna.naziv[i], "predavac":data.periodicna.predavac[i]};
    }
    for(var i=0;i<data.vanredna.pocetak.length;i++){
      v[i]={"datum":data.vanredna.datum[i], "pocetak":data.vanredna.pocetak[i], "kraj":data.vanredna.kraj[i], "naziv":data.vanredna.naziv[i], "predavac":data.vanredna.predavac[i]};
    }
    //Kalendar.ucitajPodatke(p,v);
  }
xhttp.send();
}

// REZERVACIJE
var data;
function rezervisiImpl(x,pocetak,kraj,sale,mjesec1,semestar){
  var br=0;
  var box= document.getElementById("check");
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "../assets/zauzeca.json", true);
  xhttp.onload= function(){
     data= JSON.parse(xhttp.responseText);
    if(box.checked==false){     // za vanredna zauzeca
      for(var i=0;i<data.vanredna.pocetak.length;i++){
        var danjson=data.vanredna.datum[i][0]+data.vanredna.datum[i][1];
        var mjesecjson=data.vanredna.datum[i][3]+data.vanredna.datum[i][4];
        if(x.innerHTML==danjson && pocetak==data.vanredna.pocetak[i] && kraj==data.vanredna.kraj[i] && sale==data.vanredna.naziv[i] && mjesec1==mjesecjson){
          window.alert("Nije moguce rezervisati salu:"+sale+ ", za navedeni datum: "+danjson+"/"+mjesec1+"/2019 i termin od "+pocetak+" do "+ kraj+"!");
          br++;
          break;
      }
    }
    if(br==0){
      var mjesec=document.getElementById("mjesec");
      x.style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
      x.style.backgroundImage= '-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
      var json={"vanredna": {"datum":x.innerHTML+"."+mjesecjson,
    "pocetak":pocetak,
    "kraj":kraj,
    "naziv":sale,
    "predavac":null}};
    var saljemo=JSON.stringify(json);
    data.vanredna.datum.push(x.innerHTML+"."+mjesecjson+".2019");
    data.vanredna.pocetak.push(pocetak);
    data.vanredna.kraj.push(kraj);
    data.vanredna.naziv.push(sale);
    data.vanredna.kraj.push(null);
    v.push({"datum":x.innerHTML+"."+mjesecjson+".2019", "pocetak":pocetak, "kraj":kraj, "naziv":sale, "predavac":null});
    //Kalendar.ucitajPodatke(p,v);
  
  }
  }
  if(box.checked==true){        //za periodicna
    var br1=0;
    var datum=mjesec1+"/"+ x.innerHTML +"/2020";
    var praviDatum=new Date(datum);
    var mj=praviDatum.getMonth();
    var dan=praviDatum.getDay();
    for(var i=0;i<data.periodicna.pocetak.length;i++){
      if(mj==6 || mj==7 || mj==8){
        window.alert("Ne mozete napraviti periodicna zauzeca za ovaj mjesec");
      }
      else if(dan==data.periodicna.dan[i] && pocetak==data.periodicna.pocetak[i] && kraj==data.periodicna.kraj[i] && sale==data.periodicna.naziv[i] && semestar==data.periodicna.semestar[i]){
        window.alert("Odabrani dan je vec zauzet");
        br1++;
        break;
    }
      if(br1==0){
        var sviDani=document.getElementsByClassName("brojDana");
        for(var i=0;i<sviDani.length;i++){
          if(sviDani[i].innerHTML==x.innerHTML){
            sviDani[i].style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            sviDani[i].style.backgroundImage='-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            for(var j=i;j<sviDani.length;j+=7){
              sviDani[j].style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
              sviDani[j].style.backgroundImage='-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            }
            p.push({"dan":dan-1, "semestar":semestar, "pocetak":pocetak, "kraj":kraj, "naziv":sale, "predavac":null});
            
            //Kalendar.ucitajPodatke(p,v);
          }
        }
      }
  }
  }
  }
xhttp.send();
}
//BAZA ZA PROFESORE
function ucitajBazuImpl(){
  var profesori=document.getElementById("profesor");
  var option=document.createElement("option");
  var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {// Anonimna funkcija
            if (ajax.readyState == 4 && ajax.status == 200){
                let jsonRez =ajax.responseText;
                var imePrezime=JSON.parse(jsonRez);
                var zaProslijediti;
                for(i=0;i<jsonRez.length;i++){
                  var opt = document.createElement('option');
                  opt.value = i;
                  opt.innerHTML=imePrezime[i].ime+" "+imePrezime[i].prezime;
                  profesori.appendChild(opt);
                }
            }
          else if (ajax.readyState != 4) {
            console.log("greska");}
          }
        ajax.open("GET", "/osoblje", true);
        ajax.send();
}
// UCITAVANJE BAZE ZA REZERVACIJE-CIJELA BAZA
function ucitajIzBazeImpl(){
  var ajax= new XMLHttpRequest();
  ajax.onreadystatechange=function(){
    if(ajax.readyState==4 && ajax.status==200){
      data= JSON.parse(ajax.responseText);
    for(var i=0;i<data.length;i++){
      if(data[i].redovni==true){
        p[i]={"dan":data[i].dan, "semestar":data[i].semestar, "pocetak":data[i].pocetak, "kraj":data[i].kraj, "naziv":null, "predavac":null};
      }
      else{
        v[i]={"datum":data[i].datum, "pocetak":data[i].pocetak, "kraj":data[i].kraj, "naziv":data[i].sala, "predavac":data[i].profesor};
      }
    }
   // Kalendar.ucitajPodatke(p,v);
    //Kalendar.obojiZauzeca(document.getElementById("calendar"),mjesec,document.getElementById("sala"),document.getElementById("poc"),document.getElementById("kraj"));
    }
    else if (ajax.readyState != 4) {
      console.log("greska");}
    }
    ajax.open("GET", "/ucitajIzBaze", true);
    ajax.send();
}

function upisiBazuImpl(x,pocetak,kraj,sale,mjesec1,semestar,zauzeto){
  var box= document.getElementById("check");
  var odabranalicnost=document.getElementById('profesor').options[document.getElementById('profesor').selectedIndex].text;

  var imeProfesora='';
  var prezimeProfesora='';
  var j;
  for(i=0;i<odabranalicnost.length;i++){
      if(odabranalicnost[i]!=' ') {
          imeProfesora+=odabranalicnost[i];
      }
      if(odabranalicnost[i]==' '){
          j=i;
          break;
      }
  }
  for(j=i+1;j<odabranalicnost.length;j++){if(odabranalicnost[j]==' '){}else{prezimeProfesora+=odabranalicnost[j];}
  }


  var datum=mjesec1+"/"+ x.innerHTML +"/2020";
    var praviDatum=new Date(datum);
    var mj=praviDatum.getMonth();
    var dan=praviDatum.getDay();
    var zauzece;
  if(box.checked==false){
     zauzece={
      redovni:false,
      dan: null,
      datum:x.innerHTML+"."+mjesec1+".2020",
      semestar: semestar,
      pocetak: pocetak,
      kraj: kraj,
      zauzeto:zauzeto,
      ime:imeProfesora,
      prezime:prezimeProfesora,
      sala:sale
    }
  }else{
     zauzece={
      "redovni":true,
      "dan": dan,
      "datum":null,
      "semestar": semestar,
      "pocetak": pocetak,
      "kraj": kraj,
      "zauzeto" :zauzeto,
      "ime":imeProfesora,
      "prezime":prezimeProfesora,
      "sala":document.getElementById("sale").value
    }
  }
  var ajax= new XMLHttpRequest();
  ajax.onreadystatechange=function(){
    if(ajax.readyState==4 && ajax.status==200){

      if(zauzeto==false){
        data=ajax.responseText;
        window.alert("Istu rezervaciju izvrsila je osoba: " + data);

      }else{
      if(box.checked==true){
        var sviDani=document.getElementsByClassName("brojDana");
        for(var i=0;i<sviDani.length;i++){
          if(sviDani[i].innerHTML==x.innerHTML){
            sviDani[i].style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            sviDani[i].style.backgroundImage='-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            for(var j=i;j<sviDani.length;j+=7){
              sviDani[j].style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
              sviDani[j].style.backgroundImage='-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            }
            p.push({"dan":dan-1, "semestar":semestar, "pocetak":pocetak, "kraj":kraj, "naziv":sale, "predavac":null});
            
            //Kalendar.ucitajPodatke(p,v);
           }
        }
      }
      else{
        x.style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
        x.style.backgroundImage= '-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
        v.push({"datum":x.innerHTML+"."+mjesec1+".2019", "pocetak":pocetak, "kraj":kraj, "naziv":sale, "predavac":null});
        //Kalendar.ucitajPodatke(p,v);
       
      }
    }}
    else if (ajax.readyState != 4) {
      console.log("greska");}
    }
    ajax.open("POST", "/upisiUbazu", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(zauzece));
  }
// OSOBLJE
  function ucitajOsobljeImpl(){
    var ajax= new XMLHttpRequest();
    ajax.onreadystatechange=function(){
    if(ajax.readyState==4 && ajax.status==200){
      data=JSON.parse(ajax.responseText);
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      if(today.getMonth()==0){var datum=today.getDate()+".1"+"."+today.getFullYear();}
      if(today.getMonth()==1){var datum=today.getDate()+".2"+"."+today.getFullYear();}
      if(today.getMonth()==2){var datum=today.getDate()+".3"+"."+today.getFullYear();}
      if(today.getMonth()==3){var datum=today.getDate()+".4"+"."+today.getFullYear();}
      if(today.getMonth()==4){var datum=today.getDate()+".5"+"."+today.getFullYear();}
      if(today.getMonth()==5){var datum=today.getDate()+".6"+"."+today.getFullYear();}
      if(today.getMonth()==6){var datum=today.getDate()+".7"+"."+today.getFullYear();}
      if(today.getMonth()==7){var datum=today.getDate()+".8"+"."+today.getFullYear();}
      if(today.getMonth()==8){var datum=today.getDate()+".9"+"."+today.getFullYear();}
      if(today.getMonth()==9){var datum=today.getDate()+".10"+"."+today.getFullYear();}
      if(today.getMonth()==10){var datum=today.getDate()+".11"+"."+today.getFullYear();}
      if(today.getMonth()==11){var datum=today.getDate()+".12"+"."+today.getFullYear();}
  
      var osoblje=document.getElementById("osobe");
      osoblje.innerHTML="<b> Trenutno vrijeme: </b>       "+ time+"</br>";
      var osobe=data[0];
      var sale=data[1];
      var termini=data[2];
      var rezervacije=data[3];
      var terminiId=[];
      var salaId=[];
      var osobaId=[];
      var dan=today.getDay();
      for(i=0;i<termini.length;i++){
        if(termini[i].pocetak<=time && termini[i].kraj>=time && termini[i].dan==null && termini[i].datum==datum){      //VADIMO SVE TERMINE ZA TRENUTNO VRIJEME
          terminiId.push(termini[i].id);
        }
        if(termini[i].pocetak<=time && termini[i].kraj>=time && termini[i].datum==null && termini[i].dan==dan){      //VADIMO SVE TERMINE ZA TRENUTNO VRIJEME
          terminiId.push(termini[i].id);
        }
      }
      for(i=0;i<rezervacije.length;i++){                            //VADIMO SVE REZERVACIJE, OSOBE I SALE ZA TE TERMINE
        for(j=0;j<terminiId.length;j++){
          if(rezervacije[i].termin==terminiId[j]){
            salaId.push(rezervacije[i].sala);
          }
        }
      }
      for(i=0;i<sale.length;i++){
        for(j=0;j<salaId.length;j++){
          if(sale[i].id==salaId[j]){
            osobaId.push(sale[i].zaduzenaOsoba);
            for(k=0;k<osobe.length;k++){
              if(osobe[k].id==sale[i].zaduzenaOsoba){
                      var node = document.createElement("li");  
                      node.innerHTML=osobe[k].ime + " "+osobe[k].prezime + "      : " +sale[i].naziv+ "</br>";         // Create a text node
                      osoblje.appendChild(node);
              }
            }
          }
        }  
      }
      var postoji=false;
      for(i=0;i<osobe.length;i++){
        for(j=0;j<osobaId.length;j++){
          if(osobe[i].id==osobaId[j]){
            postoji=true; break;}
          else{postoji=false;}
        }
        if(postoji==false){
          var node = document.createElement("li");  
          node.innerHTML=osobe[i].ime + " "+osobe[i].prezime +":      U kancelariji </br>";         // Create a text node
          osoblje.appendChild(node);
        }
      }
      setTimeout(function(){
        while (osoblje.hasChildNodes()) {  
          osoblje.removeChild(osoblje.firstChild);
        }
        ucitajOsobljeImpl();
    }, 30000);
    }
  }
    ajax.open("GET", "/ucitajOsoblje", true);
    ajax.send();
  }

//FILTRIRANJE PODATAKA
function filtrirajPodatkeImpl(pocetak,kraj,sala,periodicnost,profesor){
  var sviDani=document.getElementsByClassName("brojDana");
  for(i=0;i<sviDani.length;i++){sviDani[i].style.backgroundImage='-webkit-linear-gradient(bottom, #08F709, #08F709 40%, transparent 0%, transparent 100%)';sviDani[i].style.backgroundImage='linear-gradient(bottom, #08F709, #08F709, transparent 0%, transparent 100%)';}
  var odabranalicnost=document.getElementById('profesor').options[document.getElementById('profesor').selectedIndex].text;
  var mjesec=document.getElementById("mjesec").innerHTML;
  var odabraniMjesec;
  var nizMjeseci=['Januar','Februar','Mart','April','Maj','Juni','Juli','August','Septembar','Oktobar','Novembar','Decembar'];
  for(var i=0;i<nizMjeseci.length;i++){
    if(mjesec==nizMjeseci[i]){
      odabraniMjesec=i+1;
    }
  }
  var dan;
  var mjesecKalendara;
  var imeProfesora='';
  var prezimeProfesora='';
  var j;
  for(i=0;i<odabranalicnost.length;i++){
      if(odabranalicnost[i]!=' ') {
          imeProfesora+=odabranalicnost[i];
      }
      if(odabranalicnost[i]==' '){
          j=i;
          break;
      }
  }
  for(j=i+1;j<odabranalicnost.length;j++){if(odabranalicnost[j]==' '){}else{prezimeProfesora+=odabranalicnost[j];}
  }
  if(periodicnost.checked==true){var filter={pocetak:pocetak,kraj:kraj,sala:sala,periodicnost:true,profesorIme:imeProfesora,profesorPrezime:prezimeProfesora};}
  else{var filter={pocetak:pocetak,kraj:kraj,sala:sala,periodicnost:false,profesorIme:imeProfesora,profesorPrezime:prezimeProfesora};}
  var ajax= new XMLHttpRequest();
    ajax.onreadystatechange=function(){
    if(ajax.readyState==4 && ajax.status==200){
      
        data=JSON.parse(ajax.responseText);
        if(data.postoji!=false){
          for(i=0;i<data.length;i++){
            if(data[i].dan!=null){dan=data[i].dan;}
          //EKSTRAKTUJEMO MJESEC
          if(data[i].datum!=null){
          if(data[i].datum[1]=='.'){dan=data[i].datum[0];}else{dan=data[i].datum[0]+data[i].datum[1];} //EKSTRAKTUJEMO DAN
          if(data[i].datum[1]=='.' && data[i].datum[3]=='.'){mjesecKalendara=data[i].datum[2];}
          if(data[i].datum[2]=='.' && data[i].datum[5]=='.'){mjesecKalendara=data[i].datum[3]+data[i].datum[4];}
          if(data[i].datum[2]=='.' && data[i].datum[4]=='.'){mjesecKalendara=data[i].datum[3];}
          if(data[i].datum[1]=='.' && data[i].datum[4]=='.'){mjesecKalendara=data[i].datum[2]+data[i].datum[3];}
          }
          if(periodicnost.checked==true){
            
            for(var j=0;j<sviDani.length;j++){
            if(sviDani[j].innerHTML==data[i].dan){
            sviDani[j].style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            sviDani[j].style.backgroundImage='-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            for(var k=j;k<sviDani.length;k+=7){
              sviDani[k].style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
              sviDani[k].style.backgroundImage='-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            }
          }
        }
    }
         else{
          for(var j=0;j<sviDani.length;j++){
            if(sviDani[j].innerHTML==dan && mjesecKalendara==odabraniMjesec){
            sviDani[j].style.backgroundImage='linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';
            sviDani[j].style.backgroundImage='-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)';}}
          }
        }
      } else{ console.log(data);}
    }
  }
    ajax.open("POST", "/filtrirajPodatke", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(filter));

}
    


return{
  ucitaj: ucitajImpl,
  rezervisi: rezervisiImpl,
  slikeSljedeci: slikeSljedeciImpl,
  ucitajBazu: ucitajBazuImpl,
  upisiBazu: upisiBazuImpl,
  ucitajIzBaze: ucitajIzBazeImpl,
  ucitajOsoblje: ucitajOsobljeImpl,
  filtrirajPodatke: filtrirajPodatkeImpl
}
}());


