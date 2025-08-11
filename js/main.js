// ===== MAIN JAVASCRIPT =====
// Версия 2 - исправлено мобильное меню

// Функция для удаления аналитических панелей
function removeAnalyticsPanels() {
    // Поиск и удаление элементов по содержимому
    const elementsToRemove = [];
    
    // Поиск всех элементов на странице
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        const text = element.textContent || element.innerText || '';
        if (text.includes('17.6K') || 
            text.includes('1.3%') || 
            text.includes('Total impressions') || 
            text.includes('Average CTR') ||
            text.includes('Average position') ||
            text.includes('25.2')) {
            elementsToRemove.push(element);
        }
    });
    
    // Удаляем найденные элементы
    elementsToRemove.forEach(element => {
        element.remove();
    });
    
    // Поиск и удаление по классам и id
    const selectors = [
        '[data-analytics]',
        '.analytics-panel',
        '.dashboard-panel',
        '[class*="analytics"]',
        '[class*="dashboard"]',
        '[id*="analytics"]',
        '[id*="dashboard"]',
        '.floating-card'
    ];
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    });
}

// DOM Elements
const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const modals = document.querySelectorAll('.modal');

// Стилизуем бургер нормально
if (burger) {
    burger.style.cssText = `
        display: flex !important;
        position: relative !important;
        width: 30px !important;
        height: 22px !important;
        background: none !important;
        border: none !important;
        z-index: 9999 !important;
        visibility: visible !important;
        opacity: 1 !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        cursor: pointer !important;
    `;
    
    // Стилизуем spans внутри бургера
    const spans = burger.querySelectorAll('span');
    spans.forEach(span => {
        span.style.cssText = `
            display: block !important;
            width: 100% !important;
            height: 3px !important;
            background: white !important;
            border-radius: 2px !important;
            transition: all 0.3s ease !important;
        `;
    });
}

// ===== УТИЛИТЫ =====
function formatNumber(num) {
    return new Intl.NumberFormat('kk-KZ').format(num);
}

// Функция для выбора услуги
function selectService(serviceName) {
    // Формируем сообщение для WhatsApp
    const message = `Здравствуйте! Меня интересует услуга: ${serviceName}. Хотел бы получить консультацию.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77011061039?text=${encodedMessage}`;
    
    // Открываем WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Функции для модальных окон
function openModal(modalId) {
    console.log('Opening modal:', modalId);
    
    // Закрываем все другие модальные окна
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(m => {
        m.classList.remove('active');
        m.style.display = 'none';
    });
    
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        // Принудительно устанавливаем стили
        modal.style.display = 'flex';
        modal.style.zIndex = '99999';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        
        // Добавляем класс активного состояния
        modal.classList.add('active');
        
        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';
        
        // Фокусируемся на первом поле ввода
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        console.log('Modal opened successfully:', modalId);
    } else {
        console.error('Modal not found:', modalId);
    }
}

function closeModal(modalId) {
    console.log('Closing modal:', modalId);
    
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        // Убираем активное состояние
        modal.classList.remove('active');
        
        // Скрываем модальное окно
        modal.style.display = 'none';
        
        // Восстанавливаем прокрутку страницы
        document.body.style.overflow = '';
        
        // Сбрасываем форму
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
        
        console.log('Modal closed successfully:', modalId);
    } else {
        console.error('Modal not found for closing:', modalId);
    }
}

function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        console.log('Section found:', section);
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        console.log('Target position:', targetPosition);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        console.error('Section not found:', sectionId);
    }
}



// Функция выбора типа партнёрства
function selectPartnership(type) {
    console.log('Выбран тип партнёрства:', type);
    
    // Формируем сообщение для WhatsApp
    const message = `Здравствуйте! Меня интересует партнёрство типа: ${type}. Хотел бы получить подробную информацию о сотрудничестве.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77011061039?text=${encodedMessage}`;
    
    // Открываем WhatsApp
    window.open(whatsappUrl, '_blank');
}

// ===== ВАЛИДАЦИЯ ФОРМ =====
function validateIIN(iin) {
    if (!/^\d{12}$/.test(iin)) {
        return false;
    }
    
    // Простая проверка контрольной суммы ИИН
    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let sum = 0;
    
    for (let i = 0; i < 11; i++) {
        sum += parseInt(iin[i]) * weights[i];
    }
    
    const remainder = sum % 11;
    const checksum = remainder < 10 ? remainder : sum % 11;
    
    return parseInt(iin[11]) === checksum;
}

