// Shared Header, Sidebar & Bottom Navigation Layout Template (Mobile App Shell)

document.write(`
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="manifest" href="manifest.json">
  <style>
    :root {
      --bg: #f4f7f6;
      --card: #ffffff;
      --text: #2c3e50;
      --muted: #7f8c8d;
      --border: #e2e8f0;
      --orange: #ff851b;
      --orange-hover: #e07310;
      --gold: #d4af37;
      --sidebar-width: 250px;
    }
    
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      min-height: 100vh;
      transition: 0.3s;
    }
    
    /* Collapsible Sidebar styling (Desktop only) */
    .sidebar {
      width: var(--sidebar-width);
      background: #001f3f;
      color: #fff;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      transition: 0.3s;
      overflow-x: hidden;
    }
    
    .sidebar.collapsed {
      width: 70px;
    }
    
    .sidebar-brand {
      padding: 20px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      gap: 15px;
      color: var(--orange);
      white-space: nowrap;
    }
    
    .sidebar.collapsed .sidebar-brand span {
      display: none;
    }
    
    .sidebar-menu {
      list-style: none;
      padding: 0;
      margin: 0;
      flex: 1;
      overflow-y: auto;
    }
    
    .sidebar-menu li a {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px 23px;
      color: #bdc3c7;
      text-decoration: none;
      transition: 0.2s;
      font-size: 14px;
      white-space: nowrap;
    }
    
    .sidebar-menu li a:hover, .sidebar-menu li.active a {
      color: #fff;
      background: rgba(255,255,255,0.1);
      border-left: 4px solid var(--orange);
    }
    
    .sidebar.collapsed .sidebar-menu li a span {
      display: none;
    }
    
    .sidebar.collapsed .sidebar-menu li a {
      padding: 15px 25px;
    }
    
    /* Main Layout */
    .main-content {
      margin-left: var(--sidebar-width);
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      box-sizing: border-box;
      padding: 20px;
      width: calc(100% - var(--sidebar-width));
      transition: 0.3s;
    }
    
    .main-content.expanded {
      margin-left: 70px;
      width: calc(100% - 70px);
    }
    
    /* Top Bar */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--card);
      padding: 12px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid var(--border);
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      transition: 0.2s;
      background: var(--orange);
      color: white;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    
    .btn:hover {
      background: var(--orange-hover);
    }
    
    .btn-secondary {
      background: #7f8c8d;
    }
    .btn-secondary:hover {
      background: #95a5a6;
    }
    
    .btn-dark {
      background: #001f3f;
    }
    .btn-dark:hover {
      background: #002d5c;
    }
    
    .erp-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      color: white;
    }
    
    .nav-toggle {
      font-size: 18px;
      cursor: pointer;
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      transition: 0.2s;
    }
    
    .nav-toggle:hover {
      background: var(--bg);
    }
    
    /* Loader Spinner in Topbar */
    .sync-loader {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid rgba(0,0,0,0.1);
      border-top-color: var(--orange);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-left: 8px;
    }
    
    /* Mobile Navigation Bottom Bar */
    .mobile-bottom-nav {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: #001f3f;
      border-top: 1px solid rgba(255,255,255,0.1);
      z-index: 9999;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.15);
    }
    
    .mobile-bottom-nav a {
      color: #bdc3c7;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 10px;
      font-weight: bold;
      gap: 4px;
      width: 20%;
      transition: 0.2s;
    }
    
    .mobile-bottom-nav a i {
      font-size: 20px;
    }
    
    .mobile-bottom-nav a.active {
      color: var(--orange);
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
      .sidebar {
        display: none !important;
      }
      .mobile-bottom-nav {
        display: flex;
      }
      .main-content, .main-content.expanded {
        margin-left: 0 !important;
        width: 100% !important;
        padding-bottom: 80px; /* Padding for bottom bar */
      }
      .nav-toggle {
        display: none !important; /* Hide hamburger on mobile, not needed due to bottom nav */
      }
    }
  </style>
`);

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service worker registration failed', err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  requireLogin();
  
  // Render layout and bottom bar
  renderSidebarUI();
  renderMobileBottomNav();
  
  // Apply settings backgrounds
  applyWallpaperSettings();
  
  // Setup auto-refresh handler when background sync finishes fetching new data
  document.addEventListener('chandaDataRefreshed', (e) => {
    applyWallpaperSettings();
    
    const indicator = document.getElementById("sync-indicator");
    if (indicator) indicator.style.display = "none";
    
    if (typeof syncData === 'function') {
      syncData();
    }
  });

  // Start background sync
  getSystemData(false);
});

