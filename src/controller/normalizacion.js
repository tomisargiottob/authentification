const { normalize, schema, denormalize } = require('normalizr');
const { holding } = require('./holdings');

const empleadoSchema = new schema.Entity('empleado');

const empresaSchema = new schema.Entity('empresa',{
  gerente: empleadoSchema,
  encargado: empleadoSchema,
  empleados: [empleadoSchema],
});

const empresasSchema = new schema.Entity('empresas', {
  empresas: [empresaSchema],
});

const normalizado = normalize(holding, empresasSchema);

console.log(JSON.stringify(normalizado, null, 2));

const desnormalizado = denormalize(normalizado.result, empresasSchema, normalizado.entities);

console.log('Este es el desnormalizado', JSON.stringify(desnormalizado, null, 2));

const longitudNorm = JSON.stringify(normalizado, null, 2).length;
const longitudHolding = JSON.stringify(holding, null, 2).length;

console.log('Porcentaje de compresion', (longitudNorm * 100) / longitudHolding);

module.exports = { normalizado };
