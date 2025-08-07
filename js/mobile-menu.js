// Простое мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    if (!burger || !nav) {
        console.error('Burger or nav elements not found!');
        return;
    }
    
    console.log('Initializing simple mobile menu...');
    
    // Обработчик клика для бургера
    burger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Работаем только на мобильных устройствах
        if (window.innerWidth <= 1023) {
            console.log('Burger clicked on mobile!');
            toggleMobileMenu();
        }
    });
    
    // Функция переключения мобильного меню
    function toggleMobileMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Управляем прокруткой body
        if (nav.classList.contains('active')) {
            document.body.classList.add('mobile-menu-open');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
        
        console.log('Mobile menu toggled:', nav.classList.contains('active'));
    }
    
    // Функция закрытия мобильного меню
    function closeMobileMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = nav.querySelectorAll('.nav__link, .mobile-menu__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Закрытие меню при клике на кнопки
    const buttons = nav.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Если это кнопка "Получить кредит", не предотвращаем действие по умолчанию
            if (button.textContent.includes('Получить кредит')) {
                closeMobileMenu();
                return;
            }
            e.preventDefault();
            closeMobileMenu();
        });
    });
    
    // Закрытие меню при клике на кнопку закрытия
    const closeBtn = nav.querySelector('.mobile-menu-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !burger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1023 && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Функция для переключения секций мобильного меню
    window.toggleMobileSection = function(sectionId) {
        const section = document.getElementById('mobile-' + sectionId);
        if (section) {
            section.classList.toggle('active');
        }
    };
}); 