const nomeDigitado: string = '   maria   da silva  ';

function formatarNome(nome: string): string {
	return nome
		.trim()
		.split(' ')
		.filter(Boolean)
		.map((palavra, indice) => {
			const minuscula = palavra.toLowerCase();
			if (indice > 0 && ['da', 'de', 'do'].includes(minuscula)) {
				return minuscula;
			}
			return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
		})
		.join(' ');
}

const precoLido = '12.40';
const preco = Number(precoLido);
const quantidadeLida = '3un';
const quantidade = parseInt(quantidadeLida, 10);
const clienteFidelidade: boolean = true;
const subtotal = preco * quantidade;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const totalCompra = subtotal - desconto;
const numeroCupom = String(42).padStart(6, '0');

const cupom = `CUPOM Nº ${numeroCupom}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalCompra.toFixed(2)}`;

console.log(cupom);