function applyWallpaperSettings() {
  const sysData = getSystemDataImmediate();
  if (!sysData || !sysData.settings) return;
  const settings = sysData.settings;
  
  if (settings.bg_wallpaper) {
    const opacity = settings.wallpaper_opacity || '0.1';
    document.body.style.backgroundImage = `linear-gradient(rgba(244, 247, 246, ${1 - parseFloat(opacity)}), rgba(244, 247, 246, ${1 - parseFloat(opacity)})), url('${settings.bg_wallpaper}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  }

  const logo = document.getElementById("cardDeityLogo");
  if (logo && settings.lord_photo) {
    logo.innerHTML = `<img src="${settings.lord_photo}" style="width:24px; height:24px; object-fit:contain; border-radius:50%;">`;
  }
}

function renderSidebarUI() {
  const user = getCurrentUser();
  const sysData = getSystemDataImmediate() || { settings: {}, festivals: [] };
  const settings = sysData.settings || {};
  
  const activePage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
  const isCollapsed = localStorage.getItem("sidebar_collapsed") === "true";
  
  let sidebar = document.getElementById("app-sidebar");
  if (!sidebar) {
    sidebar = document.createElement("div");
    sidebar.className = "sidebar" + (isCollapsed ? " collapsed" : "");
    sidebar.id = "app-sidebar";
    document.body.insertBefore(sidebar, document.body.firstChild);
  }
  
  let menuHTML = `
    <div class="sidebar-brand">
      <div id="cardDeityLogo"></div>
      <span>Chanda App</span>
    </div>
    <ul class="sidebar-menu">
      <li class="${activePage === 'index' ? 'active' : ''}"><a href="index.html"><i class="fas fa-chart-line"></i> <span>${__('dashboard')}</span></a></li>
      <li class="${activePage === 'donations' || activePage === 'add_donation' ? 'active' : ''}"><a href="donations.html"><i class="fas fa-hand-holding-usd"></i> <span>${__('chanda_list')}</span></a></li>
      <li class="${activePage === 'expenses' || activePage === 'add_expense' ? 'active' : ''}"><a href="expenses.html"><i class="fas fa-tags"></i> <span>${__('expense_list')}</span></a></li>
      <li class="${activePage === 'accounts' ? 'active' : ''}"><a href="accounts.html"><i class="fas fa-wallet"></i> <span>${__('accounts_handover')}</span></a></li>
      <li class="${activePage === 'profile' ? 'active' : ''}"><a href="profile.html"><i class="fas fa-user-circle"></i> <span>${__('edit_profile')}</span></a></li>
  `;
  
  if (user && user.role === 'admin') {
    menuHTML += `
      <li class="${activePage === 'members' ? 'active' : ''}"><a href="members.html"><i class="fas fa-users-cog"></i> <span>${__('users_management')}</span></a></li>
      <li class="${activePage === 'villages' ? 'active' : ''}"><a href="villages.html"><i class="fas fa-map-marked-alt"></i> <span>Villages Master</span></a></li>
      <li class="${activePage === 'categories' ? 'active' : ''}"><a href="categories.html"><i class="fas fa-list-ul"></i> <span>Categories Master</span></a></li>
      <li class="${activePage === 'festivals' ? 'active' : ''}"><a href="festivals.html"><i class="fas fa-calendar-alt"></i> <span>Year/Festival Master</span></a></li>
      <li class="${activePage === 'logs' ? 'active' : ''}"><a href="logs.html"><i class="fas fa-history"></i> <span>${__('audit_logs')}</span></a></li>
      <li class="${activePage === 'settings' ? 'active' : ''}"><a href="settings.html"><i class="fas fa-cogs"></i> <span>${__('committee_settings')}</span></a></li>
    `;
  }
  
  menuHTML += `
      <li style="margin-top: 20px;"><a href="#" onclick="logout()"><i class="fas fa-sign-out-alt" style="color:#ff4136;"></i> <span>${__('logout')}</span></a></li>
    </ul>
  `;
  
  sidebar.innerHTML = menuHTML;
  
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    if (isCollapsed) mainContent.classList.add("expanded");
    else mainContent.classList.remove("expanded");
  }

  // Render Topbar
  if (mainContent && !document.getElementById("app-top-bar")) {
    const topBar = document.createElement("div");
    topBar.className = "top-bar";
    topBar.id = "app-top-bar";
    
    const leftDiv = document.createElement("div");
    leftDiv.style.display = "flex";
    leftDiv.style.alignItems = "center";
    leftDiv.style.gap = "15px";
    
    leftDiv.innerHTML = `
      <div class="nav-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></div>
      <div style="line-height:1.2;">
        <h4 style="margin:0; font-size:15px; font-weight:bold; color:var(--orange); display:flex; align-items:center;">
          ${settings.committee_name || 'युवा गणेश उत्सव समिति'}
          <span id="sync-indicator" class="sync-loader" style="display:inline-block;" title="Syncing real-time data..."></span>
        </h4>
        <small style="font-size:10px; color:var(--muted);">${settings.committee_address || 'ग्राम - गणेशखपरी'}</small>
      </div>
    `;
    
    const rightDiv = document.createElement("div");
    rightDiv.style.display = "flex";
    rightDiv.style.alignItems = "center";
    rightDiv.style.gap = "10px";
    
    let langOptions = `
      <select onchange="setSelectedLanguage(this.value)" style="padding: 5px; border-radius: 4px; border:1px solid var(--border); background:var(--card); color:var(--text); font-size: 12px; cursor:pointer;">
        <option value="en" ${getSelectedLanguage() === 'en' ? 'selected' : ''}>🇬🇧 En</option>
        <option value="hi" ${getSelectedLanguage() === 'hi' ? 'selected' : ''}>🇮🇳 हि</option>
        <option value="hl" ${getSelectedLanguage() === 'hl' ? 'selected' : ''}>🔤 Hl</option>
      </select>
    `;
    
    let festOptions = `<select onchange="setViewingFestivalId(this.value)" style="padding: 5px; border-radius: 4px; border:1px solid var(--border); background:var(--card); color:var(--text); font-size: 12px; cursor:pointer;">`;
    const festivals = sysData.festivals || [];
    festivals.forEach(f => {
      festOptions += `<option value="${f.id}" ${getViewingFestivalId() == f.id ? 'selected' : ''}>${f.name}</option>`;
    });
    festOptions += `</select>`;
    
    let userAvatar = `<div style="width:30px; height:30px; border-radius:50%; background:var(--orange); color:white; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:12px;" title="${user ? user.name : ''}">${user ? user.name.charAt(0) : 'U'}</div>`;
    if (user && user.profile_pic) {
      userAvatar = `<img src="${user.profile_pic}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; border:1px solid var(--border);">`;
    }
    
    rightDiv.innerHTML = `
      ${langOptions}
      ${festOptions}
      ${userAvatar}
    `;
    
    topBar.appendChild(leftDiv);
    topBar.appendChild(rightDiv);
    mainContent.insertBefore(topBar, mainContent.firstChild);
  }
}

function renderMobileBottomNav() {
  if (document.getElementById("app-bottom-nav")) return;

  const bottomNav = document.createElement("div");
  bottomNav.className = "mobile-bottom-nav";
  bottomNav.id = "app-bottom-nav";
  
  const activePage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
  const user = getCurrentUser();
  const isAdminUser = user && user.role === 'admin';

  bottomNav.innerHTML = `
    <a href="index.html" class="${activePage === 'index' ? 'active' : ''}"><i class="fas fa-home"></i><span>Home</span></a>
    <a href="donations.html" class="${activePage === 'donations' || activePage === 'add_donation' ? 'active' : ''}"><i class="fas fa-hand-holding-usd"></i><span>Chanda</span></a>
    <a href="expenses.html" class="${activePage === 'expenses' || activePage === 'add_expense' ? 'active' : ''}"><i class="fas fa-tags"></i><span>Expenses</span></a>
    <a href="accounts.html" class="${activePage === 'accounts' ? 'active' : ''}"><i class="fas fa-wallet"></i><span>Handover</span></a>
    <a href="${isAdminUser ? 'members.html' : 'profile.html'}" class="${activePage === 'members' || activePage === 'profile' || activePage === 'settings' || activePage === 'festivals' ? 'active' : ''}">
      <i class="fas fa-bars"></i><span>Menu</span>
    </a>
  `;
  
  document.body.appendChild(bottomNav);
}

function toggleSidebar() {
  const sb = document.getElementById("app-sidebar");
  const main = document.querySelector(".main-content");
  if (sb) {
    const isCollapsed = sb.classList.toggle("collapsed");
    localStorage.setItem("sidebar_collapsed", isCollapsed ? "true" : "false");
    if (main) {
      if (isCollapsed) main.classList.add("expanded");
      else main.classList.remove("expanded");
    }
  }
}
