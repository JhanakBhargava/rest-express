const Joi = require('joi')
const express = require('express');
const { response } = require('express');
const app = express()
app.use(express.json());

app.listen(9000)

app.get('/', function (req, res) {
    res.send('hello world')
})

// app.get('/alien',function(req,res){
//     res.send('welcome alien')
// })

app.get('/alien/:id', function (req, res) {
    const id = req.params.id
    res.send('HeyJhanak ' + id)
})

app.get('/alien', function (req, res) {
    const id = req.query.id

    res.send('Jhanak' + id)
})

app.get('/Hello', (req, res) => {
    res.send('Hey hey')
})

// app.get('/api/courses',(req,res)=>{
//     res.send([1,2,3,4])
// })

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params)
})

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found')
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body,schema)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
})


app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send('The course with the given ID was not found')
    }
    const result = validateCourse(req.body)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }
    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema)
}

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
})