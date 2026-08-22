// Shared Header, Sidebar & Collapsible Layout Template for Chanda Netlify client

document.write(`
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
    
    /* Collapsible Sidebar styling */
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
    
    .sidebar-menu li {
      position: relative;
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
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
      .sidebar {
        left: -250px;
      }
      .sidebar.open {
        left: 0;
      }
      .sidebar.collapsed {
        left: -70px;
      }
      .sidebar.collapsed.open {
        left: 0;
        width: 250px;
      }
      .sidebar.collapsed.open .sidebar-menu li a span {
        display: inline;
      }
      .sidebar.collapsed.open .sidebar-brand span {
        display: inline;
      }
      .main-content, .main-content.expanded {
        margin-left: 0;
        width: 100%;
      }
    }
  </style>
`);

document.addEventListener("DOMContentLoaded", () => {
  requireLogin();
  
  // Render sidebar immediately from localStorage cache (Synchronous UI paint)
  renderSidebarUI();
  
  // Load and apply wallpaper in background
  applyWallpaperSettings();
  
  // Setup auto-refresh handler when background sync finishes fetching new data
  document.addEventListener('chandaDataRefreshed', (e) => {
    // Re-render UI elements to show updated real-time data
    applyWallpaperSettings();
    
    // Hide sync indicator
    const indicator = document.getElementById("sync-indicator");
    if (indicator) indicator.style.display = "none";
    
    // Fire page refresh if custom refresh handler exists on the page
    if (typeof syncData === 'function') {
      syncData();
    }
  });

  // Start background API sync
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

  // Update deity brand logo
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
  
  // Create Sidebar
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
      <li class="${activePage === 'index' ? 'active' : ''}"><a href="index.html" title="${__('dashboard')}"><i class="fas fa-chart-line"></i> <span>${__('dashboard')}</span></a></li>
      <li class="${activePage === 'donations' || activePage === 'add_donation' ? 'active' : ''}"><a href="donations.html" title="${__('chanda_list')}"><i class="fas fa-hand-holding-usd"></i> <span>${__('chanda_list')}</span></a></li>
      <li class="${activePage === 'expenses' || activePage === 'add_expense' ? 'active' : ''}"><a href="expenses.html" title="${__('expense_list')}"><i class="fas fa-tags"></i> <span>${__('expense_list')}</span></a></li>
      <li class="${activePage === 'accounts' ? 'active' : ''}"><a href="accounts.html" title="${__('accounts_handover')}"><i class="fas fa-wallet"></i> <span>${__('accounts_handover')}</span></a></li>
      <li class="${activePage === 'profile' ? 'active' : ''}"><a href="profile.html" title="${__('edit_profile')}"><i class="fas fa-user-circle"></i> <span>${__('edit_profile')}</span></a></li>
  `;
  
  if (user && user.role === 'admin') {
    menuHTML += `
      <li class="admin-only ${activePage === 'members' ? 'active' : ''}"><a href="members.html" title="${__('users_management')}"><i class="fas fa-users-cog"></i> <span>${__('users_management')}</span></a></li>
      <li class="admin-only ${activePage === 'villages' ? 'active' : ''}"><a href="villages.html" title="Villages Master"><i class="fas fa-map-marked-alt"></i> <span>Villages Master</span></a></li>
      <li class="admin-only ${activePage === 'categories' ? 'active' : ''}"><a href="categories.html" title="Categories Master"><i class="fas fa-list-ul"></i> <span>Categories Master</span></a></li>
      <li class="admin-only ${activePage === 'festivals' ? 'active' : ''}"><a href="festivals.html" title="Year/Festival Closing"><i class="fas fa-calendar-alt"></i> <span>Year/Festival Closing</span></a></li>
      <li class="admin-only ${activePage === 'logs' ? 'active' : ''}"><a href="logs.html" title="${__('audit_logs')}"><i class="fas fa-history"></i> <span>${__('audit_logs')}</span></a></li>
      <li class="admin-only ${activePage === 'settings' ? 'active' : ''}"><a href="settings.html" title="${__('committee_settings')}"><i class="fas fa-cogs"></i> <span>${__('committee_settings')}</span></a></li>
    `;
  }
  
  menuHTML += `
      <li style="margin-top: 20px;"><a href="#" onclick="logout()" title="${__('logout')}"><i class="fas fa-sign-out-alt" style="color:#ff4136;"></i> <span>${__('logout')}</span></a></li>
    </ul>
  `;
  
  sidebar.innerHTML = menuHTML;
  
  // Set Main Content Layout Margin
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    if (isCollapsed) {
      mainContent.classList.add("expanded");
    } else {
      mainContent.classList.remove("expanded");
    }
  }

  // 2. Render Topbar
  if (mainContent && !document.getElementById("app-top-bar")) {
    const topBar = document.createElement("div");
    topBar.className = "top-bar";
    topBar.id = "app-top-bar";
    
    // Left: Menu Toggle + Page Header Titles
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
    
    // Right: Language and Festival selectors
    const rightDiv = document.createElement("div");
    rightDiv.style.display = "flex";
    rightDiv.style.alignItems = "center";
    rightDiv.style.gap = "10px";
    
    // Language options select
    let langOptions = `
      <select onchange="setSelectedLanguage(this.value)" style="padding: 5px; border-radius: 4px; border:1px solid var(--border); background:var(--card); color:var(--text); font-size: 12px; cursor:pointer;">
        <option value="en" ${getSelectedLanguage() === 'en' ? 'selected' : ''}>🇬🇧 English</option>
        <option value="hi" ${getSelectedLanguage() === 'hi' ? 'selected' : ''}>🇮🇳 हिन्दी</option>
        <option value="hl" ${getSelectedLanguage() === 'hl' ? 'selected' : ''}>🔤 Hinglish</option>
      </select>
    `;
    
    // Festival options select
    let festOptions = `<select onchange="setViewingFestivalId(this.value)" style="padding: 5px; border-radius: 4px; border:1px solid var(--border); background:var(--card); color:var(--text); font-size: 12px; cursor:pointer;">`;
    const festivals = sysData.festivals || [];
    festivals.forEach(f => {
      festOptions += `<option value="${f.id}" ${getViewingFestivalId() == f.id ? 'selected' : ''}>${f.name} ${f.status === 'active' ? '(Active)' : ''}</option>`;
    });
    festOptions += `</select>`;
    
    // User profile status indicator
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

function toggleSidebar() {
  const sb = document.getElementById("app-sidebar");
  const main = document.querySelector(".main-content");
  if (sb) {
    if (window.innerWidth > 768) {
      // Desktop collapse toggle
      const isCollapsed = sb.classList.toggle("collapsed");
      localStorage.setItem("sidebar_collapsed", isCollapsed ? "true" : "false");
      if (main) {
        if (isCollapsed) main.classList.add("expanded");
        else main.classList.remove("expanded");
      }
    } else {
      // Mobile slide toggle
      sb.classList.toggle("open");
    }
  }
}
