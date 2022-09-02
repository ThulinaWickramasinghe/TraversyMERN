const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')

//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
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

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})

//@desc delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
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