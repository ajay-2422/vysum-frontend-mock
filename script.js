/* =========================================================
   MOCK SESSION DATA

   IMPORTANT:
   These are demonstration values only.

   Later this data can be replaced with:
   fetch("/api/session/...")
   or an AWS API endpoint.
========================================================= */

const sessions = [

    /* =====================================================
       SESSION 1 - CONTACT
    ===================================================== */

    {

        id: "VS-2026-001",

        date: "06 Oct 2026 • 10:42 AM",

        result: "Drop reached the eye",

        confidence: 94,

        state: "contact",

        description:
            "The video and dropper reading suggest the drop reached the eye.",


        video: {

            frame: 184,

            eyeDetected: "Visible",

            dropDetected: "Visible",

            yoloConfidence: "96%"

        },


        sensor: {

            signal:
                "Possible eye contact",

            quality:
                "Clear",

            timestamp:
                "10:42:18.420"

        },


        vlm:

            "The video shows the drop reaching the eye. The dropper reading happened at about the same time.",


        fusion: [

            ["Video check", "Looks good"],

            ["Dropper check", "Looks good"],

            ["Timing between checks", "Matches"]

        ],


        fsm: [

            ["Bottle in view", "Yes"],

            ["Drop seen", "Yes"],

            ["Drop reached eye", "Yes"],

            ["Events happened in order", "Yes"]

        ],


        audit: {

            "How it was checked":
                "Example method",

            "Result status":
                "Ready",

            "Time taken":
                "1.8 seconds",

            "Notes":
                "None",

            "Record":
                "Sample",

            "Information from":
                "Example details"

        }

    },



    /* =====================================================
       SESSION 2 - NO CONTACT
    ===================================================== */

    {

        id: "VS-2026-002",

        date: "06 Oct 2026 • 10:31 AM",

        result: "Drop did not reach the eye",

        confidence: 89,

        state: "no-contact",

        description:
            "The information available does not show that the drop reached the eye.",


        video: {

            frame: 127,

            eyeDetected:
                "Visible",

            dropDetected:
                "Visible",

            yoloConfidence:
                "92%"

        },


        sensor: {

            signal:
                "No contact response",

            quality:
                "Clear",

            timestamp:
                "10:31:09.117"

        },


        vlm:

            "The video shows the drop near the eye, but not reaching it. The dropper reading does not show contact.",


        fusion: [

            ["Video check", "Looks good"],

            ["Dropper check", "No sign of contact"],

            ["Timing between checks", "Matches"]

        ],


        fsm: [

            ["Bottle in view", "Yes"],

            ["Drop seen", "Yes"],

            ["Drop reached eye", "No"],

            ["Events happened in order", "No"]

        ],


        audit: {

            "How it was checked":
                "Example method",

            "Result status":
                "Ready",

            "Time taken":
                "1.6 seconds",

            "Notes":
                "None",

            "Record":
                "Sample",

            "Information from":
                "Example details"

        }

    },



    /* =====================================================
       SESSION 3 - INDETERMINATE
    ===================================================== */

    {

        id:
            "VS-2026-003",

        date:
            "06 Oct 2026 • 10:18 AM",

        result:
            "Not enough information",

        confidence:
            52,

        state:
            "indeterminate",

        description:

            "The video or dropper reading is unclear, so this result cannot be confirmed.",


        video: {

            frame:
                91,

            eyeDetected:
                "Partly visible",

            dropDetected:
                "Hard to tell",

            yoloConfidence:
                "61%"

        },


        sensor: {

            signal:
                "Unclear reading",

            quality:
                "Unclear",

            timestamp:
                "10:18:44.802"

        },


        vlm:

            "Part of the eye is hard to see, and the dropper reading is unclear. There is not enough information to tell whether the drop reached the eye.",


        fusion: [

            ["Video check", "Hard to read"],

            ["Dropper check", "Hard to read"],

            ["Timing between checks", "Unclear"]

        ],


        fsm: [

            ["Bottle in view", "Yes"],

            ["Drop seen", "Hard to tell"],

            ["Drop reached eye", "Hard to tell"],

            ["Events happened in order", "Unclear"]

        ],


        audit: {

            "How it was checked":
                "Example method",

            "Result status":
                "Needs a clearer recording",

            "Time taken":
                "2.1 seconds",

            "Notes":
                "Dropper reading was unclear",

            "Record":
                "Sample",

            "Information from":
                "Example details"

        }

    }

];



/* =========================================================
   COLOURS FOR RESULTS
========================================================= */

const states = {

    contact: {

        color:
            "#15803d",

        background:
            "#ecfdf3",

        icon:
            "✓"

    },


    "no-contact": {

        color:
            "#dc2626",

        background:
            "#fff1f0",

        icon:
            "×"

    },


    indeterminate: {

        color:
            "#d97706",

        background:
            "#fff8e6",

        icon:
            "?"

    }

};



/* =========================================================
   HELPER FUNCTION
========================================================= */

function metric(label, value) {

    return `

        <div class="metric">

            <span>${label}</span>

            <strong>${value}</strong>

        </div>

    `;

}



function validationRow(label, value) {

    return `

        <div class="validation-row">

            <span>${label}</span>

            <strong>${value}</strong>

        </div>

    `;

}


