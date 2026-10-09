// Shared helpers for all pages.

// The ask is carried in the link itself as ?d=<base64url JSON>, so the site
// needs no server. Encoding only keeps the name out of plain sight.
function encodeAsk(ask) {
    const bytes = new TextEncoder().encode(JSON.stringify(ask));
    let binary = '';
    bytes.forEach((b) => { binary += String.fromCharCode(b); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeAsk(encoded) {
    const binary = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
}

// Reads the ask from the current URL. Also accepts the older ?name=&no=1 links.
function readAsk() {
    const params = new URLSearchParams(window.location.search);
    const ask = { name: '', from: '', message: '', canSayNo: false, raw: params.get('d') || '' };
    if (ask.raw) {
        try {
            const data = decodeAsk(ask.raw);
            ask.name = String(data.n || '').slice(0, 40);
            ask.from = String(data.f || '').slice(0, 40);
            ask.message = String(data.m || '').slice(0, 140);
            ask.canSayNo = data.x === 1;
        } catch (error) {
            ask.raw = '';
        }
    } else if (params.get('name')) {
        ask.name = params.get('name').trim().slice(0, 40);
        ask.canSayNo = params.get('no') === '1';
        ask.raw = encodeAsk({ n: ask.name, x: ask.canSayNo ? 1 : 0 });
    }
    return ask;
}

function pageUrl(page, raw) {
    const url = new URL(page, window.location.href);
    url.search = raw ? '?d=' + raw : '';
    url.hash = '';
    return url.toString();
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scatter(container, symbols, count, minSeconds, maxSeconds) {
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('span');
        const seconds = minSeconds + Math.random() * (maxSeconds - minSeconds);
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        piece.style.left = Math.random() * 100 + '%';
        piece.style.fontSize = 0.9 + Math.random() * 1.6 + 'rem';
        piece.style.animationDuration = seconds + 's';
        piece.style.animationDelay = -Math.random() * seconds + 's';
        piece.style.setProperty('--sway', (Math.random() * 8 - 4).toFixed(1) + 'rem');
        piece.style.setProperty('--spin', Math.round(Math.random() * 720 - 360) + 'deg');
        piece.style.setProperty('--o', (0.25 + Math.random() * 0.4).toFixed(2));
        container.appendChild(piece);
    }
}

// Slow hearts drifting up behind the card.
function driftingHearts(symbols) {
    if (reducedMotion) return;
    const sky = document.createElement('div');
    sky.className = 'sky';
    sky.setAttribute('aria-hidden', 'true');
    scatter(sky, symbols || ['💗', '💕', '🩷', '💖', '🌸'], 16, 11, 22);
    document.body.prepend(sky);
}

// One burst of hearts raining down, for the yes page.
function confetti() {
    if (reducedMotion) return;
    const layer = document.createElement('div');
    layer.className = 'confetti';
    layer.setAttribute('aria-hidden', 'true');
    scatter(layer, ['💖', '💘', '💝', '🎉', '✨', '🩷', '🌹'], 70, 2.5, 5.5);
    layer.querySelectorAll('span').forEach((piece) => {
        piece.style.animationDelay = Math.random() * 1.8 + 's';
    });
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 8000);
}

// Steady rain, for the no page.
function rain() {
    if (reducedMotion) return;
    const layer = document.createElement('div');
    layer.className = 'rain';
    layer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 70; i++) {
        const drop = document.createElement('span');
        const seconds = 0.6 + Math.random() * 0.9;
        drop.style.left = Math.random() * 110 + '%';
        drop.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
        drop.style.animationDuration = seconds + 's';
        drop.style.animationDelay = -Math.random() * seconds + 's';
        layer.appendChild(drop);
    }
    document.body.prepend(layer);
}
