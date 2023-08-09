const express = require('express')
const connectDb = require('./db.js')

const ModulePreventionRoutes = require('./routes/modulePreventionRoutes');

const { errorHandler } = require('./middlewares/index')

const app = express()


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(ModulePreventionRoutes)  

app.use(errorHandler)


connectDb()
    .then(() => {
        console.log('db connection succeeded.')
        app.listen(3000, () => console.log('server started at 3000.'))
    })
    .catch(err => console.log(err))


