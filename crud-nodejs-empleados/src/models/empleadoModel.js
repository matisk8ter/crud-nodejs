const mongoose = require('mongoose');
const empleadoSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required: true
    },
    salary:[{
        type: Number,
        required: false
    }]
});

module.exports = mongoose.model('empleados', empleadoSchema);