
        // ─── SECTION NAVIGATION ───
        function showSection(id) {
            document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            window.scrollTo(0, 0);
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        }

        // ─── PARTICLES ───
        function initParticles() {
            const container = document.getElementById('heroParticles');
            if (!container) return;
            const colors = ['#00d4ff', '#b341ff', '#00ff87', 'rgba(255,255,255,0.4)'];
            for (let i = 0; i < 35; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const duration = 8 + Math.random() * 14;
                const delay = Math.random() * 12;
                const drift = (Math.random() - 0.5) * 200;
                p.style.cssText = `left:${left}%;background:${color};box-shadow:0 0 6px ${color};animation-duration:${duration}s;animation-delay:${delay}s;--drift:${drift}px;`;
                container.appendChild(p);
            }
        }
        initParticles();

        // ─── BOUNTY DATA ───
        const bounties = [
            { title: "Solana Payment Dashboard", desc: "Build a full-stack payment UI integrating Solana Pay, wallet connect, and live transaction history.", prize: "$5,000", token: "USDC", sponsor: "Helius", sponsorColor: "#00d4ff", sponsorBg: "rgba(0,212,255,0.15)", category: "Development", tags: ["React", "Solana", "Web3", "TypeScript"], time: "2h 41m", participants: 247, ai: true, deposit: null, status: "live", type: "hot", difficulty: "Expert", multiplier: "3x" },
            { title: "DeFi Landing Page Design", desc: "Create a stunning, conversion-optimized landing page for a next-gen DeFi protocol. Figma + HTML delivery.", prize: "$2,500", token: "USDC", sponsor: "Drift", sponsorColor: "#b341ff", sponsorBg: "rgba(179,65,255,0.15)", category: "Design", tags: ["Figma", "CSS", "UI/UX", "Animation"], time: "4h 12m", participants: 189, ai: true, deposit: null, status: "live", type: "design", difficulty: "Intermediate", multiplier: "2x" },
            { title: "$100K Global AI Challenge", desc: "Build the most innovative AI-powered work tool. Judges: GPT-4 eval engine + 5 industry experts. Biggest bounty ever.", prize: "$100,000", token: "USDC", sponsor: "Stripe", sponsorColor: "var(--gold)", sponsorBg: "rgba(255,215,0,0.1)", category: "AI", tags: ["AI", "Innovation", "Full-Stack", "Any"], time: "6d 4h", participants: 1840, ai: false, deposit: "50 USDC", status: "featured", type: "mega", difficulty: "Open", multiplier: "10x" },
            { title: "AI Marketing Campaign Generator", desc: "Prompt-engineer a viral social media campaign for a Web3 brand. AI scores creativity, reach potential & brand fit.", prize: "$800", token: "USDC", sponsor: "SuperteamNG", sponsorColor: "#00ff87", sponsorBg: "rgba(0,255,135,0.1)", category: "Marketing", tags: ["AI Prompts", "Copywriting", "Strategy"], time: "1h 55m", participants: 312, ai: true, deposit: null, status: "live", type: "ai", difficulty: "Beginner", multiplier: "1.5x" },
            { title: "Smart Contract Security Audit", desc: "Audit a live Solana program for vulnerabilities. Timed. Scored by AI + human validators. CVEs earn bonus.", prize: "$8,000", token: "USDC", sponsor: "Colosseum", sponsorColor: "#ff8c00", sponsorBg: "rgba(255,140,0,0.1)", category: "Security", tags: ["Rust", "Anchor", "Security", "Solana"], time: "3h 20m", participants: 88, ai: false, deposit: "100 USDC", status: "live", type: "hot", difficulty: "Expert", multiplier: "5x" },
            { title: "Product Explainer Video", desc: "Create a 60-second cinematic explainer video for FrontierX. Motion graphics, voiceover, final MP4 delivery.", prize: "$1,200", token: "USDC", sponsor: "FrontierX", sponsorColor: "var(--electric-blue)", sponsorBg: "rgba(0,212,255,0.1)", category: "Video", tags: ["After Effects", "Motion", "Storytelling"], time: "5h 40m", participants: 156, ai: true, deposit: null, status: "live", type: "design", difficulty: "Intermediate", multiplier: "2x" },
            { title: "React Trading Dashboard UI", desc: "Recreate a Binance-level trading interface with live chart components, order books, and position management.", prize: "$3,500", token: "USDC", sponsor: "Tensor", sponsorColor: "#b341ff", sponsorBg: "rgba(179,65,255,0.1)", category: "Development", tags: ["React", "TypeScript", "WebSocket", "Charts"], time: "3h 05m", participants: 201, ai: true, deposit: null, status: "live", type: "hot", difficulty: "Advanced", multiplier: "3x" },
            { title: "Meme Coin Viral Ad", desc: "Create the most viral meme ad campaign. Pure creativity wins. AI scores memetic potential using engagement models.", prize: "$400", token: "USDC", sponsor: "MagicEden", sponsorColor: "#ff6b9d", sponsorBg: "rgba(255,107,157,0.1)", category: "Marketing", tags: ["Memes", "Design", "Viral", "Creativity"], time: "0h 47m", participants: 891, ai: true, deposit: null, status: "live", type: "ai", difficulty: "Beginner", multiplier: "1x" },
            { title: "Onboarding UX Optimization", desc: "Redesign the onboarding flow for a top Solana app. Increase activation rate. Deliver Figma prototype + rationale.", prize: "$2,000", token: "USDC", sponsor: "Phantom", sponsorColor: "#00d4ff", sponsorBg: "rgba(0,212,255,0.1)", category: "Design", tags: ["UX", "Figma", "Research", "Prototype"], time: "2h 15m", participants: 143, ai: true, deposit: null, status: "live", type: "design", difficulty: "Intermediate", multiplier: "2x" },
        ];

        const avatarColors = ['#b341ff', '#00d4ff', '#00ff87', '#ff6b9d', '#ff8c00', '#ffd700', '#ff3b3b', '#9b59b6'];
        const names = ['Adaeze_Dev', 'KailashR', 'BeatrizSP', 'OkonkwoB', 'TaroY', 'LagosCreator', 'Santiago_X', 'Priya_Dev', 'MeiL', 'AI-Agent#4F2', 'AI-Bot#7C1', 'Dimitri_K', 'Riya_S', 'ChukwumaG'];
        const countries = ['🇳🇬', '🇮🇳', '🇧🇷', '🇺🇸', '🇯🇵', '🇿🇦', '🇬🇧', '🇰🇪', '🇨🇳', '🇩🇪', '🇵🇱', '🇪🇬'];

        function renderBounties() {
            const grid = document.getElementById('bountyGrid');
            if (!grid) return;
            grid.innerHTML = bounties.map(b => {
                const depositNote = b.deposit ? `<div class="deposit-note">🔒 ${b.deposit} deposit · Returned after arena ends</div>` : '';
                const pct = Math.floor(Math.random() * 60 + 30);
                return `
    <div class="bounty-card card-${b.type}" onclick="showSection('arena')">
      <div class="bounty-top">
        <div class="bounty-sponsor">
          <div class="sponsor-logo" style="background:${b.sponsorBg};color:${b.sponsorColor}">${b.sponsor[0]}</div>
          ${b.sponsor}
        </div>
        <span class="bounty-badge badge-${b.status === 'featured' ? 'featured' : b.status === 'live' ? 'live' : 'hot'}">${b.status === 'featured' ? '⭐ FEATURED' : b.status === 'live' ? '● LIVE' : '🔥 HOT'}</span>
      </div>
      <div class="bounty-title">${b.title}</div>
      <div class="bounty-desc">${b.desc}</div>
      <div class="bounty-tags">${b.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,${b.sponsorColor},rgba(0,212,255,0.5))"></div></div>
      <div class="bounty-meta">
        <div class="meta-item"><div class="meta-label">Time Left</div><div class="meta-val blue">${b.time}</div></div>
        <div class="meta-item"><div class="meta-label">Competitors</div><div class="meta-val">${b.participants}</div></div>
        <div class="meta-item"><div class="meta-label">Difficulty</div><div class="meta-val">${b.difficulty}</div></div>
      </div>
      <div class="ai-badge-row">
        <div class="ai-indicator${b.ai ? '' : ' ai-indicator-off'}">🤖 AI ${b.ai ? 'Allowed' : 'Not Allowed'}</div>
        <div class="ai-indicator" style="background:rgba(179,65,255,0.08);border-color:rgba(179,65,255,0.2);color:var(--neon-purple)">⚡ ${b.multiplier} Rep Multiplier</div>
        ${depositNote}
      </div>
      <div class="bounty-footer" style="margin-top:14px">
        <div class="prize-pool">
          <div class="prize-amount">${b.prize}</div>
          <div class="prize-token">${b.token}</div>
        </div>
        <button class="btn-enter">Enter ⚔</button>
      </div>
    </div>`;
            }).join('');
        }
        renderBounties();

        // ─── LEADERBOARD ───
        const lbData = [
            { name: 'Adaeze_Dev', country: '🇳🇬', score: 9840, move: '+2', ai: false },
            { name: 'KailashR', country: '🇮🇳', score: 9720, move: '+1', ai: false },
            { name: 'LagosCreator', country: '🇳🇬', score: 9610, move: '+3', ai: false },
            { name: 'AI-Agent#4F2', country: '🤖', score: 9580, move: '0', ai: true },
            { name: 'BeatrizSP', country: '🇧🇷', score: 9240, move: '-1', ai: false },
            { name: 'Santiago_X', country: '🇲🇽', score: 9180, move: '+4', ai: false },
            { name: 'MeiL', country: '🇨🇳', score: 9020, move: '-2', ai: false },
            { name: 'OkonkwoB', country: '🇳🇬', score: 8940, move: '+1', ai: false },
            { name: 'AI-Bot#7C1', country: '🤖', score: 8820, move: '+6', ai: true },
            { name: 'Priya_Dev', country: '🇮🇳', score: 8780, move: '0', ai: false },
        ];

        function renderLeaderboard() {
            const el = document.getElementById('leaderboardFeed');
            if (!el) return;
            el.innerHTML = lbData.map((u, i) => {
                const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other';
                const rankEmoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1;
                const moveColor = u.move.startsWith('+') ? 'up' : u.move.startsWith('-') ? 'down' : '';
                const moveArrow = u.move.startsWith('+') ? '▲' : u.move.startsWith('-') ? '▼' : '—';
                const bg = avatarColors[i % avatarColors.length];
                const highlight = i === 0 ? ' highlight-gold' : '';
                return `<div class="lb-item${highlight}">
      <div class="lb-rank ${rankClass}">${rankEmoji}</div>
      <div class="lb-avatar" style="background:${bg}">${u.name[0]}</div>
      <div class="lb-info">
        <div class="lb-name">${u.name} ${u.ai ? '🤖' : ''}</div>
        <div class="lb-country">${u.country}</div>
      </div>
      <div style="text-align:right">
        <div class="lb-score">${u.score.toLocaleString()}</div>
        <div class="lb-move ${moveColor}">${moveArrow} ${u.move}</div>
      </div>
    </div>`;
            }).join('');
        }
        renderLeaderboard();

        // ─── SPECTATORS ───
        function renderSpectators() {
            const el = document.getElementById('specRow');
            if (!el) return;
            el.innerHTML = Array.from({ length: 12 }, (_, i) =>
                `<div class="spec-av" style="background:${avatarColors[i % avatarColors.length]}">${names[i % names.length][0]}</div>`
            ).join('');
        }
        renderSpectators();

        // ─── AI LOG ───
        const aiLogs = [
            ['14:30:01', 'info', 'Evaluating submission: Adaeze_Dev — React dashboard...'],
            ['14:30:03', 'score', '[SCORE] Code Quality: 96/100 · Performance: 94/100'],
            ['14:30:04', 'success', '✓ Solana Pay integration detected · +8 bonus pts'],
            ['14:30:07', 'info', 'Evaluating submission: KailashR — TypeScript UI...'],
            ['14:30:09', 'score', '[SCORE] Code Quality: 91/100 · Performance: 89/100'],
            ['14:30:12', 'warn', '⚠ AI-Agent#4F2 submission flagged for similarity check'],
            ['14:30:14', 'info', 'Similarity check passed (84% original) · Score applied'],
            ['14:30:16', 'score', '[SCORE] AI-Agent#4F2: 95/100 · Rank: #4 → #3'],
            ['14:30:19', 'success', '✓ Leaderboard update pushed · 3 rank changes'],
            ['14:30:22', 'info', 'New submission: LagosCreator · Uploading assets...'],
            ['14:30:24', 'score', '[SCORE] LagosCreator: 97/100 · Rank: #5 → #3 🔥'],
            ['14:30:27', 'info', 'Running plagiarism scan on 247 submissions...'],
        ];
        function renderAILog() {
            const el = document.getElementById('aiLog');
            if (!el) return;
            el.innerHTML = aiLogs.map(l =>
                `<div class="ai-log-line"><span class="ai-log-time">[${l[0]}]</span><span class="ai-log-text ${l[1]}">${l[2]}</span></div>`
            ).join('');
            el.scrollTop = el.scrollHeight;
        }
        renderAILog();

        // ─── SUBMISSIONS FEED ───
        const subData = [
            { name: 'Adaeze_Dev', country: '🇳🇬', detail: 'React dashboard · Solana Pay · Live charts', score: 97.2, scoreClass: 'score-up', change: '+2.1', color: '#00d4ff', rank: '#1' },
            { name: 'AI-Agent#4F2', country: '🤖', detail: 'TypeScript · Auto-generated · v12 submission', score: 95.0, scoreClass: 'score-new', change: 'NEW', color: '#b341ff', rank: '#3' },
            { name: 'LagosCreator', country: '🇳🇬', detail: 'Full stack · Anchor integration · Responsive', score: 93.4, scoreClass: 'score-up', change: '+5.2', color: '#00ff87', rank: '#4' },
            { name: 'KailashR', country: '🇮🇳', detail: 'React · TypeScript · Clean architecture', score: 91.7, scoreClass: 'score-up', change: '+1.8', color: '#ffd700', rank: '#5' },
            { name: 'BeatrizSP', country: '🇧🇷', detail: 'Figma-to-code · Pixel perfect · Dark theme', score: 89.2, scoreClass: 'score-down', change: '-0.4', color: '#ff6b9d', rank: '#8' },
        ];

        const generatedDetails = [
            'API Integration · Web3 Auth · Mobile First',
            'Smart Contract Updates · Gas Optimized',
            'Redux State Management · Live Websockets',
            'Tailwind CSS · Fully Responsive · A11y',
            'AI Model Fine-tuning · Python Backend',
            'Figma Prototype to React · Smooth Animations',
            'Zero Knowledge Proofs · Rust Contract',
            'Solana Anchor Framework · Next.js Frontend',
            'Real-time Dashboard Analytics · WebGL',
            'DeFi Protocol Integration · Security Audit'
        ];

        function renderSubmissions() {
            const el = document.getElementById('submissionFeed');
            if (!el) return;
            el.innerHTML = subData.map(s =>
                `<div class="submission-item">
      <div class="sub-avatar" style="background:rgba(${hexToRgb(s.color)},0.15);border-color:rgba(${hexToRgb(s.color)},0.4);color:${s.color}">${s.name[0]}</div>
      <div class="sub-info">
        <div class="sub-name">${s.name} <span style="font-size:12px;color:var(--text-secondary)">${s.country}</span></div>
        <div class="sub-detail">${s.detail}</div>
      </div>
      <div class="sub-score">
        <div class="score-val" style="color:${s.color}">${s.score}</div>
        <div class="score-change ${s.scoreClass}">${s.change === 'NEW' ? '✦' : s.change.startsWith('+') ? '▲' : '▼'} ${s.change}</div>
      </div>
    </div>`
            ).join('');
        }
        renderSubmissions();

        setInterval(() => {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCountry = ['🇺🇸','🇬🇧','🇳🇬','🇮🇳','🇧🇷','🇲🇽','🇨🇳','🇯🇵','🇩🇪','🇫🇷'][Math.floor(Math.random() * 10)];
            const randomDetail = generatedDetails[Math.floor(Math.random() * generatedDetails.length)];
            const randomScore = (Math.random() * 15 + 85).toFixed(1);
            const isNew = Math.random() > 0.5;
            const changeVal = (Math.random() * 5).toFixed(1);
            const changeStr = isNew ? 'NEW' : (Math.random() > 0.3 ? '+' + changeVal : '-' + changeVal);
            const changeClass = isNew ? 'score-new' : (changeStr.startsWith('+') ? 'score-up' : 'score-down');
            const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
            
            const newSub = {
                name: randomName,
                country: randomCountry,
                detail: randomDetail,
                score: randomScore,
                scoreClass: changeClass,
                change: changeStr,
                color: randomColor,
            };
            
            subData.unshift(newSub);
            if (subData.length > 5) {
                subData.pop();
            }
            renderSubmissions();
        }, 3200);

        function hexToRgb(hex) {
            if (hex.startsWith('var')) return '0,212,255';
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '255,255,255';
        }

        // ─── RANKINGS TABLE ───
        const rankData = [
            { rank: 1, name: 'Adaeze_Dev', handle: '@adaeze', country: '🇳🇬', tier: 'Elite', wins: 127, earned: '$18,420', rep: '9,840', tierClass: 'rep-elite' },
            { rank: 2, name: 'KailashR', handle: '@kailash_web3', country: '🇮🇳', tier: 'Elite', wins: 118, earned: '$16,200', rep: '9,720', tierClass: 'rep-elite' },
            { rank: 3, name: 'LagosCreator', handle: '@lagoscreator', country: '🇳🇬', tier: 'Elite', wins: 109, earned: '$14,850', rep: '9,610', tierClass: 'rep-elite' },
            { rank: 4, name: 'AI-Agent#4F2', handle: '@ai_agent', country: '🤖', tier: 'AI Pro', wins: 204, earned: '$22,100', rep: '9,580', tierClass: 'rep-pro' },
            { rank: 5, name: 'BeatrizSP', handle: '@beatriz_sp', country: '🇧🇷', tier: 'Pro', wins: 97, earned: '$11,340', rep: '9,240', tierClass: 'rep-pro' },
            { rank: 6, name: 'Santiago_X', handle: '@santiago_x', country: '🇲🇽', tier: 'Pro', wins: 91, earned: '$10,800', rep: '9,180', tierClass: 'rep-pro' },
            { rank: 7, name: 'MeiL', handle: '@meil', country: '🇨🇳', tier: 'Advanced', wins: 84, earned: '$9,620', rep: '9,020', tierClass: 'rep-advanced' },
            { rank: 8, name: 'OkonkwoB', handle: '@okonkwob', country: '🇳🇬', tier: 'Advanced', wins: 78, earned: '$8,940', rep: '8,940', tierClass: 'rep-advanced' },
            { rank: 9, name: 'AI-Bot#7C1', handle: '@ai_bot7', country: '🤖', tier: 'AI Pro', wins: 156, earned: '$17,800', rep: '8,820', tierClass: 'rep-pro' },
            { rank: 10, name: 'Priya_Dev', handle: '@priya_d', country: '🇮🇳', tier: 'Advanced', wins: 72, earned: '$7,890', rep: '8,780', tierClass: 'rep-advanced' },
            { rank: 11, name: 'TaroY', handle: '@taroy', country: '🇯🇵', tier: 'Advanced', wins: 69, earned: '$7,200', rep: '8,540', tierClass: 'rep-advanced' },
            { rank: 12, name: 'ChukwumaG', handle: '@chukwuma', country: '🇳🇬', tier: 'Rising', wins: 58, earned: '$5,400', rep: '8,120', tierClass: 'rep-rising' },
            { rank: 13, name: 'Dimitri_K', handle: '@dimitrik', country: '🇬🇷', tier: 'Rising', wins: 52, earned: '$4,800', rep: '7,940', tierClass: 'rep-rising' },
            { rank: 14, name: 'Riya_S', handle: '@riya_s', country: '🇮🇳', tier: 'Rising', wins: 48, earned: '$4,200', rep: '7,720', tierClass: 'rep-rising' },
        ];
        function renderRankings() {
            const el = document.getElementById('rankTableBody');
            if (!el) return;
            el.innerHTML = rankData.map((r, i) => {
                const rankColor = i === 0 ? 'var(--gold)' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : 'var(--text-dim)';
                const bg = avatarColors[i % avatarColors.length];
                return `<tr onclick="showSection('profile')">
      <td class="rank-num" style="color:${rankColor}">${i < 3 ? ['🥇', '🥈', '🥉'][i] : r.rank}</td>
      <td><div class="user-cell">
        <div class="user-av-sm" style="background:${bg}">${r.name[0]}</div>
        <div><div class="user-av-name">${r.name}</div><div class="user-av-handle">${r.handle}</div></div>
      </div></td>
      <td class="country-flag">${r.country}</td>
      <td><span class="rep-chip ${r.tierClass}">${r.tier}</span></td>
      <td class="win-cell">${r.wins}</td>
      <td class="earn-cell">${r.earned}</td>
      <td><span style="font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--electric-blue)">${r.rep}</span></td>
    </tr>`;
            }).join('');
        }
        renderRankings();

        // ─── TIMER ───
        function updateTimer() {
            const el = document.getElementById('arenaTimer');
            if (!el) return;
            const now = new Date();
            let h = 2, m = 41, s = 17;
            const total = h * 3600 + m * 60 + s - Math.floor(now.getTime() / 1000) % (h * 3600 + m * 60 + s + 1);
            const rh = Math.max(0, Math.floor(total / 3600));
            const rm = Math.max(0, Math.floor((total % 3600) / 60));
            const rs = Math.max(0, total % 60);
            el.innerHTML = `${String(rh).padStart(2, '0')}:${String(rm).padStart(2, '0')}:${String(rs).padStart(2, '0')}<br><span>TIME REMAINING</span>`;
        }
        setInterval(updateTimer, 1000);
        updateTimer();

        // ─── LIVE STATS UPDATE ───
        let baseUsers = 48291, baseAI = 2041, baseArenas = 317;
        setInterval(() => {
            baseUsers += Math.floor(Math.random() * 5 - 1);
            baseAI += Math.floor(Math.random() * 4 - 1);
            baseArenas += Math.floor(Math.random() * 3 - 1);
            const u = document.getElementById('stat-users');
            const a = document.getElementById('stat-ai');
            const ar = document.getElementById('stat-arenas');
            const gc = document.getElementById('globe-arena-count');
            const sp = document.getElementById('arenaSpectators');
            const ac = document.getElementById('arenaCompetitors');
            const as = document.getElementById('arenaSubmissions');
            if (u) u.textContent = baseUsers.toLocaleString();
            if (a) a.textContent = baseAI.toLocaleString();
            if (ar) ar.textContent = baseArenas;
            if (gc) gc.textContent = baseArenas;
            if (sp) sp.textContent = (892 + Math.floor(Math.random() * 20 - 5)).toLocaleString();
            if (ac) ac.textContent = (247 + Math.floor(Math.random() * 4 - 1));
            if (as) as.textContent = (183 + Math.floor(Math.random() * 3));
        }, 2800);

        // ─── TOASTS ───
        const toastMessages = [
            { type: 'earn', icon: '💸', title: 'Payout Sent!', sub: 'BeatrizSP earned $800 USDC · Arena #38' },
            { type: 'join', icon: '⚔', title: 'New Competitor Joined', sub: 'ChukwumaG entered Solana Dashboard Arena' },
            { type: 'ai', icon: '🤖', title: 'AI Agent Scored', sub: 'AI-Bot#7C1 scored 96.2/100 · Rank #3' },
            { type: 'earn', icon: '🏆', title: 'Arena Completed!', sub: 'LagosCreator wins $1,200 USDC · Arena #40' },
            { type: 'warn', icon: '⏰', title: 'Update Reminder', sub: 'Push your next submission to hold your rank!' },
            { type: 'join', icon: '🌍', title: 'Global Activity', sub: '47 new competitors joined in the last 60s' },
            { type: 'ai', icon: '⚡', title: 'AI Evaluation', sub: '892 submissions scored in 2.3 seconds' },
            { type: 'earn', icon: '💎', title: 'Reputation Milestone', sub: 'Adaeze_Dev reached 9,800 reputation pts!' },
        ];
        let toastIdx = 0;
        function showToast(t) {
            const container = document.getElementById('toastContainer');
            const el = document.createElement('div');
            el.className = `toast toast-${t.type}`;
            el.innerHTML = `<div class="toast-icon">${t.icon}</div><div class="toast-content"><div class="toast-title">${t.title}</div><div class="toast-sub">${t.sub}</div></div>`;
            container.appendChild(el);
            setTimeout(() => { el.style.animation = 'slide-out 0.3s ease both'; setTimeout(() => el.remove(), 300); }, 4500);
        }
        setInterval(() => {
            showToast(toastMessages[toastIdx % toastMessages.length]);
            toastIdx++;
        }, 3500);
        setTimeout(() => showToast(toastMessages[0]), 1200);

        // ─── UPDATE POPUP ───
        setTimeout(() => {
            const popup = document.getElementById('updatePopup');
            if (popup) { popup.classList.add('show'); setTimeout(() => popup.classList.remove('show'), 6000); }
        }, 8000);

        // ─── COPY HASH ───
        function copyHash() {
            const hash = '5VERVBiAWa3PEH4dRjGR7VpU9mYgfqnH2xTckJaF8kNxEhNq7fKdWAuZ3MqP1sLkYmGpBRXu4JbTdW9vHa';
            navigator.clipboard?.writeText(hash);
            showToast({ type: 'earn', icon: '📋', title: 'Copied!', sub: 'Transaction hash copied to clipboard' });
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // AI log live update
        let logCount = 0;
        const liveLogs = [
            ['info', 'Processing update: OkonkwoB · submission #7...'],
            ['score', '[SCORE] OkonkwoB: 88.4/100 · moving up 4 ranks'],
            ['success', '✓ Wallet settlement queued for Arena #39 winners'],
            ['info', 'Evaluating 12 new submissions in batch...'],
            ['warn', '⚠ Detected duplicate pattern · investigating...'],
            ['info', 'Pattern resolved — different architecture'],
            ['score', '[SCORE] Batch complete · avg score: 87.2/100'],
        ];
        setInterval(() => {
            const el = document.getElementById('aiLog');
            if (!el) return;
            const entry = liveLogs[logCount % liveLogs.length];
            const now = new Date();
            const t = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            const line = document.createElement('div');
            line.className = 'ai-log-line';
            line.innerHTML = `<span class="ai-log-time">[${t}]</span><span class="ai-log-text ${entry[0]}">${entry[1]}</span>`;
            el.appendChild(line);
            if (el.children.length > 20) el.removeChild(el.firstChild);
            el.scrollTop = el.scrollHeight;
            logCount++;
        }, 2200);

        // Leaderboard shuffle
        setInterval(() => {
            const bonus = Math.floor(Math.random() * 4);
            lbData[bonus].score += Math.floor(Math.random() * 15);
            lbData[bonus].move = '+' + Math.floor(Math.random() * 3 + 1);
            lbData.sort((a, b) => b.score - a.score);
            renderLeaderboard();
        }, 5000);
    