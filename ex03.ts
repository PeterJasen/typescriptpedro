let paciente: {
	readonly cpf: string;
	nome: string;
	idade: number;
	plano: boolean;
	alergias?: string[];
	contatoEmergencia?: { nome: string; telefone: string };
} = {
	cpf: "123.456.789-00",
	nome: "Ana Souza",
	idade: 34,
	plano: true,
	alergias: ["dipirona", "lactose"],
	contatoEmergencia: { nome: "João Souza", telefone: "(11) 99999-0000" },
};

let paciente2: typeof paciente = {
	cpf: "987.654.321-00",
	nome: "Carlos Lima",
	idade: 61,
	plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
	const alergias = p.alergias
		? `Alergias: ${p.alergias.join(", ")}`
		: "Sem alergias registradas";
	return `${p.nome}, ${p.idade} anos. ${alergias}`;
}

console.log(resumo(paciente));
console.log(resumo(paciente2));

// Erro: cpf é somente leitura e não pode ser alterado.
// paciente.cpf = "111.222.333-44";

// Erro: peso não está declarado no tipo de paciente.
// paciente.peso = 70;

let dados: object = paciente;
// Erro: object não descreve as propriedades disponíveis, então dados.nome não é reconhecido.
// console.log(dados.nome);

let x: {} = 10; // {} aceita qualquer valor não nulo ou indefinido, inclusive primitivos.
// let y: object = 10; // object aceita valores não primitivos; 10 é um primitivo.
