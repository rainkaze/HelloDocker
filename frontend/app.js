const statusEl = document.querySelector("#backend-status");
const detailEl = document.querySelector("#backend-detail");
const messageEl = document.querySelector("#api-message");
const refreshButton = document.querySelector("#refresh");
const config = window.HELLODOCKER_CONFIG || {};
const backendPort = config.backendPort || "8000";
const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:${backendPort}`;

async function loadStatus() {
  statusEl.textContent = "checking...";
  statusEl.className = "";
  detailEl.textContent = "Waiting for /api/health";
  messageEl.textContent = "Loading backend response...";

  try {
    const [healthResponse, messageResponse] = await Promise.all([
      fetch(`${apiBaseUrl}/api/health`),
      fetch(`${apiBaseUrl}/api/message`),
    ]);

    if (!healthResponse.ok || !messageResponse.ok) {
      throw new Error("Backend returned a non-OK response.");
    }

    const health = await healthResponse.json();
    const payload = await messageResponse.json();

    statusEl.textContent = health.status;
    statusEl.className = "ok";
    detailEl.textContent = `${health.service} responded at ${health.time}`;
    messageEl.textContent = payload.message;
  } catch (error) {
    statusEl.textContent = "failed";
    statusEl.className = "error";
    detailEl.textContent = "Could not reach the backend API.";
    messageEl.textContent = error.message;
  }
}

refreshButton.addEventListener("click", loadStatus);
loadStatus();
