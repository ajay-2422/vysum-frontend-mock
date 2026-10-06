const historyList = document.getElementById("historyList");
const historyCount = document.getElementById("historyCount");

historyCount.textContent = `${sessions.length} sample attempts`;

historyList.innerHTML = sessions.map((session) => {
    const state = states[session.state];
    const details = getRecordedData(session).map(([label, value]) => `
        <div class="recorded-data-item">
            <span>${label}</span>
            <strong>${value}</strong>
        </div>
    `).join("");

    return `
        <details class="history-record">
            <summary>
                <span class="history-attempt"><strong>${session.id}</strong>Attempt</span>
                <span class="history-date">${session.date}</span>
                <span class="history-result" style="color: ${state.color}; background: ${state.background}">${session.result}</span>
            </summary>
            <div class="recorded-data-grid">${details}</div>
        </details>
    `;
}).join("");