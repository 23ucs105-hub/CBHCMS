export const generateEmailHtml = (title: string, body: string, language: string = 'en') => {
    const isRTL = language === 'ar' || language === 'he'; // Add more RTL languages if needed
    const direction = isRTL ? 'rtl' : 'ltr';
    const textAlign = isRTL ? 'right' : 'left';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
        .content { padding: 30px; text-align: ${textAlign}; direction: ${direction}; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .button { display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
        .alert-badge { display: inline-block; padding: 6px 12px; background-color: #fee2e2; color: #ef4444; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>CBHCMS</h1>
            <p>Community Based Health Care Management System</p>
        </div>
        <div class="content">
            <div class="alert-badge">${title}</div>
            <div style="white-space: pre-wrap;">${body}</div>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/worker" class="button">Open Worker App</a>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} CBHCMS. All rights reserved.</p>
            <p>This is an automated message. Please do not reply.</p>
        </div>
    </div>
</body>
</html>
    `;
};
