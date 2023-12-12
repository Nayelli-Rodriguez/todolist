const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepSchema = new Schema({
    number: { type: Number },
    description: { type: String, required: true },
});

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['IN PROGRESS', 'HOLDING', 'FINISHED'], default: 'IN PROGRESS' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    steps: [StepSchema],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

