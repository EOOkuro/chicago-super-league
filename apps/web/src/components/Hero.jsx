<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Beverly — Beverly's Football Club</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black:       #000000;
      --dark:        #0a0a0a;
      --gray-dark:   #1a1a1a;
      --gray-mid:    #333333;
      --gray-light:  #666666;
      --white:       #ffffff;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Inter', sans-serif;
      background: var(--black);
      color: var(--white);
      overflow-x: hidden;
    }

    /* NAV */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      background: rgba(0, 0, 0, 0.96);
      backdrop-filter: blur(8px);
      border-bottom: 2px solid var(--white);
      flex-wrap: wrap;
      gap: 10px;
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .crest-icon {
      width: 36px;
      height: 36px;
      background: var(--black);
      border: 2px solid var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: var(--white);
    }

    .nav-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 18px;
      letter-spacing: 1px;
      color: var(--white);
    }

    .nav-league {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      color: var(--gray-light);
      letter-spacing: 0.5px;
    }

    .nav-cta {
      background: var(--white);
      color: var(--black);
      font-weight: 700;
      font-size: 13px;
      padding: 8px 18px;
      border-radius: 4px;
      text-decoration: none;
      letter-spacing: 0.5px;
      transition: all 0.2s;
      border: 2px solid var(--white);
    }
    .nav-cta:hover {
      background: transparent;
      color: var(--white);
    }

    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 24px 80px;
      position: relative;
      background: linear-gradient(160deg, rgba(0,0,0,1) 0%, rgba(26,26,26,1) 100%);
      border-bottom: 4px solid var(--white);
    }

    .hero-eyebrow {
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      letter-spacing: 3px;
      color: var(--gray-light);
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(56px, 12vw, 112px);
      line-height: 0.9;
      letter-spacing: 2px;
      color: var(--white);
      margin-bottom: 8px;
    }

    .hero-title span {
      color: var(--white);
      display: block;
      opacity: 0.7;
    }

    .hero-sub {
      font-size: 16px;
      color: rgba(255,255,255,0.6);
      margin: 24px 0 40px;
      max-width: 480px;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-primary {
      background: var(--white);
      color: var(--black);
      font-weight: 700;
      font-size: 15px;
      padding: 14px 32px;
      border-radius: 4px;
      text-decoration: none;
      letter-spacing: 0.5px;
      transition: all 0.2s;
      border: 2px solid var(--white);
      cursor: pointer;
    }
    .btn-primary:hover {
      background: transparent;
      color: var(--white);
    }

    .btn-outline {
      border: 2px solid var(--white);
      color: var(--white);
      font-size: 15px;
      padding: 14px 32px;
      border-radius: 4px;
      text-decoration: none;
      transition: all 0.2s;
      background: transparent;
      cursor: pointer;
    }
    .btn-outline:hover {
      background: var(--white);
      color: var(--black);
    }

    /* SECTIONS */
    .section {
      padding: 80px 24px;
      max-width: 960px;
      margin: 0 auto;
    }

    .section-label {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 3px;
      color: var(--gray-light);
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .section-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(36px, 6vw, 56px);
      letter-spacing: 1px;
      margin-bottom: 48px;
      line-height: 1;
      color: var(--white);
    }

    .section-title span {
      opacity: 0.6;
    }

    .teams-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }

    .team-card {
      background: var(--gray-dark);
      border: 1px solid var(--gray-mid);
      border-radius: 8px;
      padding: 28px 24px;
      transition: all 0.3s;
    }

    .team-card:hover {
      border-color: var(--white);
      background: var(--dark);
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(255,255,255,0.04);
    }

    .team-badge {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 2px;
      color: var(--gray-light);
      margin-bottom: 12px;
    }

    .team-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      letter-spacing: 1px;
      margin-bottom: 8px;
      color: var(--white);
    }

    .team-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.6);
      line-height: 1.6;
    }

    /* SIGNUP */
    .signup-section {
      background: var(--dark);
      padding: 80px 24px;
      border-top: 3px solid var(--white);
      border-bottom: 3px solid var(--white);
    }

    .signup-inner {
      max-width: 960px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
    }

    .signup-price {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(80px, 14vw, 140px);
      line-height: 1;
      color: var(--white);
    }

    .signup-price-label {
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      letter-spacing: 2px;
      color: var(--gray-light);
      margin-top: -8px;
      margin-bottom: 24px;
    }

    .includes-list {
      list-style: none;
      margin: 24px 0 36px;
    }

    .includes-list li {
      font-size: 15px;
      color: rgba(255,255,255,0.85);
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .includes-list li::before {
      content: '✓';
      color: var(--white);
      font-weight: 700;
      font-size: 13px;
    }

    .signup-form-side .section-label { color: var(--gray-light); }
    .signup-form-side .section-title { font-size: clamp(32px, 5vw, 48px); }

    /* LEAGUE BAND */
    .league-band {
      background: var(--gray-dark);
      border-top: 1px solid var(--white);
      border-bottom: 1px solid var(--white);
      padding: 32px 24px;
      text-align: center;
    }

    .league-band-label {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 3px;
      color: var(--gray-light);
      margin-bottom: 8px;
    }

    .league-band-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 32px;
      letter-spacing: 2px;
      color: var(--white);
    }

    .league-band-link {
      font-size: 13px;
      color: rgba(255,255,255,0.4);
      text-decoration: none;
      display: block;
      margin-top: 6px;
      letter-spacing: 1px;
    }
    .league-band-link:hover {
      color: var(--white);
    }

    /* CONTACT */
    .contact-section {
      padding: 80px 24px;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
    }

    .contact-section .section-title {
      margin-bottom: 16px;
    }

    .contact-sub {
      font-size: 16px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 36px;
    }

    .contact-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* FOOTER */
    footer {
      border-top: 1px solid var(--gray-mid);
      padding: 24px;
      text-align: center;
    }

    footer p {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: var(--gray-light);
      letter-spacing: 1px;
    }

    footer a {
      color: var(--white);
      text-decoration: none;
    }
    footer a:hover {
      text-decoration: underline;
    }

    .divider {
      width: 100%;
      height: 1px;
      background: var(--gray-mid);
    }

    /* RESPONSIVE */
    @media (max-width: 640px) {
      .signup-inner {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .nav-league { display: none; }
      nav { padding: 10px 16px; }
      .nav-name { font-size: 15px; }
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <div class="nav-left">
      <div class="crest-icon">⚽</div>
      <div>
        <div class="nav-name">Beverly</div>
        <div class="nav-league">OutSouth League · Chicago</div>
      </div>
    </div>
    <a href="#register" class="nav-cta">Register Now</a>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-eyebrow">Beverly · Chicago South Side</div>
    <h1 class="hero-title">
      Beverly's
      <span>Football Club</span>
    </h1>
    <p class="hero-sub">
      Youth and adult soccer rooted in Beverly. Everyone welcome. No experience necessary.
    </p>
    <div class="hero-actions">
      <a href="#register" class="btn-primary">Register Your Child</a>
      <a href="#teams" class="btn-outline">Our Teams</a>
    </div>
  </section>

  <!-- TEAMS -->
  <section class="section" id="teams">
    <div class="section-label">The Club</div>
    <h2 class="section-title">Two Teams.<br><span>One Community.</span></h2>
    <div class="teams-grid">
      <div class="team-card">
        <div class="team-badge">ADULT TEAM</div>
        <div class="team-name">Beverly</div>
        <p class="team-desc">Competing in the OutSouth League. Open to all genders — everyone is welcome to play.</p>
      </div>
      <div class="team-card">
        <div class="team-badge">YOUTH · AGES 4–17</div>
        <div class="team-name">Beverly Academy</div>
        <p class="team-desc">Structured training, competitive games, and real development for South Side kids. $50 for the entire summer.</p>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- YOUTH SIGNUP -->
  <section class="signup-section" id="register">
    <div class="signup-inner">
      <div>
        <div class="signup-price">$50</div>
        <div class="signup-price-label">FOR THE ENTIRE SUMMER</div>
        <ul class="includes-list">
          <li>2 practice sessions per week</li>
          <li>Weekend games</li>
          <li>Full uniform included</li>
          <li>Practice shirt included</li>
          <li>Ages 4–17 · All skill levels</li>
          <li>No experience necessary</li>
        </ul>
      </div>
      <div class="signup-form-side">
        <div class="section-label">Youth Program</div>
        <h2 class="section-title">Register Your Child Today</h2>
        <p style="font-size:15px; color:rgba(255,255,255,0.65); line-height:1.7; margin-bottom:32px;">
          Spots are limited. Beverly is building the next generation of South Side footballers — give your child a real team, a real kit, and a real community this summer.
        </p>
        <a href="https://chicagosuperleague.com/youth" class="btn-primary" target="_blank">Sign Up at chicagosuperleague.com</a>
      </div>
    </div>
  </section>

  <!-- LEAGUE BAND -->
  <div class="league-band">
    <div class="league-band-label">Competing In</div>
    <div class="league-band-name">The OutSouth League</div>
    <a href="https://chicagosuperleague.com/youth" class="league-band-link" target="_blank">chicagosuperleague.com →</a>
  </div>

  <!-- CONTACT -->
  <section class="contact-section">
    <div class="section-label">Get In Touch</div>
    <h2 class="section-title">Join <span>The Club</span></h2>
    <p class="contact-sub">Questions about youth registration, adult tryouts, or sponsorship? Reach out.</p>
    <div class="contact-actions">
      <a href="mailto:info@chicagosuperleague.com" class="btn-primary">Email Us</a>
      <a href="https://chicagosuperleague.com" class="btn-outline" target="_blank">Visit League Site</a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>Beverly · Part of the OutSouth League · MegCity Futbol · Chicago, IL</p>
  </footer>

</body>
</html>