function validatePhone(phone) {
    const phoneRegex = /^\+7\s?\(?[0-9]{3}\)?\s?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== ШАПКА САЙТА =====
class Header {
    constructor() {
        this.init();
    }
    
    init() {
        this.handleScroll();
        // this.initMobileMenu(); // Отключено - теперь используется mobile-menu.js
        this.initSmoothScroll();
        this.initDropdown();
        
        window.addEventListener('scroll', () => this.handleScroll());
        // window.addEventListener('resize', () => this.closeMobileMenu()); // Отключено
    }
    
    initDropdown() {
        const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
        console.log('Found dropdown items:', dropdownItems.length);
        
        dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown');
            const links = dropdown ? dropdown.querySelectorAll('.dropdown__link') : [];
            console.log('Dropdown found:', !!dropdown, 'Links:', links.length);
            
            if (!dropdown) return;
            
            // Добавляем обработчики для ссылок в dropdown
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const text = link.textContent.trim();
                    console.log('Dropdown link clicked:', text);
                    
                    // Закрываем dropdown
                    item.classList.remove('active');
                            // Закрываем основное мобильное меню
        // if (window.innerWidth <= 1023) {
        //     nav.classList.remove('active');
        //     burger.classList.remove('active');
        //     document.body.style.overflow = '';
        // }
                    
                    // Прокручиваем к соответствующей секции
                    setTimeout(() => {
                        if (text.includes('Потребительский')) {
                            scrollToSection('services');
                        } else if (text.includes('Ипотека')) {
                            scrollToSection('services');
                        } else if (text.includes('Автокредит')) {
                            scrollToSection('services');
                        } else if (text.includes('Бизнес')) {
                            scrollToSection('services');
                        } else if (text.includes('Рефинансирование')) {
                            scrollToSection('services');
                        }
                    }, 100);
                });
            });
            
            // Клик по основной ссылке dropdown
            const mainLink = item.querySelector('.nav__link');
            if (mainLink) {
                mainLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Останавливаем всплытие события
                    console.log('Main dropdown link clicked');
                    item.classList.toggle('active');
                    console.log('Dropdown active:', item.classList.contains('active'));
                    
                    // Закрываем другие dropdown
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                });
            }
        });
        
        // Закрываем dropdown при клике вне его
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav__item--dropdown')) {
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // initMobileMenu() {
    //     // Отключено - теперь используется mobile-menu.js
    //     // Весь метод закомментирован для избежания конфликтов
    // }
    
    toggleMobileMenu() {
        console.log('=== TOGGLE MOBILE MENU ===');
        const currentBurger = document.getElementById('burger');
        const currentNav = document.getElementById('nav');
        
        if (!currentBurger || !currentNav) {
            console.error('Burger or nav not found in toggleMobileMenu');
            return;
        }
        
        currentBurger.classList.toggle('active');
        currentNav.classList.toggle('active');
        
        // Управляем прокруткой body
        if (currentNav.classList.contains('active')) {
            document.body.classList.add('mobile-menu-open');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
        console.log('Burger active:', currentBurger.classList.contains('active'));
        console.log('Nav active:', currentNav.classList.contains('active'));
        
        // Принудительно устанавливаем стили для мобильного меню только на мобильных устройствах
        if (window.innerWidth <= 1023) {
            if (currentNav.classList.contains('active')) {
                currentNav.style.position = 'fixed';
                currentNav.style.top = '0';
                currentNav.style.left = '0';
                currentNav.style.right = '0';
                currentNav.style.bottom = '0';
                currentNav.style.zIndex = '9999';
                currentNav.style.display = 'flex';
                currentNav.style.alignItems = 'center';
                currentNav.style.justifyContent = 'center';
                currentNav.style.opacity = '1';
                currentNav.style.visibility = 'visible';
                currentNav.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
                currentNav.style.paddingTop = '80px';
                currentNav.style.pointerEvents = 'auto';
                
                // Принудительно показываем элементы навигации
                const navList = currentNav.querySelector('.nav__list');
                if (navList) {
                    navList.style.display = 'flex';
                    navList.style.opacity = '1';
                    navList.style.visibility = 'visible';
                }
                
                // Принудительно показываем все ссылки
                const navLinks = currentNav.querySelectorAll('.nav__link');
                navLinks.forEach(link => {
                    link.style.opacity = '1';
                    link.style.visibility = 'visible';
                    link.style.display = 'block';
                });
                
                // Принудительно показываем мобильное меню
                const mobileMenu = currentNav.querySelector('.mobile-menu');
                if (mobileMenu) {
                    mobileMenu.style.display = 'flex';
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.visibility = 'visible';
                }
                
                // Принудительно показываем все элементы мобильного меню
                const mobileMenuElements = currentNav.querySelectorAll('.mobile-menu__section, .mobile-menu__header, .mobile-menu__title, .mobile-menu__link, .mobile-menu__actions');
                mobileMenuElements.forEach(element => {
                    element.style.opacity = '1';
                    element.style.visibility = 'visible';
                    element.style.color = 'white';
                });
                
                // Принудительно показываем кнопку в мобильном меню
                const mobileMenuBtn = currentNav.querySelector('.mobile-menu__actions .btn');
                if (mobileMenuBtn) {
                    mobileMenuBtn.style.opacity = '1';
                    mobileMenuBtn.style.visibility = 'visible';
                    mobileMenuBtn.style.background = 'var(--gradient-primary)';
                    mobileMenuBtn.style.color = 'white';
                }
                
                console.log('Mobile menu styles applied');
            } else {
                currentNav.style.opacity = '0';
                currentNav.style.visibility = 'hidden';
                currentNav.style.pointerEvents = 'none';
                console.log('Mobile menu hidden');
            }
        } else {
            // На десктопе сбрасываем все стили
            nav.style.position = '';
            nav.style.top = '';
            nav.style.left = '';
            nav.style.right = '';
            nav.style.bottom = '';
            nav.style.zIndex = '';
            nav.style.display = '';
            nav.style.alignItems = '';
            nav.style.justifyContent = '';
            nav.style.opacity = '';
            nav.style.visibility = '';
            nav.style.backgroundColor = '';
            nav.style.paddingTop = '';
            nav.style.pointerEvents = '';
            console.log('Desktop: mobile menu styles reset');
        }
    }
    
    closeMobileMenu() {
        const currentBurger = document.getElementById('burger');
        const currentNav = document.getElementById('nav');
        
        if (currentBurger) currentBurger.classList.remove('active');
        if (currentNav) currentNav.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
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


// ===== РАСЧЁТ ВОЗМОЖНОСТЕЙ =====
class CreditAssessment {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCalculations();
    }
    
    setupEventListeners() {
        // Обработчики для слайдеров
        const sliders = ['desired-amount', 'desired-term', 'average-rate'];
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                slider.addEventListener('input', () => {
                    this.updateSliderValue(id);
                    this.updateCalculations();
                });
            }
        });
        
        // Обработчики для инпутов
        const inputs = ['monthly-income', 'current-debt', 'current-payments', 'refinancing-amount', 'additional-amount'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => this.updateCalculations());
            }
        });
        
        // Обработчики для селектов
        const selects = ['credit-type', 'overdue-status', 'credit-history', 'income-confirmation'];
        selects.forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                select.addEventListener('change', () => {
                    if (id === 'credit-type') {
                        this.toggleRefinancingFields();
                    }
                    this.updateCalculations();
                });
            }
        });
        
        this.toggleRefinancingFields();
    }
    
    updateSliderValue(sliderId) {
        const slider = document.getElementById(sliderId);
        const valueSpan = document.getElementById(sliderId + '-value');
        
        if (slider && valueSpan) {
            let value = parseInt(slider.value);
            
            if (sliderId === 'desired-amount') {
                valueSpan.textContent = formatNumber(value);
            } else if (sliderId === 'desired-term') {
                valueSpan.textContent = value;
            } else if (sliderId === 'average-rate') {
                valueSpan.textContent = parseFloat(slider.value).toFixed(1);
            }
        }
    }
    
    toggleRefinancingFields() {
        const creditType = document.getElementById('credit-type');
        const refinancingFields = document.querySelector('.refinancing-fields');
        
        if (creditType && refinancingFields) {
            if (creditType.value === 'refinancing') {
                refinancingFields.style.display = 'block';
            } else {
                refinancingFields.style.display = 'none';
            }
        }
    }
    
    updateCalculations() {
        const data = this.getFormData();
        const results = this.calculateCreditAssessment(data);
        this.displayResults(results);
    }
    
    getFormData() {
        return {
            creditType: document.getElementById('credit-type')?.value || '',
            monthlyIncome: parseFloat(document.getElementById('monthly-income')?.value) || 0,
            currentDebt: parseFloat(document.getElementById('current-debt')?.value) || 0,
            currentPayments: parseFloat(document.getElementById('current-payments')?.value) || 0,
            overdueStatus: document.getElementById('overdue-status')?.value || '',
            creditHistory: document.getElementById('credit-history')?.value || '',
            incomeConfirmation: document.getElementById('income-confirmation')?.value || '',
            desiredAmount: parseFloat(document.getElementById('desired-amount')?.value) || 0,
            refinancingAmount: parseFloat(document.getElementById('refinancing-amount')?.value) || 0,
            additionalAmount: parseFloat(document.getElementById('additional-amount')?.value) || 0,
            desiredTerm: parseInt(document.getElementById('desired-term')?.value) || 0,
            averageRate: parseFloat(document.getElementById('average-rate')?.value) || 0
        };
    }
    
    calculateCreditAssessment(data) {
        if (!data.monthlyIncome || !data.desiredAmount || !data.desiredTerm || !data.averageRate) {
            return {
                status: 'incomplete',
                message: 'Для расчета заполните все поля'
            };
        }
        
        // Базовые расчеты
        const monthlyRate = data.averageRate / 100 / 12;
        const monthlyPayment = this.calculateMonthlyPayment(data.desiredAmount, monthlyRate, data.desiredTerm);
        const totalAmount = monthlyPayment * data.desiredTerm;
        const overpayment = totalAmount - data.desiredAmount;
        const dailyOverpayment = overpayment / (data.desiredTerm * 30);
        
        // Коэффициенты риска
        let riskMultiplier = 1;
        
        // Кредитная история
        switch (data.creditHistory) {
            case 'excellent': riskMultiplier *= 0.8; break;
            case 'good': riskMultiplier *= 0.9; break;
            case 'fair': riskMultiplier *= 1.1; break;
            case 'poor': riskMultiplier *= 1.3; break;
        }
        
        // Просрочки
        switch (data.overdueStatus) {
            case 'none': riskMultiplier *= 0.9; break;
            case 'minor': riskMultiplier *= 1.2; break;
            case 'major': riskMultiplier *= 1.5; break;
        }
        
        // Подтверждение доходов
        switch (data.incomeConfirmation) {
            case 'official': riskMultiplier *= 0.8; break;
            case 'bank-statement': riskMultiplier *= 0.9; break;
            case 'none': riskMultiplier *= 1.3; break;
        }
        
        // Расчет необходимого дохода (DTI = 40%)
        const totalMonthlyPayments = data.currentPayments + monthlyPayment;
        const requiredIncome = totalMonthlyPayments / 0.4;
        
        // Максимальная доступная сумма
        const maxMonthlyPayment = (data.monthlyIncome * 0.4) - data.currentPayments;
        const maxAvailableAmount = maxMonthlyPayment > 0 ? 
            this.calculateLoanAmount(maxMonthlyPayment, monthlyRate, data.desiredTerm) / riskMultiplier : 0;
        
        const maxPayment = this.calculateMonthlyPayment(maxAvailableAmount, monthlyRate, data.desiredTerm);
        
        // Определение статуса
        let status, message;
        if (data.monthlyIncome >= requiredIncome) {
            status = 'success';
            message = 'Отличные шансы на одобрение! Ваш доход позволяет получить запрашиваемую сумму.';
        } else if (data.monthlyIncome >= requiredIncome * 0.8) {
            status = 'warning';
            message = 'Средние шансы на одобрение. Рекомендуем уменьшить сумму или увеличить срок кредита.';
        } else {
            status = 'error';
            message = 'Низкие шансы на одобрение с текущими параметрами. Обратитесь за консультацией.';
        }
        
        return {
            status,
            message,
            monthlyPayment,
            dailyOverpayment,
            requiredIncome,
            maxAvailableAmount,
            maxPayment
        };
    }
    
    calculateMonthlyPayment(principal, monthlyRate, term) {
        if (monthlyRate === 0) return principal / term;
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    }
    
    calculateLoanAmount(monthlyPayment, monthlyRate, term) {
        if (monthlyRate === 0) return monthlyPayment * term;
        return monthlyPayment * (Math.pow(1 + monthlyRate, term) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, term));
    }
    
    displayResults(results) {
        const statusElement = document.getElementById('assessment-status');
        const monthlyPaymentElement = document.getElementById('monthly-payment-assessment');
        const dailyOverpaymentElement = document.getElementById('daily-overpayment');
        const requiredIncomeElement = document.getElementById('required-income');
        const maxAvailableAmountElement = document.getElementById('max-available-amount');
        const maxPaymentElement = document.getElementById('max-payment');
        
        if (results.status === 'incomplete') {
            if (statusElement) {
                statusElement.className = 'assessment-status';
                statusElement.innerHTML = `<p>${results.message}</p>`;
            }
            return;
        }
        
        // Обновление статуса
        if (statusElement) {
            statusElement.className = `assessment-status ${results.status}`;
            statusElement.innerHTML = `<p>${results.message}</p>`;
        }
        
        // Обновление результатов
        if (monthlyPaymentElement) {
            monthlyPaymentElement.textContent = `${formatNumber(Math.round(results.monthlyPayment))} ₸`;
        }
        
        if (dailyOverpaymentElement) {
            dailyOverpaymentElement.textContent = `${formatNumber(Math.round(results.dailyOverpayment))} ₸`;
        }
        
        if (requiredIncomeElement) {
            requiredIncomeElement.textContent = `${formatNumber(Math.round(results.requiredIncome))} ₸`;
        }
        
        if (maxAvailableAmountElement) {
            maxAvailableAmountElement.textContent = `${formatNumber(Math.round(results.maxAvailableAmount))} ₸`;
        }
        
        if (maxPaymentElement) {
            maxPaymentElement.textContent = `${formatNumber(Math.round(results.maxPayment))} ₸`;
        }
    }
}

