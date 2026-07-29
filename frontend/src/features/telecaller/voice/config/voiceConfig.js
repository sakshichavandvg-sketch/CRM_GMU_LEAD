export const voiceConfig = {
  logLevel: "info",
  codecPreferences: ["opus", "pcmu"],
  enableIceRestart: true,
  debug: process.env.NODE_ENV === "development",
};
