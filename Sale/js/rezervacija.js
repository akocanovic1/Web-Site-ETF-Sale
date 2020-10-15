Pozivi.ucitajIzBaze();
Pozivi.ucitajBazu();

var odabraniMjesec;
var mjesec=document.getElementById("mjesec").innerHTML;
    var nizMjeseci=['Januar','Februar','Mart','April','Maj','Juni','Juli','August','Septembar','Oktobar','Novembar','Decembar'];
      for(var i=0;i<nizMjeseci.length;i++){
        if(mjesec==nizMjeseci[i]){
          odabraniMjesec=i+1;
        }
      }

var dani=document.getElementsByClassName("brojDana");
var pocetak=document.getElementById("poc");
var kraj=document.getElementById("kraj");
var sala=document.getElementById("sala");


for(var i=0;i<dani.length;i++){
  dani[i].onclick=function(){
    var pocetak=document.getElementById("poc").value;
    var kraj=document.getElementById("kraj").value;
    var sala=document.getElementById("sale").value;
    var mjesec=document.getElementById("mjesec").innerHTML;
    var x=this;
    var odabraniMjesec;
    var nizMjeseci=['Januar','Februar','Mart','April','Maj','Juni','Juli','August','Septembar','Oktobar','Novembar','Decembar'];
    if(x.style.backgroundImage=='-webkit-linear-gradient(bottom, rgb(255, 19, 19), rgb(255, 19, 19) 40%, transparent 0%, transparent 100%)'){
      var pocetak=document.getElementById("poc").value;
      var kraj=document.getElementById("kraj").value;
      var sala=document.getElementById("sale").value;
      for(var i=0;i<nizMjeseci.length;i++){
        if(mjesec==nizMjeseci[i]){
          odabraniMjesec=i+1;
        }
      }
      if(odabraniMjesec==1 || odabraniMjesec==2 || odabraniMjesec==10 || odabraniMjesec==11 || odabraniMjesec==12)
      {Pozivi.upisiBazu(x,document.getElementById("poc").value,kraj,sala,odabraniMjesec,"zimski",false);}
      else{Pozivi.upisiBazu(x,pocetak,kraj,sala,odabraniMjesec,"ljetni",false);}
    }
    else if(confirm("Jeste li sigurni da zelite rezervisati ovaj dan?")==true){
      var mjesec=document.getElementById("mjesec").innerHTML;
      for(var i=0;i<nizMjeseci.length;i++){
        if(mjesec==nizMjeseci[i]){
          odabraniMjesec=i+1;
        }
      }
      var pocetak=document.getElementById("poc").value;
    var kraj=document.getElementById("kraj").value;
    var sala=document.getElementById("sale").value;
      
      if(odabraniMjesec==1 || odabraniMjesec==2 || odabraniMjesec==10 || odabraniMjesec==11 || odabraniMjesec==12)
      {Pozivi.upisiBazu(x,pocetak,kraj,sala,odabraniMjesec,"zimski",true);}
      else{Pozivi.upisiBazu(x,pocetak,kraj,sala,odabraniMjesec,"ljetni",true);}
    }
  }
}
