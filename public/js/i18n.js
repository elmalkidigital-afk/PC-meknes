import { translations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
    const langSwitchers = document.querySelectorAll('.lang-switcher');
    let currentLang = localStorage.getItem('pc_meknes_lang') || 'fr';

    const updateContent = (lang) => {
        // Update text content for elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                const translation = translations[lang][key];

                // Allow HTML in translations (like <br> or <span>)
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else if (el.tagName === 'SELECT') {
                    // Specific case for select options handled by data-i18n on options
                } else {
                    el.innerHTML = translation;
                }
            }
        });

        // Handle RTL / LTR
        if (lang === 'darija') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.lang = 'fr';
        }

        // Update active state in switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-btn-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Save preference
        localStorage.setItem('pc_meknes_lang', lang);
        currentLang = lang;
    };

    // Initialize
    updateContent(currentLang);

    // Event listeners
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (btn) {
            const selectedLang = btn.getAttribute('data-btn-lang');
            if (selectedLang && selectedLang !== currentLang) {
                updateContent(selectedLang);
            }
        }
    });
});
