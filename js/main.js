// ===== MAIN JAVASCRIPT =====

// DOM Elements
const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const modals = document.querySelectorAll('.modal');

// ===== УТИЛИТЫ =====
function formatNumber(num) {
    return new Intl.NumberFormat('kk-KZ').format(num);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== ШАПКА САЙТА =====
class Header {
    constructor() {
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.initMobileMenu();
        this.initSmoothScroll();
        
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.closeMobileMenu());
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    initMobileMenu() {
        burger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !burger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                if (targetId) {
                    scrollToSection(targetId);
                }
            });
        });
    }
}

// ===== КАЛЬКУЛЯТОР КРЕДИТА =====
class Calculator {
    constructor() {
        this.amountSlider = document.getElementById('amount');
        this.termSlider = document.getElementById('term');
        this.rateSlider = document.getElementById('rate');
        
        this.amountValue = document.getElementById('amount-value');
        this.termValue = document.getElementById('term-value');
        this.rateValue = document.getElementById('rate-value');
        
        this.monthlyPayment = document.getElementById('monthly-payment');
        this.overpayment = document.getElementById('overpayment');
        this.totalAmount = document.getElementById('total-amount');
        
        if (this.amountSlider) {
            this.init();
        }
    }
    
    init() {
        this.updateValues();
        this.calculate();
        
        this.amountSlider.addEventListener('input', () => this.handleInput());
        this.termSlider.addEventListener('input', () => this.handleInput());
        this.rateSlider.addEventListener('input', () => this.handleInput());
    }
    
    handleInput() {
        this.updateValues();
        this.calculate();
    }
    
    updateValues() {
        this.amountValue.textContent = formatNumber(this.amountSlider.value);
        this.termValue.textContent = this.termSlider.value;
        this.rateValue.textContent = this.rateSlider.value;
    }
    
    calculate() {
        const amount = parseFloat(this.amountSlider.value);
        const termMonths = parseInt(this.termSlider.value);
        const annualRate = parseFloat(this.rateSlider.value);
        
        // Ежемесячная процентная ставка
        const monthlyRate = annualRate / 100 / 12;
        
        // Аннуитетный платеж
        let monthlyPaymentValue;
        if (monthlyRate === 0) {
            monthlyPaymentValue = amount / termMonths;
        } else {
            monthlyPaymentValue = amount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                                  (Math.pow(1 + monthlyRate, termMonths) - 1);
        }
        
        const totalAmountValue = monthlyPaymentValue * termMonths;
        const overpaymentValue = totalAmountValue - amount;
        
        // Обновление значений
        this.monthlyPayment.textContent = formatNumber(Math.round(monthlyPaymentValue)) + ' ₸';
        this.overpayment.textContent = formatNumber(Math.round(overpaymentValue)) + ' ₸';
        this.totalAmount.textContent = formatNumber(Math.round(totalAmountValue)) + ' ₸';
    }
}

// ===== МОДАЛЬНЫЕ ОКНА =====
class Modal {
    constructor() {
        this.init();
    }
    
    init() {
        // Обработчики для открытия модальных окон
        window.openModal = (modalId) => this.open(modalId);
        window.closeModal = (modalId) => this.close(modalId);
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAll();
            }
        });
    }
    
    open(modalId) {
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    close(modalId) {
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    closeAll() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
}

// ===== ФОРМЫ =====
class Forms {
    constructor() {
        this.init();
    }
    
    init() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
        
        // Маска для телефона
        this.initPhoneMask();
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Показать уведомление об успешной отправке
        this.showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 5 минут.', 'success');
        
        // Закрыть модальное окно если форма в модальном окне
        const modal = form.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Очистить форму
        form.reset();
        
        // В реальном проекте здесь бы была отправка данных на сервер
        console.log('Form data:', Object.fromEntries(formData));
    }
    
    initPhoneMask() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.startsWith('7')) {
                    value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
                } else if (value.startsWith('8')) {
                    value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
                } else {
                    value = '+7 (' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 8) + '-' + value.slice(8, 10);
                }
                e.target.value = value;
            });
        });
    }
    
    showNotification(message, type = 'info') {
        // Создать уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        `;
        
        // Добавить стили для уведомления, если их нет
        if (!document.querySelector('.notification-styles')) {
            const styles = document.createElement('style');
            styles.className = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 2rem;
                    right: 2rem;
                    max-width: 400px;
                    background: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                }
                
                .notification--success {
                    border-left: 4px solid #10b981;
                }
                
                .notification--error {
                    border-left: 4px solid #ef4444;
                }
                
                .notification__content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.5rem;
                    gap: 1rem;
                }
                
                .notification__message {
                    color: #1e293b;
                    font-weight: 500;
                }
                
                .notification__close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #64748b;
                    padding: 0.25rem;
                    border-radius: 0.25rem;
                }
                
                .notification__close:hover {
                    background: #f1f5f9;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @media (max-width: 768px) {
                    .notification {
                        top: 1rem;
                        right: 1rem;
                        left: 1rem;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Добавить уведомление на страницу
        document.body.appendChild(notification);
        
        // Автоматически удалить через 5 секунд
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Наблюдатель для анимаций при появлении элементов
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Элементы для анимации
        const animatedElements = document.querySelectorAll(`
            .service-card,
            .advantage,
            .stat-item,
            .partner-card,
            .contact-item
        `);
        
        animatedElements.forEach(el => {
            el.classList.add('animate-element');
            this.observer.observe(el);
        });
        
        // Добавить CSS для анимаций
        this.addAnimationStyles();
    }
    
    addAnimationStyles() {
        if (!document.querySelector('.animation-styles')) {
            const styles = document.createElement('style');
            styles.className = 'animation-styles';
            styles.textContent = `
                .animate-element {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .animate-element.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                /* Задержки для последовательной анимации */
                .service-card:nth-child(2) { transition-delay: 0.1s; }
                .service-card:nth-child(3) { transition-delay: 0.2s; }
                
                .advantage:nth-child(2) { transition-delay: 0.1s; }
                .advantage:nth-child(3) { transition-delay: 0.2s; }
                
                .stat-item:nth-child(2) { transition-delay: 0.1s; }
                .stat-item:nth-child(3) { transition-delay: 0.2s; }
                .stat-item:nth-child(4) { transition-delay: 0.3s; }
                
                .partner-card:nth-child(2) { transition-delay: 0.1s; }
                .partner-card:nth-child(3) { transition-delay: 0.2s; }
                .partner-card:nth-child(4) { transition-delay: 0.3s; }
                
                /* Отключить анимации для пользователей с чувствительностью к движению */
                @media (prefers-reduced-motion: reduce) {
                    .animate-element {
                        opacity: 1;
                        transform: none;
                        transition: none;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
}

// ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====
// Выбор услуги
window.selectService = function(serviceType) {
    // Можно добавить логику для выбора услуги
    console.log('Selected service:', serviceType);
    openModal('application');
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    new Header();
    new Calculator();
    new Modal();
    new Forms();
    new ScrollAnimations();
    
    // Добавить класс loaded для плавного появления контента
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('CreditHub KZ - Сайт загружен успешно!');
});

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====
// Экспорт функций в глобальную область видимости
window.scrollToSection = scrollToSection; 