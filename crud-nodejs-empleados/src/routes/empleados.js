const express = require("express");
const empleadoSchema = require("../models/empleadoModel");
const router = express.Router();

// crear empleados
router.post("/crearEmpleado", (req, res) => {
  const empleado = empleadoSchema(req.body);
  empleado
    .save()
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

// obtener empleados
router.get("/obtenerEmpleados", (req, res) => {
  empleadoSchema
    .find()
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

// obtener por id empleados
router.get("/obtenerEmpleadoPorId/:id", (req, res) => {
  const { id } = req.params;
  empleadoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

// update empleados
router.put("/updateEmpleado/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, salary } = req.body;
    empleadoSchema
      .updateOne({_id: id}, { $set: {name, age, salary}})
      .then((data) => res.json(data))
      .catch((er) => res.json({ message: er }));
  });

// borrar usuarios
router.delete("/deleteEmpleado/:id", (req, res) => {
    const { id } = req.params;
    empleadoSchema
      .deleteOne({_id: id})
      .then((data) => res.json(data))
      .catch((er) => res.json({ message: er }));
  });


module.exports = router;
