class Tanana {
    constructor(nom, sucTan) {
        this.nom = nom;
        this.suc = sucTan;
    }
}
class chemin {
    constructor(destn, lgr) {
        this.toeran2 = destn;
        this.dist = lgr;
    }
}//<>
function minimum(a, b) {
    if (a > b) { min = b; }
    else { min = a; }
    return min;
}
ListeTanana = new Array(
    //Tanana tety akaikynay ihany na natao fa betsaka loatra ireo izy
new Tanana("Ivato",new Array(new chemin("Talatamaty", 8))),
new Tanana("Ambohidratrimo", new Array(new chemin("Talatamaty", 5), new chemin("Mahitsy", 10))),
new Tanana("Mahitsy", new Array(new chemin("Ambohidratrimo", 10))),
new Tanana("Talatamaty", new Array(new chemin("Ivato", 8), new chemin("Ambohidratrimo", 5), new chemin("Ambohibao", 2))),
new Tanana("Ambohibao", new Array(new chemin("Talatamaty", 2), new chemin("Andranomena", 3))),
new Tanana("Andranomena", new Array(new chemin("Ambohibao", 3), new chemin("Ambodimita",  2))),
new Tanana("Ambodimita", new Array(new chemin("Ambohimandray", 10), new chemin("Andranomena", 2), new chemin("Andohitapenaka",9))),
new Tanana("Andohitapenaka", new Array(new chemin("Ambodimita", 9), new chemin("67Ha", 4))),
new Tanana("Ambohimandray", new Array(new chemin("Ambodimita", 12), new chemin("Ambohimanarina", 11))),
new Tanana("Ambohimanarina", new Array(new chemin("Ambohimandray", 11), new chemin("Andraharo"), 10)),
new Tanana("Andraharo", new Array(new chemin("Ambohimanarina", 10), new chemin("Ankazomanga", 8))),
new Tanana("Ankazomanga", new Array(new chemin("Ankorondrano", 7), new chemin("Andraharo", 8), new chemin("Antomadinika", 5), new chemin("Antanimena", 7))),
new Tanana("Antanimena", new Array(new chemin("Ankazomanga", 7), new chemin("Vassacos", 2), new chemin("Analakely", 4))),
new Tanana("Antomadinika", new Array(new chemin("Vassacos", 4), new chemin("Ankazomanga", 5), new chemin("67Ha", 4))),
new Tanana("Vassacos", new Array(new chemin("Antomadinika", 4), new chemin("Antanimena", 2))),
new Tanana("67Ha", new Array(new chemin("Andohitapenaka", 4), new chemin("Antomadinika", 4)))
);
class pluscourt {
    constructor(t1, pcc) {
        this.tan = t1;
        this.pcc = pcc;
    }
}

function estVide(obj) {
    return Object.keys(obj).length === 0;
}
var Envoyer = document.getElementById('OK');
Envoyer.addEventListener('click', function(dd) {// action miseho rehefa miclic an'le bouton manana id=OK
    dd.preventDefault();
    var e = document.getElementById("origine");
    var start = e.options[e.selectedIndex].value;
    var val = document.getElementById("vali");
    var des = document.getElementById("desti");
    var destina = des.options[des.selectedIndex].value;
    var SomNonV = ListeTanana;
    var distance = new Array();
    var Ipcc = new Array();
    t = 0;
    var debut;
    //Etape 1 ***********************************************************************
    for (let i = 0; i < SomNonV.length; i++) {//on cherche si start est un elem de SomNonV
        if (SomNonV[i].nom == start) {
            debut = SomNonV[i];
            break;
        }
    }
    distance[t] = new pluscourt(debut, 0);
    var esorina = SomNonV.indexOf(debut);
    if (esorina > -1) {
        SomNonV.splice(esorina, 1);//On enleve l'elem debut(start) du SomNonV
    }
    for (let i = 0; i < SomNonV.length; i++) {//Pour tout elem du SomNonV
        for (let j = 0; j < debut.suc.length; j++) {//Pour tous les successeur de l'elem debut
            if (SomNonV[i].nom == debut.suc[j].toeran2) {// si elem du SomNonV = Elem du Suc
                nb = new pluscourt(SomNonV[i], debut.suc[j].dist);//pcc de l'elem de SomNonV = Distance entre le debut et le suc
            }
            else {
                nb = new pluscourt(SomNonV[i], Infinity);//Sinon pcc = infinie
            }
        }
        Ipcc[i] = nb;
    }
    
    while (SomNonV.length > 0) {
       //Etape 2 *****************************************************************************
       var mini;
        t++;
        for (let i = 0; i < Ipcc.length - 1; i++) {
            for (let j = i++; j < Ipcc.length; j++) {//trier-na ny Ipcc ijerena ny minimum
                if (Ipcc[i].pcc > Ipcc[j].pcc) {
                    tmp = Ipcc[i];
                    Ipcc[i] = Ipcc[j];
                    Ipcc[j] = tmp;
                } 
            }
        }
        for (let i = 0; i < SomNonV.length; i++) {
            if (Ipcc[0].tan == SomNonV[i]) {
                distance[t] = Ipcc[0];
                mini = distance[t].tan;
                var esorina = SomNonV.indexOf(mini);
                if (esorina > -1) {
                    SomNonV.splice(esorina, 1);//On enleve l'elem mini du SomNonV
                }
                var pccMiala = Ipcc.indexOf(distance[t]);
                if (pccMiala > -1) {
                    Ipcc.splice(pccMiala, 1);//On enleve l'elem mini du Ipcc
                }
                break;
            }
        }
        if (estVide(SomNonV)) { 
            break; 
        }
        else {//Etape 3
            for (let i = 0; i < SomNonV.length; i++) {
                for (let j = 0; j < mini.suc.length; j++) {
                    if (SomNonV[i] == mini.suc[j]) {
                        x = distance[t].pcc + mini.suc[j].dist;
                        for (let k = 0; k < Ipcc.length; k++) {
                            if (Ipcc[k].tan == SomNonV[i]) {
                                y = Ipcc[k].pcc;
                                z = minimum(x, y);
                                Ipcc[k].pcc == z;
                            }
                        }
                    }
                }
            }
        }
    }
    var i = 0;

    var reponse = "The itinerary is : ";
    while (i < distance.length) {
        reponse = reponse + distance[i].tan.nom +" ";
        val.innerHTML = reponse;
        if (distance[i].tan.nom == destina) {
            break;
        }
        else { 
            i++;
        }
    }
    
});
