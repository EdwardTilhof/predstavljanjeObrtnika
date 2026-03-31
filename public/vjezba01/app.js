
const rezultat = document.getElementById('rezultat');
document.getElementById('izvedi').addEventListener('click', () => {
  rezultat.innerHTML='';
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const c = document.getElementById('c').value;
  const d = document.getElementById('d').value;
  const zadatak = document.getElementById('zadatak').value;


  // 3. zadatak napraviti doma, ima na snimci, Vincent riješio

  // 4. zadatak
  //    Provjera punoljetnosti: 
  //  Korisnik unosi godinu rođenja u polje A. 
  //  Izračunaj njegovu dob u odnosu na tekuću godinu i ispiši je li punoljetan ili nije.


  /*
  [ZADATAK 5]
 Pozitivan, negativan ili nula: 
 Za uneseni broj u polju A ispiši poruku je li on pozitivan, negativan ili je nula.

 ----------------------------------------------------------------
 
 [ZADATAK 6]
 Parnost broja: 
 Provjeri je li uneseni broj u polju A paran ili neparan koristeći modulo operator (%).

 ----------------------------------------------------------------
 
 [ZADATAK 7]
 Ocjenjivanje: 
 Na temelju unesenog broja bodova (0-100) u polje A, ispiši ocjenu:
 90-100: Odličan, 80-89: Vrlo dobar, 70-79: Dobar, 60-69: Dovoljan, <60: Nedovoljan.

 ----------------------------------------------------------------
 
 [ZADATAK 8]
 Djeljivost: 
 Provjeri je li broj u polju A djeljiv s brojem u polju B bez ostatka. 
 Ispiši "Djeljiv je" ili "Nije djeljiv".  
  */

// 5. Ispiši umnozak A i D
if(zadatak==='5'){
const x=Number(a)
const y=Number(d)
if (!x || x===0){
rezultat.innerHTML='Greska'
return
}
if (!y || y===0){
rezultat.innerHTML='Greska'
return
}

rezultat.innerHTML=x*y
  return
}






  if(zadatak==='4'){
    // ovdje rješavati 4. zadata.



    return;
  }

  if(zadatak==='2'){
  const x = Number(a)
  if(!x){
    rezultat.innerHTML='A nije broj'
    return
  }
  const y = Number(b)
  if(!y){
    rezultat.innerHTML='B nije broj'
    return
  }
  const z = Number(c)
  if(!z){
    rezultat.innerHTML='C nije broj'
    return
  }

  if(x<y&&x<z){
    rezultat.innerHTML=x
  }else if(y<x&&y<z){
    rezultat.innerHTML=y
  }else{
    rezultat.innerHTML=z
  }



    return;
  }


  // Za svaki zadatak zahtijevamo određene ulaze
  if (zadatak === '1') {
    //console.log('1. zadatak');
    //console.log(a);

    const x = Number(a); // mogu dobiti NaN
    if(!x){
      rezultat.innerHTML='A nije broj';
      return;
    }

    const y = Number(b);
    if(!y){
      rezultat.innerHTML='B nije broj';
      return;
    }
    // ovdje sam siguran kako imam brojeve u varijablama x i y
    if(x>y){
      rezultat.innerHTML=x;
    }else if(y>x){
      rezultat.innerHTML=y;
    }else{
      rezultat.innerHTML='A i B su isti';
    }
    /*
    if(a>b){
      rezultat.innerHTML=a;
    }else{
      rezultat.innerHTML=b;
    }
      */
    return; // short curcuiting prekida izvođenje cijele funkcije ()=>{}
  }

  // Ovdje će doći drugi zadatak

  
  // ovo će se ispisati ako u HTML dodatke option za zadatak a ovdje ga ne obradite
  rezultat.innerHTML = `Nepoznati zadatak ${zadatak}`;
});



