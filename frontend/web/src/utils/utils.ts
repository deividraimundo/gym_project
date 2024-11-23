export function calcularIMC(peso: number, altura: number) {
  if (peso <= 0 || altura <= 0) {
    return "Peso e altura devem ser maiores que zero.";
  }

  // Converter altura de cm para metros
  const alturaM = altura / 100;

  // Cálculo do IMC
  const imc = peso / (alturaM * alturaM);

  // Classificação com base no IMC
  let classificacao = "";
  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 24.9) {
    classificacao = "Peso normal";
  } else if (imc < 29.9) {
    classificacao = "Sobrepeso";
  } else if (imc < 34.9) {
    classificacao = "Obesidade grau 1";
  } else if (imc < 39.9) {
    classificacao = "Obesidade grau 2";
  } else {
    classificacao = "Obesidade grau 3";
  }

  return `Seu IMC é ${imc.toFixed(2)} (${classificacao}).`;
}
