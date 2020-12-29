//Libs
require('dotenv').config();
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require("mongodb");

const isBetween = (a, b, x) => {
    if (a > b) throw new Error('isBetween: b cannot be greater than a')
    return x > a && x < b
}

const savedPokemons = new Set(["007", "011", "012"])

//Process
const { ATLAS_ADMIN_PASSWORD, ATLAS_ADMIN_USERNAME } = process.env
const PORT = process.env.PORT || 4000
const mongouri = `mongodb+srv://${ATLAS_ADMIN_USERNAME}:${ATLAS_ADMIN_PASSWORD}@iprefermysql.nzjl9.mongodb.net/exolafe?retryWrites=true&w=majority`

//App

const app = express()


app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/build'))

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//API

app.get('/api/', async (req, res) => {
    
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
            .find({}, queryOptions)
            .toArray()
        
        const sortedPokemons = pokemonsArr.sort((a, b) => a.id - b.id)

        res.send({
            sortedPokemons
        })
        
    } catch (error) {
        console.log("TCL: error", error)
        res.sendStatus(500)
    } finally {
        await client.close()
    }
})

app.post('/api/getone', async (req, res) => {

    const id = req.body.id

    //Evite les requetes inutiles

    if (
           !id 
        || typeof id !== "string"
        || id.length !== 3
        || !isBetween(0, 152, parseInt(id))
        ) res.sendStatus(500)

    const client = new MongoClient(mongouri, {
        useUnifiedTopology: true
    })

    try {

        await client.connect()

        const collection = client.db('exolafe').collection('pokemons')

        const result = await collection.findOne({id})
        
        console.log("TCL: result", result)

        res.send(result)

    } catch (error) {
        console.log("TCL: error", error)
        res.sendStatus(500)
    } finally {
        await client.close()
    }

})

app.post('/api/updateone', async ({ body: {index, payload} }, res) => {
	console.log("TCL: payload", payload)
    
    const client = new MongoClient(mongouri, {
        useUnifiedTopology: true
    })
    
    try {
        await client.connect()

        const collection = client.db('exolafe').collection('pokemons')

        const update = {
            $set: {
                saved: payload
            }
        }

        const result = await collection.updateOne(
            {id: index},
            update
        )

        if (result.modifiedCount === 1 && result.matchedCount === 1) {
            res.send({
                newState: payload
            })
        } else throw new Error('Many documents matched a filter supposed to match only a single document')

    } catch (error) {
        console.log("TCL: error", error)
        res.sendStatus(500)
    }
})

app.listen(PORT, () => console.log("Listening on port "+ PORT))