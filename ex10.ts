type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = {
	readonly placa: Placa;
	tipo: 'carro';
	portas: 2 | 4;
};

type Moto = {
	readonly placa: Placa;
	tipo: 'moto';
	cilindradas: number;
};

type Caminhao = {
	readonly placa: Placa;
	tipo: 'caminhao';
	eixos: number;
};

// Incluída para demonstrar a verificação exaustiva em calcularTarifa.
type Van = {
	readonly placa: Placa;
	tipo: 'van';
	capacidade: number;
};

type Veiculo = Carro | Moto | Caminhao | Van;

enum SituacaoTicket {
	Aberto = 'ABERTO',
	Pago = 'PAGO',
}

type Ticket = {
	veiculo: Veiculo;
	periodo: Periodo;
	selo: boolean;
	situacao: SituacaoTicket;
	valor?: number;
};

function calcularTarifa(v: Veiculo, horas: number): number {
	const horasCobrar = Math.max(1, Math.ceil(horas));

	switch (v.tipo) {
		case 'carro':
			return 8 + (horasCobrar - 1) * 5;
		case 'moto':
			return 4 + (horasCobrar - 1) * 2;
		case 'caminhao':
			return 15 + (horasCobrar - 1) * 10;
		case 'van':
			return 12 + (horasCobrar - 1) * 6;
		default: {
			// O never garante que todo tipo da união seja tratado no switch.
			const _naoTratado: never = v;
			return _naoTratado;
		}
	}
}

function fecharTicket(t: Ticket): Ticket {
	const horas = Math.max(1, t.periodo[1] - t.periodo[0]);
	const tarifa = calcularTarifa(t.veiculo, horas);

	return {
		...t,
		valor: t.selo ? tarifa * 0.5 : tarifa,
		situacao: SituacaoTicket.Pago,
	};
}

function registrar(msg: string): void {
	console.log(msg);
}

function falhar(mensagem: string): never {
	throw new Error(`Erro ao ler veículo: ${mensagem}`);
}

function ehObjeto(valor: unknown): valor is Record<string, unknown> {
	return typeof valor === 'object' && valor !== null;
}

function lerVeiculo(json: string): Veiculo {
	let dado: unknown;
	try {
		dado = JSON.parse(json) as unknown;
	} catch {
		return falhar('JSON inválido');
	}

	if (!ehObjeto(dado)) return falhar('veículo inválido');
	if (typeof dado.placa !== 'string') return falhar('placa inválida');

	switch (dado.tipo) {
		case 'carro':
			if (dado.portas === 2 || dado.portas === 4) {
				return { placa: dado.placa, tipo: 'carro', portas: dado.portas };
			}
			return falhar('número de portas inválido');
		case 'moto':
			if (typeof dado.cilindradas === 'number') {
				return { placa: dado.placa, tipo: 'moto', cilindradas: dado.cilindradas };
			}
			return falhar('cilindradas inválidas');
		case 'caminhao':
			if (typeof dado.eixos === 'number') {
				return { placa: dado.placa, tipo: 'caminhao', eixos: dado.eixos };
			}
			return falhar('número de eixos inválido');
		case 'van':
			if (typeof dado.capacidade === 'number') {
				return { placa: dado.placa, tipo: 'van', capacidade: dado.capacidade };
			}
			return falhar('capacidade inválida');
		default:
			return falhar(`tipo "${String(dado.tipo)}" desconhecido`);
	}
}

type EntradasPorTipo = { carro: number; moto: number; caminhao: number };

const tickets: Ticket[] = [
	{
		veiculo: { placa: 'ABC1D23', tipo: 'carro', portas: 4 },
		periodo: [8, 11],
		selo: false,
		situacao: SituacaoTicket.Aberto,
	},
	{
		veiculo: { placa: 'MOT0A12', tipo: 'moto', cilindradas: 160 },
		periodo: [9, 10],
		selo: false,
		situacao: SituacaoTicket.Aberto,
	},
	{
		veiculo: { placa: 'CAM9Z99', tipo: 'caminhao', eixos: 3 },
		periodo: [7, 12],
		selo: false,
		situacao: SituacaoTicket.Aberto,
	},
	{
		veiculo: { placa: 'XYZ4E56', tipo: 'carro', portas: 2 },
		periodo: [14, 16],
		selo: true,
		situacao: SituacaoTicket.Aberto,
	},
];

const ticketsFechados = tickets.map(fecharTicket);

ticketsFechados
	.filter((ticket) => ticket.situacao === SituacaoTicket.Pago)
	.map((ticket) => {
		const horas = Math.max(1, ticket.periodo[1] - ticket.periodo[0]);
		const selo = ticket.selo ? ' (selo -50%)' : '';
		registrar(
			`[PAGO] ${ticket.veiculo.placa} (${ticket.veiculo.tipo}) - ${horas}h - R$ ${ticket.valor!.toFixed(2)}${selo}`,
		);
	});

const faturamento = ticketsFechados.reduce(
	(total, ticket) => total + (ticket.valor ?? 0),
	0,
);
const entradas = ticketsFechados.reduce<EntradasPorTipo>(
	(total, ticket) => {
		switch (ticket.veiculo.tipo) {
			case 'carro':
				total.carro++;
				break;
			case 'moto':
				total.moto++;
				break;
			case 'caminhao':
				total.caminhao++;
				break;
		}
		return total;
	},
	{ carro: 0, moto: 0, caminhao: 0 },
);

registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);
registrar(
	`Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`,
);

try {
	lerVeiculo('{"placa":"ABC1D23","tipo":"bicicleta"}');
} catch (erro: unknown) {
	registrar(erro instanceof Error ? erro.message : 'Erro ao ler veículo');
}
