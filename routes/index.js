const router = require('express').Router()
const passport = require('passport');
const controller = require('../controller/project2')

const validating = require('../validator')

//route to the home page
router.get('/', controller.getHome);

router.use('/', require('./swagger'))



//routes to get math items


//route to get all test collections
router.get('/math', controller.getAllMath)

//route to get a single student
router.get('/math/:id', controller.getSingleMath)

//route to create a new student
router.post('/', validating.validationRules(), validating.validate, controller.createItemMath)

//route to update the collection
router.put('/math/:id', controller.updateItemMath)

//route to delete user
router.delete('/math/:id',controller.deleteItemMath)




//routes to get english members.


//routes to get math items


//route to get all test collections
router.get('/eng', controller.getAllEng)

//route to get a single student
router.get('/eng/:id',controller.getSingleEng)

//route to create a new student
router.post('/',validating.validationRules(), validating.validate, controller.createItemEng)

//route to update the collection
router.put('/eng/:id', controller.updateItemEng)

//route to delete user
router.delete('/eng/:id', controller.deleteItemEng)


module.exports = router;