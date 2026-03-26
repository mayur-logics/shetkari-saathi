* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --green: #00ff88;
  --green-dim: #00cc66;
  --green-dark: #004422;
  --bg: #050a05;
  --bg2: #0a1a0a;
  --panel: #0d1f0d;
  --border: #1a4a1a;
  --text: #c8f5c8;
  --text-dim: #6aaa6a;
  --red: #ff4444;
  --amber: #ffaa00;
  --blue: #00aaff;
}

body {
  font-family: 'Share Tech Mono', monospace;
  background: var(--bg);
  color: var(--green);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* Scanlines overlay */
.scanlines {
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 136, 0.02) 2px,
    rgba(0, 255, 136, 0.02) 4px
  );
  pointer-events: none;
  z-index: 9999;
}

/* Grid background */
.grid-bg {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

/* Header */
header {
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, #071507 0%, var(--bg) 100%);
  padding: 18px 30px;
  position: relative;
  z-index: 10;
}

.header-inner {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-icon {
  font-size: 2.2rem;
  color: var(--green);
  text-shadow: 0 0 20px var(--green);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; text-shadow: 0 0 20px var(--green); }
  50% { opacity: 0.7; text-shadow: 0 0 40px var(--green), 0 0 80px var(--green); }
}

.logo {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--green);
  text-shadow: 0 0 15px rgba(0,255,136,0.5);
  letter-spacing: 3px;
}

.tagline {
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 1px;
  margin-top: 2px;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--green-dim);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 2px;
  background: rgba(0,255,136,0.05);
}

.dot {
  width: 8px; height: 8px;
  background: var(--green);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--green);
  animation: blink-dot 1.5s ease-in-out infinite;
}

@keyframes blink-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

/* Main */
main {
  max-width: 820px;
  margin: 28px auto;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

/* Control Bar */
.control-bar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.bar-label {
  font-size: 0.72rem;
  color: var(--text-dim);
  letter-spacing: 1px;
  min-width: 100px;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.region-btn, .lang-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  padding: 5px 14px;
  border-radius: 2px;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.82rem;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}

.region-btn:hover, .lang-btn:hover {
  border-color: var(--green);
  color: var(--green);
  background: rgba(0,255,136,0.05);
}

.region-btn.active {
  border-color: var(--green);
  color: var(--bg);
  background: var(--green);
  text-shadow: none;
  box-shadow: 0 0 10px rgba(0,255,136,0.4);
}

.lang-btn.active {
  border-color: var(--blue);
  color: var(--bg);
  background: var(--blue);
  box-shadow: 0 0 10px rgba(0,170,255,0.4);
}

/* Terminal header */
.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--panel);
  border: 1px solid var(--border);
  border-bottom: none;
  padding: 8px 16px;
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 1px;
}

.blink {
  animation: blink 1s step-end infinite;
  color: var(--green);
}

@keyframes blink { 50% { opacity: 0; } }

/* Chat box */
.chat-box {
  background: var(--panel);
  border: 1px solid var(--border);
  padding: 20px;
  height: 360px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scrollbar-width: thin;
  scrollbar-color: var(--green-dark) transparent;
}

.chat-box::-webkit-scrollbar { width: 4px; }
.chat-box::-webkit-scrollbar-thumb { background: var(--green-dark); border-radius: 2px; }

.message {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 82%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

.sender {
  font-size: 0.68rem;
  letter-spacing: 1px;
  color: var(--text-dim);
}

.message.bot .sender { color: var(--green-dim); }
.message.user .sender { color: var(--amber); text-align: right; }

.message.bot {
  align-self: flex-start;
}

.message.bot span:last-child {
  background: rgba(0,255,136,0.06);
  border: 1px solid rgba(0,255,136,0.2);
  border-left: 3px solid var(--green);
  padding: 10px 14px;
  border-radius: 0 6px 6px 0;
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.message.user {
  align-self: flex-end;
}

.message.user span:last-child {
  background: rgba(255,170,0,0.08);
  border: 1px solid rgba(255,170,0,0.3);
  border-right: 3px solid var(--amber);
  padding: 10px 14px;
  border-radius: 6px 0 0 6px;
  color: var(--amber);
  font-size: 0.9rem;
  line-height: 1.6;
  text-align: right;
}

/* Quick buttons */
.quick-label {
  font-size: 0.72rem;
  color: var(--text-dim);
  letter-spacing: 1px;
  margin: 16px 0 8px;
}

.quick-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.quick-btns button {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  padding: 7px 16px;
  border-radius: 2px;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.82rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.quick-btns button:hover {
  border-color: var(--green);
  color: var(--green);
  background: rgba(0,255,136,0.05);
  box-shadow: 0 0 8px rgba(0,255,136,0.15);
}

/* Input area */
.input-area {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--panel);
  border: 1px solid var(--border);
  padding: 6px 12px;
  transition: border-color 0.2s;
}

.input-area:focus-within {
  border-color: var(--green);
  box-shadow: 0 0 12px rgba(0,255,136,0.1);
}

.prompt-sym {
  color: var(--green);
  font-size: 0.9rem;
}

.input-area input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  padding: 6px 0;
}

.input-area input::placeholder { color: var(--text-dim); }

#sendBtn {
  background: var(--green);
  color: var(--bg);
  border: none;
  padding: 8px 20px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.2s;
  border-radius: 2px;
}

#sendBtn:hover {
  background: var(--green-dim);
  box-shadow: 0 0 12px rgba(0,255,136,0.4);
}

/* Footer */
footer {
  text-align: center;
  padding: 20px;
  font-size: 0.7rem;
  color: var(--text-dim);
  letter-spacing: 2px;
  border-top: 1px solid var(--border);
  position: relative;
  z-index: 10;
}

/* Responsive */
@media (max-width: 600px) {
  header { padding: 14px 16px; }
  .logo { font-size: 1.3rem; }
  .header-inner { flex-direction: column; gap: 10px; align-items: flex-start; }
  .control-group { flex-direction: column; align-items: flex-start; }
  main { padding: 0 12px; }
  .chat-box { height: 280px; }
}
