"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FAFAFA",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ maxWidth: "28rem", textAlign: "center" }}>
            <div
              style={{
                margin: "0 auto 1rem",
                display: "flex",
                height: "4rem",
                width: "4rem",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "9999px",
                backgroundColor: "#FEE2E2",
              }}
            >
              <svg
                style={{ height: "2rem", width: "2rem", color: "#DC2626" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Something went wrong
            </h2>

            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                color: "#6B7280",
              }}
            >
              {error?.message || "A critical error occurred. Please try again."}
            </p>

            <button
              onClick={() => reset()}
              style={{
                marginTop: "1.5rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.75rem",
                padding: "0.625rem 1.5rem",
                fontSize: "15px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(to right, #D1A14E, #E8BF67)",
                color: "#5C1D24",
                transition: "all 0.2s",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
