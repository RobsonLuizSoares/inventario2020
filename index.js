const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const adminRoute = require('./routes/admin')
const unidadesRoute = require('./routes/unidades')
const indexRoute = require('./routes/index')
const session = require('express-session')

const port = process.env.PORT || 3001
const mongo = 'mongodb+srv://admin:lya250916@inventario2020-h4h53.mongodb.net/test?retryWrites=true&w=majority'

const User = require('./models/User')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'inventario' }))
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const createInitialUser = async () => {
  const total = await User.countDocuments({ username: 'robson' })
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

app.use('/unidades', (req, res, next) => {
  if ('user' in req.session) {
    return next()
  }
  res.redirect('/login')
})

app.use((req, res, next) => {
  if ('user' in req.session) {
    res.locals.user = req.session.user
  }
  next()
})


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

