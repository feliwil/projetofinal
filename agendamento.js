function carregaragencia() {
    fetch("https://api-agendamento-william.herokuapp.com/agencia")
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
        fetch("https://api-agendamento-william.herokuapp.com/cadastrar", cabecalho)
            .then(res => res.json())
            .then(res => { window.alert("Gravado com sucesso!") })
            .catch(err => { window.alert("Ocorreu um erro") })



    }



    function filtrar(){
        
        if (
            document.getElementById("chkagencia").checked==false && 
            document.getElementById("chkdata").checked==false &&
            document.getElementById("chkcliente").checked==false
            ){
    
                var rota = "/agendamento";
        }else{
            var rota = "relatoriopor";
            if (document.getElementById("chktitulo").checked==true){
                rota+="titulo";
            }
            if (document.getElementById("chkartista").checked==true){
                rota+="artista";
            }
            var objeto= {
                titulo: document.getElementById("txttitulo").value ,
                artista : {
                    id : document.getElementById("cmbartistas").value
                }
            };
            
            function montartabela(lista) {
                var saida = 
               " <table border='1' align='center'> <tr> " +
               "<th>Agência</th>     <th>Cliente</th>       <th> Celular </th> </tr>"
            
              
            
               for (cont = 0; cont<lista.length; cont++) {
            
                saida+=
                    "<tr>" +
                    "<td>" + lista[cont].nomeAgencia + "</td>" +
                    "<td>" + lista[cont].nomeCli + "</td>" +
                    "<td>" + lista[cont].celularCli + "</td>"+
                    "</tr>";
               }
               saida+="</table>";
               document.getElementById("resultado").innerHTML=saida;
            
            }
            
        
            var cabecalho = {
                method:"POST",
                body : JSON.stringify(objeto),
                headers : {
                    "content-type" : "application/json"
                }
            }
    
            fetch("https://api-agendamento-william.herokuapp.com" + rota, cabecalho)
                .then(res => res.json())
                .then(res => montartabela(res))
                .catch(err => {
                    window.alert("Não existem agendamentos.");
                });
        }    
    }


    