// ===== МОДАЛЬНЫЕ ОКНА =====
class Modal {
    constructor() {
        this.init();
    }
    
    init() {
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAll();
            }
        });
        
        // НЕ переопределяем глобальную функцию openModal
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
        const modals = document.querySelectorAll('.modal');
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
        
        // Маска для ИИН
        this.initIINMask();
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Валидация формы
        if (!this.validateForm(form)) {
            return;
        }
        
        // Специальная обработка для формы hero
        if (form.id === 'hero-application-form') {
            this.handleHeroForm(form, formData);
            return;
        }
        

        
        // Специальная обработка для формы оценки кредитоспособности
        if (form.id === 'credit-assessment-form') {
            this.handleAssessmentForm(form, formData);
            return;
        }
        
        // Отправка в WhatsApp
        this.sendToWhatsApp(form, formData);
        
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
    }
    
    handleHeroForm(form, formData) {
        // Номер WhatsApp для чата
        const phoneNumber = '77011061039';
        
        // Формируем сообщение для hero формы
        let message = '=== 🚀 НОВАЯ ЗАЯВКА С ГЛАВНОЙ СТРАНИЦЫ ===\n';
        message += '==========================================\n\n';
        
        // Получаем данные из формы
        const name = formData.get('name') || 'Не указано';
        const phone = formData.get('phone') || 'Не указано';
        const clientType = formData.get('client_type') || 'Не указано';
        
        // Преобразуем тип клиента в читаемый вид
        const clientTypeText = clientType === 'individual' ? 'Физическое лицо' : 'Юридическое лицо';
        
        message += `> Имя: ${name}\n`;
        message += `> Телефон: ${phone}\n`;
        message += `> Тип клиента: ${clientTypeText}\n`;
        message += `> Согласие на обработку данных: Да\n`;
        
        message += '\n==========================================\n';
        message += '> Время: ' + new Date().toLocaleString('ru-RU');
        message += '\n==========================================\n\n';
        message += '> Komek damu - звоните!';
        
        // Кодируем сообщение для URL
        const encodedMessage = encodeURIComponent(message);
        
        // Формируем ссылку WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Открываем WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Показать уведомление об успешной отправке
        this.showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение 5 минут.', 'success');
        
        // Очистить форму
        form.reset();
        

        
        console.log('Hero form message:', message);
    }
    

    
    handleAssessmentForm(form, formData) {
        // Номер WhatsApp для чата
        const phoneNumber = '77011061039';
        
        // Формируем сообщение для формы оценки кредитоспособности
        let message = '=== 📊 НОВАЯ ЗАЯВКА НА ОЦЕНКУ КРЕДИТОСПОСОБНОСТИ ===\n';
        message += '==================================================\n\n';
        
        // Получаем данные из формы
        const creditType = document.getElementById('credit-type')?.selectedOptions[0]?.text || 'Не указано';
        const monthlyIncome = document.getElementById('monthly-income')?.value || 'Не указано';
        const currentDebt = document.getElementById('current-debt')?.value || 'Не указано';
        const currentPayments = document.getElementById('current-payments')?.value || 'Не указано';
        const overdueStatus = document.getElementById('overdue-status')?.selectedOptions[0]?.text || 'Не указано';
        const creditHistory = document.getElementById('credit-history')?.selectedOptions[0]?.text || 'Не указано';
        const incomeConfirmation = document.getElementById('income-confirmation')?.selectedOptions[0]?.text || 'Не указано';
        const refinancingAmount = document.getElementById('refinancing-amount')?.value || 'Не указано';
        const additionalAmount = document.getElementById('additional-amount')?.value || 'Не указано';
        const loanTerm = document.getElementById('loan-term')?.selectedOptions[0]?.text || 'Не указано';
        const interestRate = document.getElementById('interest-rate')?.selectedOptions[0]?.text || 'Не указано';
        
        message += `💳 Тип кредита: ${creditType}\n`;
        message += `💵 Среднемесячный доход: ${monthlyIncome} ₸\n`;
        message += `💸 Текущий долг: ${currentDebt} ₸\n`;
        message += `💳 Платежи по кредитам: ${currentPayments} ₸\n`;
        message += `⚠️ Просрочки: ${overdueStatus}\n`;
        message += `📊 Кредитная история: ${creditHistory}\n`;
        message += `📋 Подтверждение доходов: ${incomeConfirmation}\n`;
        message += `🔄 Сумма рефинансирования: ${refinancingAmount} ₸\n`;
        message += `➕ Дополнительная сумма: ${additionalAmount} ₸\n`;
        message += `⏰ Срок займа: ${loanTerm}\n`;
        message += `📈 Процентная ставка: ${interestRate}\n`;
        
        message += '\n==================================================\n';
        message += '🕐 Время: ' + new Date().toLocaleString('ru-RU');
        message += '\n==================================================\n\n';
        message += '🏦 Komek damu - звоните!';
        
        // Кодируем сообщение для URL
        const encodedMessage = encodeURIComponent(message);
        
        // Формируем ссылку WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Открываем WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Показать уведомление об успешной отправке
        this.showNotification('Спасибо! Ваша заявка на оценку кредитоспособности отправлена. Мы свяжемся с вами в течение 5 минут.', 'success');
        
        // Очистить форму
        form.reset();
        
        console.log('Assessment form message:', message);
    }
    
    sendToWhatsApp(form, formData) {
        // Номер WhatsApp для чата
        const phoneNumber = '77011061039';
        
        // Определяем тип формы для правильного заголовка
        let formType = 'credit';
        let formTitle = '=== НОВАЯ ЗАЯВКА НА КРЕДИТ ===';
        
        if (form.id === 'partnerForm' || form.id === 'partner-application-form') {
            formType = 'partner';
            formTitle = '=== НОВАЯ ЗАЯВКА НА ПАРТНЁРСТВО ===';
        } else if (form.id === 'business-consultation-form') {
            formType = 'consultation';
            formTitle = '=== НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ ===';

        } else if (form.id === 'credit-assessment-form') {
            formType = 'assessment';
            formTitle = '=== НОВАЯ ЗАЯВКА НА ОЦЕНКУ КРЕДИТОСПОСОБНОСТИ ===';
        }
        
        // Формируем сообщение
        let message = formTitle + '\n';
        message += '==============================\n\n';
        
        // Маппинг ASCII символов для типов кредитов
        const creditTypeEmojis = {
            'consumer': '[ПОТРЕБИТЕЛЬСКИЙ]',
            'mortgage': '[ИПОТЕКА]',
            'auto': '[АВТОКРЕДИТ]',
            'business': '[БИЗНЕС]',
            'refinancing': '[РЕФИНАНСИРОВАНИЕ]',
            'express': '[ЭКСПРЕСС]'
        };

        // Маппинг полей для красивого отображения
        const fieldLabels = {
            'name': '👤 Имя',
            'fullName': '👤 ФИО',
            'phone': '📞 Телефон',
            'email': '📧 Email',
            'iin': '🆔 ИИН',
            'credit_type': '💳 Тип кредита',
            'amount': '💰 Сумма',
            'comment': '💬 Комментарий',
            'consent': '✅ Согласие на обработку данных',
            'client_type': '👥 Тип клиента',
            'city': '🏙️ Город',
            'partnershipType': '🤝 Тип партнёрства',
            'experience': '💼 Опыт работы',
            'motivation': '🎯 Мотивация',
            'businessType': '🏢 Тип бизнеса',
            'creditAmount': '💰 Требуемая сумма',
            'purpose': '🎯 Цель кредитования',
            'monthly-income': '💵 Среднемесячный доход',
            'current-debt': '💸 Текущий долг',
            'current-payments': '💳 Платежи по кредитам',
            'overdue-status': '⚠️ Просрочки',
            'credit-history': '📊 Кредитная история',
            'income-confirmation': '📋 Подтверждение доходов',
            'refinancing-amount': '🔄 Сумма рефинансирования',
            'additional-amount': '➕ Дополнительная сумма',
            'loan-term': '⏰ Срок займа',
            'interest-rate': '📈 Процентная ставка'
        };
        
        // Собираем данные из FormData
        let creditTypeValue = '';
        let creditTypeText = '';
        let clientType = '';
        
        for (let [key, value] of formData.entries()) {
            if (value && fieldLabels[key]) {
                // Для селектов получаем текст опции
                if (key === 'credit_type' || key === 'amount' || key === 'partnershipType' || 
                    key === 'businessType' || key === 'creditAmount' || key === 'overdue-status' || 
                    key === 'credit-history' || key === 'income-confirmation' || key === 'loan-term' || 
                    key === 'interest-rate') {
                    const select = form.querySelector(`[name="${key}"]`);
                    if (select && select.selectedOptions[0]) {
                        if (key === 'credit_type') {
                            creditTypeValue = select.value;
                            creditTypeText = select.selectedOptions[0].text;
                        }
                        value = select.selectedOptions[0].text;
                    }
                }
                
                // Для radio buttons (тип клиента)
                if (key === 'client_type') {
                    const radio = form.querySelector(`input[name="${key}"][value="${value}"]`);
                    if (radio) {
                        const label = radio.closest('label') || radio.parentElement;
                        if (label) {
                            const labelText = label.querySelector('.client-type-label') || label.textContent;
                            value = labelText.trim();
                            clientType = value;
                        }
                    }
                }
                
                // Обычная обработка всех полей
                message += `${fieldLabels[key]}: ${value}\n`;
            }
        }
        
        // Добавляем приветствие в зависимости от типа клиента
        let greeting = 'Здравствуйте! ';
        if (clientType) {
            greeting += `Я ${clientType}. `;
        }
        
        // Обновляем заголовок с соответствующим префиксом
        if (creditTypeValue && creditTypeEmojis[creditTypeValue]) {
            message = message.replace(formTitle, 
                `=== ${creditTypeEmojis[creditTypeValue]} НОВАЯ ЗАЯВКА ===`);
        }
        
        message += '\n==============================\n';
        message += '🕐 Время: ' + new Date().toLocaleString('ru-RU');
        message += '\n==============================\n\n';
        message += '🏦 Komek damu - звоните!';
        
        // Кодируем сообщение для URL
        const encodedMessage = encodeURIComponent(message);
        
        // Формируем ссылку WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Открываем WhatsApp
        window.open(whatsappUrl, '_blank');
        
        console.log('WhatsApp message:', message);
    }
    
    validateForm(form) {
        let isValid = true;
        
        // Проверка телефона
        const phoneInputs = form.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            if (input.value && !validatePhone(input.value)) {
                this.showFieldError(input, 'Введите корректный номер телефона');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });
        
        // Проверка email
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (input.value && !validateEmail(input.value)) {
                this.showFieldError(input, 'Введите корректный email');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });
        
        // Проверка ИИН
        const iinInputs = form.querySelectorAll('input[placeholder="ИИН"]');
        iinInputs.forEach(input => {
            if (input.value && !validateIIN(input.value)) {
                this.showFieldError(input, 'Введите корректный ИИН (12 цифр)');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });
        
        // Проверка обязательных полей
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'Это поле обязательно для заполнения');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showFieldError(input, message) {
        this.clearFieldError(input);
        
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(input) {
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    initPhoneMask() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            // Устанавливаем начальное значение
            if (!input.value) {
                input.value = '+7';
            }
            
            input.addEventListener('input', (e) => {
                const target = e.target;
                let value = target.value;
                const oldValue = target.value;
                const cursorPosition = target.selectionStart;
                
                // Если поле пустое, добавляем +7
                if (!value) {
                    target.value = '+7';
                    target.setSelectionRange(3, 3);
                    return;
                }
                
                // Если пользователь удалил +7, добавляем обратно
                if (!value.startsWith('+7')) {
                    value = '+7' + value.replace(/\D/g, '');
                }
                
                // Удаляем все нецифровые символы кроме +7
                let digits = value.replace(/\D/g, '');
                
                // Если номер начинается с 8, заменяем на 7
                if (digits.startsWith('8')) {
                    digits = '7' + digits.slice(1);
                }
                
                // Если номер не начинается с 7, добавляем 7 в начало
                if (!digits.startsWith('7')) {
                    digits = '7' + digits;
                }
                
                // Ограничиваем длину до 11 цифр (7 + 10 цифр номера)
                if (digits.length > 11) {
                    digits = digits.slice(0, 11);
                }
                
                // Форматируем номер
                let formattedValue = '+7';
                if (digits.length > 1) {
                    const remainingDigits = digits.slice(1);
                    if (remainingDigits.length > 0) {
                        formattedValue += ' (' + remainingDigits.slice(0, 3);
                        if (remainingDigits.length > 3) {
                            formattedValue += ') ' + remainingDigits.slice(3, 6);
                            if (remainingDigits.length > 6) {
                                formattedValue += '-' + remainingDigits.slice(6, 8);
                                if (remainingDigits.length > 8) {
                                    formattedValue += '-' + remainingDigits.slice(8, 10);
                                }
                            }
                        }
                    }
                }
                
                // Обновляем значение
                target.value = formattedValue;
                
                // Вычисляем новую позицию курсора
                let newCursorPosition = cursorPosition;
                
                // Если добавилась цифра (длина увеличилась)
                if (formattedValue.length > oldValue.length) {
                    // Находим позицию последней добавленной цифры
                    const addedDigit = formattedValue.charAt(cursorPosition - 1);
                    if (/\d/.test(addedDigit)) {
                        newCursorPosition = cursorPosition;
                    } else {
                        // Если добавился символ форматирования, перемещаем курсор после него
                        newCursorPosition = cursorPosition + 1;
                    }
                } else if (formattedValue.length < oldValue.length) {
                    // Если удалилась цифра
                    newCursorPosition = Math.max(3, cursorPosition - 1);
                }
                
                // Устанавливаем курсор
                setTimeout(() => {
                    const finalPosition = Math.min(newCursorPosition, formattedValue.length);
                    target.setSelectionRange(finalPosition, finalPosition);
                }, 0);
            });
            
            // Обработка клавиш Backspace и Delete
            input.addEventListener('keydown', (e) => {
                const target = e.target;
                const currentValue = target.value;
                const cursorPosition = target.selectionStart;
                const selectionEnd = target.selectionEnd;
                
                // Если выделен текст, разрешаем удаление
                if (cursorPosition !== selectionEnd) {
                    return;
                }
                
                if (e.key === 'Backspace') {
                    // Если пытаемся удалить +7, очищаем поле
                    if (cursorPosition <= 3) {
                        e.preventDefault();
                        target.value = '+7';
                        target.setSelectionRange(3, 3);
                        return;
                    }
                    
                    // Если курсор стоит перед символом форматирования, перепрыгиваем через него
                    const charBeforeCursor = currentValue.charAt(cursorPosition - 1);
                    if (charBeforeCursor === ' ' || charBeforeCursor === '(' || charBeforeCursor === ')' || charBeforeCursor === '-') {
                        e.preventDefault();
                        target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                    }
                }
            });
            
            // Обработка Ctrl+A (выделение всего текста)
            input.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'a') {
                    e.preventDefault();
                    input.select();
                }
            });
            
            // Обработка стрелок для правильного перемещения курсора
            input.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    const target = e.target;
                    const cursorPosition = target.selectionStart;
                    const value = target.value;
                    
                    if (e.key === 'ArrowLeft') {
                        // При движении влево, если следующий символ - форматирование, перепрыгиваем через него
                        const charBeforeCursor = value.charAt(cursorPosition - 1);
                        if (charBeforeCursor === ' ' || charBeforeCursor === '(' || charBeforeCursor === ')' || charBeforeCursor === '-') {
                            e.preventDefault();
                            target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                        }
                    } else if (e.key === 'ArrowRight') {
                        // При движении вправо, если следующий символ - форматирование, перепрыгиваем через него
                        const charAfterCursor = value.charAt(cursorPosition);
                        if (charAfterCursor === ' ' || charAfterCursor === '(' || charAfterCursor === ')' || charAfterCursor === '-') {
                            e.preventDefault();
                            target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
                        }
                    }
                }
            });
            
            // Двойной клик для выделения всего текста
            input.addEventListener('dblclick', (e) => {
                e.preventDefault();
                input.select();
            });
            
            // Клик в начало поля для установки курсора после +7
            input.addEventListener('click', (e) => {
                const target = e.target;
                const cursorPosition = target.selectionStart;
                
                // Если кликнули в начало поля (до +7), устанавливаем курсор после +7
                if (cursorPosition <= 3) {
                    target.setSelectionRange(3, 3);
                }
            });
            
            // Фокус на поле для установки курсора в правильное место
            input.addEventListener('focus', (e) => {
                const target = e.target;
                const cursorPosition = target.selectionStart;
                
                // Если курсор в начале поля, устанавливаем его после +7
                if (cursorPosition <= 3) {
                    target.setSelectionRange(3, 3);
                }
            });
            
            // Обработка вставки текста
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                const digits = pastedText.replace(/\D/g, '');
                
                if (digits.length > 0) {
                    let newDigits = digits;
                    if (digits.startsWith('8')) {
                        newDigits = '7' + digits.slice(1);
                    } else if (digits.startsWith('7')) {
                        newDigits = digits;
                    } else {
                        newDigits = '7' + digits;
                    }
                    
                    // Ограничиваем длину
                    if (newDigits.length > 11) {
                        newDigits = newDigits.slice(0, 11);
                    }
                    
                    // Форматируем номер
                    let formattedValue = '+7';
                    if (newDigits.length > 1) {
                        const remainingDigits = newDigits.slice(1);
                        if (remainingDigits.length > 0) {
                            formattedValue += ' (' + remainingDigits.slice(0, 3);
                            if (remainingDigits.length > 3) {
                                formattedValue += ') ' + remainingDigits.slice(3, 6);
                                if (remainingDigits.length > 6) {
                                    formattedValue += '-' + remainingDigits.slice(6, 8);
                                    if (remainingDigits.length > 8) {
                                        formattedValue += '-' + remainingDigits.slice(8, 10);
                                    }
                                }
                            }
                        }
                    }
                    
                    target.value = formattedValue;
                    target.setSelectionRange(formattedValue.length, formattedValue.length);
                }
            });
        });
    }
    

    
    initIINMask() {
        const iinInputs = document.querySelectorAll('input[placeholder="ИИН"]');
        iinInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 12) {
                    value = value.slice(0, 12);
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
    console.log('Selected service:', serviceType);
    
    // Словарь с названиями услуг
    const serviceNames = {
        'small-business': 'Субсидии для малого бизнеса',
        'trade-business': 'Субсидирование торговли',
        'large-business': 'Кредитование бизнеса до 500 млн',
        'unsecured': 'Беззалоговый кредит',
        'refinancing': 'Рефинансирование',
        'secured': 'Залоговый кредит',
        'ip-unsecured': 'Беззалоговый кредит для ИП',
        'ip-secured': 'Залоговый кредит для ИП',
        'too-credit': 'Кредитование ТОО',
        'auto': 'АВТО кредитование',
        'Программа Өрлеу': 'Программа Өрлеу',
        'Программа Jana Business': 'Программа Jana Business',
        'Беззалоговый кредит': 'Беззалоговый кредит',
        'Рефинансирование': 'Рефинансирование',
        'Беззалоговый для ИП': 'Беззалоговый кредит для ИП',
        'Залоговый': 'Залоговый кредит',
        'Льготная программа под 2%': 'Льготная ипотека под 2%',
        'Без подтверждения дохода': 'Ипотека без подтверждения дохода',
        'Без первоначального взноса': 'Ипотека без первоначального взноса',
        'Партнерская ипотека': 'Партнерская ипотека',
        'Беззалоговый кредит для физических лиц': 'Беззалоговый кредит для физических лиц',
        'Беззалоговый кредит для ИП': 'Беззалоговый кредит для ИП',
        'Залоговый кредит для бизнеса': 'Залоговый кредит для бизнеса'
    };
    
    const serviceName = serviceNames[serviceType] || 'услугу';
    
    // Определяем правильное окончание для "нужен/нужна/нужно"
    let ending = 'нужен';
    if (serviceName.includes('Субсидии') || serviceName.includes('Кредитование') || serviceName.includes('Рефинансирование') || serviceName.includes('Субсидирование') || serviceName.includes('Ипотека') || serviceName.includes('Программа')) {
        ending = 'нужно';
    }
    
    // Формируем сообщение для WhatsApp с правильным окончанием
    const message = `Здравствуйте! Мне ${ending} ${serviceName}. Хотел бы получить консультацию и узнать подробности.`;
    
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Отправляем в WhatsApp
    const whatsappUrl = `https://wa.me/77011061039?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Принудительно сбрасываем все модальные окна при загрузке
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    });
    
    // Удаляем аналитические панели при загрузке
    removeAnalyticsPanels();
    
    // Инициализация всех компонентов (удаляем дублирование)
    // new Header();
    // new Calculator();
    // new CreditAssessment();
    // new Modal();
    // new Forms();
    // new ScrollAnimations();
    
    // Добавить класс loaded для плавного появления контента
    setTimeout(() => {
        document.body.classList.add('loaded');
        // Повторно проверяем и удаляем панели после загрузки
        removeAnalyticsPanels();
    }, 100);
    
    // Периодически проверяем и удаляем панели (на случай динамического добавления)
    setInterval(removeAnalyticsPanels, 1000);
    
    // Добавляем обработчики для кнопок "Получить кредит"
    const creditButtons = document.querySelectorAll('button[onclick*="openModal(\'application\')"]');
    console.log('Found credit buttons:', creditButtons.length);
    
    creditButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            console.log(`Credit button ${index + 1} clicked`);
            console.log('Button element:', this);
            console.log('Button onclick:', this.getAttribute('onclick'));
        });
    });
    
    console.log('Komek damu - Сайт загружен успешно!');
    

});



// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====
// Экспорт функций в глобальную область видимости
window.scrollToSection = scrollToSection;

// Глобальная функция для открытия модального окна
window.openModal = function(modalId) {
    console.log('=== openModal called ===');
    console.log('Modal ID:', modalId);
    
    const modal = document.querySelector(`#modal-${modalId}`);
    console.log('Modal element found:', !!modal);
    console.log('Modal element:', modal);
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Принудительно устанавливаем стили для отображения
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.right = '0';
        modal.style.bottom = '0';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        
        // Принудительно устанавливаем стили для контента модального окна
        const modalContent = modal.querySelector('.modal__content');
        if (modalContent) {
            modalContent.style.zIndex = '10000';
            modalContent.style.position = 'relative';
            modalContent.style.display = 'block';
            modalContent.style.opacity = '1';
            modalContent.style.visibility = 'visible';
            modalContent.style.background = 'white';
            modalContent.style.color = 'black';
            modalContent.style.padding = '20px';
            modalContent.style.borderRadius = '10px';
            modalContent.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        }
        
        // Проверяем все элементы внутри модального окна
        const allElements = modal.querySelectorAll('*');
        console.log('Elements inside modal:', allElements.length);
        allElements.forEach((el, index) => {
            if (index < 10) { // Показываем первые 10 элементов
                console.log(`Element ${index}:`, el.tagName, el.className, el.textContent?.substring(0, 50));
            }
        });
        
        console.log('Modal opened successfully');
        console.log('Modal classes:', modal.className);
        console.log('Modal computed styles:', window.getComputedStyle(modal));
    } else {
        console.error('Modal not found:', `#modal-${modalId}`);
        console.log('Available modals:', document.querySelectorAll('.modal'));
    }
};

