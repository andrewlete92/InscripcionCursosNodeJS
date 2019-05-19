const {cursos} = require('./data');
const fs = require('fs');

let estudiante = {
    dni:{
        demand:true
    },
    nombre:{
        demand: true,
        alias: 'n'
    },
    idCurso:{
        demand:true,
        alias:'idc'
    }
}

const argv = require('yargs')
            .command('inscribir', 'Inscribir en el curso', estudiante)
            .argv

/*         msg = 'Id del curso es: ' + Cursos[i].id + '\n' +
                'Nombre del curso: ' + Cursos[i].nombre + '\n' +
                'Duración del curso: ' + Cursos[i].duracionHrs + ' horas' + '\n' +
                'Valor del curso: ' + Cursos[i].valorCOP + ' pesos' +'\n\n'; */

//Función que muestra los cursos
function mostrarCursos(i, callback){
        msg = 'Id del curso es: ' + cursos[i].id + '\n' +
                'Nombre del curso: ' + cursos[i].nombre + '\n' +
                'Duración del curso: ' + cursos[i].duracionHrs + ' horas' + '\n' +
                'Valor del curso: ' + cursos[i].valorCOP + ' pesos' +'\n';
        let curso = cursos[i];
        callback (msg);
}

//Función que busca el curso seleccionado por el estudiante
let buscarCurso = (id, callback) =>{
    let cBuscado = cursos.find(cursoEst => cursoEst.id == id);
    callback(cBuscado)
}

//Función para crear el archivo txt con con los datos
let crearArchivo = (estudiante, curso) => {
    let {nombre, dni} = estudiante;
    let {id,nombre: nomCurso,duracionHrs,valorCOP} = curso;
    txt = 'Estudiante: ' + nombre + '\r\n' +
           'Cédula: ' + dni + '\r\n' +
           'Id del Curso: ' + id + '\r\n' +
           'Nombre del Curso: ' + nomCurso + '\r\n' +
           'Duración: ' + duracionHrs+ ' horas' + '\r\n' +
           'Valor: ' + valorCOP + ' pesos' +  '\r\n'
    fs.writeFile('Inscripciones.txt', txt, (err) => {
        if (err) throw (err);
        console.log('Se ha creado el archivo correctamente');
    });
}

//Se muestran los cursos
if(argv.dni==undefined){
    var i = 0;
    (function fiveSeconds (n) {
        n++
        //console.log(cursos[i]);
        mostrarCursos(i,function(msg){
            console.log(msg);
        });
        if (n < cursos.length) setTimeout( fiveSeconds, 2000, n );
        i++; // Si n <= al tamaño del arreglo (y paso n)
    } (0)); // Inicializa n a 0
}
//Se llama la función de búsqueda enviándole el curso seleccionado
if(argv.dni!=undefined){
    buscarCurso (argv.idCurso, function(cBuscado) {
    crearArchivo(argv,cBuscado);
    })
}

