const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const { recaptchaResponse } = body;

    // Verify the reCAPTCHA response
    const secretKey = process.env.SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();

        if (data.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'reCAPTCHA verification failed.' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Server error.' }),
        };
    }
};