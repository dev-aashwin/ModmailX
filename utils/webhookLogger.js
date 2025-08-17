let fetchFn;
try {
  fetchFn = fetch;
} catch {
  fetchFn = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
}

async function sendWebhook(webhookUrl, content, options = {}) {
  const body = {
    content,
    ...options
  };
  try {
    const res = await fetchFn(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('Webhook error:', res.status, text);
    } else {
      console.log('Webhook sent successfully!');
    }
  } catch (err) {
    console.error('Webhook fetch error:', err);
  }
}

module.exports = sendWebhook;
