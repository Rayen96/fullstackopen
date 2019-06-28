require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
app.use(cors());
app.use(express.static('build'))
const Person = require('./models/person')


app.use(bodyParser.json());

morgan.token('json', (req, res) =>
 JSON.stringify(req.body))


app.use(morgan('tiny', {skip: (req, res) => req.method === 'POST'}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json',
  {skip: (req, res) => req.method !== 'POST'}));



app.get('/info', (req, res) => {
  res.send(
    `<div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>`
  )
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  });
});



app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(204).end();
      }
    })
    .catch(error => next(error));
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    }).catch(error => next(error))
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: 'name missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error));
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  
  next(error);
}

const unknownEndpoint = (request, response) => {
  response.status(404).send( { error: 'unknown endpoint' });
}
app.use(unknownEndpoint);

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});