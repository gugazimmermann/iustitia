import { getTransporter } from "./Transporter";

export interface SendForgotPasswordEmailParams {
  route: string;
  email: string;
  date: string;
  code: number;
  codeUrl: string;
}

export async function sendForgotPasswordEmail({ route, email, date, code, codeUrl }: SendForgotPasswordEmailParams) {
  const transporter = getTransporter();

  const getTime = (date) => {
    const separate = date.split(" ")[1].split(":");
    return `${separate[0]}:${separate[1]}`
  }
  const getDate = (date) => date.split(" ")[0]

  const URL = `${process.env.NX_APP_SITE}${route}`
  const CODE = code.toString().split("").join(" ")

  const subject = "Recuperação de Senha"
  const message = `
  <h3><strong>${process.env.NX_APP_TITLE}</strong></h3>
  <h4><strong>Recupera&ccedil;&atilde;o de Senha</strong></h4>
  <p>Por motivos de seguran&ccedil;a n&atilde;o temos acesso as senhas dos usuários, para recuperar sua senha voc&ecirc; necessita criar uma nova.</p>
  <p>Acesse <a href="${URL}">${URL}</a> e coloque o c&oacute;digo abaixo para criar sua nova senha.</p>
  <h4>C&oacute;digo: ${CODE}</h4>
  <p>Ou se preferir acesse <a href="${URL}/${codeUrl}">${URL}/${codeUrl}</a> e n&atilde;o &eacute; necess&aacute;rio digitar o c&oacute;digo.</p>
  <p>Este c&oacute;digo &eacute; v&aacute;lido at&eacute; &agrave;s <strong>${getTime(date)}</strong> de <strong>${getDate(date)}</strong>.</p>
  `
  const mail = {
    from: `Guga | ${process.env.NX_APP_TITLE} <${process.env.NX_EMAIL}>`,
    to: email,
    subject: subject,
    html: message
  }

  try {
    return await transporter.sendMail(mail);
  } catch (err) {
    return err
  }

}
