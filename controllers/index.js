const home = async (req, res) => {
  res.render('homePage')
}

const login = (req, res) => {
  res.render('login')
}

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

const access = async ({ User }, req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username: username })

  if (user) {
    const isValid = await user.checkPassword(password)
    console.log('is Valid', isValid)
    try {
      if (isValid) {
        req.session.user = user
        res.redirect('/unidades')
      } else {
        console.log('falhou')
        res.redirect('/login')
      }
    } catch (error) {
      console.log('error:', error)
    }
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  home,
  login,
  access,
  logout
}