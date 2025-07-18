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

// ===== FAQ ФУНКЦИОНАЛЬНОСТЬ =====
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-item__answer');
    const icon = button.querySelector('.faq-icon');
    
    // Закрываем все другие FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-item__answer');
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
        
        dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown');
            const links = dropdown.querySelectorAll('.dropdown__link');
            
            // Добавляем обработчики для ссылок в dropdown
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const text = link.textContent.trim();
                    
                    // Закрываем dropdown
                    item.classList.remove('active');
                    
                    // Прокручиваем к соответствующей секции
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
                });
            });
            
            // Клик по основной ссылке dropdown
            const mainLink = item.querySelector('.nav__link');
            mainLink.addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('active');
                
                // Закрываем другие dropdown
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
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
    // Можно добавить логику для выбора услуги
    console.log('Selected service:', serviceType);
    openModal('application');
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
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
    }, 100);
    
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