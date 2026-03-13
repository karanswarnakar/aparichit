import React from "react";
import { Link } from "react-router-dom";
import "../request.css";

function Request() {
    const [requestHidden, setRequestHidden] = React.useState(false);
    const [confirmationVisible, setConfirmationVisible] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [name, setName] = React.useState("");
    const [cause, setCause] = React.useState("");
    const confirmationVideoRef = React.useRef(null);
    const externalAudioRef = React.useRef(null);

    const handleSubmit = () => {
        const trimmed = message.trim();
        const trimmedName = name.trim();
        const trimmedCause = cause.trim();
        if (trimmed === "" || trimmedName === "" || trimmedCause === "") {
            alert("कृपया सभी फ़ील्ड भरें। / Please fill all fields.");
            return;
        }

        setRequestHidden(true);
        setTimeout(() => {
            setConfirmationVisible(true);
            const video = confirmationVideoRef.current;
            const audio = externalAudioRef.current;
            if (video) {
                video.currentTime = 0;
                video.muted = false;
                video.volume = 1.0;
                video.play().catch(() => console.log("Video playback failed"));
            }
            if (audio) {
                audio.currentTime = 0;
                audio.volume = 0.4;
                audio.play().catch(() => console.log("External audio playback blocked"));
            }
        }, 300);
    };

    return (
        <div className={`request-page ${confirmationVisible ? "is-confirming" : ""}`}>
            <div className={`box request-box ${requestHidden ? "is-hidden" : ""}`} id="requestBox">
                <h1>गलती की सजा - मौत!</h1>
                <p className="subtitle">Mistake's punishment is death.</p>
                <p>गरुड़ पुराण के हिसाब से सबको सजा मिलेगी।</p>
                <p className="subtitle">According to Garuda Purana, everyone will be punished.</p>
                <hr />
                <p>अपनी समस्या लिखो। अपरिचित इन्साफ करेगा।</p>
                <p className="subtitle">Write your complaint. Aparichit will deliver justice.</p>
                <div className="field-grid">
                    <label className="field">
                        <span className="field-label">शिकायतकर्ता का नाम</span>
                        <span className="field-sub">Complainant Name</span>
                        <input
                            type="text"
                            placeholder="अपना नाम लिखें..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </label>
                    <label className="field">
                        <span className="field-label">शिकायत का कारण</span>
                        <span className="field-sub">Cause of Complaint</span>
                        <input
                            type="text"
                            placeholder="कारण लिखें..."
                            value={cause}
                            onChange={(event) => setCause(event.target.value)}
                        />
                    </label>
                </div>
                <textarea
                    id="input"
                    placeholder="अपनी समस्या यहाँ लिखें... / Write your complaint here..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                ></textarea>
                <div className="request-actions">
                    <Link className="ghost-link" to="/">
                        Back
                    </Link>
                    <button id="submit" type="button" onClick={handleSubmit}>
                        SUBMIT
                    </button>
                </div>
            </div>

            <div
                className={`box confirmation-box ${confirmationVisible ? "is-visible" : ""}`}
                id="confirmationBox"
            >
                <video
                    ref={confirmationVideoRef}
                    id="confirmationVideo"
                    src="/Videos/Video 2.mp4"
                    playsInline
                    loop
                ></video>
                <div id="confirmationContent">
                    {confirmationVisible
                        ? `नाम / Name: ${name.trim()} | कारण / Cause: ${cause.trim()} | संदेश / Message: ${message.trim()}`
                        : ""}
                </div>
            </div>

            <audio ref={externalAudioRef} id="externalAudio" src="/Audios/Theme Song.mp3" loop></audio>
        </div>
    );
}

export default Request;