// Глобальная функция для закрытия модального окна
window.closeModal = function() {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Принудительно сбрасываем все модальные окна
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    });
};

// Функция отправки заявки на консультацию по бизнес-программе
window.submitBusinessConsultation = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Имитация отправки (в реальном проекте здесь был бы AJAX запрос)
    console.log('Заявка на консультацию по DAMU:', Object.fromEntries(formData));
    
    // Показываем сообщение об успешной отправке
    alert('Спасибо! Ваша заявка на консультацию принята. Наш специалист свяжется с вами в течение рабочего дня.');
    
    // Закрываем модальное окно и сбрасываем форму
    closeModal();
    form.reset();
};

// ===== ПЛАВНЫЕ ПЕРЕХОДЫ МЕЖДУ СТРАНИЦАМИ =====
class PageTransition {
    constructor() {
        this.overlay = document.getElementById('pageTransitionOverlay');
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Перехватываем клики по ссылкам для плавного перехода
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && this.shouldTransition(link)) {
                e.preventDefault();
                this.transitionToPage(link.href);
            }
        });

        // Обрабатываем кнопки назад/вперед браузера
        window.addEventListener('popstate', () => {
            if (!this.isTransitioning) {
                this.transitionToPage(window.location.href, false);
            }
        });
    }

    shouldTransition(link) {
        const href = link.getAttribute('href');
        
        // Не делаем переход для:
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('tel:') || 
            href.startsWith('mailto:') || 
            href.startsWith('javascript:') ||
            link.target === '_blank' ||
            href.includes('wa.me')) {
            return false;
        }

        // Проверяем, что это ссылка на наши страницы
        return href.includes('index.html') || 
               href.includes('komek-damu-partner.html') ||
               href === '/' ||
               (!href.includes('http') && !href.includes('www'));
    }

    async transitionToPage(url, pushState = true) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        document.body.classList.add('page-transitioning');

        // Показываем overlay
        this.overlay.classList.add('active');

        // Ждем анимацию overlay
        await new Promise(resolve => setTimeout(resolve, 300));

        try {
            // Проверяем, работаем ли мы с file:// протоколом
            const isFileProtocol = window.location.protocol === 'file:';
            
            // Переходим на новую страницу
            if (pushState && !isFileProtocol) {
                window.history.pushState(null, '', url);
            }
            window.location.href = url;
        } catch (error) {
            console.error('Ошибка перехода:', error);
            // В случае ошибки просто переходим без History API
            window.location.href = url;
        }
    }

    hideOverlay() {
        this.overlay.classList.remove('active');
        document.body.classList.remove('page-transitioning');
        this.isTransitioning = false;
    }

    // Скрываем overlay при загрузке страницы
    hideOnLoad() {
        setTimeout(() => {
            this.hideOverlay();
        }, 100);
    }
}

