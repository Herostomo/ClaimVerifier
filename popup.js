document.getElementById("verifyBtn").addEventListener("click", async () => {
  const claimText = document.getElementById("claimInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!claimText) {
    resultDiv.innerText = "❌ Please enter a claim.";
    return;
  }

  resultDiv.innerText = "Verifying claim... ⏳";

  try {
    // Send POST request to your local backend
    const res = await fetch("http://localhost:8000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ claim: claimText })
    });

    const data = await res.json();

    // Handle no results
    if (!data.sources || data.sources.length === 0) {
      resultDiv.innerText = "No credible sources found.";
      return;
    }

    // Display verdict and credibility
    let html = `
      <p><strong>Verdict:</strong> ${data.verdict || "N/A"}</p>
      <p><strong>Credibility Score:</strong> ${data.score ?? "N/A"}%</p>
      <p><strong>Explanation:</strong> ${data.explanation}</p>
      <h4>Sources:</h4>
      <ul>
    `;

    data.sources.forEach(source => {
      html += `<li>
        <a href="${source.url}" target="_blank">${source.title}</a> 
        [${source.stance}] - Score: ${Math.round(source.score*100)}%
      </li>`;
    });

    html += "</ul>";
    resultDiv.innerHTML = html;

  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Error contacting backend. Make sure it is running.";
  }
});
