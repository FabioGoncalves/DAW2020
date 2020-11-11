var http = require('http')
var axios = require('axios');
var fs = require('fs');

http.createServer(function(req, res) {

    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            res.write('<h2> Escola de Música </h2>')
            res.write('<ul> ')
            res.write('<li> <a href="/alunos"> Lista de Alunos</a> </li>')
            res.write('<li> <a href="/cursos"> Lista de Cursos</a> </li>')
            res.write('<li> <a href="/instrumentos"> Lista de Instrumentos</a> </li>')
            res.write('</ul>')
            res.end();
        }
        /* Alunos*/
        else if(req.url == '/alunos' || req.url.match(/\/alunos\?_page=[0-9]+$/)){
            var page = req.url.match(/\/alunos\?_page=[0-9]+$/) != undefined ?  req.url.replace('/alunos?_page=', '') : 1;

            axios.get('http://localhost:3001/alunos?_page='+ page)
            .then(resp => {
                alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                res.write('<h2> Lista de Alunos </h2>')
                res.write('<ul> ')
                alunos.forEach(a => {
                    var data = {
                        "Id": a.id,
                        "Nome": a.nome,
                        "Data Nascimento": a.dataNasc,
                        "Curso": a.curso,
                        "Ano do Curso":a.anoCurso,
                        "Instrumento": a.instrumento
                    }
                    fs.writeFile('site/alunos/' + a.id + '.html', data, function (err) {
                        if (err) throw err;
                    });
                    res.write('<li><a href="/alunos/'+a.id +'">'+ a.id + ' ' + a.nome +'</a></li>');
                });
                res.write('</ul>')

                var pags = resp.headers.link.split(',');
                res.write('<br/><address> [<a href="/">Home</a>]</address>')
                var flagNext = false;
                pags.forEach(pag => {
                    if (pag.includes("first") && page != 1)
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Inicio</a>]</address>')
                    else if (pag.includes("next")){
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Seguinte</a>]</address>')
                        flagNext = true;
                    }
                    else if (pag.includes("prev"))
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Retroceder</a>]</address>')
                    else if (pag.includes("last") && flagNext)
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Último</a>]</address>')
                });
                       
                res.end();
            })
            .catch( error => {
                console.log('Erro na obteção da lista de alunos: '+ error);
            })
        }
        else if(req.url.match(/\/alunos\/(A|PG|AE-)[0-9]+$/)){
            var id = req.url.replace('/alunos/', '');
            axios.get('http://localhost:3001/alunos/'+ id)
            .then(resp => {
                aluno = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                res.write(JSON.stringify(aluno));
                res.write('<br/><address> [<a href="/alunos">Voltar</a>]</address>')
                res.end();
            })
            .catch( error => {
                console.log('Erro na obteção da informação do aluno: '+ error);
            })
        }
        /* Cursos*/
        else if(req.url == '/cursos' || req.url.match(/\/cursos\?_page=[0-9]+$/)){
            var page = req.url.match(/\/cursos\?_page=[0-9]+$/) != undefined ?  req.url.replace('/cursos?_page=', '') : 1;

            axios.get('http://localhost:3001/cursos?_page='+ page)
            .then(resp => {
                cursos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                res.write('<h2> Lista de Cursos </h2>')
                res.write('<ul> ')
                cursos.forEach(c => {
                    var data = {
                        "Id": c.id,
                        "Designação": c.designacao,
                        "Duração": c.duracao,
                        "Instrumentos": c.instrumento,
                        "anoCurso":c.anoCurso,
                        "instrumento": c.instrumento
                          
                    }
                    fs.writeFile('site/cursos/' + c.id + '.html', data, function (err) {
                        if (err) throw err;
                        
                    });
                    res.write('<li><a href="/cursos/'+ c.id +'">'+ c.id + ' ' + c.designacao +'</a></li>');
                });
                res.write('</ul>')

                var pags = resp.headers.link.split(',');
                res.write('<br/><address> [<a href="/">Home</a>]</address>')
                var flagNext = false;
                pags.forEach(pag => {
                    if (pag.includes("first") && page != 1)
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Inicio</a>]</address>')
                    else if (pag.includes("next")){
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Seguinte</a>]</address>')
                        flagNext = true;
                    }
                    else if (pag.includes("prev"))
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Retroceder</a>]</address>')
                    else if (pag.includes("last") && flagNext)
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Último</a>]</address>')
                });
                       
                res.end();
            })
            .catch( error => {
                console.log('Erro na obteção da lista de Cursos: '+ error);
            })
        }
        else if(req.url.match(/\/cursos\/(CB|CS)[0-9]+$/)){
            var id = req.url.replace('/cursos/', '');
            axios.get('http://localhost:3001/cursos/'+ id)
            .then(resp => {
                aluno = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                res.write(JSON.stringify(aluno));
                res.write('<br/><address> [<a href="/cursos">Voltar</a>]</address>')
                res.end();
            })
            .catch( error => {
                console.log('Erro na obteção da informação do aluno: '+ error);
            })
        }
        /* Instrumentos
        */
        else if(req.url == '/instrumentos' || req.url.match(/\/instrumentos\?_page=[0-9]+$/)){
            var page = req.url.match(/\/instrumentos\?_page=[0-9]+$/) != undefined ?  req.url.replace('/instrumentos?_page=', '') : 1;

            axios.get('http://localhost:3001/instrumentos?_page='+ page)
            .then(resp => {
                instrumentos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                res.write('<h2> Lista de Instrumentos </h2>')
                res.write('<ul> ')
                instrumentos.forEach(i => {
                    console.log(i)
                    var data = {
                        "Id": i.id
                    }
                    fs.writeFile('site/instrumentos/' + i.id + '.html', data, function (err) {
                        if (err) throw err;
                    });
                    res.write('<li><a href="/instrumentos/'+i.id +'">'+ i.id +'</a></li>');
                });
                res.write('</ul>')

                var pags = resp.headers.link.split(',');
                res.write('<br/><address> [<a href="/">Home</a>]</address>')
                var flagNext = false;
                pags.forEach(pag => {
                    if (pag.includes("first") && page != 1)
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Inicio</a>]</address>')
                    else if (pag.includes("next")){
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Seguinte</a>]</address>')
                        flagNext = true;
                    }
                    else if (pag.includes("prev"))
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Retroceder</a>]</address>')
                    else if (pag.includes("last") && flagNext)
                        res.write('<br/><address> [<a href="'+pag.split(';')[0].replace('<', '').replace('>','').replace('3001', '4000') +'" >Último</a>]</address>')
                });
                    
                res.end();
            })
            .catch( error => {
                console.log('Erro na obteção da lista de Instrumentos: '+ error);
            })
        }
        else if(req.url.match(/\/instrumentos\/I[0-9]+$/)){
            var id = req.url.replace('/instrumentos/', '');
            axios.get('http://localhost:3001/instrumentos/'+ id)
            .then(resp => {
                aluno = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                res.write(JSON.stringify(aluno));
                res.write('<br/><address> [<a href="/instrumentos">Voltar</a>]</address>')
                res.end();
            })
            .catch( error => {
                console.log('Erro na obteção da informação do instrumento: '+ error);
            })
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            res.write("<p> Pedido não suportado:  "+ req.method + " " + req.url + "</p>");
            res.end()
        }
    
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        res.write("<p> Pedido não suportado:  " + req.method + " " + req.url + "</p>");
        res.end()
    }
    
}).listen(4000);
console.log("Servidor à escuta na porta 4000....");