// Создаем экземпляр класса переходов
const pageTransition = new PageTransition();

// Скрываем overlay при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    pageTransition.hideOnLoad();
    
    // Инициализируем все классы
    const header = new Header();

    const creditAssessment = new CreditAssessment();
    const modal = new Modal();
    const forms = new Forms();
    const scrollAnimations = new ScrollAnimations();
    
    // Тест бургер-меню
    const testBurger = document.getElementById('burger');
    const testNav = document.getElementById('nav');
    
    if (testBurger && testNav) {
        console.log('=== ТЕСТ БУРГЕР-МЕНЮ ===');
        console.log('Burger element:', testBurger);
        console.log('Nav element:', testNav);
        console.log('Burger classes:', testBurger.className);
        console.log('Nav classes:', testNav.className);
    }
    
    // Делаем формы доступными глобально для функций на странице партнёрства
    window.forms = forms;
    
    // Инициализируем слайдер партнёров
    setTimeout(() => {
        initPartnersSlider();
        startAutoSlide();
    }, 100);
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        const nav = document.getElementById('nav');
        if (nav && window.innerWidth > 1023) {
            // На десктопе сбрасываем все стили мобильного меню
            nav.style.position = '';
            nav.style.top = '';
            nav.style.left = '';
            nav.style.right = '';
            nav.style.bottom = '';
            nav.style.zIndex = '';
            nav.style.display = '';
            nav.style.alignItems = '';
            nav.style.justifyContent = '';
            nav.style.opacity = '';
            nav.style.visibility = '';
            nav.style.backgroundColor = '';
            nav.style.paddingTop = '';
            nav.style.pointerEvents = '';
            nav.classList.remove('active');
            
            const burger = document.getElementById('burger');
            if (burger) {
                burger.classList.remove('active');
            }
            
            document.body.style.overflow = '';
            console.log('Window resized to desktop, mobile menu reset');
        }
    });
});

