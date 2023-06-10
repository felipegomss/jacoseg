import nodemailer from "nodemailer";

async function enviarEmail(nome: string, email: string, mensagem: string) {
  try {
    // Configurar o transporte de email
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com", // Servidor SMTP
      port: 587, // Porta do servidor SMTP
      secure: false, // Define se a conexão é segura (TLS)
      auth: {
        user: "seu-email@example.com", // Seu endereço de email
        pass: "sua-senha", // Sua senha de email
      },
    });

    // Definir o conteúdo do email
    const emailOptions = {
      from: "seu-email@example.com", // Remetente do email
      to: "destinatario@example.com", // Destinatário do email
      subject: "Nova mensagem do formulário de contato", // Assunto do email
      html: `
        <h3>Nova mensagem do formulário de contato:</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
      `,
    };

    // Enviar o email
    const info = await transporter.sendMail(emailOptions);
    console.log("Email enviado:", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
    throw error;
  }
}

export default enviarEmail;
