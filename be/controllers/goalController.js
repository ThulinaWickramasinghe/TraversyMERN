const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')


//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//@desc set goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
    //console.log(req.body)

    if (!req.body.text) {
        res.status(401)
        throw new Error('Please add a text filed')
    }

    const goal = await Goal.create({
        text : req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)
})

//@desc update goal
//@route PUT /api/goals/:id
//@access Private
const putGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})

//@desc delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    console.log('in delete -: ' , goal.user)
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({ id : req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    putGoal,
    deleteGoal
}