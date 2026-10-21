const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

function lerComAny(json: string): void {
	const dados: any = JSON.parse(json);
	console.log(dados.temperatura.toFixed(1));
}

// Executar com respostaQuebrada gera em tempo de execução: TypeError —
// dados.temperatura.toFixed is not a function.
try {
	lerComAny(respostaQuebrada);
} catch (erro: unknown) {
	// Erro esperado na demonstração de `any`; não interrompe os testes seguros.
}

function falhars(mensagem: string): never {
	throw new Error(mensagem);
}

function lerClima(json: string): { cidade: string; temperatura: number } {
	let dados: unknown;

	try {
		dados = JSON.parse(json) as unknown;
	} catch (erro: unknown) {
		if (erro instanceof SyntaxError) {
			falhar('JSON malformado');
		}
		throw erro;
	}

	if (
		typeof dados === 'object' &&
		dados !== null &&
		'cidade' in dados &&
		typeof dados.cidade === 'string' &&
		'temperatura' in dados &&
		typeof dados.temperatura === 'number'
	) {
		return { cidade: dados.cidade, temperatura: dados.temperatura };
	}

	falhar('campo "temperatura" inválido');
}

function testar(json: string): void {
	try {
		const clima = lerClima(json);
		console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
	} catch (erro: unknown) {
		if (erro instanceof Error) {
			console.log(`Erro: ${erro.message}`);
		}
	}
}

testar(respostaOk);
testar(respostaQuebrada);
testar(respostaInvalida);
