const express = require("express");
const empresaSchema = require("../models/empresaModel");
const empleadoSchema = require("../../../crud-nodejs-empleados/src/models/empleadoModel");
const e = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// obtener empresa
router.get("/obtenerEmpresa", (req, res) => {
  empresaSchema
    .find()
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

// obtener empresa por id
router.get("/obtenerEmpresa/:id", (req, res) => {
  const { id } = req.params;
  empresaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

// update empresa
router.put("/updateEmpresa/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, salary } = req.body;
  empresaSchema
    .updateOne({ _id: id }, { $set: { name, age, salary } })
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

// borrar usuarios
router.delete("/deleteEmpresa/:id", (req, res) => {
  const { id } = req.params;
  empresaSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

// add empleados a una empresa

module.exports = router;
