const express = require('express');
const {uuid,isUuid} = require('uuidv4');

const app = express();

app.use(express.json());

const transactions =[];

function validateTransactionId(request, response, next) {
    const{id}=request.params;
    if(!isUuid(id)){
      return response.status(400).json({error:"param sent is not a valid UUID"});
    };
    next();
  }

function logRequest(resquest, response, next) {
    const{url}= resquest;

    const logLabel=`${url}`;

    console.log(logLabel);
    return next()
}

app.use(logRequest);

app.use('/transactions/:id',validateTransactionId);

app.get("/transactions", (request, response) => {
    
    return response.json(transactions);
});

app.post("/transactions", (request,response) => {
    const {title,value,type} = request.body;
   
    const transaction = { id:uuid(), title, value, type};

    transactions.push(transaction)

    return response.json(transaction)
});

app.put('/transactions/:id', (request, response) => {
    const {id} = request.params;
    const {title, value, type} = request.body;

    const transIndex = transactions.findIndex((trans) => trans.id == id);
    
    const transaction = {
        id, title, value, type
    };
    
    transactions[transIndex] = transaction

    return response.json(transaction)
})

app.delete("/transactions/:id", (request, response) => {
    const { id } = request.params;
  
    const tranIndex = transactions.findIndex((trans) => trans.id == id);
  
    transactions.splice(tranIndex, 1);
  
    return response.status(204).send();
  });

const port = 3333;

app.listen(port, ()=> {
    console.log(`Server up and running on port ${port}`);
});




//"transactions": [
//{
  //  "id": "uuid",
  //  "title": "Salário",
  //  "value": 4000,
  //  "type": "income"
    // },

   