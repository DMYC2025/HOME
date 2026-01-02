// js/admin-loader.js

async function loadAdminSidebar() {
    try {
        const sidebarPlaceholder = document.getElementById('admin-sidebar-placeholder');
        if (!sidebarPlaceholder) return;

        // 1. Sidebar එක Fetch කිරීම
        const response = await fetch('admin_menu.html');
        if (!response.ok) throw new Error('Failed to load menu');
        
        const html = await response.text();
        
        // 2. අලංකාරව පෙන්වීමට කුඩා Fade-In Effect එකක්
        sidebarPlaceholder.innerHTML = html;
        sidebarPlaceholder.style.opacity = '0';
        setTimeout(() => {
            sidebarPlaceholder.style.transition = 'opacity 0.5s ease';
            sidebarPlaceholder.style.opacity = '1';
        }, 50);

        // 3. Active Link එක සෙවීම සහ Highlight කිරීම
        const currentPage = window.location.pathname.split('/').pop() || 'admin_login_dashboard.html';
        
        const linkMap = {
            'admin_login_dashboard.html': 'link-dashboard',
            'member_manage.html': 'link-member',
            'event_manage.html': 'link-event',
            'sport_manage.html': 'link-sport',
            'notifycation_manage.html': 'link-notify',
            'quick_links_manage.html': 'link-links',
            'excicetive_comitee_manage.html': 'link-committee',
            'about_manage.html': 'link-about',
            'page_settings_manage.html': 'link-settings'
        };

        const activeId = linkMap[currentPage];
        
        if (activeId) {
            const activeLink = document.getElementById(activeId);
            if (activeLink) {
                // Active Styles (Glassmorphism Green Effect)
                activeLink.classList.remove('text-slate-500', 'dark:text-slate-400', 'hover:bg-slate-50');
                activeLink.classList.add(
                    'bg-brand-green/10', 
                    'text-brand-green', 
                    'dark:text-white', 
                    'dark:bg-brand-green/20',
                    'shadow-lg',
                    'shadow-brand-green/10',
                    'border',
                    'border-brand-green/20'
                );
                
                // Icon Animation
                const icon = activeLink.querySelector('i');
                if(icon) {
                    icon.classList.remove('text-slate-500');
                    icon.classList.add('text-brand-green', 'dark:text-green-400');
                }
                
                // Active Indicator Line
                const line = activeLink.querySelector('div.absolute');
                if(line) {
                    line.classList.remove('-translate-x-full'); // Slide in the green line
                }
            }
        }

    } catch (error) {
        console.error('Sidebar Error: - admin-loader.js:71', error);
    }
}

// Global Logout Function
async function logoutAdmin() {
    // Custom Confirm Dialog වෙනුවට සරල confirm එකක් දැනට:
    if(confirm("Secure Logout: Are you sure?")) {
        if(typeof _supabase !== 'undefined') {
            await _supabase.auth.signOut();
        }
        window.location.href = 'login.html';
    }
}

// Global Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    
    // Animation for smooth transition
    html.classList.add('transition-colors', 'duration-500');
    
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}

// Initialize Theme on Load
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
}

// Run Loader
document.addEventListener('DOMContentLoaded', loadAdminSidebar);