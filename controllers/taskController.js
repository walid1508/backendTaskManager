const Task = require('../models/Task');
const User = require('../models/User');



// @desc Get tasks for the authenticated user
// @route GET /tasks
// @access Private
const getTasksForUser = async (req, res) => {
    const user = req.user.id;

    try {
        const tasks = await Task.find({ user });
        res.status(200).json({ data: tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// @desc Create new task
// @route POST /tasks
// @access Private
const createTask = async (req, res) => {
    const { title, description, priority, deadline } = req.body;
    const user = req.user.id;

    try {
        const task = await Task.create({
            user,
            title,
            description,
            priority,
            deadline
        });

        res.status(201).json({ data: task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// @desc Update a task
// @route PUT /tasks/:id
// @access Private
const updateTask = async (req, res) => {
    const { title, description, priority, deadline, completed } = req.body;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.title = title || task.title;

        task.description = description || task.description;

        task.priority = priority || task.priority;

        task.deadline = deadline || task.deadline;

        task.completed = completed || task.completed;

        await task.save();

        res.status(200).json({ data: task });

    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// @desc Delete a task
// @route DELETE /tasks/:id
// @access Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.deleteOne();

        res.status(200).json({ data: {} });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTasksForUser,
    createTask,
    updateTask,
    deleteTask
}


