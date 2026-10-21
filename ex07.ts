type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
	console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
	if (mensagem.length > 160) {
		console.log("SMS ignorado: mensagem longa");
		return;
	}

	console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
	console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(
	destinatarios: string[],
	mensagem: string,
	enviar: Notificador,
): void {
	destinatarios.forEach((destinatario) => enviar(destinatario, mensagem));
}

// Erro: uma função declarada como void não pode retornar um valor.
// function teste(): void { return 10; }

// O TypeScript aceita um retorno numérico aqui: em um contexto void, o valor
// retornado é ignorado pelo chamador, que só usa a função pelo efeito colateral.
const contar: Notificador = (d, m) => m.length;

const mensagem = "Reunião de pais sexta às 19h";
notificarTodos(["ana@escola.com"], mensagem, porEmail);
notificarTodos(["joao.resp"], mensagem, porApp);
porSms("(69) 99999-0000", "x".repeat(161));
