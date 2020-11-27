

function carregaragencia() {
    fetch("http://localhost:8080/agencia")
        .then(res => res.json())
        .then(res => preencheragencia(res));
}


function preencheragencia(lista) {
    var saida = "<option value = ''> Selecione a agência. </option>";

    for (cont = 0; cont < lista.length; cont++) {
        saida +=
            
            "<option value='" + lista[cont].id + "'>" + lista[cont].nomeAgencia + "</option>";

    }
    document.getElementById("cmbagencia").innerHTML = saida;
}





function cadastrar() {
    
    if (!document.getElementById("txtcliente").value) {
        window.alert("Nome Obrigatório!");
        return;
    }

    if (!document.getElementById("txtemail").value || !document.getElementById("txtemail").value.includes('@')) {
        window.alert("Digite um email válido.");
        return;
    }
    if (!document.getElementById("txtcelular").value) {
        window.alert("Celular Obrigatório!");
        return;
    }
    if (!document.getElementById("txtdata").value) {
        window.alert("Data Obrigatória.");
        return;
    }
    if (!document.getElementById("cmbagencia").value==1) {
        window.alert("Agência Obrigatória.");
        return;
    }

    if (document.getElementById("cmbhora").value==1) {
        window.alert("Hora Obrigatória.");
        return;
    }

    var data = document.getElementById("txtdata").value;
    var ano = data.substring(0, 4);
    var mes = data.substring(5, 7);
    var dia = data.substring(8, 10);
    var databrasil = dia + "/" + mes + "/" + ano;


    var objeto = {
        nomeCli: document.getElementById("txtcliente").value,
        dataAgendamento: databrasil,
        emailCli: document.getElementById("txtemail").value,
        celularCli: document.getElementById("txtcelular").value,
        horaAgendamento: document.getElementById("cmbhora").value + ":00",
        observacao: document.getElementById("txtobs").value,
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
        .then(res => { finalizarcadastro() })
        .catch(err => { window.alert("Ocorreu um erro") })



}
 
 function finalizarcadastro() {
     window.alert("Gravado com sucesso!");

    document.getElementById("txtcliente").value='';
     document.getElementById("txtemail").value='';
      document.getElementById("txtcelular").value='';
    document.getElementById("cmbhora").value = 1 ;
     document.getElementById("txtobs").value='';
     document.getElementById("cmbagencia").value = '';
     document.getElementById("txtdata").valueAsDate=null;

 }


function filtrar() {
    var databrasil = null;
    if (document.getElementById("chkdata").checked==true)
    {

    
    var data = document.getElementById("txtdata").value;
    var ano = data.substring(0, 4);
    var mes = data.substring(5, 7);
    var dia = data.substring(8, 10);
     databrasil = dia + "/" + mes + "/" + ano;
    }


    if (
        document.getElementById("chkagencia").checked == false &&
        document.getElementById("chkdata").checked == false &&
        document.getElementById("chkcliente").checked == false
    ) {

        var rota = "/agendamento";
    }else if
        (
        document.getElementById("chkagencia").checked == true &&
        document.getElementById("chkdata").checked == false &&
        document.getElementById("chkcliente").checked == false
    ) {
        var rota = "/agendamentoagencia";
    } else if
        (
        document.getElementById("chkagencia").checked == false &&
        document.getElementById("chkdata").checked == true &&
        document.getElementById("chkcliente").checked == false
    ) {
        
        var rota = "/agendamentodata";
    }
    else if
    (
        document.getElementById("chkagencia").checked == false &&
        document.getElementById("chkdata").checked == false &&
        document.getElementById("chkcliente").checked == true
    ) {
        var rota = "/agendamentocliente";
    }
    else if
    (
        document.getElementById("chkagencia").checked == true &&
        document.getElementById("chkdata").checked == true &&
        document.getElementById("chkcliente").checked == false
    ) {
        var rota = "/agendamentoagenciadata";
    }
    else if
    (
        document.getElementById("chkagencia").checked == false &&
        document.getElementById("chkdata").checked == true &&
        document.getElementById("chkcliente").checked == true
    ) {
        var rota = "/agendamentoclientedata";
    }
    else if
    (
        document.getElementById("chkagencia").checked == true &&
        document.getElementById("chkdata").checked == false &&
        document.getElementById("chkcliente").checked == true
    ) {
        var rota = "/agendamentoclienteagencia";
    } else
    
     {
        var rota = "/agendamentoclienteagenciadata";
    }



var objeto = {
    agencia: {
        id: document.getElementById("cmbagencia").value
    },
    dataAgendamento: databrasil,
    nomeCli: document.getElementById("txtcliente").value
}

var cabecalho = {
    method: "POST",
    body: JSON.stringify(objeto),
    headers: {
        "content-type": "application/json"
    }



}

fetch("http://localhost:8080" + rota, cabecalho)
    .then(res => res.json())
    .then(res => montartabela(res))
    .catch(err => {
       window.alert("Não existem agendamentos.");
       
    });

}







function montartabela(lista) {
    var saida =
        " <table   border='1' align='center'> <tr> " +
        "<th>Agência</th>     <th>Cliente</th>  <th> Data Agendamento </th>  <th> Horário Início </th>   <th> Celular </th>   </tr>"



    for (cont = 0; cont < lista.length; cont++) {

        saida +=
            "<tr>" +
            "<td>" + lista[cont].agencia.nomeAgencia + "</td>" +
            "<td>" + lista[cont].nomeCli + "</td>" +
            "<td>" + lista[cont].dataAgendamento + "</td>" +
            "<td>" + lista[cont].horaAgendamento + "</td>" +
            "<td>" + lista[cont].celularCli + "</td>" +
            "</tr>";
    }
    saida += "</table>";
    document.getElementById("resultado").innerHTML = saida;


}


function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        csv.push(row.join(","));        
    }
    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}

/*

function Export() {
    
    var pdf = new jsPDF('p', 'pt', 'letter');

   
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#resultado')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true

        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Agendamento.pdf');
    }, margins);

}
*/
