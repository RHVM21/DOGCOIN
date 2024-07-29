const crypto = require('crypto');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { initData } = req.body;
        const botToken = process.env.BOT_TOKEN; // Используйте переменную окружения для токена

        const secretKey = crypto.createHash('sha256').update(botToken).digest();
        const checkString = initData.split('&')
            .sort()
            .map(kv => kv.split('='))
            .map(([k, v]) => `${k}=${decodeURIComponent(v)}`)
            .join('\n');
        const hmac = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');
        const queryParams = new URLSearchParams(initData);
        const isValid = queryParams.get('hash') === hmac;

        if (isValid) {
            res.status(200).send('Valid initData');
        } else {
            res.status(400).send('Invalid initData');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};