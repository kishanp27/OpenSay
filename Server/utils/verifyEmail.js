import nodemailer from 'nodemailer';

const verifyEmail = async (email, link) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Account Verification",
      text: "Welcome",
      html: `
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #007bff;
                    }
                    p {
                        line-height: 1.6;
                    }
                    a {
                        color: #007bff;
                        text-decoration: none;
                    }
                    .verification-link {
                        display: block;
                        margin-top: 20px;
                        padding: 10px;
                        background-color: #007bff;
                        color: #fff;
                        text-align: center;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to OpenSay!</h2>
                    <p>
                        Thank you for creating an account with OpenSay. To ensure the security of your account, please verify your email address by clicking the link below:
                    </p>
                    <a class="verification-link" href=${link}>Verify Your Email</a>
                    <p>
                        If the above button doesn't work, you can also copy and paste the following link into your browser's address bar:
                        <br>
                        <a href=${link}>${link}</a>
                    </p>
                    <p>
                        If you did not sign up for an account with OpenSay, please ignore this email.
                    </p>
                    <p>
                        Welcome aboard!
                        <br>
                        The OpenSay Team
                    </p>
                </div>
            </body>
            `,
    });

    console.log("mail send successfully");
  } catch (error) {
    console.log(error, "email failed to send")
  }
};

export default verifyEmail;
