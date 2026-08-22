// Chanda & Expense Management System - Static Web Client Configuration

const API_URL = "https://script.google.com/macros/s/AKfycbwd8c7kYgszLah_LcZjkXJZwFf7LP6q5KsrJQNglFKzwEdpfm7lMJsIRSLqsXdzVfxP/exec";

// Caching and API Fetching Helper
const CACHE_KEY = "chanda_system_cache";

function getSystemDataImmediate() {
  const cached = localStorage.getItem(CACHE_KEY);
  return cached ? JSON.parse(cached) : null;
}

async function getSystemData(forceSync = false) {
  const cached = localStorage.getItem(CACHE_KEY);
  const now = new Date().getTime();
  
  // Return cached instantly for ultra-fast loading
  if (!forceSync && cached) {
    // Fire background sync asynchronously to update cache and notify UI
    setTimeout(() => backgroundSync(), 50);
    return JSON.parse(cached);
  }
  
  // Force sync / No cache fallback
  return await backgroundSync();
}

async function backgroundSync() {
  const viewingFestId = getViewingFestivalId();
  if (API_URL.includes("YOUR_DEPLOYED_APPS_SCRIPT_URL")) return null;
  
  try {
    const res = await fetch(`${API_URL}?action=getInitData&festival_id=${viewingFestId}`);
    const data = await res.json();
    if (data.success) {
      const oldCached = localStorage.getItem(CACHE_KEY);
      const newCachedStr = JSON.stringify(data);
      
      // Update cache
      localStorage.setItem(CACHE_KEY, newCachedStr);
      localStorage.setItem(CACHE_KEY + "_time", new Date().getTime().toString());
      
      // If data changed, notify page to reload or re-render
      if (oldCached !== newCachedStr) {
        document.dispatchEvent(new CustomEvent('chandaDataRefreshed', { detail: data }));
      }
      return data;
    }
  } catch(e) {
    console.error("Background sync failed", e);
  }
  return null;
}

// Invalidate Cache after write action
function invalidateCache() {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_KEY + "_time");
}

// Auth Helpers
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

function requireLogin() {
  const user = getCurrentUser();
  const page = window.location.pathname.split("/").pop();
  if (!user && page !== "index.html" && page !== "") {
    window.location.href = "index.html";
  }
}

function isAdmin() {
  const user = getCurrentUser();
  return user && (user.role === "Super Admin" || user.role === "admin");
}

function logout() {
  localStorage.removeItem("currentUser");
  invalidateCache();
  window.location.href = "index.html";
}

// Session state helpers for Festival / Year management
function getActiveFestivalId() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const data = JSON.parse(cached);
    const active = data.festivals ? data.festivals.find(f => f.status === "active") : null;
    return active ? active.id : "1";
  }
  return "1";
}

function getViewingFestivalId() {
  return localStorage.getItem("viewing_festival_id") || "1";
}

function setViewingFestivalId(id) {
  localStorage.setItem("viewing_festival_id", id);
  invalidateCache();
  window.location.reload();
}

function isHistoricalView() {
  return getViewingFestivalId() !== getActiveFestivalId();
}