function getRecordedData(session) {

    return [
        ["Attempt", session.id],
        ["Date and time", session.date],
        ["Result", session.result],
        ["How sure is this result?", session.confidence + "%"],
        ["Video moment", session.video.frame],
        ["Eye in view", session.video.eyeDetected],
        ["Drop in view", session.video.dropDetected],
        ["Chance video check is right", session.video.yoloConfidence],
        ["Dropper reading", session.sensor.signal],
        ["Reading clarity", session.sensor.quality],
        ["Dropper reading time", session.sensor.timestamp],
        ["Summary", session.vlm],
        ["Checks from both sources", session.fusion.map(([label, value]) => `${label}: ${value}`).join("; ")],
        ["Drop use, step by step", session.fsm.map(([label, value]) => `${label}: ${value}`).join("; ")],
        ...Object.entries(session.audit)
    ];

}



/* =========================================================
   CREATE SESSION LIST
========================================================= */

function renderSessionList(activeIndex) {

    const list =
        document.getElementById(
            "sessionList"
        );


    list.innerHTML =
        sessions.map(

            (session, index) => {

                const state =
                    states[
                        session.state
                    ];


                return `

                <button
                    type="button"
                    class="session
                    ${
                        index ===
                        activeIndex
                        ? "active"
                        : ""
                    }"

                    aria-pressed="${index === activeIndex}"

                    onclick="
                        renderSession(
                            ${index}
                        )
                    "
                >

                    <div
                        class="session-header"
                    >

                        <span
                            class="session-id"
                        >

                            ${session.id}

                        </span>


                        <span
                            class="status-dot"

                            style="
                                background:
                                ${state.color}
                            "
                        >
                        </span>

                    </div>


                    <div
                        class="session-info"
                    >

                        ${session.result}

                    </div>

                </button>

                `;

            }

        ).join("");

}



/* =========================================================
   RENDER SELECTED SESSION
========================================================= */

function renderSession(index) {

    const session =
        sessions[index];


    const state =
        states[
            session.state
        ];


    /* Update left panel */

    renderSessionList(index);



    /* =====================================================
       MAIN RESULT
    ===================================================== */

    document.getElementById(
        "sessionId"
    ).textContent =
        session.id;


    document.getElementById(
        "sessionDate"
    ).textContent =
        session.date;


    const decision =
        document.getElementById(
            "finalDecision"
        );


    decision.textContent =
        session.result;


    decision.style.color =
        state.color;


    document.getElementById(
        "resultDescription"
    ).textContent =
        session.description;



    /* Result Icon */

    const icon =
        document.getElementById(
            "resultIcon"
        );


    icon.textContent =
        state.icon;


    icon.style.color =
        state.color;


    icon.style.background =
        state.background;



    /* =====================================================
       CONFIDENCE
    ===================================================== */

    document.getElementById(
        "confidenceValue"
    ).textContent =
        session.confidence + "%";


    const confidenceFill =
        document.getElementById(
            "confidenceFill"
        );


    confidenceFill.style.width =
        session.confidence + "%";


    confidenceFill.style.background =
        state.color;



    /* =====================================================
       VIDEO / YOLO
    ===================================================== */

    document.getElementById(
        "frameNumber"
    ).textContent =

        "Video moment " +
        session.video.frame;


    document.getElementById(
        "videoMetrics"
    ).innerHTML =

        metric(
            "Eye seen",
            session.video.eyeDetected
        )

        +

        metric(
            "Drop seen",
            session.video.dropDetected
        )

        +

        metric(
            "Chance video check is right",
            session.video.yoloConfidence
        );



    /* =====================================================
       SENSOR
    ===================================================== */

    document.getElementById(
        "sensorMetrics"
    ).innerHTML =

        metric(
            "Dropper reading",
            session.sensor.signal
        )

        +

        metric(
            "Reading clarity",
            session.sensor.quality
        )

        +

        metric(
            "Recorded at",
            session.sensor.timestamp
        );


    document.getElementById(
        "sensorLine"
    ).style.color =
        state.color;



    /* =====================================================
       VLM
    ===================================================== */

    document.getElementById(
        "vlmAnalysis"
    ).textContent =
        session.vlm;



    /* =====================================================
       SIGNAL FUSION
    ===================================================== */

    document.getElementById(
        "fusionResults"
    ).innerHTML =

        session.fusion

        .map(

            item =>
                validationRow(
                    item[0],
                    item[1]
                )

        )

        .join("");



    /* =====================================================
       FSM
    ===================================================== */

    document.getElementById(
        "fsmResults"
    ).innerHTML =

        session.fsm

        .map(

            item =>
                validationRow(
                    item[0],
                    item[1]
                )

        )

        .join("");



    /* =====================================================
       AUDIT
    ===================================================== */

    const audit =
        document.getElementById(
            "auditInformation"
        );


    audit.innerHTML =

        Object.entries(
            session.audit
        )

        .map(

            ([key, value]) => `

                <div
                    class="audit-item"
                >

                    <span>
                        ${key}
                    </span>

                    <strong>
                        ${value}
                    </strong>

                </div>

            `

        )

        .join("");


    const recordedData = getRecordedData(session);

    document.getElementById("recordedData").innerHTML =
        recordedData.map(([label, value]) => `
            <div class="recorded-data-item">
                <span>${label}</span>
                <strong>${value}</strong>
            </div>
        `).join("");

}



/* =========================================================
   INITIAL PAGE
========================================================= */

if (document.getElementById("sessionList")) {
    renderSession(0);
}