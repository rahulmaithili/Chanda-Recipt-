// Shared Header, Sidebar & Bottom Navigation Layout Template (Mobile App Shell)

// Dynamically inject viewport meta tag to lock zoom scale on mobile devices (PWA standard)
(function() {
  let viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  } else {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
  }
})();

document.write(`
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="manifest" href="manifest.json">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <style>
    :root {
      --orange: #e8590c;
      --gold: #f39c12;
      --bg: #f4f6f9;
      --card: #ffffff;
      --text: #2b2320;
      --muted: #8a7a6d;
      --border: #e8e1d7;
      --sidebar-bg: #1e282c;
      --sidebar-color: #b8c7ce;
      --sidebar-hover: #1a2226;
      --header-bg: #ffffff;
      --sidebar-width: 240px;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      overflow-x: hidden; /* Avoid horizontal scrolling */
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      min-height: 100vh;
      transition: background 0.2s, color 0.2s;
    }
    
    /* Original Colorful Sidebar styling */
    .sidebar {
      width: var(--sidebar-width);
      background: var(--sidebar-bg);
      color: var(--sidebar-color);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      overflow-y: auto;
      padding: 20px 15px;
    }
    
    .sidebar.collapsed {
      width: 70px;
      padding: 20px 10px;
    }
    
    .sidebar-brand {
      font-size: 18px;
      margin-bottom: 20px;
      color: #fff;
      text-align: center;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-bottom: 10px;
      border-bottom: 1px solid #2c3b41;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .sidebar.collapsed .sidebar-brand span {
      display: none;
    }
    
    /* Nav item with colorful icon badge */
    .nav-item {
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 9px 12px;
      text-decoration: none;
      color: var(--sidebar-color);
      border-radius: 10px;
      margin-bottom: 4px;
      font-weight: 500;
      font-size: 13.5px;
      transition: background 0.18s, color 0.18s, transform 0.15s;
      position: relative;
      white-space: nowrap;
    }
    
    .nav-item:hover {
      background: rgba(255,255,255,0.07);
      color: #fff;
      transform: translateX(3px);
    }
    
    .nav-item.active {
      background: rgba(255,255,255,0.12);
      color: #fff;
      border-left: 3px solid var(--orange);
    }
    
    /* Colorful icon badge */
    .nav-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 13px;
      flex-shrink: 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .nav-item:hover .nav-icon {
      transform: scale(1.12) rotate(-5deg);
      box-shadow: 0 4px 10px rgba(0,0,0,0.35);
    }
    
    .nav-item.active .nav-icon {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
    
    .sidebar.collapsed .nav-item span:not(.nav-icon) {
      display: none;
    }
    
    .sidebar.collapsed .nav-item {
      justify-content: center;
      padding: 10px 0;
    }
    
    .sidebar.collapsed .nav-icon {
      width: 36px;
      height: 36px;
      font-size: 15px;
    }
    
    /* Main Layout */
    .main-content {
      margin-left: var(--sidebar-width);
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      box-sizing: border-box;
      padding: 25px;
      width: calc(100% - var(--sidebar-width));
      overflow-x: hidden;
    }
    
    .main-content.expanded {
      margin-left: 70px;
      width: calc(100% - 70px);
    }
    
    /* Top Bar styling matching main-header */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--header-bg);
      padding: 10px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border-bottom: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 25px;
    }
    
    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      color: #fff;
      background: var(--orange);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: 0.2s;
    }
    
    .btn:hover {
      background: var(--orange-hover);
    }
    
    .btn-secondary {
      background: #95a5a6;
    }
    .btn-secondary:hover {
      background: #7f8c8d;
    }
    
    .btn-dark {
      background: #2c3e50;
    }
    .btn-dark:hover {
      background: #1a252f;
    }
    
    .erp-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: bold;
      color: #fff;
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
    
    /* Mobile Navigation Bottom Bar matching PHP layout */
    .mobile-bottom-nav {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: var(--card);
      border-top: 1px solid var(--border);
      box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
      z-index: 9999;
      justify-content: space-around;
      align-items: center;
      padding-bottom: env(safe-area-inset-bottom);
    }
    
    .mobile-bottom-nav a.mobile-tab {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      text-decoration: none;
      font-size: 10px;
      font-weight: 600;
      height: 100%;
      transition: color 0.2s ease;
      gap: 3px;
    }
    
    .mobile-bottom-nav a.mobile-tab i {
      font-size: 18px;
    }
    
    .mobile-bottom-nav a.mobile-tab.active {
      color: var(--orange);
    }
    
    .mobile-tab-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 100%;
    }
    
    .center-btn {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--orange), #e8590c);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 20px;
      box-shadow: 0 4px 10px rgba(232, 89, 12, 0.4);
      position: absolute;
      top: -15px;
      border: 4px solid var(--card);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .center-btn:active {
      transform: scale(0.9) rotate(90deg);
      box-shadow: 0 2px 5px rgba(232, 89, 12, 0.4);
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Print media styles */
    @media print {
      #app-sidebar, #app-top-bar, .btn, .nav-toggle, select, input, form, button, .mobile-bottom-nav, .modal-content button, .modal-content > div:last-child {
        display: none !important;
      }
      body, .main-content {
        background: white !important;
        color: black !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        margin-left: 0 !important;
        box-shadow: none !important;
      }
      .table-card, .card {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      table {
        width: 100% !important;
        border-collapse: collapse !important;
      }
      th, td {
        border: 1px solid #ddd !important;
        padding: 8px !important;
      }
      body.receipt-printing * {
        visibility: hidden !important;
      }
      body.receipt-printing #receiptModal,
      body.receipt-printing #receiptModal *,
      body.receipt-printing #receipt_print_area,
      body.receipt-printing #receipt_print_area * {
        visibility: visible !important;
      }
      body.receipt-printing #receiptModal {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: auto !important;
        background: none !important;
        display: flex !important;
        justify-content: center !important;
        align-items: flex-start !important;
      }
      body.receipt-printing #receipt_print_area {
        border: none !important;
        width: 300px !important;
        margin: 0 auto !important;
        padding: 0 !important;
      }
      body.voucher-printing * {
        visibility: hidden !important;
      }
      body.voucher-printing #voucherModal,
      body.voucher-printing #voucherModal *,
      body.voucher-printing #voucher_print_area,
      body.voucher-printing #voucher_print_area * {
        visibility: visible !important;
      }
      body.voucher-printing #voucherModal {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: auto !important;
        background: none !important;
        display: flex !important;
        justify-content: center !important;
        align-items: flex-start !important;
      }
      body.voucher-printing #voucher_print_area {
        border: none !important;
        width: 300px !important;
        margin: 0 auto !important;
        padding: 0 !important;
      }
      body.id-card-active * {
        visibility: hidden !important;
      }
      body.id-card-active #idCardModal,
      body.id-card-active #idCardModal *,
      body.id-card-active #idCardPrintArea,
      body.id-card-active #idCardPrintArea * {
        visibility: visible !important;
      }
      body.id-card-active #idCardModal {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: auto !important;
        background: none !important;
        display: flex !important;
        justify-content: center !important;
        align-items: flex-start !important;
      }
      body.id-card-active #idCardPrintArea {
        border: none !important;
        margin: 0 auto !important;
        padding: 0 !important;
      }
    }
    
    /* Specific Mobile Layout Adjustments */
    @media (max-width: 768px) {
      .sidebar {
        display: none !important;
      }
      .mobile-bottom-nav {
        display: flex;
      }
      input, select, textarea {
        font-size: 16px !important;
      }
      .main-content, .main-content.expanded {
        margin-left: 0 !important;
        width: 100% !important;
        padding: 12px !important;
        padding-bottom: 80px !important;
      }
      .nav-toggle {
        display: none !important;
      }
      .top-bar {
        padding: 10px 12px !important;
        margin-bottom: 15px !important;
      }
      .card, .form-card {
        padding: 15px !important;
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

// Global SweetAlert2 Alert Overrides
window.alert = function(msg) {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      text: msg,
      icon: 'info',
      confirmButtonColor: '#ff851b'
    });
  } else {
    console.log(msg);
  }
};

// Global confirm action helper
function confirmAction(title, text, callback) {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff851b',
      cancelButtonColor: '#7f8c8d',
      confirmButtonText: 'Yes, proceed!'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  } else {
    if (confirm(text)) {
      callback();
    }
  }
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
    <!-- Logo / Brand Header -->
    <div class="sidebar-brand" title="Ganesh Puja ERP">
        <i class="fas fa-om" style="color: var(--gold); margin-right: 5px;"></i> <span class="sidebar-brand-text">Ganesh ERP</span>
    </div>

    <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px solid #2c3b41; padding-bottom: 15px; white-space: nowrap; overflow: hidden;">
        ${user && user.profile_pic ? `
            <img src="${user.profile_pic}" class="sidebar-profile-img" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold); transition: width 0.3s ease, height 0.3s ease;">
        ` : `
            <div class="sidebar-profile-img" style="width: 60px; height: 60px; border-radius: 50%; background: #e0e0e0; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: #555; border: 2px solid var(--gold); transition: width 0.3s ease, height 0.3s ease;">${user ? user.name.charAt(0).toUpperCase() : 'U'}</div>
        `}
        <div class="sidebar-profile-text" style="color: #fff; font-weight: bold; margin-top: 8px; font-size: 14px;">${user ? user.name : ''}</div>
        <div class="sidebar-profile-text" style="color: var(--muted); font-size: 11px; text-transform: capitalize;">${user ? user.role : ''}</div>
    </div>
    
    <a href="index.html" class="nav-item ${activePage === 'index' ? 'active' : ''}" title="${__('dashboard')}">
        <span class="nav-icon" style="background:linear-gradient(135deg,#e8590c,#f39c12)"><i class="fas fa-chart-pie"></i></span>
        <span>${__('dashboard')}</span>
    </a>
    <a href="add_donation.html" class="nav-item ${activePage === 'add_donation' ? 'active' : ''}" title="${__('chanda_entry')}">
        <span class="nav-icon" style="background:linear-gradient(135deg,#27ae60,#2ecc71)"><i class="fas fa-hand-holding-usd"></i></span>
        <span>${__('chanda_entry')}</span>
    </a>
    <a href="donations.html" class="nav-item ${activePage === 'donations' ? 'active' : ''}" title="${__('chanda_list')}">
        <span class="nav-icon" style="background:linear-gradient(135deg,#16a085,#1abc9c)"><i class="fas fa-file-invoice"></i></span>
        <span>${__('chanda_list')}</span>
    </a>
    <a href="add_expense.html" class="nav-item ${activePage === 'add_expense' ? 'active' : ''}" title="${__('expense_entry')}">
        <span class="nav-icon" style="background:linear-gradient(135deg,#c0392b,#e74c3c)"><i class="fas fa-tags"></i></span>
        <span>${__('expense_entry')}</span>
    </a>
    <a href="expenses.html" class="nav-item ${activePage === 'expenses' ? 'active' : ''}" title="${__('expense_list')}">
        <span class="nav-icon" style="background:linear-gradient(135deg,#8e44ad,#9b59b6)"><i class="fas fa-receipt"></i></span>
        <span>${__('expense_list')}</span>
    </a>
    <a href="villages.html" class="nav-item ${activePage === 'villages' ? 'active' : ''}" title="${__('villages')}">
        <span class="nav-icon" style="background:linear-gradient(135deg,#2980b9,#3498db)"><i class="fas fa-map-marked-alt"></i></span>
        <span>${__('villages')}</span>
    </a>
    <a href="accounts.html" class="nav-item ${activePage === 'accounts' ? 'active' : ''}" title="${__('accounts_handover')}">
        <span class="nav-icon" style="background:linear-gradient(135deg,#f1c40f,#f39c12)"><i class="fas fa-wallet"></i></span>
        <span>${__('accounts_handover')}</span>
    </a>
  `;
  
  if (user && user.role === 'admin') {
    menuHTML += `
      <a href="categories.html" class="nav-item ${activePage === 'categories' ? 'active' : ''}" title="${__('expense_categories')}">
          <span class="nav-icon" style="background:linear-gradient(135deg,#d35400,#e67e22)"><i class="fas fa-list-ul"></i></span>
          <span>${__('expense_categories')}</span>
      </a>
      <a href="members.html" class="nav-item ${activePage === 'members' ? 'active' : ''}" title="${__('users_management')}">
          <span class="nav-icon" style="background:linear-gradient(135deg,#1a5276,#2471a3)"><i class="fas fa-users-cog"></i></span>
          <span>${__('users_management')}</span>
      </a>
      <a href="festivals.html" class="nav-item ${activePage === 'festivals' ? 'active' : ''}" title="Festival Sessions">
          <span class="nav-icon" style="background:linear-gradient(135deg,#e67e22,#f39c12)"><i class="fas fa-calendar-alt"></i></span>
          <span>Festival Sessions</span>
      </a>
      <a href="logs.html" class="nav-item ${activePage === 'logs' ? 'active' : ''}" title="Audit Logs">
          <span class="nav-icon" style="background:linear-gradient(135deg,#2c3e50,#4a6fa5)"><i class="fas fa-history"></i></span>
          <span>Audit Logs</span>
      </a>
      <a href="settings.html" class="nav-item ${activePage === 'settings' ? 'active' : ''}" title="${__('committee_settings')}">
          <span class="nav-icon" style="background:linear-gradient(135deg,#5d6d7e,#7f8c8d)"><i class="fas fa-sliders-h"></i></span>
          <span>${__('committee_settings')}</span>
      </a>
    `;
  }
  
  menuHTML += `
      <a href="profile.html" class="nav-item ${activePage === 'profile' ? 'active' : ''}" title="${__('edit_profile')}">
          <span class="nav-icon" style="background:linear-gradient(135deg,#6c3483,#8e44ad)"><i class="fas fa-user-cog"></i></span>
          <span>${__('edit_profile')}</span>
      </a>
      <a href="#" onclick="logout()" class="nav-item" title="${__('logout')}" style="margin-top:20px;">
          <span class="nav-icon" style="background:linear-gradient(135deg,#922b21,#e74c3c)"><i class="fas fa-sign-out-alt"></i></span>
          <span>${__('logout')}</span>
      </a>
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
      <select class="lang-select" onchange="setSelectedLanguage(this.value)" style="padding: 5px; border-radius: 4px; border:1px solid var(--border); background:var(--card); color:var(--text); font-size: 12px; cursor:pointer;">
        <option value="en" ${getSelectedLanguage() === 'en' ? 'selected' : ''}>🌐 EN</option>
        <option value="hi" ${getSelectedLanguage() === 'hi' ? 'selected' : ''}>🇮🇳 हिन्दी</option>
        <option value="hl" ${getSelectedLanguage() === 'hl' ? 'selected' : ''}>🔤 Hl</option>
      </select>
    `;
    
    let festOptions = `<select class="lang-select" onchange="setViewingFestivalId(this.value)" style="padding: 5px; border-radius: 4px; border:1px solid var(--border); background:var(--card); color:var(--text); font-size: 12px; cursor:pointer;">`;
    const festivals = sysData.festivals || [];
    festivals.forEach(f => {
      festOptions += `<option value="${f.id}" ${getViewingFestivalId() == f.id ? 'selected' : ''}>🎪 ${f.name}</option>`;
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
    <a href="index.html" class="mobile-tab ${activePage === 'index' ? 'active' : ''}">
      <i class="fas fa-home"></i>
      <span>Home</span>
    </a>
    <a href="donations.html" class="mobile-tab ${activePage === 'donations' ? 'active' : ''}">
      <i class="fas fa-file-invoice"></i>
      <span>Chanda</span>
    </a>
    <a href="add_donation.html" class="mobile-tab-center" title="Quick Add">
      <div class="center-btn">
        <i class="fas fa-plus"></i>
      </div>
    </a>
    <a href="expenses.html" class="mobile-tab ${activePage === 'expenses' ? 'active' : ''}">
      <i class="fas fa-receipt"></i>
      <span>Expenses</span>
    </a>
    <a href="${isAdminUser ? 'members.html' : 'profile.html'}" class="mobile-tab ${activePage === 'members' || activePage === 'profile' ? 'active' : ''}">
      <i class="${isAdminUser ? 'fas fa-users-cog' : 'fas fa-user-cog'}"></i>
      <span>${isAdminUser ? 'Members' : 'Profile'}</span>
    </a>
  `;
  
  document.body.appendChild(bottomNav);
}

function toggleSidebar() {
  const sb = document.getElementById("app-sidebar");
  const main = document.querySelector(".main-content");
  if (sb) {
    // Dynamically apply transition style before toggling to prevent layout shifting on initial load!
    sb.style.transition = "0.3s ease";
    if (main) main.style.transition = "0.3s ease";

    const isCollapsed = sb.classList.toggle("collapsed");
    localStorage.setItem("sidebar_collapsed", isCollapsed ? "true" : "false");
    if (main) {
      if (isCollapsed) main.classList.add("expanded");
      else main.classList.remove("expanded");
    }
  }
}
