const progress = document.getElementById("progress");
const proxbtn = document.getElementById("prox");
const antbtn = document.getElementById("ant");
const progressSteps = document.querySelectorAll(".progress-step .fa-solid");

let passoatual = 1;

const prox = () => {
    passoatual++;
    refresh();
};
const ant = () => {
    passoatual--;
    if(passoatual < 1) passoatual = 1;
    refresh();
};
const refresh = ()=>{
    progressSteps.forEach((passo,index)=>{
        if(index < passoatual) passo.classList.add("ativo");
        else passo.classList.remove("ativo");
});
    if(passoatual>progressSteps.length-1){
        passoatual = progressSteps.length;
        proxbtn.classList.add("desativado");
    }else proxbtn.classList.remove("desativado");
    if(passoatual === 1)
        antbtn.classList.add("desativado");
    else antbtn.classList.remove("desativado");
    const todaClassesAtivas = document.querySelectorAll(".ativo");

    let width = (todaClassesAtivas.length / progressSteps.length) * 100 - 25;
    progress.style.width = width + todaClassesAtivas.length + "%";
};