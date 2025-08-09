import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAILS = [
  'adildanad@gmail.com'
];

interface QuoteRequestData {
  subject: string;
  productName: string;
  sku: string;
  customerInfo: {
    name: string;
    company: string;
    email: string;
    phone: string;
    quantity: string;
    message: string;
    budget: string;
  };
  timestamp: string;
}

function generateTemplateEmail(data: QuoteRequestData): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quote Request</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background-color: #f9f9f9;
        }
        .content { 
            background-color: #ffffff; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h2 { 
            color: #2c3e50; 
            border-bottom: 3px solid #3498db; 
            padding-bottom: 10px; 
            margin-bottom: 20px;
        }
        h3 { 
            color: #34495e; 
            margin-top: 25px; 
            margin-bottom: 15px;
        }
        .customer-info { 
            background-color: #e8f4fd; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #3498db;
        }
        .product-info { 
            background-color: #f0f8f0; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #27ae60;
        }
        .message-section { 
            background-color: #fdf6e3; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #f39c12;
        }
        .info-row { 
            display: flex; 
            margin-bottom: 10px; 
            align-items: center;
        }
        .info-label { 
            font-weight: bold; 
            min-width: 120px; 
            color: #2c3e50;
        }
        .info-value { 
            flex: 1; 
            color: #34495e;
        }
        .footer { 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 2px solid #ecf0f1; 
            font-size: 0.9em; 
            color: #7f8c8d; 
            text-align: center;
        }
        .timestamp { 
            background-color: #ecf0f1; 
            padding: 10px; 
            border-radius: 5px; 
            font-style: italic; 
            text-align: center; 
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="content">
        <h2>🔔 New Quote Request Received</h2>
        <p>Hello team,</p>
        <p>We've received a new quote request. Please find the details below and respond promptly to this inquiry.</p>
        
        <div class="product-info">
            <h3>📦 Product Information</h3>
            <div class="info-row">
                <span class="info-label">Product:</span>
                <span class="info-value"><strong>${data.productName}</strong></span>
            </div>
            <div class="info-row">
                <span class="info-label">SKU:</span>
                <span class="info-value">${data.sku}</span>
            </div>
        </div>

        <div class="customer-info">
            <h3>👤 Customer Details</h3>
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${data.customerInfo.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Company:</span>
                <span class="info-value">${data.customerInfo.company || 'Not provided'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value"><a href="mailto:${data.customerInfo.email}">${data.customerInfo.email}</a></span>
            </div>
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${data.customerInfo.phone || 'Not provided'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Quantity:</span>
                <span class="info-value">${data.customerInfo.quantity || 'Not specified'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Budget:</span>
                <span class="info-value">${data.customerInfo.budget || 'Not specified'}</span>
            </div>
        </div>
        
        ${data.customerInfo.message ? `
        <div class="message-section">
            <h3>💬 Additional Requirements</h3>
            <p>${data.customerInfo.message}</p>
        </div>
        ` : ''}
        
        <div class="timestamp">
            <strong>Received:</strong> ${new Date(data.timestamp).toLocaleString()}
        </div>

        <div class="footer">
            <p><em>This email was generated automatically from a website quote request form submission.</em></p>
            <p>Please respond to the customer at: <a href="mailto:${data.customerInfo.email}">${data.customerInfo.email}</a></p>
        </div>
    </div>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const data: QuoteRequestData = await request.json();

    // Validate required fields
    if (!data.customerInfo.name || !data.customerInfo.email || !data.productName) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or product name' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.customerInfo.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate template email
    const emailContent = generateTemplateEmail(data);

    // Send email using Resend
    try {
      const emailResult = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to: RECIPIENT_EMAILS,
        subject: data.subject,
        html: emailContent,
        replyTo: data.customerInfo.email,
      });

      console.log('Email sent successfully:', emailResult);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request sent successfully',
        recipients: RECIPIENT_EMAILS.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}