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
  let strTxt = txt.textContent; // prendo il contenuto del testo
  let splitTxt = strTxt.split(""); // creo un array con tutte le lettere (inclusi gli spazi)

  txt.textContent = ""; // Svuoto il contenuto del testo

  splitTxt.forEach((char) => {
    // Verifica se il carattere è uno spazio
    if (char === " ") {
      txt.innerHTML += " "; // Aggiungi uno spazio normale (non racchiuso in <span>)
    } else {
      let span = document.createElement("span");
      span.textContent = char;
      txt.appendChild(span); // Aggiungi le altre lettere racchiuse in <span>
    }
  });
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
    const elPos = l.getBoundingClientRect(); // calcolo la posizione dell'elemento
    const distx = Math.abs(Math.floor(touchPos.x - elPos.x)); // distanza x rispetto alla posizione del touch
    const disty = Math.abs(Math.floor(touchPos.y - elPos.y)); // distanza y rispetto alla posizione del touch

    if (distx <= 20 && disty <= 20) {
      // Se la distanza in x e y è inferiore a 20px
      l.style.color = coolors[Math.floor(Math.random() * coolors.length)];
      l.style.display = "inline-block";
      l.style.transform = `translate(${Math.floor(
        Math.random() * 40 - 20
      )}px, ${Math.floor(Math.random() * 40 - 20)}px)`;

      // Lascia la trasformazione attiva per 1 secondo dopo la fine del tocco
      clearTimeout(l.timeout); // Cancella qualsiasi timeout precedente per questo elemento
      l.timeout = setTimeout(() => {
        l.style.transform = "translate(0, 0)"; // Ritorna alla posizione originale
        l.style.color = ""; // Ripristina il colore originale
      }, 1000); // Aspetta 1 secondo prima di resettare lo stile
    }
  });
});

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
