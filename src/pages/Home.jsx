import React from "react";
import { Link } from "react-router-dom";

function Home() {
    const [started, setStarted] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState("complaints");
    const [isGuideOpen, setIsGuideOpen] = React.useState(false);
    const [guideSoundOn, setGuideSoundOn] = React.useState(false);
    const videoPrimaryRef = React.useRef(null);
    const audioRef = React.useRef(null);
    const VIDEO_VOLUME = 1.0;
    const AUDIO_VOLUME = 0.4;
    const STORAGE_KEY = "aparichit:isMuted";

    React.useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
            setIsMuted(saved === "true");
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, String(isMuted));
    }, [isMuted]);

    const applyMuteState = (muted) => {
        const video = videoPrimaryRef.current;
        const extraAudio = audioRef.current;

        if (video) {
            video.muted = muted;
            video.volume = muted ? 0 : VIDEO_VOLUME;
        }

        if (extraAudio) {
            extraAudio.muted = muted;
            extraAudio.volume = muted ? 0 : AUDIO_VOLUME;
        }
    };

    const pauseMedia = () => {
        const video = videoPrimaryRef.current;
        const extraAudio = audioRef.current;
        if (video) {
            video.pause();
        }
        if (extraAudio) {
            extraAudio.pause();
        }
    };

    const resumeMedia = () => {
        const video = videoPrimaryRef.current;
        const extraAudio = audioRef.current;
        if (video) {
            video.play().catch(() => {});
        }
        if (extraAudio) {
            extraAudio.play().catch(() => {});
        }
    };

    const handleStart = () => {
        setStarted(true);

        const video = videoPrimaryRef.current;
        const extraAudio = audioRef.current;

        if (video) {
            video.currentTime = 0;
            video.muted = isMuted;
            video.volume = isMuted ? 0 : VIDEO_VOLUME;
            video.play().catch(() => console.log("Video playback failed"));
        }

        if (extraAudio) {
            extraAudio.currentTime = 0;
            extraAudio.muted = isMuted;
            extraAudio.volume = isMuted ? 0 : AUDIO_VOLUME;
            extraAudio.play().catch(() => console.log("Extra audio playback blocked"));
        }
    };

    const handleMuteToggle = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        if (!isGuideOpen) {
            applyMuteState(nextMuted);
        }

        if (started && !isGuideOpen) {
            resumeMedia();
        }
    };

    const handleMenuClick = (sectionId, key) => {
        setActiveMenu(key);
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    React.useEffect(() => {
        if (!isGuideOpen) return;
        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsGuideOpen(false);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isGuideOpen]);

    React.useEffect(() => {
        if (isGuideOpen) {
            setGuideSoundOn(false);
        }
    }, [isGuideOpen]);

    React.useEffect(() => {
        if (!started) return;
        if (isGuideOpen) {
            applyMuteState(true);
            pauseMedia();
            return;
        }
        applyMuteState(isMuted);
        if (!isMuted) {
            resumeMedia();
        }
    }, [isGuideOpen, isMuted, started]);

    return (
        <div className="stage">
            <header className="top-bar">
                <div className="brand-mark" aria-hidden="true">
                    <span className="brand-pen">Pen</span>
                </div>
                <div className="site-title">
                    <span className="title-main">APARICHIT</span>
                    <span className="title-dot">.com</span>
                </div>
                <nav className="top-links">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                    <Link className="nav-link" to="/request">
                        Request
                    </Link>
                </nav>
                <button className="sound-toggle" onClick={handleMuteToggle} type="button">
                    {isMuted ? "Unmute" : "Mute"}
                </button>
            </header>

            {!started && (
                <div id="startContainer" className="start-overlay">
                    <button id="startButton" onClick={handleStart}>
                        Enter
                    </button>
                </div>
            )}

            <main
                id="pageContent"
                className={`page-content ${started ? "show" : ""}`}
            >
                <div className="ghost-figure" aria-hidden="true"></div>

                <section className="center-stage">
                    <div id="talk-section" className="talk-panel">
                        <div className="talk-head">TALK BOX</div>
                        <div className="talk-body">
                            <span className="talk-hi">
                                अपनी शिकायत बताएँ: अपराध, अपराधी, और घटना‑स्थल।
                            </span>
                            <br />
                            <span className="talk-en">
                                State your complaint: the offense, the offender, and the place it occurred.
                            </span>
                        </div>
                    </div>

                    <div className="content-grid">
                        <div className="video-column">
                            <div id="video-section" className="video-panel video-panel--hero">
                                <video
                                    ref={videoPrimaryRef}
                                    id="mainVideo"
                                    className="main-video"
                                    src="/Videos/Video 1.mp4"
                                    playsInline
                                    loop
                                ></video>
                            </div>
                        </div>

                        <div className="complain-stack">
                            <div id="complain-section" className="story-panel">
                                <p className="intro">
                                    कलयुग अपने अंतिम चरण पर पहुँच चुका है। <br />
                                    <br />
                                    पाप का घड़ा भर चुका है। <br />
                                    <br />
                                    सबको अपने पापों का प्रायश्चित करवाने अपरिचित आ रहा है।
                                </p>
                                <p className="intro intro-english">
                                    The age of chaos has reached its final stage. <br />
                                    <br />
                                    The cup of sins has overflowed. <br />
                                    <br />
                                    Aparichit is coming to make everyone atone for their sins.
                                </p>
                                <p className="warning">
                                    Please let the video finish before submitting a complaint.
                                </p>
                                <Link to="/request">
                                    <button>COMPLAIN</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="side-menu">
                    <div className="menu-item menu-title">Welcome</div>
                    <button
                        className={`menu-item menu-button ${activeMenu === "guide" ? "is-active" : ""}`}
                        type="button"
                        aria-pressed={activeMenu === "guide"}
                        onClick={() => {
                            setActiveMenu("guide");
                            setIsGuideOpen(true);
                        }}
                    >
                        <span className="menu-icon"></span>
                        <span>Guide Video</span>
                    </button>
                    <button
                        className={`menu-item menu-button ${activeMenu === "needhi" ? "is-active" : ""}`}
                        type="button"
                        aria-pressed={activeMenu === "needhi"}
                        onClick={() => handleMenuClick("talk-section", "needhi")}
                    >
                        <span className="menu-icon"></span>
                        <span>Vithura Needhi</span>
                    </button>
                    <button
                        className={`menu-item menu-button ${activeMenu === "punishments" ? "is-active" : ""}`}
                        type="button"
                        aria-pressed={activeMenu === "punishments"}
                        onClick={() => handleMenuClick("video-section", "punishments")}
                    >
                        <span className="menu-icon"></span>
                        <span>Punishments</span>
                    </button>
                    <button
                        className={`menu-item menu-button ${activeMenu === "complaints" ? "is-active" : ""}`}
                        type="button"
                        aria-pressed={activeMenu === "complaints"}
                        onClick={() => handleMenuClick("complain-section", "complaints")}
                    >
                        <span className="menu-icon"></span>
                        <span>Complaints</span>
                    </button>
                </aside>
            </main>

            <audio ref={audioRef} id="extraAudio" src="/Audios/Theme Song.mp3" loop></audio>

            {isGuideOpen && (
                <div className="guide-modal" role="dialog" aria-modal="true" aria-label="Guide video">
                    <div className="guide-backdrop" onClick={() => setIsGuideOpen(false)}></div>
                    <div className="guide-card" role="document">
                        <button
                            className="guide-close"
                            type="button"
                            onClick={() => setIsGuideOpen(false)}
                            aria-label="Close guide video"
                        >
                            Close
                        </button>
                        <div className="guide-frame">
                            {!guideSoundOn && (
                                <button
                                    className="guide-play"
                                    type="button"
                                    onClick={() => setGuideSoundOn(true)}
                                >
                                    Play Guide
                                </button>
                            )}
                            <iframe
                                src={`https://www.youtube.com/embed/GnqOav7JRys?start=83&rel=0&enablejsapi=1&autoplay=1&mute=${guideSoundOn ? 0 : 1}&playsinline=1&modestbranding=1`}
                                title="Guide video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
