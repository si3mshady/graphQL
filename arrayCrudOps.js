const { GraphQLServer, PubSub } = require('graphql-yoga')
const _ = require('lodash')

let logs = [
    {
        id:1,
        text: 'This is log from',
        priority: 'low',
        user: 'Elliott',
        timeStamp: new Date().toString()
    },
    {
        id:2,
        text: 'This is log two',
        priority: 'high',
        user: 'Lamar',
        timeStamp: new Date().toString()
    },
    {
        id:3,
        text: 'This is log three',
        priority: 'moderate',
        user: 'Arnold',
        timeStamp: new Date().toString()
    }
    
]

const  typeDefs = `
type LogType {
    id: Int!
    text: String!
    priority: String!
    timeStamp: String
}

type Query {
    logs: [LogType]
}

type Mutation {
     createLogEntry(text: String!, priority: String!): LogType!     
     editLogEntry(id: Int!,text: String!, priority: String!): [LogType!]
     deleteLogEntry(id: Int!): [LogType!]
}
`

const resolvers =  {
    Query: {
        logs:  () => {return logs}
    },

    Mutation: {
        createLogEntry: (parent, {text, priority}) => {
          const entry = {
            id:  Math.floor(Math.random() * 90000) + 10000,
            text: text,
            priority: priority,
            timeStamp: new Date().toString() }
            
         logs.push(entry)
        return entry

        },
        deleteLogEntry: (parent, {id} ) => {     
            logs =  logs.filter(entry => { return entry.id !== id   })            
            return logs
            
        }, 
        editLogEntry:(parent, {id,text, priority} ) => {
            log =  logs.filter(entry => { return entry.id === id })            
            log[0].text = text            
            log[0].priority = priority            
            return logs
        }
    }
}


const server = new GraphQLServer( { typeDefs, resolvers} )

server.start(({  port  }) => [
    console.log(`Server on http://localhost:${port}/`)
]);


#GraphQL Apollo Server practice - Queries & Mutations 
#CRUD operations on array 
#12-21-20  DMS AWS Covid-19  
#Elliott Arnold
