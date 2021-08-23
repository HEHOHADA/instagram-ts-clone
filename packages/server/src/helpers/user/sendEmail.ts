import 'dotenv/config'
import SendGrid from '@sendgrid/mail'

SendGrid.setApiKey(process.env.SEND_GRID_API_KEY!)

export const sendEmail = async (recipient: string, url: string, linkText: string) => {
  const message = {
    from: 'Sender Name <hehohada@em68.hehohada.software>',
    to: `Recipient <${recipient}>`,
    subject: 'SendGrid is unicode friendly ✔',
    text: 'Hello to myself!',
    html: `<html>
        <body>
        <a href="${url}">${linkText}</a>
        </body>
        </html>`
  }

  await SendGrid.send(message, false, (error) => {
    if (error) {
      console.log(error)
    }
  })
}
