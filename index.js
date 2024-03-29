const express = require('express');
const app = express();

app.use(express.json()); //Formatea todo a json

const students = [          //ejemplo de db
    {id:1, name:'Jorge', age:20, enroll:true},
    {id:2, name:'Mariana', age:30, enroll:false},
    {id:3, name:'Antonio', age:25, enroll:false},
]  

app.get('/', (req, res) =>{ //muestra este msj en la entrada principal
    res.send('NODE JS Api');
});

app.get('/api/students', (req, res) =>{ //Muestra a todos los datos de la db
    res.send(students);
});

app.get('/api/students/:id', (req, res) => { //muestra el dato que se encuentra en ese id
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante No encontrado');
    else res.send(student);
});

app.post('/api/students', (req, res) => {  //Agrega un dato nuevo
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: req.body.enroll === true
    };
    students.push(student);
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {  //Elimina un dato
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado');
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

const port = process.env.port || 80; //se elige un puerto 
app.listen(port, ()=> console.log(`Escuchando en el puerto ${port} 👌...`));