// Функция для переключения секций мобильного меню
window.toggleMobileSection = function(sectionId) {
    const section = document.querySelector(`#mobile-${sectionId}`).parentElement;
    const isActive = section.classList.contains('active');
    
    // Закрываем все секции
    document.querySelectorAll('.mobile-menu__section').forEach(s => {
        s.classList.remove('active');
    });
    
    // Открываем текущую секцию, если она не была активной
    if (!isActive) {
        section.classList.add('active');
    }
};



// Функция отправки заявки на партнёрство
window.submitPartnerApplication = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Номер WhatsApp для чата
    const phoneNumber = '77011061039';
    
    // Формируем сообщение для заявки на партнёрство
    let message = '=== 🤝 НОВАЯ ЗАЯВКА НА ПАРТНЁРСТВО ===\n';
    message += '==========================================\n\n';
    
    // Получаем данные из формы
    const fullName = formData.get('fullName') || 'Не указано';
    const phone = formData.get('phone') || 'Не указано';
    const partnershipType = formData.get('partnershipType') || 'Не указано';
    const city = formData.get('city') || 'Не указано';
    const experience = formData.get('experience') || 'Не указано';
    const motivation = formData.get('motivation') || 'Не указано';
    const consent = formData.get('consent') || false;
    
    // Получаем текст для типа партнёрства
    const partnershipTypeText = form.querySelector('select[name="partnershipType"]')?.selectedOptions[0]?.text || partnershipType;
    
    message += `👤 ФИО: ${fullName}\n`;
    message += `📞 Телефон: ${phone}\n`;
    message += `🤝 Тип партнёрства: ${partnershipTypeText}\n`;
    message += `🏙️ Город: ${city}\n`;
    message += `💼 Опыт работы: ${experience}\n`;
    message += `🎯 Мотивация: ${motivation}\n`;
    message += `✅ Согласие на обработку данных: ${consent ? 'Да' : 'Нет'}\n`;
    
    message += '\n==========================================\n';
    message += '🕐 Время: ' + new Date().toLocaleString('ru-RU');
    message += '\n==========================================\n\n';
    message += '🏦 Komek damu - звоните!';
    
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Формируем ссылку WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Открываем WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Показать уведомление об успешной отправке
    if (window.forms) {
        window.forms.showNotification('Спасибо! Ваша заявка на партнёрство отправлена. Мы свяжемся с вами в течение 5 минут.', 'success');
    }
    
    // Закрыть модальное окно
    const modal = form.closest('.modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Очистить форму
    form.reset();
    
    console.log('Partner application message:', message);
};

// Функция отправки консультации по бизнесу
window.submitBusinessConsultation = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Номер WhatsApp для чата
    const phoneNumber = '77011061039';
    
    // Формируем сообщение для консультации по бизнесу
    let message = '=== 🏢 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ ПО БИЗНЕСУ ===\n';
    message += '==================================================\n\n';
    
    // Получаем данные из формы
    const fullName = formData.get('fullName') || 'Не указано';
    const phone = formData.get('phone') || 'Не указано';
    const businessType = formData.get('businessType') || 'Не указано';
    const creditAmount = formData.get('creditAmount') || 'Не указано';
    const purpose = formData.get('purpose') || 'Не указано';
    const consent = formData.get('consent') || false;
    
    // Получаем текст для полей
    const businessTypeText = form.querySelector('select[name="businessType"]')?.selectedOptions[0]?.text || businessType;
    const creditAmountText = form.querySelector('select[name="creditAmount"]')?.selectedOptions[0]?.text || creditAmount;
    
    message += `👤 ФИО: ${fullName}\n`;
    message += `📞 Телефон: ${phone}\n`;
    message += `🏢 Тип бизнеса: ${businessTypeText}\n`;
    message += `💰 Требуемая сумма: ${creditAmountText}\n`;
    message += `🎯 Цель кредитования: ${purpose}\n`;
    message += `✅ Согласие на обработку данных: ${consent ? 'Да' : 'Нет'}\n`;
    
    message += '\n==================================================\n';
    message += '🕐 Время: ' + new Date().toLocaleString('ru-RU');
    message += '\n==================================================\n\n';
    message += '🏦 Komek damu - звоните!';
    
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Формируем ссылку WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Открываем WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Показать уведомление об успешной отправке
    if (window.forms) {
        window.forms.showNotification('Спасибо! Ваша заявка на консультацию отправлена. Мы свяжемся с вами в течение 5 минут.', 'success');
    }
    
    // Закрыть модальное окно
    const modal = form.closest('.modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Очистить форму
    form.reset();
    
    console.log('Business consultation message:', message);
};

// ===== СЛАЙДЕР ПАРТНЁРОВ =====
let currentSlide = 0;
let slidesPerView = 3;
let totalSlides = 0;

// Инициализация слайдера партнёров
function initPartnersSlider() {
    const track = document.querySelector('.partners-slider__track');
    const slides = document.querySelectorAll('.partner-slide');
    const dots = document.querySelectorAll('.partners-slider__dot');
    
    if (!track || slides.length === 0) return;
    
    // Определяем количество слайдов в зависимости от размера экрана
    if (window.innerWidth <= 768) {
        slidesPerView = 1;
    } else if (window.innerWidth <= 1024) {
        slidesPerView = 2;
    } else {
        slidesPerView = 3;
    }
    
    totalSlides = Math.ceil(slides.length / slidesPerView);
    
    // Обновляем количество точек
    updateDots();
    
    // Показываем первый слайд
    goToSlide(0);
}

