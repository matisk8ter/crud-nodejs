const express = require("express");
const empresaSchema = require("../models/empresaModel");
const empleadoSchema = require("../../../crud-nodejs-empleados/src/models/empleadoModel");
const e = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// crear empresa con una lista de empleados
router.post("/crearEmpresaConListaEmpleados", async (req, res) => {
  const rancios = await fetch("http://localhost:3000/api/obtenerEmpleados");
  const data = await rancios.json();

  const empresa = empresaSchema({
    name: req.body.name,
    empleados: data,
  });

  empresa
    .save()
    .then(async (empresa) => {
      res.json(empresa);
    })
    .catch((er) => res.json({ message: er }));
});
// creo empresa con un empleado
router.post("/crearEmpresaConUnEmpleado", async (req, res) => {
  const rancios = await fetch("http://localhost:3000/api/crearEmpleado", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body.empleados),
  });

  const data = await rancios.json();

  const empresa = empresaSchema({
    name: req.body.name,
    empleados: data,
  });

  empresa
    .save()
    .then(async (empresa) => {
      res.json(empresa);
    })
    .catch((er) => res.json({ message: er }));
});

// obtener empleado por id, de una empresa por id
router.get("/obtenerEmpleadosPorId/:id/:idEmpleado", (req, res) => {
  const { id } = req.params;
  const { idEmpleado } = req.params;

  empresaSchema
    .findById(id)
    .then(async () => {
      const empleados = await fetch(
        `http://localhost:3000/api/obtenerEmpleadoPorId/${idEmpleado}`
      );
      const data = await empleados.json();
      res.json(data);
    })
    .catch((er) => res.json({ message: er }));
});

// agrego empleados a una empresa
router.put("/agregoEmpleado/:id/:idEmpleado", async (req, res) => {
  const { id } = req.params;
  const { idEmpleado } = req.params;

  empresaSchema
    .findById(id)
    .then(async (empresa) => {
      const rancios = await fetch(
        `http://localhost:3000/api/obtenerEmpleadoPorId/${idEmpleado}`
      );
      const data = await rancios.json();
      empresa.empleados.push(data);

      empresa.save((err, empl) => {
        if (err) throw err;
        res.send(empl);
      });
    })
    .catch((er) => res.json({ message: er }));
});

module.exports = router;
