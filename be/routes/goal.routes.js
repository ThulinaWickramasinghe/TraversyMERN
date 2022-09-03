const express = require('express')
const router = express.Router()
const {getGoals,setGoal,putGoal,deleteGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect,getGoals).post(protect,setGoal)

// router.get('/' , getGoals)

// router.post('/' , setGoal)


router.route('/:id').delete(protect,deleteGoal).put(protect, putGoal)

// router.put('/:id' , putGoal)

// router.delete('/:id' , deleteGoal)

module.exports = router