const express = require('express')
const routes = express.Router()

const SessionController = require ('../app/controllers/SessionController')
const UserController = require ('../app/controllers/UserController')

// login/logout

routes.get('/users/login',SessionController.loginForm)
routes.post('/users/login',SessionController.login)
routes.post('/users/logout',SessionController.logout)

// reset password / forgot 

routes.get('/users/forgot-password',SessionController.forgotForm)
routes.get('/users/password-reset',SessionController.resetForm)
routes.post('/users/forgot-password',SessionController.forgot)
routes.post('/users/password-reset',SessionController.reset)

// user register UserController
routes.get('/users/register', UserController.registerForm)
routes.post('/users/register', UserController.post/users)

routes.get('/', UserController.show)
routes.put('/', UserController.update)
routes.delete('/', UserController.delete)

module.exports = routes