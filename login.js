function logar() {

    
    var objeto = {
        "email": document.getElementById("txtemail").value,
        "racf" : document.getElementById("txtemail").value,
        "senha": document.getElementById("txtsenha").value,
    }
    var cabecalho = {
        method: "POST",
        body: JSON.stringify(objeto),
        headers: {
            "Content-type": "application/json"
        }

    }

    fetch("http://localhost:8080/login", cabecalho).
        then(res => res.json()).
        then(res => {
            localStorage.setItem("logado", JSON.stringify(res));
            window.location = "relatorio.html"

        }).
        catch(err => { window.alert("Falha no login. Tente novamente.") });

}


function carregarusuario() {
    var usuariologado = localStorage.getItem("logado");
    if (usuariologado == null) {
        window.location = "login.html";
    } else {
        var usuariojson = JSON.parse(usuariologado);
        document.getElementById("foto").innerHTML = "<img width='100%' height='100%' alt='Foto não encontrada' src=imagens/" + usuariojson.foto + ">"
        document.getElementById("dados").innerHTML="<h3>" + usuariojson.nome + " " + "("+ usuariojson.racf + ")</h3>"

    }

}


function deslogar() {
    
    localStorage.removeItem("logado");
    window.location = "login.html";


    
}

