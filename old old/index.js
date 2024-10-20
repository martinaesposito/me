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

        for(let i=0; i<projImages.length; i++){

            projImages[i].style.opacity = "100%"
        }

    })
        
        l.addEventListener("mouseleave", (e) => {
        l.removeAttribute('style');
    })

    })


let columnNodelist    = document.querySelectorAll("div[class^='line'");
let columns=  Array.from(columnNodelist )

    columns. forEach((l) => {
        
        l.addEventListener("mousewheel", (event) => {
       event.preventDefault();
       console.log(scrollY, l)
       l.style.position=+ 10+"px";
       /* const deltaY = event.deltaY;
       l.scrollTop += deltaY * 0.03; */
    })
})
/* 

 */

/* $(document).ready(function(){ 
    $(window).scroll(function(){
        $('.column-reverse').css('transform', 'translate3d(0,' + $(this).scrollTop()*2 + 'px, 0)'); 
     }).scroll();
  });  
 */
/*   $(window).on('scroll',function(){
    $("div[class^='line'").css('bottom',$(window).scrollTop());
    $(".column-reverse").css('bottom',$(window).scrollTop()*-1);
    
}); */

document.addEventListener("scroll", ()=>{
    console.log(scrollY)

    let columns= document.getElementsByClassName("column-reverse")
    columns. forEach((l) => { 
        l.style.position=+ 10+"px";})

})