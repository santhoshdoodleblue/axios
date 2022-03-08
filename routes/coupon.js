const express=require('express')
const router=express.Router()

// const validator = require('express-joi-validation').createValidator({
//     passError:false
// })

const CouponController=require('../controller/CouponController')
const authenticate=require('../middleware/authenticate')
// const {updateSchema}=require('../middleware/validate')


// const validate=validator.body(updateSchema)

router.get('/show',authenticate.authenticate,CouponController.show)
//router.get('/show/:id',authenticate,CouponController.show) //req.params.id //url- show/{id}
router.get('/createTo',CouponController.createTo)
router.post('/create',authenticate.authenticate,authenticate.roleauthenticate,CouponController.create)
router.put('/update',authenticate.authenticate,CouponController.update)
router.get('/searchcode',authenticate.authenticate,CouponController.searchCode)
router.get('/searchname',authenticate.authenticate,CouponController.searchName)
router.get('/sort',authenticate.authenticate,CouponController.sortTime)
router.get('/filter/:status',authenticate.authenticate,CouponController.filterStatus)
// router.post('/address',authenticate,CouponController.address)
// router.put('/update',CouponController.update)
// // router.get('/search/:name',)
// // router.get('search/:code')
// router.get('/filter/:status')
// router.get()
// router.get('/find/:ID',CouponController.find)

module.exports=router 