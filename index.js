let nodelist;

let allImages = []

let projImages = []

/* 
document.addEventListener("load", ()=> {
    for (i=0; i>9; i++){
 */
nodelist = document.querySelectorAll("div[class^='item'")
allImages = Array.from(nodelist)
console.log(allImages)
/*     }

}) */



    allImages.forEach((l) => {
        console.log(l)
        l.addEventListener("mouseenter", (e) => {
            
        allImages.forEach((e)=>{
            e.style.opacity = "50%"
        })

        let elementCLass= l.className
        console.log(elementCLass)

        projImages= document.getElementsByClassName(elementCLass)

        for(i=0; i<projImages.length; i++){

            projImages[i].style.opacity = "100%"
        }


    })
        
        l.addEventListener("mouseleave", (e) => {
        l.removeAttribute('style');
    })

    })