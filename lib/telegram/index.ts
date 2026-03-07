import { siteConfig } from "@/lib/site";

export async function sendTelegramLeadNotification(payload: {
  source: string;
  name: string;
  phone: string;
  email: string;
  businessType: string;
  message?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { sent: false, reason: "telegram-env-missing" as const };
  }

  const message = [
    "New lead from accounting website",
    "",
    `Source: ${payload.source}`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Business type: ${payload.businessType}`,
    payload.message ? `Message: ${payload.message}` : "",
    `Site: ${siteConfig.name}`
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    return { sent: false, reason: "telegram-request-failed" as const };
  }

  return { sent: true as const };
}
