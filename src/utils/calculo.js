function aleatorio(total) {
  const memoria = {};
  for (let i = 0; i < total; i += 1) {
    const numero = Math.floor(Math.random() * 1000);
    if (memoria[numero]) {
      memoria[numero] += 1;
    } else {
      memoria[numero] = 1;
    }
  }
  return memoria;
}

process.on('message', (total) => {
  const resultado = aleatorio(Number(total));
  process.send(resultado);
});

module.exports = aleatorio;
