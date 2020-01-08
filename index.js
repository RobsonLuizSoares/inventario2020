const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const adminRoute = require('./routes/admin')
const unidadesRoute = require('./routes/unidades')
const indexRoute = require('./routes/index')

const port = process.env.PORT || 3000
const mongo = 'mongodb+srv://admin:lya250916@inventario2020-h4h53.mongodb.net/test?retryWrites=true&w=majority'

const User = require('./models/User')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const createInitialUser = async () => {
  const total = await User.count({ username: 'robson' })
  if (total === 0) {
    const user = new User({
      username: 'robson',
      password: '123'
    })
    await user.save()
    console.log('user created')
  } else {
    console.log('user already exists')
  }
}

app.use('/', indexRoute)
app.use('/unidades', unidadesRoute)
app.use('/admin', adminRoute)

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createInitialUser()
    app.listen(port, () => {
      console.log('server running at port', port)
    })
  })
  .catch(e => {
    console.log('erro ao conectar no MongoDB', e)
  })

