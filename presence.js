// Simple Discord Rich Presence for your personal profile
const RPC = require("discord-rpc");

const clientId = "1388254882619986131"; // Your actual Application ID
RPC.register(clientId);

const rpc = new RPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
  rpc.setActivity({
    details: "Crafting Smart Bots 🧠",
    state: "Shielding the server 🔐",
    startTimestamp: new Date(),
    largeImageKey: "xslogo", // Name of image asset uploaded under 'Rich Presence' -> 'Art Assets'
    largeImageText: "XShield Presence",
    smallImageKey: "vscode", // Optional: another asset for small icon
    smallImageText: "VS Code",
    buttons: [
      {
        label: "View GitHub",
        url: "https://github.com/your-username/XShieldBot" // Customize this link
      },
      {
        label: "Join the Discord",
        url: "https://discord.gg/your-invite-link" // Customize this too
      }
    ]
  });

  console.log("✅ XShield Presence is now live on your profile!");
});

rpc.login({ clientId }).catch(console.error);
