let codigo: number | string = 'CLI-0042';

function formatarCodigo(c: number | string): string {
	const numero = typeof c === 'number'
		? c
		: Number(c.replace(/^CLI-/, ''));

	return `CLI-${String(numero).padStart(4, '0')}`;
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';
const tamanho: TamanhoCamiseta = 'M';
// const tamanhoInvalido: TamanhoCamiseta = 'XG'; // Erro: 'XG' não pertence ao tipo literal.

function calcularFrete(
	regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul',
): number {
	const valores: Record<typeof regiao, number> = {
		norte: 25,
		nordeste: 20,
		'centro-oeste': 18,
		sudeste: 12,
		sul: 15,
	};

	return valores[regiao];
}

const complemento: string | null = null;
const complementoFormatado = complemento ?? '(sem complemento)';

function limparTelefone(tel: string | number): string {
	return String(tel).replace(/\D/g, '');
}

// const infere o tipo literal 'sul'; let normalmente infere string, incompatível
// com a união literal esperada. `as const` mantém o valor de r2 como 'sul'.
const r = 'sul';
let r2 = 'sul' as const;
calcularFrete(r);
calcularFrete(r2);

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: Rua das Flores, 100 - ${complementoFormatado}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
