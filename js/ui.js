// js/ui.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Initialization (පිටුව load වීමට පෙර Theme එක සකසයි)
    initTheme();

    // 2. Inject Header (Navigation Bar)
    const body = document.body;
    
    // Check local storage for user info
    const userAvatar = localStorage.getItem('userAvatar') || 'https://via.placeholder.com/40';
    const userName = localStorage.getItem('userName') || 'Member';
    
    // Helper to get initials if no name
    const firstName = userName.split(' ')[0];

    // Theme Icon එක තීරණය කිරීම
    const isDark = document.documentElement.classList.contains('dark');
    const themeIconClass = isDark ? "ph-sun" : "ph-moon";

    const navbarHTML = `
    <nav class="fixed top-0 w-full z-[100] bg-[#1e232f] border-b border-gray-800 shadow-lg" id="mainNav">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                
                <div class="flex-shrink-0 flex flex-col justify-center cursor-pointer" onclick="window.location.href='user_dashboard.html'">
                    <h1 class="font-black text-xl tracking-wide text-white leading-none uppercase">DREAM MAKERS</h1>
                    <h2 class="font-bold text-[10px] tracking-[0.2em] text-green-500 uppercase leading-tight">YOUTH SPORTS CLUB</h2>
                </div>

                <div class="hidden lg:flex items-center gap-1 bg-[#252b3b] p-1 rounded-full border border-gray-700/50">
                    <a href="user_dashboard.html" class="nav-link px-6 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition">Dashboard</a>
                    <a href="event.html" class="nav-link px-6 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition">Events</a>
                    <a href="sport.html" class="nav-link px-6 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition">Sports</a>
                    <a href="about.html" class="nav-link px-6 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition">Members</a>
                    <a href="quicklink.html" class="nav-link px-6 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition">Links</a>
                </div>

                <div class="flex items-center gap-6">
                    <button onclick="toggleTheme()" class="text-gray-400 hover:text-yellow-400 transition" title="Switch Theme">
                        <i id="themeIcon" class="ph-bold ${themeIconClass} text-2xl"></i>
                    </button>

                    <a href="notifycation.html" class="relative text-gray-400 hover:text-white transition">
                        <i class="ph-bold ph-bell text-2xl"></i>
                        <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-[#1e232f]"></span>
                    </a>

                    <div class="flex items-center gap-3">
                        <div class="hidden md:block text-right">
                            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Welcome</p>
                            <p class="text-sm font-bold text-white leading-none">${firstName}</p>
                        </div>
                        <a href="Myaccount.html" class="relative group">
                            <div class="h-10 w-10 rounded-xl p-[2px] border border-gray-600 group-hover:border-green-500 transition">
                                <img class="h-full w-full rounded-[9px] object-cover bg-gray-700" src="${userAvatar}" alt="User">
                            </div>
                        </a>
                        <button onclick="handleLogout()" class="text-gray-500 hover:text-red-500 transition ml-2"><i class="ph-bold ph-sign-out text-xl"></i></button>
                    </div>

                    <button onclick="toggleMobileMenu()" class="lg:hidden text-white p-2">
                        <i class="ph-bold ph-list text-3xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="mobileMenu" class="hidden lg:hidden absolute top-20 left-0 w-full bg-[#1e232f] border-b border-gray-800 p-4 flex-col space-y-2 z-50">
            <a href="user_dashboard.html" class="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 font-bold">Dashboard</a>
            <a href="event.html" class="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 font-bold">Events</a>
            <a href="sport.html" class="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 font-bold">Sports</a>
            <a href="about.html" class="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 font-bold">Members</a>
            <a href="quicklink.html" class="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 font-bold">Links</a>
            <div class="h-px bg-gray-700 my-2"></div>
            <button onclick="handleLogout()" class="w-full text-left px-4 py-3 text-red-500 font-bold">Log Out</button>
        </div>
    </nav>
    <div class="h-20"></div> `;

    // Only inject navbar if not on login/reg pages
    if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('reg.html')) {
        body.insertAdjacentHTML('afterbegin', navbarHTML);
        highlightActiveLink();
    }
});

// --- Theme Logic Functions ---

// 1. මුලින්ම Theme එක set කිරීම
function initTheme() {
    // LocalStorage හෝ System Settings පරීක්ෂා කරයි
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// 2. Button එක click කළ විට Theme එක මාරු කිරීම
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');

    if (html.classList.contains('dark')) {
        // Switch to Light Mode
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if(icon) icon.className = "ph-bold ph-moon text-2xl"; // සඳ අයිකනය පෙන්වන්න
    } else {
        // Switch to Dark Mode
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if(icon) icon.className = "ph-bold ph-sun text-2xl"; // ඉර අයිකනය පෙන්වන්න
    }
}

// --- Other Helper Functions ---
function getVerifyIcon() {
    return `<i class="ph-fill ph-seal-check text-blue-500 text-[12px] ml-1 align-middle inline-block"></i>`;
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.remove('text-gray-400', 'hover:text-white');
            link.classList.add('bg-green-600', 'text-white', 'shadow-lg', 'shadow-green-900/50');
        }
    });
}

async function handleLogout() {
    if(confirm('Logout?')) {
        localStorage.clear();
        const { error } = await _supabase.auth.signOut();
        window.location.href = 'index.html';
    }
}