// Переход к слайду
window.goToSlide = function(slideIndex) {
    const track = document.querySelector('.partners-slider__track');
    const slides = document.querySelectorAll('.partner-slide');
    const dots = document.querySelectorAll('.partners-slider__dot');
    
    if (!track || slides.length === 0) return;
    
    currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
    
    // Вычисляем смещение
    const slideWidth = slides[0].offsetWidth + 48; // 48px - gap между слайдами
    const offset = currentSlide * slideWidth * slidesPerView;
    
    // Применяем трансформацию
    track.style.transform = `translateX(-${offset}px)`;
    
    // Обновляем активную точку
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Обновляем состояние кнопок
    updateSliderButtons();
};

// Слайд влево/вправо
window.slidePartners = function(direction) {
    if (direction === 'prev') {
        goToSlide(currentSlide - 1);
    } else {
        goToSlide(currentSlide + 1);
    }
};

// Обновление точек
function updateDots() {
    const dotsContainer = document.querySelector('.partners-slider__dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'partners-slider__dot';
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Обновление состояния кнопок
function updateSliderButtons() {
    const prevBtn = document.querySelector('.partners-slider__btn--prev');
    const nextBtn = document.querySelector('.partners-slider__btn--next');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
}

// Автоматическое переключение слайдов
function startAutoSlide() {
    setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0);
        }
    }, 5000); // Переключаем каждые 5 секунд
}

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    setTimeout(() => {
        initPartnersSlider();
    }, 100);
});



// Также скрываем при событии load
window.addEventListener('load', () => {
    pageTransition.hideOnLoad();
});

// ===== ВИДЕО ОТЗЫВЫ =====
class VideoReviews {
    constructor() {
        this.modal = document.getElementById('videoModal');
        this.overlay = document.getElementById('videoModalOverlay');
        this.closeBtn = document.getElementById('videoModalClose');
        this.player = document.getElementById('videoModalPlayer');
        this.currentVideo = null;
    }

    init() {
        this.initVideoCards();
        this.initModal();
        this.initLazyLoading();
    }

    initVideoCards() {
        const videoCards = document.querySelectorAll('.video-review-card');
        
        videoCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const videoSrc = card.dataset.video;
                this.openVideo(videoSrc);
            });

            // Добавляем hover эффект для кнопки воспроизведения
            const playButton = card.querySelector('.video-play-button');
            if (playButton) {
                card.addEventListener('mouseenter', () => {
                    playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
                });
                
                card.addEventListener('mouseleave', () => {
                    playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            }
        });
    }

    initModal() {
        // Закрытие по клику на оверлей
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.closeVideo();
            });
        }

        // Закрытие по клику на кнопку
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.closeVideo();
            });
        }

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeVideo();
            }
        });
    }

    initLazyLoading() {
        // Создаем Intersection Observer для ленивой загрузки
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    this.loadVideoThumbnail(video);
                    observer.unobserve(video);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Наблюдаем за всеми видео
        const videos = document.querySelectorAll('.video-preview');
        videos.forEach(video => {
            observer.observe(video);
        });
    }

    loadVideoThumbnail(video) {
        // Создаем canvas для генерации превью
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;

        // Создаем градиентный фон
        const gradient = ctx.createLinearGradient(0, 0, 400, 300);
        gradient.addColorStop(0, '#f1f5f9');
        gradient.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 300);

        // Рисуем иконку воспроизведения
        ctx.fillStyle = '#1e3a8a';
        ctx.beginPath();
        ctx.arc(200, 150, 40, 0, 2 * Math.PI);
        ctx.fill();

        // Рисуем треугольник
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(180, 140);
        ctx.lineTo(180, 160);
        ctx.lineTo(200, 150);
        ctx.closePath();
        ctx.fill();

        // Устанавливаем превью
        video.poster = canvas.toDataURL();
    }

    openVideo(videoSrc) {
        if (!this.modal || !this.player) return;

        // Устанавливаем источник видео
        this.player.src = videoSrc;
        this.currentVideo = videoSrc;

        // Показываем модальное окно
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Фокусируемся на кнопке закрытия для доступности
        setTimeout(() => {
            this.closeBtn.focus();
        }, 100);
    }

    closeVideo() {
        if (!this.modal || !this.player) return;

        // Останавливаем видео
        this.player.pause();
        this.player.currentTime = 0;
        this.player.src = '';

        // Скрываем модальное окно
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        // Сбрасываем текущее видео
        this.currentVideo = null;
    }
}

// Инициализация видео отзывов
const videoReviews = new VideoReviews();
document.addEventListener('DOMContentLoaded', () => {
    videoReviews.init();
    
    // Инициализация маски для телефона
    initGlobalPhoneMask();
    
    // Дополнительная инициализация для страницы партнеров
    if (window.location.pathname.includes('komek-damu-partner.html') || window.location.pathname.endsWith('/')) {
        // Повторно инициализируем маску для телефона на странице партнеров
        setTimeout(() => {
            initGlobalPhoneMask();
        }, 100);
    }
});

// Глобальная функция для форматирования номера телефона
function initGlobalPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        // Устанавливаем начальное значение
        if (!input.value) {
            input.value = '+7';
        }
        
        input.addEventListener('input', function(e) {
            const target = e.target;
            let value = target.value;
            const oldValue = target.value;
            const cursorPosition = target.selectionStart;
            
            // Если поле пустое, добавляем +7
            if (!value) {
                target.value = '+7';
                target.setSelectionRange(3, 3);
                return;
            }
            
            // Если пользователь удалил +7, добавляем обратно
            if (!value.startsWith('+7')) {
                value = '+7' + value.replace(/\D/g, '');
            }
            
            // Удаляем все нецифровые символы кроме +7
            let digits = value.replace(/\D/g, '');
            
            // Если номер начинается с 8, заменяем на 7
            if (digits.startsWith('8')) {
                digits = '7' + digits.slice(1);
            }
            
            // Если номер не начинается с 7, добавляем 7 в начало
            if (!digits.startsWith('7')) {
                digits = '7' + digits;
            }
            
            // Ограничиваем длину до 11 цифр (7 + 10 цифр номера)
            if (digits.length > 11) {
                digits = digits.slice(0, 11);
            }
            
            // Форматируем номер
            let formattedValue = '+7';
            if (digits.length > 1) {
                const remainingDigits = digits.slice(1);
                if (remainingDigits.length > 0) {
                    formattedValue += ' (' + remainingDigits.slice(0, 3);
                    if (remainingDigits.length > 3) {
                        formattedValue += ') ' + remainingDigits.slice(3, 6);
                        if (remainingDigits.length > 6) {
                            formattedValue += '-' + remainingDigits.slice(6, 8);
                            if (remainingDigits.length > 8) {
                                formattedValue += '-' + remainingDigits.slice(8, 10);
                            }
                        }
                    }
                }
            }
            
            // Обновляем значение
            target.value = formattedValue;
            
            // Вычисляем новую позицию курсора
            let newCursorPosition = cursorPosition;
            
            // Если добавилась цифра (длина увеличилась)
            if (formattedValue.length > oldValue.length) {
                // Находим позицию последней добавленной цифры
                const addedDigit = formattedValue.charAt(cursorPosition - 1);
                if (/\d/.test(addedDigit)) {
                    newCursorPosition = cursorPosition;
                } else {
                    // Если добавился символ форматирования, перемещаем курсор после него
                    newCursorPosition = cursorPosition + 1;
                }
            } else if (formattedValue.length < oldValue.length) {
                // Если удалилась цифра
                newCursorPosition = Math.max(3, cursorPosition - 1);
            }
            
            // Устанавливаем курсор
            setTimeout(() => {
                const finalPosition = Math.min(newCursorPosition, formattedValue.length);
                target.setSelectionRange(finalPosition, finalPosition);
            }, 0);
        });
        
        // Обработка клавиш Backspace и Delete
        input.addEventListener('keydown', function(e) {
            const target = e.target;
            const currentValue = target.value;
            const cursorPosition = target.selectionStart;
            const selectionEnd = target.selectionEnd;
            
            // Если выделен текст, разрешаем удаление
            if (cursorPosition !== selectionEnd) {
                return;
            }
            
            if (e.key === 'Backspace') {
                // Если пытаемся удалить +7, очищаем поле
                if (cursorPosition <= 3) {
                    e.preventDefault();
                    target.value = '+7';
                    target.setSelectionRange(3, 3);
                    return;
                }
                
                // Если курсор стоит перед символом форматирования, перепрыгиваем через него
                const charBeforeCursor = currentValue.charAt(cursorPosition - 1);
                if (charBeforeCursor === ' ' || charBeforeCursor === '(' || charBeforeCursor === ')' || charBeforeCursor === '-') {
                    e.preventDefault();
                    target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                }
            }
        });
        
        // Обработка стрелок для правильного перемещения курсора
        input.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const target = e.target;
                const cursorPosition = target.selectionStart;
                const value = target.value;
                
                if (e.key === 'ArrowLeft') {
                    // При движении влево, если следующий символ - форматирование, перепрыгиваем через него
                    const charBeforeCursor = value.charAt(cursorPosition - 1);
                    if (charBeforeCursor === ' ' || charBeforeCursor === '(' || charBeforeCursor === ')' || charBeforeCursor === '-') {
                        e.preventDefault();
                        target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                    }
                } else if (e.key === 'ArrowRight') {
                    // При движении вправо, если следующий символ - форматирование, перепрыгиваем через него
                    const charAfterCursor = value.charAt(cursorPosition);
                    if (charAfterCursor === ' ' || charAfterCursor === '(' || charAfterCursor === ')' || charAfterCursor === '-') {
                        e.preventDefault();
                        target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
                    }
                }
            }
        });
        
        // Клик в начало поля для установки курсора после +7
        input.addEventListener('click', function(e) {
            const target = e.target;
            const cursorPosition = target.selectionStart;
            
            // Если кликнули в начало поля (до +7), устанавливаем курсор после +7
            if (cursorPosition <= 3) {
                target.setSelectionRange(3, 3);
            }
        });
        
        // Фокус на поле для установки курсора в правильное место
        input.addEventListener('focus', function(e) {
            const target = e.target;
            const cursorPosition = target.selectionStart;
            
            // Если курсор в начале поля, устанавливаем его после +7
            if (cursorPosition <= 3) {
                target.setSelectionRange(3, 3);
            }
        });
        
        // Обработка вставки текста
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const digits = pastedText.replace(/\D/g, '');
            
            if (digits.length > 0) {
                let newDigits = digits;
                if (digits.startsWith('8')) {
                    newDigits = '7' + digits.slice(1);
                } else if (digits.startsWith('7')) {
                    newDigits = digits;
                } else {
                    newDigits = '7' + digits;
                }
                
                // Ограничиваем длину
                if (newDigits.length > 11) {
                    newDigits = newDigits.slice(0, 11);
                }
                
                // Форматируем номер
                let formattedValue = '+7';
                if (newDigits.length > 1) {
                    const remainingDigits = newDigits.slice(1);
                    if (remainingDigits.length > 0) {
                        formattedValue += ' (' + remainingDigits.slice(0, 3);
                        if (remainingDigits.length > 3) {
                            formattedValue += ') ' + remainingDigits.slice(3, 6);
                            if (remainingDigits.length > 6) {
                                formattedValue += '-' + remainingDigits.slice(6, 8);
                                if (remainingDigits.length > 8) {
                                    formattedValue += '-' + remainingDigits.slice(8, 10);
                                }
                            }
                        }
                    }
                }
                
                target.value = formattedValue;
                target.setSelectionRange(formattedValue.length, formattedValue.length);
            }
        });
    });
}