// Toast / Custom Alert Notification System
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.style.background = type === "success" ? "#2ecc40" : "#ff4136";
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "600";
  toast.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "10px";
  toast.style.minWidth = "250px";
  toast.style.transition = "0.3s ease";
  toast.style.transform = "translateX(120%)";

  const icon = type === "success" ? "fa-check-circle" : "fa-exclamation-triangle";
  toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);
  
  // Slide in
  setTimeout(() => {
    toast.style.transform = "translateX(0)";
  }, 10);

  // Auto remove
  setTimeout(() => {
    toast.style.transform = "translateX(120%)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

// Language / Translation System
const TRANSLATIONS = {
  'en': {
    'dashboard': 'Dashboard',
    'home': 'Home',
    'search': 'Search everything...',
    'welcome': 'Welcome',
    'total_donation': 'Total Donation',
    'total_expense': 'Total Expense',
    'balance': 'Balance',
    'my_collection': 'My Collection',
    'target_progress': 'Target Progress',
    'achieved': 'Achieved',
    'target': 'Target',
    'today': 'Today',
    '7_days': '7 Days',
    '30_days': '30 Days',
    'ytd': 'YTD',
    'all_villages': 'All Villages',
    'all_categories': 'All Categories',
    'users_management': 'Users Management',
    'chanda_entry': 'Chanda Entry',
    'chanda_list': 'Chanda List',
    'expense_entry': 'Expense Entry',
    'expense_list': 'Expense List',
    'logout': 'Logout',
    'more_info': 'More info',
    'village_wise': 'Village-wise Collection',
    'category_wise': 'Category-wise Expenses',
    'recent_donations': 'Recent Donations',
    'status': 'Status',
    'active': 'Active',
    'inactive': 'Inactive',
    'pending': 'Pending',
    'approved': 'Approved',
    'villages': 'Villages',
    'committee_settings': 'Committee Settings',
    'accounts_handover': 'Accounts & Handover',
    'expense_categories': 'Expense Categories',
    'edit_profile': 'Edit Profile',
    'backup_restore': 'Backup & Restore',
    'receipt_no': 'Receipt No',
    'date': 'Date',
    'donor_name': 'Donor Name',
    'mobile_number': 'Mobile Number',
    'village': 'Village',
    'amount': 'Amount',
    'mode': 'Mode',
    'remaining_dues': 'Remaining Dues',
    'actions': 'Actions',
    'add_new': 'Add New',
    'csv': 'CSV',
    'print': 'Print',
    'from_date': 'From Date',
    'to_date': 'To Date',
    'search_placeholder': 'Name, Mobile, Receipt No...',
    'filter': 'Filter',
    'reset': 'Reset',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'close': 'Close',
    'download_pdf': 'Download PDF',
    'send_whatsapp': 'Send WhatsApp',
    'category': 'Category',
    'title': 'Title',
    'note': 'Note',
    'donations_list': 'Donations List',
    'expenses_list': 'Expenses List',
    'users_list': 'Users List',
    'audit_logs': 'Audit Logs',
    'dues_remaining': 'Dues Remaining',
    'installment_for': 'Installment for',
    'no_records_found': 'No records found.',
    'total_receipts': 'Total Receipts',
    'cash_collection': 'Cash Collection',
    'online_collection': 'Online Collection',
    'total_amount': 'Total Amount',
    'transfer_date': 'Transfer Date',
    'submit_handover': 'Submit Handover',
    'deposit_mode': 'Deposit Mode',
    'remarks': 'Remarks',
    'select_destination': 'Select Destination Account',
    'cash': 'Cash',
    'online_deposit': 'Online Deposit',
    'full_name': 'Full Name',
    'password': 'Password',
    'target_donation': 'Target Donation',
    'manage_categories': 'Manage Categories',
    'manage_accounts': 'Manage Bank & Wallets',
    'manage_villages': 'Manage Villages',
    'add_user': 'Add User',
    'add_donation_perm': 'Add Donations',
    'edit_donation_perm': 'Edit Donations',
    'delete_donation_perm': 'Delete Donations',
    'add_expense_perm': 'Add Expenses',
    'edit_expense_perm': 'Edit Expenses',
    'delete_expense_perm': 'Delete Expenses',
    'arrangement_type': 'Arrangement Type',
    'one_time': 'One-time Payment',
    'new_promise': 'New Promised Deal',
    'installment': 'Pay Promised Installment',
    'select_promise': 'Select Promised Deal',
    'donor_mobile': 'Donor Mobile',
    'save_chanda': 'Save Chanda',
    'total_promised': 'Total Promised Amount',
    'amount_today': 'Amount Today',
    'save_expense': 'Save Expense',
    'total_contract': 'Total Deal / Contract Amount'
  },
  'hi': {
    'dashboard': 'डैशबोर्ड',
    'home': 'मुख्य पृष्ठ',
    'search': 'खोजें...',
    'welcome': 'स्वागत है',
    'total_donation': 'कुल चंदा',
    'total_expense': 'कुल खर्च',
    'balance': 'बैलेंस',
    'my_collection': 'मेरा कलेक्शन',
    'target_progress': 'लक्ष्य प्रगति',
    'achieved': 'प्राप्त',
    'target': 'लक्ष्य',
    'today': 'आज',
    '7_days': '७ दिन',
    '30_days': '३० दिन',
    'ytd': 'इस वर्ष',
    'all_villages': 'सभी गाँव',
    'all_categories': 'सभी श्रेणियां',
    'users_management': 'उपयोगकर्ता प्रबंधन',
    'chanda_entry': 'चंदा एंट्री',
    'chanda_list': 'चंदा सूची',
    'expense_entry': 'खर्च एंट्री',
    'expense_list': 'खर्च सूची',
    'logout': 'लॉगआउट',
    'more_info': 'अधिक जानकारी',
    'village_wise': 'गाँव-वार चंदा संग्रह',
    'category_wise': 'श्रेणी-वार खर्च',
    'recent_donations': 'हाल के चंदे',
    'status': 'स्थिति',
    'active': 'सक्रिय',
    'inactive': 'निष्क्रिय',
    'pending': 'लंबित',
    'approved': 'स्वीकृत',
    'villages': 'गाँव मास्टर',
    'committee_settings': 'समिति सेटिंग्स',
    'accounts_handover': 'खाता और हैंडओवर',
    'expense_categories': 'खर्च श्रेणियां',
    'edit_profile': 'प्रोफ़ाइल संपादित करें',
    'backup_restore': 'बैकअप और रिस्टोर',
    'receipt_no': 'रसीद संख्या',
    'date': 'दिनांक',
    'donor_name': 'दाता का नाम',
    'mobile_number': 'मोबाइल नंबर',
    'village': 'गाँव',
    'amount': 'राशि',
    'mode': 'भुगतान का प्रकार',
    'remaining_dues': 'शेष बकाया राशि',
    'actions': 'कार्रवाई',
    'add_new': 'नया जोड़ें',
    'csv': 'सी.एस.वी',
    'print': 'प्रिंट',
    'from_date': 'प्रारंभ तिथि',
    'to_date': 'अंतिम तिथि',
    'search_placeholder': 'नाम, मोबाइल, रसीद संख्या...',
    'filter': 'फ़िल्टर',
    'reset': 'रीसेट',
    'submit': 'जमा करें',
    'cancel': 'रद्द करें',
    'edit': 'संपादित करें',
    'delete': 'हटाएं',
    'close': 'बंद करें',
    'download_pdf': 'पीडीएफ डाउनलोड',
    'send_whatsapp': 'व्हाट्सएप भेजें',
    'category': 'श्रेणी',
    'title': 'विवरण',
    'note': 'टिप्पणी',
    'donations_list': 'चंदा सूची',
    'expenses_list': 'खर्च सूची',
    'users_list': 'उपयोगकर्ता सूची',
    'audit_logs': 'गतिविधि लॉग',
    'dues_remaining': 'बकाया राशि शेष',
    'installment_for': 'किस्त संख्या #',
    'no_records_found': 'कोई रिकॉर्ड नहीं मिला।',
    'total_receipts': 'कुल रसीदें',
    'cash_collection': 'नकद संग्रह',
    'online_collection': 'ऑनलाइन संग्रह',
    'total_amount': 'कुल राशि',
    'transfer_date': 'जमा तिथि',
    'submit_handover': 'रकम जमा करें',
    'deposit_mode': 'जमा माध्यम',
    'remarks': 'टिप्पणी',
    'select_destination': 'जमा खाता चुनें',
    'cash': 'नकद',
    'online_deposit': 'ऑनलाइन ट्रांसफर / UPI',
    'full_name': 'पूरा नाम',
    'password': 'पासवर्ड',
    'target_donation': 'लक्ष्य चंदा राशि',
    'manage_categories': 'श्रेणी नियंत्रण',
    'manage_accounts': 'बैंक/वॉलेट नियंत्रण',
    'manage_villages': 'गाँव नियंत्रण',
    'add_user': 'नया उपयोगकर्ता',
    'add_donation_perm': 'चंदा जोड़ें',
    'edit_donation_perm': 'चंदा संपादित करें',
    'delete_donation_perm': 'चंदा हटाएं',
    'add_expense_perm': 'खर्च जोड़ें',
    'edit_expense_perm': 'खर्च संपादित करें',
    'delete_expense_perm': 'खर्च हटाएं',
    'arrangement_type': 'भुगतान व्यवस्था',
    'one_time': 'एक बार में पूरा भुगतान',
    'new_promise': 'घोषित चंदा किस्त सुविधा',
    'installment': 'बकाया चंदा किस्त भुगतान',
    'select_promise': 'घोषित चंदा चुनें',
    'donor_mobile': 'दाता का मोबाइल नंबर',
    'save_chanda': 'चंदा सुरक्षित करें',
    'total_promised': 'कुल घोषित चंदा राशि',
    'amount_today': 'आज भुगतान राशि',
    'save_expense': 'खर्च सुरक्षित करें',
    'total_contract': 'कुल समझौता राशि'
  },
  'hl': {
    'dashboard': 'Dashboard',
    'home': 'Home',
    'search': 'Kuch bhi dhundho...',
    'welcome': 'Swagat Hai',
    'total_donation': 'Total Chanda',
    'total_expense': 'Total Kharcha',
    'balance': 'Balance',
    'my_collection': 'Mera Collection',
    'target_progress': 'Target Progress',
    'achieved': 'Hasil Kiya',
    'target': 'Target',
    'today': 'Aaj',
    '7_days': '7 Din',
    '30_days': '30 Din',
    'ytd': 'Is Saal',
    'all_villages': 'Saare Gaon',
    'all_categories': 'Saari Categories',
    'users_management': 'Users Management',
    'chanda_entry': 'Chanda Entry',
    'chanda_list': 'Chanda List',
    'expense_entry': 'Kharcha Entry',
    'expense_list': 'Kharcha List',
    'logout': 'Logout',
    'more_info': 'Aur Jankari',
    'village_wise': 'Gaon-wise Collection',
    'category_wise': 'Category-wise Kharcha',
    'recent_donations': 'Recent Chanda',
    'status': 'Status',
    'active': 'Active',
    'inactive': 'Inactive',
    'pending': 'Pending',
    'approved': 'Approved',
    'villages': 'Gaon Master',
    'committee_settings': 'Committee Settings',
    'accounts_handover': 'Account & Handover',
    'expense_categories': 'Kharcha Categories',
    'edit_profile': 'Profile Edit Karo',
    'backup_restore': 'Backup & Restore',
    'receipt_no': 'Receipt No',
    'date': 'Date',
    'donor_name': 'Donor Name',
    'mobile_number': 'Mobile Number',
    'village': 'Gaon',
    'amount': 'Amount',
    'mode': 'Payment Mode',
    'remaining_dues': 'Baki Dues',
    'actions': 'Actions',
    'add_new': 'Naya Add Karo',
    'csv': 'CSV Download',
    'print': 'Print',
    'from_date': 'Starting Date',
    'to_date': 'Ending Date',
    'search_placeholder': 'Name, Mobile, Receipt No...',
    'filter': 'Filter',
    'reset': 'Reset',
    'submit': 'Submit Karo',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'close': 'Close',
    'download_pdf': 'PDF Download',
    'send_whatsapp': 'WhatsApp Bhejo',
    'category': 'Category',
    'title': 'Title',
    'note': 'Note',
    'donations_list': 'Chanda List',
    'expenses_list': 'Kharcha List',
    'users_list': 'Users List',
    'audit_logs': 'Audit Logs',
    'dues_remaining': 'Dues Baki Hai',
    'installment_for': 'Installment for',
    'no_records_found': 'Kuch nahi mila.',
    'total_receipts': 'Total Receipts',
    'cash_collection': 'Cash Collection',
    'online_collection': 'Online Collection',
    'total_amount': 'Total Amount',
    'transfer_date': 'Transfer Date',
    'submit_handover': 'Submit Handover',
    'deposit_mode': 'Deposit Mode',
    'remarks': 'Remarks',
    'select_destination': 'Destination Account select karo',
    'cash': 'Cash',
    'online_deposit': 'Online Deposit',
    'full_name': 'Full Name',
    'password': 'Password',
    'target_donation': 'Target Donation',
    'manage_categories': 'Manage Categories',
    'manage_accounts': 'Manage Bank & Wallets',
    'manage_villages': 'Manage Villages',
    'add_user': 'Add User',
    'add_donation_perm': 'Add Donations',
    'edit_donation_perm': 'Edit Donations',
    'delete_donation_perm': 'Delete Donations',
    'add_expense_perm': 'Add Expenses',
    'edit_expense_perm': 'Edit Expenses',
    'delete_expense_perm': 'Delete Expenses',
    'arrangement_type': 'Arrangement Type',
    'one_time': 'One-time Payment',
    'new_promise': 'New Promised Deal',
    'installment': 'Pay Promised Installment',
    'select_promise': 'Select Promised Deal',
    'donor_mobile': 'Donor Mobile',
    'save_chanda': 'Save Chanda',
    'total_promised': 'Total Promised Deal Amount',
    'amount_today': 'Amount Today',
    'save_expense': 'Save Expense',
    'total_contract': 'Total Deal / Contract Amount'
  }
};

function getSelectedLanguage() {
  return localStorage.getItem("app_lang") || "en";
}

function setSelectedLanguage(lang) {
  localStorage.setItem("app_lang", lang);
  window.location.reload();
}

function __(key) {
  const lang = getSelectedLanguage();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) ? TRANSLATIONS[lang][key] : key;
}

// Compress and Resize Image using HTML5 Canvas before uploading
function compressImage(file, maxWidth, maxHeight, quality, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      callback(compressedBase64);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

