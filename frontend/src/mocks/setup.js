import MockAdapter from "axios-mock-adapter";
import { setupAuthHandlers } from "./handlers/authHandlers";
import { setupLeadHandlers } from "./handlers/leadHandlers";

export const initializeMocks = (axiosInstance) => {
  // Create mock adapter with a configurable realistic delay
  const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

  // Initialize handlers for different domains
  setupAuthHandlers(mock);
  setupLeadHandlers(mock);

  console.log("🛠️ Frontend Development Mode enabled (Axios Mock Adapter initialized)");
};
