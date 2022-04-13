conn = new Mongo();
db = conn.getDB("institucion");

var alumnos = ["Nikola_Tesla", "Rene_Descartes", "Galileo_Galilei", "Frida_Kahlo", "Freddie_Mercury", "John_Lennon", "Gustavo_Cerati", "Jose_Lazo", "Bob_Marley", "Isaac_Newton", "Napoleo_ Bonaparte", "Elizabeth_Tower", "Charles_Darwin", "Nicolas_Copernico", "Michael_Faraday", "Miguel_Angel", "Hernan_Cortes", "Henry_Ford", "John_Kennedy", "Bon_Jovi"]
var profesores = ["Hugo_Saenz","Paco_Flores","Luis_Ramos","Ana_Nieto","Rosa_Vargas","Angie_Gomez","Jorge_Caballero","Carlos_Alcantara","Enrique_Iglesias","Mario_Polo"]
var cursos = ['Informatica Aplicada en TI','Investigacion de Mercados','POO','Arquitectura de Computadoras','Base de Datos','Comprension y Produccion de Textos','Mejora Continua','Sistemas Operativos','Estructura de Datos y Algoritmos','Desarrollo de Apps en Internet']
var especialidades = ["Tecnología Mecánica Eléctrica", "Mecatrónica Industrial", "Electrónica y Automatización Industrial", "Tecnología de la Producción", "Producción y Gestión Industrial", "Gestión y Mantenimiento de Maquinaria Pesada", "Aviónica y Mecánica Aeronáutica", "Procesos Químicos y Metalúrgicos", "Operaciones Mineras", "Operación de Plantas de Procesamiento de Minerales", "Big Data y Ciencia de Datos", "Diseño y Desarrollo de Software", "Diseño Industrial", "Administración de Redes y Comunicaciones", "Diseño y Desarrollo de Simuladores y Videojuegos"]
var departamentos = ["Electricidad y Electrónica", "Gestión y Producción", "Mecánica y Aviación", "Mecatrónica", "Minería, Procesos Químicos y Metalúrgicos", "Tecnología Digital", "Tecnología Agrícola"]

db.alumnos.drop();
db.profesores.drop();
db.cursos.drop();
db.especialidades.drop();
db.departamentos.drop();
db.matriculas.drop();

for (var a in alumnos) {

	var alu = {
		_id: "A" + a,
		nombre_apellido:alumnos[a],
        dni:Math.round(Math.random() * 100000000),
		correo:alumnos[a]+'@tecsup.edu.pe',
        especialidad:especialidades[Math.round(Math.random() * 15)]
	}
	db.alumnos.insert(alu);
}

for (var p in profesores) {

	var pro = {
		_id: "P" + p,
		nombre_apellido:profesores[p],
        departamento:departamentos[Math.round(Math.random() * 7)]
	}
	db.profesores.insert(pro);
}

for (var c in cursos) {

	var cur = {
		_id: "C" + c,
		nombre:cursos[c],
        creditos:Math.round(Math.random() * 4),
        horas:Math.round(Math.random() * 4)
	}
	db.cursos.insert(cur);
}

for (var i=0; i<1000; i++) {
	var a = Math.floor(Math.random()*alumnos.length);
    var p = Math.floor(Math.random()*profesores.length);
	var fecha = new Date((new Date().getTime()) - Math.round(Math.random() * 365)*1000*60*60*24);
	var matricula = {
		_id:i,
		fecha:fecha,
		alumno: {
			codigo: "A"+a,
			nombre: alumnos[a]
		},
		items:[]
	}
    
	var nItems=Math.round(Math.random()* 7);
	for(var n=0; n<nItems; n++) {
        
		var c = Math.floor(Math.random() * cursos.length);
		var p = Math.floor(Math.random() * profesores.length);
        
		var cur = db.cursos.findOne({_id:"C" + c});
		var pro = db.profesores.findOne({_id:"P" + p});
        
		var item = {
			codigo: cur._id,
			nombre: cur.nombre,
			creditos: cur.creditos,
			profesor: pro.nombre_apellido
		}
		matricula.items.push(item);
	}
    
	print(JSON.stringify(matricula));
	db.matriculas.insert(matricula);
}