
import { CartItem, User } from '../types';

// IMPORTANT: Hardcoding API tokens and chat IDs in client-side code is a major security risk.
// These should be handled by a backend service and stored securely using environment variables.
// This is done here only for demonstration purposes based on the user's explicit request.
const BOT_TOKEN = '8195904925:AAGfllkt273HFyIEYWfy40twuk4rxG53V0Y';
const CHAT_ID = '375431655';

const sendTelegramMessage = async (messageText: string): Promise<void> => {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown', // Optional: for formatting like bold, italic
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API error: ${response.status} - ${errorData.description}`);
    }

    console.log('Telegram notification sent successfully:', await response.json());
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    throw error; // Re-throw to be caught by the caller
  }
};


export const sendTelegramCartOrderNotification = async (cartItems: CartItem[], currentUser: User | null): Promise<void> => {
  let messageText = "🌸 New Order Received! 🌸\n\n";
  if (currentUser) {
    messageText += `Customer: ${currentUser.username} (${currentUser.email})\n\n`;
  } else {
    messageText += "Customer: Guest\n\n";
  }

  messageText += "Items:\n";
  cartItems.forEach(item => {
    messageText += `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  messageText += `\nTotal: $${total.toFixed(2)}\n\n`;
  messageText += "FloraModern Alert";
  
  await sendTelegramMessage(messageText);
};
