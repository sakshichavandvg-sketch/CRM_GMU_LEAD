/**
 * Check if mediaDevices API is available (requires secure context: HTTPS or localhost).
 */
function isMediaDevicesAvailable() {
  return typeof navigator !== "undefined" && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function";
}

/**
 * Enumerate available audio devices (microphones and speakers).
 * @returns {Promise<{ inputs: MediaDeviceInfo[], outputs: MediaDeviceInfo[] }>}
 */
export async function enumerateAudioDevices() {
  if (!isMediaDevicesAvailable()) {
    console.warn("mediaDevices API unavailable — page must be served over HTTPS or localhost.");
    return { inputs: [], outputs: [] };
  }

  try {
    // Must request permission first so labels are available
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Immediately stop the stream since we only needed permission
    stream.getTracks().forEach((t) => t.stop());

    const devices = await navigator.mediaDevices.enumerateDevices();
    const inputs = devices.filter((d) => d.kind === "audioinput");
    const outputs = devices.filter((d) => d.kind === "audiooutput");
    return { inputs, outputs };
  } catch (error) {
    console.warn("Failed to enumerate audio devices:", error?.message || error);
    return { inputs: [], outputs: [] };
  }
}

/**
 * Tests the microphone by capturing a short audio stream and measuring input level.
 * Returns a cleanup function to stop the stream.
 * @param {function} onLevel - Callback receiving audio level (0-100).
 * @returns {{ stop: function }}
 */
export function testMicrophone(onLevel) {
  let animFrameId = null;
  let stream = null;

  if (!isMediaDevicesAvailable()) {
    console.warn("mediaDevices API unavailable — mic test skipped.");
    onLevel(-1);
    return { stop: () => {} };
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((mediaStream) => {
      stream = mediaStream;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const measure = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
        const level = Math.min(100, Math.round((average / 128) * 100));
        onLevel(level);
        animFrameId = requestAnimationFrame(measure);
      };

      measure();
    })
    .catch((error) => {
      console.warn("Microphone test failed:", error?.message || error);
      onLevel(-1); // -1 signals error
    });

  return {
    stop: () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    },
  };
}
