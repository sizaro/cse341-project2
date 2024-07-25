const router = require('express').Router()
const passport = require('passport');
const isAuthenticated = require('../middle-ware');
const controller = require('../controller/project2')

const validating = require('../validator')

//route to the home page
router.get('/', controller.getHome);

router.use('/', require('./swagger'))



//routes to get math items


//route to get all test collections
router.get('/math', controller.getAllMath)

//route to get a single student
router.get('/math/:id', isAuthenticated.Authenticated, controller.getSingleMath)

//route to create a new student
router.post('/', isAuthenticated.Authenticated,validating.validationRules(), validating.validate, controller.createItemMath)

//route to update the collection
router.put('/math/:id',isAuthenticated.Authenticated,  controller.updateItemMath)

//route to delete user
router.delete('/math/:id', isAuthenticated.Authenticated, controller.deleteItemMath)




//routes to get english members.


//routes to get math items


//route to get all test collections
router.get('/eng', controller.getAllEng)

//route to get a single student
router.get('/eng/:id', isAuthenticated.Authenticated, controller.getSingleEng)

//route to create a new student
router.post('/', isAuthenticated.Authenticated,validating.validationRules(), validating.validate, controller.createItemEng)

//route to update the collection
router.put('/eng/:id',isAuthenticated.Authenticated,  controller.updateItemEng)

//route to delete user
router.delete('/eng/:id', isAuthenticated.Authenticated, controller.deleteItemEng)


module.exports = router;