const functions = require('@google-cloud/functions-framework');
const { Resend } = require('resend');
const cors = require('cors');

// Initialize CORS middleware
const corsMiddleware = cors({ 
  origin: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
});

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

functions.http('submitInterest', async (req, res) => {
  // Handle CORS
  corsMiddleware(req, res, async () => {
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { name, email, role, message } = req.body;

      // Validate required fields
      if (!name || !email || !role) {
        res.status(400).json({ 
          error: 'Missing required fields',
          details: 'Name, email, and role are required' 
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ 
          error: 'Invalid email format' 
        });
        return;
      }

      // Get role label
      const roleLabels = {
        engineering: 'Engineering',
        design: 'Design',
        volunteering: 'Volunteering',
        product: 'Product Management',
        partnership: 'Partnership',
        advising: 'Advising',
        funding: 'Funding',
        other: 'Other'
      };

      const roleLabel = roleLabels[role] || role;

      // Prepare email content
      const emailHtml = `
        <h2>New Neighbor 911 Volunteer Interest</h2>
        <p>Someone has expressed interest in contributing to Neighbor 911:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Role Interest:</strong> ${roleLabel}</li>
          ${message ? `<li><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</li>` : ''}
        </ul>
        <hr>
        <p><em>Submitted from the Neighbor 911 landing page</em></p>
      `;

      const emailText = `
New Neighbor 911 Volunteer Interest

Name: ${name}
Email: ${email}
Role Interest: ${roleLabel}
${message ? `Message:\n${message}` : ''}

Submitted from the Neighbor 911 landing page
      `;

      // Send email notification using Resend
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'Neighbor 911 <noreply@neighbor911.us>',
        to: process.env.TO_EMAIL || 'david@lifesaverlabs.org',
        subject: `New Volunteer Interest: ${name} - ${roleLabel}`,
        html: emailHtml,
        text: emailText,
        reply_to: email
      });

      if (error) {
        console.error('Resend error:', error);
        res.status(500).json({ 
          error: 'Failed to send notification',
          details: error.message 
        });
        return;
      }

      // Send confirmation email to the volunteer
      const getRoleSpecificContent = (role) => {
        const roleContent = {
          engineering: "We're excited about your technical expertise! You can start exploring <a href='https://github.com/LifesaverLabs/Neighbor911'>our mobile codebase</a> and help us get from early draft specs and early architecture discussion all the way to a minimal MVP and more full-featured implementation.",
          design: "Your design skills are crucial for creating an intuitive emergency response experience. We'd love your input on user flows, interface, affordances, and accessibility.",
          product: "Your product management experience will help us prioritize features and set and stick to a roadmap that truly serve calmunities in crisis situations.",
          partnership: "Your networking and relationship-building skills could help us connect with emergency services, calmunity organizations, and local governments.",
          funding: "Your financial expertise is vital for ensuring this project can scale sustainably while remaining accessible to all communities.",
          advising: "Your experience and guidance will help us navigate challenges and make strategic decisions as we grow this platform.",
          volunteering: "Your willingness to help in any capacity is the heart of what makes calmunity-driven projects successful.",
          other: "Every perspective and skill set brings something valuable to building a platform that serves diverse calmunities."
        };
        return roleContent[role] || roleContent.other;
      };

      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #2c5aa0;">Welcome to the Neighbor 911 calmunity!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for your interest in contributing to <strong>${roleLabel}</strong>. ${getRoleSpecificContent(role)}</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #2c5aa0; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c5aa0;">What's next?</h3>
            <p><strong>Our team will reach out</strong> within the next few days to discuss how you can get involved based on current priorities and your interests.</p>
          </div>

          <h3>Join the calmunity now:</h3>
          <ul style="line-height: 1.6;">
            <li>💬 <strong>Connect on Discord</strong> - <a href="https://discord.gg/sNdCsNmK" style="color: #2c5aa0;">Join conversations</a> about features, challenges, and solutions</li>
            <li>🛠️ <strong>Explore the code</strong> - <a href="https://github.com/LifesaverLabs/safe-neighborhood-team" style="color: #2c5aa0;">Browse our GitHub</a> to see what we're building</li>
            <li>📢 <strong>Spread the word</strong> - Share this project with friends, colleagues, or calmunity members who might want to help</li>
          </ul>

          <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #1a5490;">Our mission</h4>
            <p style="margin-bottom: 0;">We're building technology that connects neighbors during emergencies, making communities safer and more resilient. Every contribution—whether code, design, calmunity building, or just spreading awareness—moves us closer to that goal.</p>
          </div>

          <p>Questions? Just reply to this email—we read every message.</p>
          
          <p style="margin-top: 30px;">Looking forward to working together,<br>
          <strong>The Neighbor 911 Team</strong><br>
          <em>Lifesaver Labs Public Benefit Corporation</em></p>
        </div>
      `;

      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'Neighbor 911 <noreply@neighbor911.us>',
        to: email,
        subject: 'Thank you for your interest in Neighbor 911',
        html: confirmationHtml,
      });

      // Return success response
      res.status(200).json({ 
        success: true,
        message: 'Thank you for your interest! We will be in touch soon.',
        id: data?.id
      });

    } catch (error) {
      console.error('Function error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        details: error.message 
      });
    }
  });
});