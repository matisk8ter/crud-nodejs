const mongoose = require('mongoose');
const empresaSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    empleados:[{ type: mongoose.Schema.Types.ObjectId, ref: 'empleados' }]
});

module.exports = mongoose.model('empresa', empresaSchema);