const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

const aberta = true; // Tipo inferido pelo TypeScript: boolean.

const subtotal1: number = precoUnitario1 * quantidade1;
const subtotal2: number = precoUnitario2 * quantidade2;
const total: number = subtotal1 + subtotal2;

const paesVendidosNoAno: number = 1_250_000;
const codigoCategoriaHex: number = 0x1A;
const codigoCategoriaDecimal: number = codigoCategoriaHex;
console.log(codigoCategoriaDecimal); // 26

//quantidade1 = 'doze'; // Erro intencional: string não pode ser atribuída a number.
