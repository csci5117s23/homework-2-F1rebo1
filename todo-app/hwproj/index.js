
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
  console.log('Hungala Mungala Pongal Pongal')
})

// routehook function
function helloFunc(req, res) {
  console.log("Hello world!", req);
  res.json({"message": "Hello world!"});
}

// REST hook
app.get('/hello', helloFunc);

// Use Crudlify to create a REST API for any collection
// crudlify(app)

// bind to serverless runtime
export default app.init();
