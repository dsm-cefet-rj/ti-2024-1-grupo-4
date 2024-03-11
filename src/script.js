//Funções das categorias, suas descrições e produtos
function listarItens(idCateg,idSeta){
    var categ = document.getElementById(idCateg);
    var seta = document.getElementById(idSeta);
    if(categ.style.display == "none")
    {
        categ.style.display = "block";
        seta.style.transform = "rotate(90deg)";
    }
    else if(categ.style.display == "block")
    {
        categ.style.display = "none";
        seta.style.transform = "rotate(0deg)";
    }
    else
        categ.style.display = "none";
}