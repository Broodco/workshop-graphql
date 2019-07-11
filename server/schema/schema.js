const graphql = require('graphql'); 
const _ = require('lodash'); 
const axios = require('axios')

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLInt,
        GraphQLID,
        GraphQLList } = graphql;


const UserType = new GraphQLObjectType ({ 
    name: 'octocat',
    fields: () => ({
        id: {type: GraphQLID},
        prenom: {type: GraphQLString},
        nom: {type: GraphQLString},
        gitHub: {type: GraphQLString},
        linkedIn: {type: GraphQLString},
        promo: {type: GraphQLString},
        watches: {
            type: new GraphQLList(WatchType),
            resolve(parent, args){
                return _.filter(watches, { octocatId: parent.id});
            }
        }
    })
});

const WatchType = new GraphQLObjectType ({
    name: 'watch',
    fields: () => ({
        id: {type: GraphQLID},
        octocatId: { 
            type: UserType,
            resolve(parent, args){
                return _.find(octocats, {id: parent.octocatId});
            }
        },
        date: {type: GraphQLInt},
        subject: {type: GraphQLString},
        link: {type: GraphQLString},
    })
}); 

const RootQuery = new GraphQLObjectType({ 
    name: 'RootQueryType',  
    fields: { 
        octocat: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){ // 8. lorsqu'on fera une query (dans GraphiQL), c'est la fonction resolve qui se lance
            // #2 - request API & return item
                return axios.get('https://api.sheety.co/97ac06ad-6ce3-4719-ad8d-8ea8711b328b')
                    .then(function (response) {
                        // handle success - on renvoie les datas
                        const resultat = response.data;
                        //let a = resultat.find((item) => item.id === id)
                        return resultat.find((item) => item.id == args.id)
                    })
                    .catch(function (error) {
                        // handle error
                        throw new Error(error.message)
                    })            
            }
        },
        watch: {
            type: WatchType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(watches, {id: args.id});
            }
        },
        octocats: { 
            type: new GraphQLList(UserType),
            resolve(parent, args) { // 12. on retourne la liste JSON de notre API octocats dorenavant
                // #1 - request API & return liste 
                return axios.get('https://api.sheety.co/97ac06ad-6ce3-4719-ad8d-8ea8711b328b')
                    .then(function (response) {
                        // handle success - on renvoie les datas
                        return response.data
                    })
                    .catch(function (error) {
                        // handle error
                        throw new Error(error.message)
                    })
            }
        },
        watches: {
            type: new GraphQLList(WatchType),
            resolve(parent, args) {
                return watches
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,    
})