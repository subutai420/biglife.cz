# EmailJS Setup Instructions

This guide will help you configure the contact form to send emails to dan.bubak@gmail.com using EmailJS.

## Step 1: Create EmailJS Account

1. Go to [https://emailjs.com](https://emailjs.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Setup Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account (dan.bubak@gmail.com)
5. Note down the **Service ID**

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Set up the template with these parameters:

**Template Content:**
```
Subject: Nová zpráva z Biglife od {{from_name}}

Ahoj,

Máte novou zprávu z kontaktního formuláře na webu Biglife:

Jméno: {{from_name}}
Email: {{from_email}}  
Telefon: {{phone}}

Zpráva:
{{message}}

---
Tato zpráva byla odeslána z webu Biglife.
```

**Template Variables:**
- `{{to_email}}` - Target email (dan.bubak@gmail.com)
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{phone}}` - Sender's phone
- `{{message}}` - Message content
- `{{subject}}` - Email subject
- `{{reply_to}}` - Reply-to address

4. Save the template and note down the **Template ID**

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. Copy it for use in the code

## Step 5: Install EmailJS Package

Run this command in your project directory:
```bash
npm install emailjs-com
```

## Step 6: Update the Code

In `/components/ContactSection.tsx`, replace the placeholder values:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_ACTUAL_SERVICE_ID',     // Replace with your Service ID
  templateId: 'YOUR_ACTUAL_TEMPLATE_ID',   // Replace with your Template ID  
  publicKey: 'YOUR_ACTUAL_PUBLIC_KEY',     // Replace with your Public Key
  toEmail: 'dan.bubak@gmail.com'           // This stays the same
};
```

## Step 7: Test the Form

1. Fill out the contact form on your website
2. Submit the form
3. Check dan.bubak@gmail.com for the email
4. Verify all form data appears correctly in the email

## Troubleshooting

**Form shows "EmailJS not configured" message:**
- Make sure you've replaced all placeholder values in the config
- Ensure the emailjs-com package is installed

**Emails not being received:**
- Check spam folder
- Verify the email service is properly connected in EmailJS dashboard
- Test the template directly in EmailJS dashboard

**Form submission fails:**
- Check browser console for error messages
- Verify all EmailJS IDs are correct
- Ensure your EmailJS account has sufficient quota

## Security Notes

- The Public Key is safe to use in client-side code
- Never expose your Private Key in frontend code
- EmailJS has rate limiting to prevent abuse
- Consider implementing additional validation or captcha for production use

## Support

For EmailJS specific issues, check their documentation at [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)