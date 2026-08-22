// Shared Header & Navigation Template for Chanda Netlify client

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
    }
    
    /* Sidebar */
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
    }
    
    .sidebar-brand {
      padding: 20px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--orange);
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
      gap: 12px;
      padding: 15px 20px;
      color: #bdc3c7;
      text-decoration: none;
      transition: 0.2s;
      font-size: 14px;
    }
    
    .sidebar-menu li a:hover, .sidebar-menu li.active a {
      color: #fff;
      background: rgba(255,255,255,0.1);
      border-left: 4px solid var(--orange);
    }
    
    .sidebar-menu li.admin-only {
      border-top: 1px dashed rgba(255,255,255,0.05);
      margin-top: 5px;
      padding-top: 5px;
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
    
    /* Responsive Badges */
    .erp-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      color: white;
    }
    
    /* Mobile Responsive Hamburger */
    .mobile-nav-toggle {
      display: none;
      font-size: 20px;
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .sidebar {
        left: -250px;
      }
      .sidebar.open {
        left: 0;
      }
      .main-content {
        margin-left: 0;
        width: 100%;
      }
      .mobile-nav-toggle {
        display: block;
      }
    }
  </style>
`);

document.addEventListener("DOMContentLoaded", () => {
  requireLogin();
  setupUI();
});

async function setupUI() {
  const user = getCurrentUser();
  const sysData = await getSystemData() || { settings: {}, festivals: [] };
  const settings = sysData.settings || {};
  
  // Set wallpapers
  if (settings.bg_wallpaper) {
    const opacity = settings.wallpaper_opacity || '0.1';
    document.body.style.backgroundImage = `linear-gradient(rgba(244, 247, 246, ${1 - parseFloat(opacity)}), rgba(244, 247, 246, ${1 - parseFloat(opacity)})), url('${settings.bg_wallpaper}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
  }
  
  const activePage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
  
  // 1. Render Sidebar
  const sidebar = document.createElement("div");
  sidebar.className = "sidebar";
  sidebar.id = "app-sidebar";
  
  let menuHTML = `
    <div class="sidebar-brand">
      <div id="cardDeityLogo"></div>
      <span style="font-size:16px;">Chanda App</span>
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
      <li class="admin-only ${activePage === 'members' ? 'active' : ''}"><a href="members.html"><i class="fas fa-users-cog"></i> <span>${__('users_management')}</span></a></li>
      <li class="admin-only ${activePage === 'festivals' ? 'active' : ''}"><a href="festivals.html"><i class="fas fa-calendar-alt"></i> <span>Year/Festival Closing</span></a></li>
      <li class="admin-only ${activePage === 'logs' ? 'active' : ''}"><a href="logs.html"><i class="fas fa-history"></i> <span>${__('audit_logs')}</span></a></li>
      <li class="admin-only ${activePage === 'settings' ? 'active' : ''}"><a href="settings.html"><i class="fas fa-cogs"></i> <span>${__('committee_settings')}</span></a></li>
    `;
  }
  
  menuHTML += `
      <li style="margin-top: 20px;"><a href="#" onclick="logout()"><i class="fas fa-sign-out-alt" style="color:#ff4136;"></i> <span>${__('logout')}</span></a></li>
    </ul>
  `;
  
  sidebar.innerHTML = menuHTML;
  document.body.insertBefore(sidebar, document.body.firstChild);
  
  // Add deity image in brand
  if (settings.lord_photo) {
    document.getElementById("cardDeityLogo").innerHTML = `<img src="${settings.lord_photo}" style="width:24px; height:24px; object-fit:contain; border-radius:50%;">`;
  }
  
  // 2. Render Topbar in main content container
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    const topBar = document.createElement("div");
    topBar.className = "top-bar";
    
    // Left: Menu Toggle + Page Header Titles
    const leftDiv = document.createElement("div");
    leftDiv.style.display = "flex";
    leftDiv.style.alignItems = "center";
    leftDiv.style.gap = "15px";
    
    leftDiv.innerHTML = `
      <div class="mobile-nav-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></div>
      <div style="line-height:1.2;">
        <h4 style="margin:0; font-size:15px; font-weight:bold; color:var(--orange);">${settings.committee_name || 'युवा गणेश उत्सव समिति'}</h4>
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
  if (sb) {
    sb.classList.toggle("open");
  }
}
