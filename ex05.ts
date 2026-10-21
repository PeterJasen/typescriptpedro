type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
	['Porto Velho', 34],
	['Curitiba', 12],
	['Manaus', 31],
	['Porto Alegre', 9],
	['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
	return [Math.min(...temps), Math.max(...temps)];
}

for (const [cidade, temp] of leituras) {
	console.log(`${cidade}: ${temp}°C`);
}

type ContatoImprensa = [nome: string, telefone: string, email?: string];

const contatoComEmail: ContatoImprensa = ['Ana', '(11) 99999-0000', 'ana@example.com'];
const contatoSemEmail: ContatoImprensa = ['Bruno', '(21) 98888-0000'];

const historicoSemanal: [string, ...number[]] = [
	'Porto Velho',
	20,
	22,
	24,
	23,
	25,
	24,
	23,
];
const [cidadeHistorico, ...temperaturas] = historicoSemanal;
const media = temperaturas.reduce((soma, temp) => soma + temp, 0) / temperaturas.length;

const temperaturasLeituras = leituras.map(([, temp]) => temp);
const [minima, maxima] = extremos(temperaturasLeituras);

console.log(
	`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`,
);

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AC'; // Erro: não é possível alterar uma tupla readonly.
