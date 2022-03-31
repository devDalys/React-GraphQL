const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema')
const app = express();
const users = [{id:21,username:'Viktor',age:25}];
app.use(cors())
const createUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}
const root = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id);
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user)
        return(user)
    }
}
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(5000, () => console.log('server started 5000 port'));