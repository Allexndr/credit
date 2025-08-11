// Простое мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!burger || !mobileMenu) {
        console.error('Burger or mobile menu elements not found!');
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
        mobileMenu.classList.toggle('active');
        
        // Управляем прокруткой body
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        console.log('Mobile menu toggled:', mobileMenu.classList.contains('active'));
    }
    
    // Функция закрытия мобильного меню
    function closeMobileMenu() {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Закрытие меню при клике на ссылку
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav__link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !burger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1023 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}); 