const asyncHandler = require('express-async-handler')

//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get goals" })
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

    res.status(200).json({ message: "Set goals" })
})

//@desc update goal
//@route PUT /api/goals/:id
//@access Private
const putGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal with id ${req.params.id}` })
})

//@desc delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal with id ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    putGoal,
    deleteGoal
}