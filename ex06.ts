enum StatusPedido {
	Recebido = 1,
	EmPreparo,
	SaiuParaEntrega,
	Entregue,
	Cancelado,
}

enum FormaPagamento {
	PIX = 'PIX',
	CARTAO = 'CARTAO',
	DINHEIRO = 'DINHEIRO',
}

function mensagemStatusPedido(status: StatusPedido): string {
	switch (status) {
		case StatusPedido.Recebido:
			return 'Recebemos seu pedido!';
		case StatusPedido.EmPreparo:
			return 'Seu pedido está sendo preparado 🍳';
		case StatusPedido.SaiuParaEntrega:
			return 'O entregador está a caminho 🛵';
		case StatusPedido.Entregue:
			return 'Pedido entregue. Bom apetite!';
		case StatusPedido.Cancelado:
			return 'Seu pedido foi cancelado.';
		default:
			return 'Status desconhecido.';
	}
}

function avancar(status: StatusPedido): StatusPedido {
	switch (status) {
		case StatusPedido.Recebido:
			return StatusPedido.EmPreparo;
		case StatusPedido.EmPreparo:
			return StatusPedido.SaiuParaEntrega;
		case StatusPedido.SaiuParaEntrega:
			return StatusPedido.Entregue;
		case StatusPedido.Entregue:
		case StatusPedido.Cancelado:
		default:
			return status;
	}
}

let statusAtual = StatusPedido.Recebido;

while (true) {
	// O enum numérico permite obter o nome da etapa pelo número (mapeamento reverso).
	const nomeStatus = StatusPedido[statusAtual];
	console.log(`[${statusAtual} - ${nomeStatus}] ${mensagemStatusPedido(statusAtual)}`);

	if (statusAtual === StatusPedido.Entregue) {
		break;
	}

	statusAtual = avancar(statusAtual);
}

const pagamento: FormaPagamento = FormaPagamento.PIX;
console.log(`Pagamento: ${pagamento}`);

// Erro: const pagamentoInvalido: FormaPagamento = 'PIX';
// 'PIX' é uma string literal, não um membro do enum; use FormaPagamento.PIX.
