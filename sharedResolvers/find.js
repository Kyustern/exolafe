const { MongoClient } = require("mongodb");
const { ATLAS_ADMIN_PASSWORD, ATLAS_ADMIN_USERNAME } = process.env

const mongouri = `mongodb+srv://${ATLAS_ADMIN_USERNAME}:${ATLAS_ADMIN_PASSWORD}@iprefermysql.nzjl9.mongodb.net/exolafe?retryWrites=true&w=majority`

const find = async (findOpt) => {

    const client = new MongoClient(mongouri, {
        useUnifiedTopology: true
    })

    try {
        await client.connect()

        const collection = client.db('exolafe').collection('pokemons')
        
        const queryOptions = {
            projection: {
                _id: 0,
                id: 1,
                name: 1,
                type: 1,
                img: 1,
                saved: 1
            }
        }

        const pokemonsArr = await collection
            .find(
                findOpt ? findOpt : {}, 
                queryOptions
            )
            .toArray()
        
        const sortedPokemons = pokemonsArr.sort((a, b) => a.id - b.id)

        return { sortedPokemons }
        
    } catch (error) {
        console.log("TCL: error", error)
        throw new Error ('Internal error in sharedResolvers/find')
    } finally {
        await client.close()
    }
}

module.exports = find