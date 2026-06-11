// ============================================================
//  Sehatti — Node.js Email Server
//  Two transporters:
//    gmailTransporter   → Admin notification  (Gmail SMTP)
//    companyTransporter → User confirmation   (Zoho SMTP)
// ============================================================

require('dotenv').config();

const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(cors({
  origin: [
    'https://sehatti-client.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check for Railway ──
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Serve the static index.html at root
app.use(express.static(path.join(__dirname)));

// ============================================================
//  TRANSPORTER 1 — Gmail SMTP
//  Purpose : Admin notification → saimhassantariq0003@gmail.com
// ============================================================
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ============================================================
//  TRANSPORTER 2 — Company SMTP (Zoho)
//  Purpose : User confirmation → submitted email address
// ============================================================
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpSecure = smtpPort === 465 || process.env.SMTP_USE_SSL === 'true';

const companyTransporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

// ── Verify both transporters on startup ──
gmailTransporter.verify((err) => {
  if (err) {
    console.error('❌  Gmail SMTP failed   :', err.message);
  } else {
    console.log('✅  Gmail SMTP connected :', process.env.GMAIL_USER);
  }
});

companyTransporter.verify((err) => {
  if (err) {
    console.error('❌  Zoho SMTP failed    :', err.message);
  } else {
    console.log('✅  Zoho SMTP connected  :', process.env.SMTP_HOST + ':' + process.env.SMTP_PORT);
  }
});

// ============================================================
//  POST /api/contact
// ============================================================
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, phone, country, organisation, orgSize } = req.body;

    // ── Server-side validation ──
    if (!fullName || !email || !country || !organisation || !orgSize) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // ── EMAIL 1: Admin Notification (Gmail → saimhassantariq0003@gmail.com) ──
    const adminMail = {
      from:    process.env.GMAIL_USER,
      to:      process.env.GMAIL_USER,
      replyTo: email,
      subject: 'New Consultation Request — Sehatti',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"/><title>New Consultation Request</title></head>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#1A3A2A 0%,#2D5A3D 100%);padding:32px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Consultation Request</h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">Received via Sehatti website</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:36px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                      ${detailRow('👤 Full Name',          fullName)}
                      ${detailRow('📧 Email',              email)}
                      ${detailRow('📞 Phone',              phone || '—')}
                      ${detailRow('🌍 Country',            formatCountry(country))}
                      ${detailRow('🏢 Organisation',       organisation)}
                      ${detailRow('👥 Organisation Size',  formatSize(orgSize))}
                    </table>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td style="padding:0 40px 36px;text-align:center;">
                    <a href="mailto:${email}?subject=Re: Sehatti Consultation Request"
                       style="display:inline-block;background:linear-gradient(135deg,#1A3A2A,#2D5A3D);color:#fff;
                              text-decoration:none;padding:13px 30px;border-radius:8px;font-weight:600;font-size:14px;">
                      Reply to ${fullName}
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f8f9fa;padding:18px 40px;text-align:center;border-top:1px solid #eee;">
                    <p style="margin:0;font-size:11px;color:#aaa;">
                      © ${new Date().getFullYear()} Sehatti | info@sehatti.com | +971 58 650 7828
                    </p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    };

    // ── EMAIL 2: User Confirmation (Zoho → submitted email) ──
    const userMail = {
      from:    `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to:      email,
      subject: 'Your Consultation Request Has Been Received — Sehatti',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"/><title>Thank You — Sehatti</title></head>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#1A3A2A 0%,#2D5A3D 100%);padding:36px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Thank you for reaching out! 🌿</h1>
                    <p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
                      Your consultation request has been received.
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <p style="margin:0 0 18px;font-size:16px;color:#333;line-height:1.7;">
                      Dear <strong>${fullName}</strong>,
                    </p>
                    <p style="margin:0 0 18px;font-size:15px;color:#555;line-height:1.8;">
                      Thank you for reaching out to <strong>Sehatti!</strong>
                    </p>
                    <p style="margin:0 0 18px;font-size:15px;color:#555;line-height:1.8;">
                      We have received your consultation request and a specialist will get back to you within
                      <strong>24 hours</strong> with a tailored proposal for your organisation.
                    </p>
                    <p style="margin:0 0 36px;font-size:15px;color:#555;line-height:1.8;">
                      If you have any urgent questions, please feel free to contact us directly.
                    </p>

                    <!-- Sign-off box -->
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f0f7f2;border-radius:10px;padding:24px;">
                      <tr><td>
                        <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#1A3A2A;">Best regards,</p>
                        <p style="margin:0 0 2px;font-size:14px;color:#555;">Sehatti Team</p>
                        <p style="margin:0;font-size:13px;">
                          <a href="https://www.sehatti.com" style="color:#2D5A3D;text-decoration:none;">www.sehatti.com</a>
                        </p>
                      </td></tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f8f9fa;padding:18px 40px;text-align:center;border-top:1px solid #eee;">
                    <p style="margin:0 0 4px;font-size:13px;color:#555;font-weight:600;">Sehatti — Where People Thrive</p>
                    <p style="margin:0;font-size:11px;color:#aaa;">
                      © ${new Date().getFullYear()} Sehatti. All rights reserved. | Tecom, Dubai, UAE
                    </p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    };

    // ── Send both emails — Gmail failure won't block Zoho confirmation ──
    const [adminResult, userResult] = await Promise.allSettled([
      gmailTransporter.sendMail(adminMail),
      companyTransporter.sendMail(userMail),
    ]);

    if (adminResult.status === 'rejected') {
      console.warn('⚠️  Admin Gmail failed (non-critical):', adminResult.reason?.message);
    } else {
      console.log(`✅  Admin email sent → ${process.env.GMAIL_USER}`);
    }

    if (userResult.status === 'rejected') {
      console.error('❌  User Zoho email failed:', userResult.reason?.message);
      return res.status(500).json({ success: false, message: 'Failed to send confirmation email. Please try again.' });
    }

    console.log(`✅  Confirmation email sent → ${email}`);
    return res.json({ success: true, message: 'Email sent successfully.' });

  } catch (err) {
    console.error('❌  Email error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
  }
});

// ── Helpers ──────────────────────────────────────────────────
function detailRow(label, value) {
  return `
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#888;white-space:nowrap;width:180px;
                 background:#fafafa;border-radius:4px;">
        ${label}
      </td>
      <td style="padding:12px 16px;font-size:14px;color:#222;font-weight:500;">
        ${value}
      </td>
    </tr>
  `;
}

function formatCountry(code) {
  const map = {
    uae: '🇦🇪 UAE', ksa: '🇸🇦 Saudi Arabia', qatar: '🇶🇦 Qatar',
    kuwait: '🇰🇼 Kuwait', bahrain: '🇧🇭 Bahrain', oman: '🇴🇲 Oman',
    jordan: '🇯🇴 Jordan', egypt: '🇪🇬 Egypt', other: '🌍 Other',
  };
  return map[code] || code;
}

function formatSize(code) {
  const map = {
    '50-200': '50 – 200 employees',     '200-500': '200 – 500 employees',
    '500-1000': '500 – 1,000 employees', '1000-5000': '1,000 – 5,000 employees',
    '5000+': '5,000+ employees',
  };
  return map[code] || code;
}

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('🌿  Sehatti Email Server running');
  console.log(`    → http://localhost:${PORT}`);
  console.log(`    → POST /api/contact`);
  console.log('');
});