// Глобальный обработчик для закрытия модальных окон по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            const modalId = activeModal.id.replace('modal-', '');
            closeModal(modalId);
        }
    }
});

// Тестовая функция для проверки модального окна
window.testModal = function() {
    console.log('=== TESTING MODAL ===');
    const modal = document.getElementById('modal-consultation');
    if (modal) {
        console.log('Modal found:', modal);
        console.log('Modal classes:', modal.className);
        console.log('Modal styles:', modal.style.cssText);
        
        // Принудительно показываем модальное окно
        modal.style.display = 'flex';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.zIndex = '99999';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.padding = '20px';
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('Modal forced to show');
        console.log('Modal classes now:', modal.className);
        console.log('Modal styles now:', modal.style.cssText);
    } else {
        console.error('Modal not found!');
    }
};

// ===== РАСКРЫВАЮЩИЕСЯ ФОРМЫ =====

class ExpandableForms {
    constructor() {
        this.expandedForms = new Set();
    }

    init() {
        this.createExpandableForms();
        this.bindEvents();
    }

    createExpandableForms() {
        // Формы удалены, поэтому ничего не создаем
        return;
    }

    getButtonText(container) {
        // Формы удалены, возвращаем пустую строку
        return '';
    }

    bindEvents() {
        // Обработчики для кнопок раскрытия
        document.addEventListener('click', (e) => {
            if (e.target.closest('.expand-form-btn')) {
                const btn = e.target.closest('.expand-form-btn');
                const formId = btn.dataset.formId;
                this.toggleForm(formId);
            }
        });

        // Обработчики для модальных окон (чтобы формы сразу были видны)
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="openModal"]') || e.target.closest('[onclick*="closeModal"]')) {
                // При открытии/закрытии модальных окон показываем формы
                setTimeout(() => {
                    this.showModalForms();
                }, 100);
            }
        });
    }

    toggleForm(formId) {
        const btn = document.querySelector(`[data-form-id="${formId}"]`);
        const formWrapper = document.querySelector(`.form-wrapper[data-form-id="${formId}"]`);
        
        if (!btn || !formWrapper) return;

        const isExpanded = this.expandedForms.has(formId);
        
        if (isExpanded) {
            // Скрываем форму
            this.collapseForm(formId);
        } else {
            // Показываем форму
            this.expandForm(formId);
        }
    }

    expandForm(formId) {
        const btn = document.querySelector(`[data-form-id="${formId}"]`);
        const formWrapper = document.querySelector(`.form-wrapper[data-form-id="${formId}"]`);
        
        if (!btn || !formWrapper) return;

        // Добавляем классы для анимации
        btn.classList.add('expanded');
        formWrapper.classList.add('expanded');
        
        // Сохраняем состояние
        this.expandedForms.add(formId);
        
        // Плавная прокрутка к форме
        setTimeout(() => {
            formWrapper.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 300);
    }

    collapseForm(formId) {
        const btn = document.querySelector(`[data-form-id="${formId}"]`);
        const formWrapper = document.querySelector(`.form-wrapper[data-form-id="${formId}"]`);
        
        if (!btn || !formWrapper) return;

        // Убираем классы
        btn.classList.remove('expanded');
        formWrapper.classList.remove('expanded');
        
        // Удаляем из состояния
        this.expandedForms.delete(formId);
    }

    showModalForms() {
        // Показываем все формы в модальных окнах
        const modalFormWrappers = document.querySelectorAll('.modal .form-wrapper');
        modalFormWrappers.forEach(wrapper => {
            wrapper.classList.add('expanded');
        });
    }

    // Метод для программного раскрытия формы
    expandFormById(formId) {
        this.expandForm(formId);
    }

    // Метод для программного скрытия формы
    collapseFormById(formId) {
        this.collapseForm(formId);
    }
}

// Инициализация раскрывающихся форм - ВРЕМЕННО ОТКЛЮЧЕНО
/*
document.addEventListener('DOMContentLoaded', () => {
    const expandableForms = new ExpandableForms();
    expandableForms.init();
    
    // Делаем доступным глобально
    window.expandableForms = expandableForms;
});
*/ 

// Функция для удаления всех стрелочек и маркеров выделения
function removeAllSelectionMarkers() {
    // Убираем все outline и border у изображений
    const allImages = document.querySelectorAll('img, svg');
    allImages.forEach(img => {
        img.style.outline = 'none';
        img.style.border = 'none';
        img.style.boxShadow = 'none';
        img.style.resize = 'none';
        img.style.cursor = 'default';
        img.style.webkitUserDrag = 'none';
        img.style.webkitTouchCallout = 'none';
        img.style.webkitTapHighlightColor = 'transparent';
        img.style.webkitFocusRingColor = 'transparent';
        img.style.webkitAppearance = 'none';
        img.style.mozAppearance = 'none';
        img.style.appearance = 'none';
        
        // Убираем все атрибуты, которые могут вызывать стрелочки
        img.removeAttribute('draggable');
        img.removeAttribute('contenteditable');
        img.removeAttribute('tabindex');
    });
    
    // Убираем все псевдоэлементы
    const style = document.createElement('style');
    style.textContent = `
        *::before, *::after {
            content: none !important;
        }
        img::before, img::after,
        svg::before, svg::after {
            display: none !important;
            content: none !important;
            width: 0 !important;
            height: 0 !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
        .consumer-solution-card__image::before,
        .consumer-solution-card__image::after,
        .consumer-solution-card__image img::before,
        .consumer-solution-card__image img::after {
            display: none !important;
            content: none !important;
            width: 0 !important;
            height: 0 !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
    `;
    document.head.appendChild(style);
}

// Запускаем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    removeAllSelectionMarkers();
    
    // Запускаем функцию каждые 100мс для гарантии
    setInterval(removeAllSelectionMarkers, 100);
    
    // Запускаем функцию при изменении DOM
    const observer = new MutationObserver(removeAllSelectionMarkers);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
});

// Функция для выбора услуги