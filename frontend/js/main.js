const URL_BASE = "http://localhost:3000";

window.onload = function () {
    readAll();
    readAllProfessores();
}


//FUNÇÕES GERAIS

function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url, true);
    if (method == 'POST' || method == 'PATCH' || method == 'PUT') {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function () {
        callback(xhr.status, xhr.response);
    }
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

function clear() {
    //limpa campo do formulario de aluno
    document.getElementById('name').value = "";
    document.getElementById('tia').value = "";
    document.getElementById('course').value = "";
    //limpa campo do formulario de professor
    document.getElementById('name2').value = "";
    document.getElementById('drt').value = "";
    document.getElementById('area').value = "";
    document.getElementById('curso').value = "";
}

// CHAMADA DAS FUNÇÕES PARA ALUNO(S)

function readAll() {
    const url = URL_BASE + "/alunos";
    callAPI(url, 'GET', function (status, response) {
        if (status === 200) {
            var content = document.getElementById('content-aluno');
            content.innerHTML = "<h1>ALUNOS</h1";
            for (var i = 0; i < response.length; i++) {
                var str = createCardAluno(response[i]);
                content.innerHTML += str;
            }

        } else {
            alert("Erro ao contatar o servidor. Tente novamente mais tarde!");
        }
    });
}

function insertStudent() {
    event.preventDefault();
    var student = {
        nome: document.getElementById('name').value,
        tia: document.getElementById('tia').value,
        curso: document.getElementById('course').value
    }

    const url = URL_BASE + '/alunos';

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();
            clear();
        } else {
            alert("ERRO: " + status);
        }
    }, student);
}

function deleteStudent(tia) {
    const resp = confirm('Deseja realmente apagar o aluno com tia ' + tia + '?');
    if (resp) {
        const url = URL_BASE + "/alunos/" + tia;
        callAPI(url, "DELETE", function () {
            readAll();
        });
    }
}

function findStudent(tia) {
    const url = URL_BASE + "/alunos/" + tia;
    callAPI(url, "GET", function (status, response) {
        if (status === 200 || status === 201) {
            document.getElementById('name').value = response.nome;
            document.getElementById('tia').value = response.tia;
            document.getElementById('course').value = response.curso;
            document.getElementById('button').innerHTML = "Atualizar";
            document.getElementById('button').onclick = updateStudent;
        } else {
            alert("ERRO: " + status);
        }
    });
}

function updateStudent() {
    event.preventDefault();
    var student = {
        nome: document.getElementById('name').value,
        tia: document.getElementById('tia').value,
        curso: document.getElementById('course').value
    }

    const url = URL_BASE + "/alunos";

    callAPI(url, "PATCH", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();

            clear();

            document.getElementById('button').innerHTML = "Inserir";
            document.getElementById('button').onclick = insertStudent;

        } else {
            alert("ERRO: " + status);
        }
    }, student);
}


function createCardAluno(student) {
    var str = "<article>";
    str += "<div class='body-card'>";
    str += "<h1>" + student.nome + "</h1>";
    str += "<p>" + student.tia + "</p>";
    str += "<p>" + student.curso + "</p>";
    str += "</div>";
    str += "<div class='footer-card'>";
    str += "<button onclick='deleteStudent(" + student.tia + ")'>X</button>";
    str += "<button onclick='findStudent(" + student.tia + ")'>Editar</button>";
    str += "</div>";
    str += "</article>";
    
    return str;
}

// CHAMADA DAS FUNÇÕES PARA PROFESSOR(ES)

function readAllProfessores() {
    const url = URL_BASE + "/professor";
    callAPI(url, 'GET', function (status, response) {
        if (status === 200) {
            var content = document.getElementById('content-professor');
            content.innerHTML = "<h1>PROFESSORES</h1>";
            for (var i = 0; i < response.length; i++) {
                var str = createCardProfessor(response[i]);
                content.innerHTML += str;
            }

        } else {
            alert("Erro ao contatar o servidor. Tente novamente mais tarde!");
        }
    });
}

function insertProfessor() {
    event.preventDefault();
    var student = {
        nome: document.getElementById('name2').value,
        drt: document.getElementById('drt').value,
        area: document.getElementById('area').value,
        curso: document.getElementById('curso').value
    }

    const url = URL_BASE + '/professor';

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            readAllProfessores();
            clear();
        } else {
            alert("ERRO: " + status);
        }
    }, student);
}

function deleteProfessor(drt) {
    const resp = confirm('Deseja realmente apagar o professor com DRT ' + drt + '?');
    if (resp) {
        const url = URL_BASE + "/professor/" + drt;
        callAPI(url, "DELETE", function () {
            readAllProfessores();
        });
    }
}

function findProfessor(drt) {
    const url = URL_BASE + "/professor/" + drt;
    callAPI(url, "GET", function (status, response) {
        if (status === 200 || status === 201) {
            document.getElementById('name2').value = response.nome;
            document.getElementById('drt').value = response.drt;
            document.getElementById('area').value = response.area;
            document.getElementById('curso').value = response.curso;
            document.getElementById('button2').innerHTML = "Atualizar";
            document.getElementById('button2').onclick = updateProfessor;
        } else {
            alert("ERRO: " + status);
        }
    });
}

function updateProfessor() {
    event.preventDefault();
    var professor = {
        nome: document.getElementById('name2').value,
        drt: document.getElementById('drt').value,
        area: document.getElementById('area').value,
        curso: document.getElementById('curso').value
    }

    const url = URL_BASE + "/professor";

    callAPI(url, "PATCH", function (status, response) {
        if (status === 200 || status === 201) {
            readAllProfessores();

            clear();

            document.getElementById('button2').innerHTML = "Inserir";
            document.getElementById('button2').onclick = insertProfessor;

        } else {
            alert("ERRO: " + status);
        }
    }, professor);
}

function createCardProfessor(professor) {
    var str = "<article>";
    str += "<div class='body-card'>";
    str += "<h1>" + professor.nome + "</h1>";
    str += "<p>" + professor.drt + "</p>";
    str += "<p>" + professor.area + "</p>";
    str += "<p>" + professor.curso + "</p>";
    str += "</div>";
    str += "<div class='footer-card'>";
    str += "<button onclick='deleteProfessor(" + professor.drt + ")'>X</button>";
    str += "<button onclick='findProfessor(" + professor.drt + ")'>Editar</button>";
    str += "</div>";
    str += "</article>";
    return str;
}