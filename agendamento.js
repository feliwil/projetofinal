function carregaragencia() {
    fetch("http://localhost:8080/agencia")
        .then(res => res.json())
        .then(res => preencheragencia(res));
}


function preencheragencia(lista) {
    var saida = "";
    for (cont = 0; cont < lista.length; cont++) {
        saida +=
            "<option value='" + lista[cont].id + "'>" + lista[cont].nomeAgencia + "</option>";

    }
    document.getElementById("cmbagencia").innerHTML = saida;
}





    function cadastrar() {
        var data = document.getElementById("txtdata").value;
        var ano = data.substring(0, 4);
        var mes = data.substring(5, 7);
        var dia = data.substring(8, 10);
        var databrasil = dia + "/" + mes + "/" + ano;
        
    
        var objeto = {
            nomeCli: document.getElementById("txtcliente").value,
            dataAgendamento: databrasil,
            emailCli: document.getElementById("txtemail").value,
            celularCli : document.getElementById("txtcelular").value,
            horaAgendamento: document.getElementById("cmbhora").value + ":00",
            observacao : document.getElementById("txtobs").value,
            agencia: {
                id: document.getElementById("cmbagencia").value
            }
        }
    
        var cabecalho = {
            method: "POST",
            body: JSON.stringify(objeto),
            headers: {
                "Content-type": "application/json"
            }
        }
        fetch("http://localhost:8080/cadastrar", cabecalho)
            .then(res => res.json())
            .then(res => { window.alert("Gravado com sucesso!") })
            .catch(err => { window.alert("Ocorreu um erro") })
    }
