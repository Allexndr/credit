// ===== MAIN JAVASCRIPT =====

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

// ===== FAQ ФУНКЦИОНАЛЬНОСТЬ =====
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer, .faq-item__answer');
    const icon = button.querySelector('.faq-icon');
    
    // Закрываем все другие FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer, .faq-item__answer');
            const otherIcon = item.querySelector('.faq-icon');
            otherAnswer.style.maxHeight = null;
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Переключаем текущий FAQ
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    }
}

// Функция для партнёрского FAQ
function togglePartnerFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.partner-faq-item__answer');
    const icon = button.querySelector('.partner-faq-icon');
    
    // Закрываем все другие FAQ
    document.querySelectorAll('.partner-faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.partner-faq-item__answer');
            const otherIcon = item.querySelector('.partner-faq-icon');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Переключаем текущий FAQ
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(45deg)';
    } else {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    }
}

// Алиас для обратной совместимости
window.toggleFaq = toggleFAQ;
window.togglePartnerFaq = togglePartnerFAQ;

// Функция выбора типа партнёрства
function selectPartnership(type) {
    // Здесь можно добавить логику для открытия модального окна
    // или перехода на специальную страницу для конкретного типа партнёрства
    console.log('Выбран тип партнёрства:', type);
    
    // Пока что просто открываем общую форму заявки на партнёрство
    openModal('partner-application');
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
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initDropdown();
        
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.closeMobileMenu());
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
                    if (window.innerWidth <= 1023) {
                        nav.classList.remove('active');
                        burger.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
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
    
    initMobileMenu() {
        if (!burger || !nav) {
            console.error('Burger or nav elements not found!');
            return;
        }
        
        console.log('Initializing mobile menu...');
        
        burger.addEventListener('click', () => {
            console.log('Burger clicked!');
            this.toggleMobileMenu();
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Добавляем обработчик для кнопки "Получить кредит" в мобильном меню
        const mobileButton = document.getElementById('mobile-credit-btn');
        if (mobileButton) {
            console.log('Found mobile credit button');
            mobileButton.addEventListener('click', (e) => {
                console.log('Mobile credit button clicked!');
                e.preventDefault();
                e.stopPropagation();
                // Закрываем мобильное меню
                this.closeMobileMenu();
                // Открываем модальное окно
                setTimeout(() => {
                    openModal('application');
                }, 100);
            });
        } else {
            console.error('Mobile credit button not found!');
        }
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !burger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        console.log('Toggling mobile menu...');
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        console.log('Burger active:', burger.classList.contains('active'));
        console.log('Nav active:', nav.classList.contains('active'));
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
    
    sendToWhatsApp(form, formData) {
        // Номер WhatsApp для чата
        const phoneNumber = '77011061039';
        
        // Формируем сообщение
        let message = '=== НОВАЯ ЗАЯВКА НА КРЕДИТ ===\n';
        message += '==============================\n\n';
        
        // Маппинг ASCII символов для типов кредитов
        const creditTypeEmojis = {
            'consumer': '[ПОТРЕБИТЕЛЬСКИЙ]',      // Потребительский кредит
            'mortgage': '[ИПОТЕКА]',       // Ипотека
            'auto': '[АВТОКРЕДИТ]',          // Автокредит
            'business': '[БИЗНЕС]',      // Бизнес кредит
            'refinancing': '[РЕФИНАНСИРОВАНИЕ]',   // Рефинансирование
            'express': '[ЭКСПРЕСС]'        // Экспресс-кредит
        };

        // Маппинг полей для красивого отображения (ASCII символы)
        const fieldLabels = {
            'name': '> Имя',
            'phone': '> Телефон',
            'email': '> Email',
            'iin': '> ИИН',
            'credit_type': '> Тип кредита',
            'amount': '> Сумма',
            'comment': '> Комментарий',
            'consent': '> Согласие на обработку данных'
        };
        
        // Собираем данные из FormData
        let creditTypeValue = '';
        let creditTypeText = '';
        for (let [key, value] of formData.entries()) {
            if (value && fieldLabels[key]) {
                // Для селектов получаем текст опции
                if (key === 'credit_type' || key === 'amount') {
                    const select = form.querySelector(`[name="${key}"]`);
                    if (select && select.selectedOptions[0]) {
                        if (key === 'credit_type') {
                            creditTypeValue = select.value; // Сохраняем значение для смайлика
                            creditTypeText = select.selectedOptions[0].text; // Сохраняем текст
                        }
                        value = select.selectedOptions[0].text;
                    }
                }
                
                // Обычная обработка всех полей
                message += `${fieldLabels[key]}: ${value}\n`;
            }
        }
        
        // Обновляем заголовок с соответствующим префиксом
        if (creditTypeValue && creditTypeEmojis[creditTypeValue]) {
            message = message.replace('=== НОВАЯ ЗАЯВКА НА КРЕДИТ ===', 
                `=== ${creditTypeEmojis[creditTypeValue]} НОВАЯ ЗАЯВКА ===`);
        }
        
        message += '\n==============================\n';
        message += '> Время: ' + new Date().toLocaleString('ru-RU');
        message += '\n==============================\n\n';
        message += '> Komek damu - звоните!';
        
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
        'auto': 'АВТО кредитование'
    };
    
    const serviceName = serviceNames[serviceType] || 'услугу';
    
    // Определяем правильное окончание для "нужен/нужна/нужно"
    let ending = 'нужен';
    if (serviceName.includes('Субсидии') || serviceName.includes('Кредитование') || serviceName.includes('Рефинансирование') || serviceName.includes('Субсидирование')) {
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
    // Удаляем аналитические панели при загрузке
    removeAnalyticsPanels();
    
    // Инициализация всех компонентов
    new Header();
    new Calculator();
    new CreditAssessment();
    new Modal();
    new Forms();
    new ScrollAnimations();
    
    // Добавить класс loaded для плавного появления контента
    setTimeout(() => {
        document.body.classList.add('loaded');
        // Повторно проверяем и удаляем панели после загрузки
        removeAnalyticsPanels();
    }, 100);
    
    // Периодически проверяем и удаляем панели (на случай динамического добавления)
    setInterval(removeAnalyticsPanels, 1000);
    
    console.log('Komek damu - Сайт загружен успешно!');
});

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====
// Экспорт функций в глобальную область видимости
window.scrollToSection = scrollToSection;

// Глобальная функция для открытия модального окна
window.openModal = function(modalId) {
    const modal = document.querySelector(`#modal-${modalId}`);
    
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
    }
};

// Глобальная функция для закрытия модального окна
window.closeModal = function() {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
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
    
    // Инициализируем навигацию
    const navigation = new Navigation();
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

// Также скрываем при событии load
window.addEventListener('load', () => {
    pageTransition.hideOnLoad();
}); 