
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, number, boolean} from 'yup';
import jwtDecode from 'jwt-decode';

const todoYup = object({
  userId: string().required(),
  taskDescription: string().required(),
  isCompleted: boolean().optional().default(false),
  category: string().optional()
})

const categoryYup = object({
  userId: string().required(),
  category: string().required()
})


const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    } else{
      return res.status(403).end();
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

// some extra logic for GET / and POST / requests.
// app.use('/todos', (req, res, next) => {
//   if (req.method === "POST") {
//       // always save authenticating user Id token.
//       // note -- were not enforcing uniqueness which isn't great.
//       // we don't currently have a great way to do this -- one option would be to 
//       // have a user collection track which collections have been filled
//       // It's a limitation for sure, but I'll just make that a front-end problem...

//       console.log("Check Post")
//       // req.body.userId = req.user_token.sub
//   } else if (req.method === "GET") {
//       // on "index" -- always check for authentication.
//       console.log("Hello sir");
//       console.log(getTodos(NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY));
//       console.log("Token_parsed " + req.user_token);
//       console.log("User ID " + req?.params?.ID);
//       console.log("uid " + req?.params?.userId);
//       console.log("Check Get")
//       // req.query.userId = req.user_token.sub
//   }
//   next();
// })

// some extra logic for GET /id and PUT /id DELETE /id PATCH /id requests.
// side effect here will break patch patch by query, but that's OK for my purposes.
// app.use('/todo/:id', async (req, res, next) => {
//   const id = req.params.ID;
//   console.log('Check todo id')
//   const userId = req.user_token.sub
//   // let's check access rights for the document being read/updated/replaced/deleted

//   const conn = await Datastore.open();
//   try {
//       console.log(id);
//       const doc = await conn.getOne('user', id)
//       if (doc.userId != userId) {
//           // authenticate duser doesn't own this document.
//           res.status(403).end(); // end is like "quit this request"
//           return
//       }
//   } catch (e) {
//       console.log(e);
//       // the document doesn't exist.
//       res.status(404).end(e);
//       return;
//   }
//   // if we don't crash out -- call next and let crudlify deal with the details...
//   next();
// })

app.get("/test", (req, res) => {
  res.json({result: "you did it!"});
});

// test route for https://hwproj-frii.api.codehooks.io/dev
app.get('/', (req, res) => {
  console.log('Splash working')
  res.send('CRUD server ready')
})

// routehook function
function helloFunc(req, res) {
  console.log("Hello world!", req);
  res.json({"message": "Hello world!"});
}

// REST hook
app.get('/hello', helloFunc);

// Functionality to open/read a specific todo item
// app.get('/todo/:id', function (req, res) {
//   const {id} = req.params;
//   console.log("Read this", id);
//   res.send('Done')
// })

app.put('/updateTodoList', async (req, res) => {
  const db = await Datastore.open();
  const data = await db.replaceOne('todos',req.query._id,req.body);
  // const data = await db.updateOne('todos',req.query._id,req.body);
  console.log(data);
  res.json(data);
});

app.put('/todos/:category', async (req, res) => {
  const db = await Datastore.open();
  const data = await db.replaceOne('todos',req.query._id,req.body);
  // const data = await db.updateOne('categories',req.query._id,req.body);
  res.json(data);
});

app.put('/done/:category', async (req, res) => {
  const db = await Datastore.open();
  const data = await db.updateOne('todos',req.query._id,req.body);
  // const data = await db.updateOne('categories',req.query._id,req.body);
  console.log(data);
  res.json(data);
});

// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: todoYup, categories: categoryYup})

// bind to serverless runtime
export default app.init();