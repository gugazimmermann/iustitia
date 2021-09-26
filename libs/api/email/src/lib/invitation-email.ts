import { getTransporter } from "./Transporter";

export interface InvitationEmailParams {
  user: string;
  name: string;
  email: string;
  code: string;
  tenantId: string;
}

export async function InvitationEmail({ user, name, email, code, tenantId }: InvitationEmailParams) {
  const transporter = getTransporter();
  const URL = `${process.env.NX_APP_SITE}/convite/${tenantId}`;
  const subject = `Convite para Partiticar do ${process.env.NX_APP_TITLE}`
  const message = `
  <p>Ol&aacute;, ${name},<br />Voc&ecirc; foi convidado para partiticar do <strong>${process.env.NX_APP_TITLE}</strong> por <strong>${user}</strong>.</p>
  <p>Acesse <a href="${URL}">${URL}</a> e coloque o c&oacute;digo abaixo para criar sua nova senha.</p>
  <h3>C&oacute;digo: ${code.toString().split("").join(" ")}</h3>
  <p>Ou se preferir acesse <a href="${URL}/${code}">${URL}/${code}</a> e n&atilde;o &eacute; necess&aacute;rio digitar o c&oacute;digo.</p>
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
