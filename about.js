//TESTO COLORATO
let coolors = [
  "#FF9900",
  "#FF4E4E",
  "#FF7DBC",
  "#7DA2FF",
  "#FFD37D",
  "#62D282",
  "#4251D6",
];

let allText = document.querySelectorAll(".selfp"); //prendo tutti i paragrafi della descrizione

allText.forEach((txt) => {
  //FUNZIONE CHE SPEZZA IL
  let strTxt = txt.textContent; //prendo il contenuto del testo
  let splitTxt = strTxt.split(""); //creo un array con tutte le parole

  txt.textContent = "";

  for (let i = 0; i < splitTxt.length; i++) {
    txt.innerHTML += "<span>" + splitTxt[i] + "</span>";
  }
});

let snglLet = document.querySelectorAll("span"); //select the single letter;
let l;

snglLet.forEach((l) => {
  l.addEventListener("mouseover", () => {
    l.style.color = coolors[Math.floor(Math.random() * (6 - 0) + 0)];
    l.style.display = "inline-block";
    l.style.transform =
      "translate(" +
      Math.floor(Math.random() * (20 - -20) - 20) +
      "px, " +
      Math.floor(Math.random() * (20 - -20) - 20) +
      "px)";
    l.style.animation = "ease 3s";
    /*    console.log(l)
     */
    setTimeout(function () {
      l.removeAttribute("style");
    }, 1000);
  });
});

//creo una canva di p5 in background così da poter adoperare la posizione del mouse rispetto alla canva per far muovere le
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
}

function touchMoved() {
  touchPos = { x: mouseX, y: mouseY };
  //console.log(touchPos);
}

let touchPos;
let touchPoss = [];

document.addEventListener("touchmove", (e) => {
  snglLet.forEach((l) => {
    const elPos = l.getBoundingClientRect(); //calcolo la posizione dell'elemento
    //calcolo la differenza rispetto alla posizione del mouse rilevata tramite la canva di p5js
    const distx = Math.abs(Math.floor(touchPos.x - elPos.x));
    const disty = Math.abs(Math.floor(touchPos.y - elPos.y));

    if (distx <= 20 && disty <= 20) {
      // Controlla se la differenza in x è almeno 20 pixel
      /* touchPoss.push(l)
          console.log(touchPoss) */
      l.style.color = coolors[Math.floor(Math.random() * (6 - 0) + 0)];
      l.style.display = "inline-block";
      l.style.transform =
        "translate(" +
        Math.floor(Math.random() * (20 - -20) - 20) +
        "px, " +
        Math.floor(Math.random() * (20 - -20) - 20) +
        "px)";
      l.style.animation = "ease 3s";
    }

    setTimeout(function () {
      l.removeAttribute("style");
    }, 1000);
  });
});

document.addEventListener("touchmove", (e) => {
  /* for (let i = 0; i < e.changedTouches.length; i++) {
          tcPos = { x: e.changedTouches[i].screenX, y: e.changedTouches[i].screenY };
          console.log("touches", tcPos); */

  snglLet.forEach((l) => {
    const elPos = l.getBoundingClientRect();
    const distx = Math.abs(Math.floor(touchPos.x - elPos.x));
    const disty = Math.abs(Math.floor(touchPos.y - elPos.y));
    /* console.log(distx, disty); */

    if (distx <= 20 && disty <= 20) {
      // Controlla se la differenza in x è almeno 10 pixel
      l.style.color = coolors[Math.floor(Math.random() * (6 - 0) + 0)];
      l.style.display = "inline-block";
      l.style.transform =
        "translate(" +
        Math.floor(Math.random() * (20 - -20) - 20) +
        "px, " +
        Math.floor(Math.random() * (20 - -20) - 20) +
        "px)";
    }

    setTimeout(function () {
      l.removeAttribute("style");
    }, 1000);
  });
  /*     } */
}); /*














/* document.addEventListener("touchmove", (e) => {

          for (let i = 0; i < e.changedTouches.length; i++) {
            tcPos= {x:e.changedTouches[i].screenX, y:e.changedTouches[i].screenY };

            console.log("touches" + tcPos); 
          }

          
snglLet.forEach((l) => {

        elPos= l.getBoundingClientRect() 
          let distx= Math.floor(tcPos.x - elPos.x)
          let disty= Math.floor(tcPos.y - elPos.y)
          console.log(distx, disty)

          if (-10<=distx<=10 || -10<=disty<=10) {
            l.style.color = coolors[Math.floor(Math.random() * (6 - 0) + 0)]
            l.style.display = "inline-block"
            l.style.transform = "translate(" + Math.floor(Math.random() * (20 - (-20)) - 20) + "px, " + Math.floor(Math.random() * (20 - (-20)) - 20) + "px)";
            /* console.log(l) 
          }

          setTimeout(function(){
            l.removeAttribute('style')
        }, 1000)

        });
    }) */
/* },100) */

/*  console.log(touchPos.x,touchPos.y)
        console.log(l)
        
        l.style.color = coolors[Math.floor(Math.random() * (6 - 0) + 0)]
        l.style.display = "inline-block"
        l.style.transform = "translate(" + Math.floor(Math.random() * (20 - (-20)) - 20) + "px, " + Math.floor(Math.random() * (20 - (-20)) - 20) + "px)";
        console.log(l)

        setTimeout(function () {
            l.removeAttribute('style')
        }, 1000) */
//  }
/*  ) */
/* })  */

/* 
//LINK CHE SI STORTANO
let allLinks = document.querySelectorAll(".contacts"); //prendo tutti i paragrafi della descrizione
console.log(contacts)

allLinks.forEach((a) => {

    l.addEventListener("mouseover"|| "touchmove", () => {

        l.style.transform = "rotate(" + Math.floor(Math.random() * (10 - (-10)) - 10) + "°, 0)";
        console.log(l)
    }) 
    
    l.addEventListener("mouseleave"||'touchend', () => {
        setTimeout((() => { 
            l.style.transform = "rotate(0, 0)";
        }), 1000)
    })

}) */
