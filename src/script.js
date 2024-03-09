//Funções das categorias, suas descrições e produtos
function listarItens(id){
    var elemento = document.getElementById(id);
    if(elemento.style.display == "none")
        elemento.style.display = "block";
    else
        elemento.style.display = "none";
}