import 'dotenv/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const TO = 'mumerfarooqlaghari@gmail.com';
const FROM = process.env.AWS_SES_FROM_EMAIL!;

async function main() {
    console.log(`📧 Sending test email`);
    console.log(`   From : ${FROM}`);
    console.log(`   To   : ${TO}\n`);

    const cmd = new SendEmailCommand({
        Source: `"Alpha Devs" <${FROM}>`,
        Destination: { ToAddresses: [TO] },
        Message: {
            Subject: { Data: '✅ AWS SES Test — Alpha Devs', Charset: 'UTF-8' },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;border:1px solid #eee;border-radius:12px">
                            <h2 style="color:#2D312E;margin-bottom:8px">AWS SES is working ✅</h2>
                            <p style="color:#5C635E;font-size:15px;line-height:1.6">
                                This is a test email sent from the <strong>Alpha Devs</strong> backend via AWS SES.
                            </p>
                            <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
                            <p style="color:#999;font-size:12px;margin:0">
                                Region: ${process.env.AWS_REGION} &nbsp;|&nbsp; From: ${FROM}
                            </p>
                        </div>
                    `,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `AWS SES is working!\n\nThis test email was sent from the Alpha Devs backend.\n\nRegion: ${process.env.AWS_REGION}\nFrom: ${FROM}`,
                },
            },
        },
    });

    const result = await ses.send(cmd);
    console.log(`✅ Sent! Message ID: ${result.MessageId}`);
}

main().catch((e) => {
    console.error('❌ Failed:', e.message);
    process.exit(1);
});
