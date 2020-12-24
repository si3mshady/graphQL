const { GraphQLServer } = require('graphql-yoga')
const _ = require('lodash')
const axios = require('axios')

const  typeDefs = `

type Film {
    title: String
    director: String
    cast: [String]
    release_date: String
    planets: [String]
    opening_crawl: String
    episode_id: String
    
    
}

type Query {
    getFilms: [Film!]
    getFilmsByDirector(name: String): [Film!]    
    getFilmByEpisodeID(id: String): [Film]

}
`

const resolvers =  {
    Query: {
        getFilms: () => {return getFilms()},
        getFilmsByDirector: (parent, {name}) => {return getFilmsByDirector(name) },
        getFilmByEpisodeID: (parent, {id}) => {return getFilmByEpisodeID(id) }
    }
}


async function getFilmByEpisodeID(id) {     
    const res = await getFilms()
    const result = res.filter(dir => {return String(dir.episode_id) === id})      
    return result
 }

 async function getFilmsByDirector(name) {     
    const res = await getFilms()
     const result = res.filter(dir => {return dir.director === name})     
     return result
  }

async function getFilms() {
    url = 'https://swapi.dev/api/films/'
    const data = await axios.get(url)
    const res =  data.data.results.map(obj => (        
        { 'title':obj.title,
            'episode_id': obj.episode_id,        
            'director': obj.director,'cast':obj.characters,
            release_date:obj.release_date, planets:obj.planets,
            opening_crawl:_.replace(obj.opening_crawl,'\n','')
         } ))

    return res    // return {'film':res}
 }

  async function parseCastMembers(urlList) {      
    const name =  await urlList.map(u => {return (axios.get(u)) })    
    results = await Promise.all(name).then(function(values) {        
         console.log(values.map(val => {return val.data}));
      });
 }

 cast = ["http://swapi.dev/api/people/1/",
 "http://swapi.dev/api/people/2/",
 "http://swapi.dev/api/people/3/",
 "http://swapi.dev/api/people/4/",
 "http://swapi.dev/api/people/5/",
 "http://swapi.dev/api/people/6/",
 "http://swapi.dev/api/people/7/",
 "http://swapi.dev/api/people/8/",
 "http://swapi.dev/api/people/9/",
 "http://swapi.dev/api/people/10/",
 "http://swapi.dev/api/people/12/",
 "http://swapi.dev/api/people/13/",
 "http://swapi.dev/api/people/14/",
 "http://swapi.dev/api/people/15/",
 "http://swapi.dev/api/people/16/",
 "http://swapi.dev/api/people/18/",
 "http://swapi.dev/api/people/19/",
 "http://swapi.dev/api/people/81/"
]


const server = new GraphQLServer( { typeDefs, resolvers} )

server.start(({  port  }) => [
    console.log(`Server on http://localhost:${port}/`)
]);

