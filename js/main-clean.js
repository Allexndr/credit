// Удаляем аналитические панели
function removeAnalyticsPanels() {
    const panels = document.querySelectorAll('[data-analytics]');
    panels.forEach(panel => panel.remove());
}

// Форматирование чисел
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Выбор услуги
function selectService(serviceName) {
    const services = document.querySelectorAll('.service-card');
    services.forEach(service => {
        service.classList.remove('active');
    });
    
    const selectedService = document.querySelector(`[data-service="${serviceName}"]`);
    if (selectedService) {
        selectedService.classList.add('active');
    }
}

// Модальные окна
function openModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Плавная прокрутка к секциям
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Выбор партнерства
function selectPartnership(type) {
    console.log('Selected partnership type:', type);
    // Здесь можно добавить логику для выбора типа партнерства
}

// Валидация ИИН
function validateIIN(iin) {
    if (iin.length !== 12) return false;
    
    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let sum = 0;
    
    for (let i = 0; i < 11; i++) {
        sum += parseInt(iin[i]) * weights[i];
    }
    
    const checkDigit = (sum % 11) % 10;
    return checkDigit === parseInt(iin[11]);
}

// Валидация телефона
function validatePhone(phone) {
    return /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/.test(phone);
}

// Валидация email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });
    }
}

// ===== КАЛЬКУЛЯТОР =====
class Calculator {
    constructor() {
        this.amount = 1000000;
        this.term = 12;
        this.rate = 12.6;
        this.init();
    }
    
    init() {
        this.handleInput();
        this.updateValues();
    }
    
    handleInput() {
        const inputs = document.querySelectorAll('.calculator input');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.updateValues());
        });
    }
    
    updateValues() {
        this.calculate();
    }
    
    calculate() {
        const monthlyRate = this.rate / 100 / 12;
        const monthlyPayment = this.amount * (monthlyRate * Math.pow(1 + monthlyRate, this.term)) / (Math.pow(1 + monthlyRate, this.term) - 1);
        const totalPayment = monthlyPayment * this.term;
        const overpayment = totalPayment - this.amount;
        
        // Обновляем значения на странице
        const elements = {
            amount: document.querySelector('.calculator-amount'),
            term: document.querySelector('.calculator-term'),
            rate: document.querySelector('.calculator-rate'),
            monthlyPayment: document.querySelector('.calculator-monthly'),
            totalPayment: document.querySelector('.calculator-total'),
            overpayment: document.querySelector('.calculator-overpayment')
        };
        
        if (elements.amount) elements.amount.textContent = formatNumber(this.amount) + ' ₸';
        if (elements.term) elements.term.textContent = this.term + ' мес.';
        if (elements.rate) elements.rate.textContent = this.rate + '%';
        if (elements.monthlyPayment) elements.monthlyPayment.textContent = formatNumber(Math.round(monthlyPayment)) + ' ₸';
        if (elements.totalPayment) elements.totalPayment.textContent = formatNumber(Math.round(totalPayment)) + ' ₸';
        if (elements.overpayment) elements.overpayment.textContent = formatNumber(Math.round(overpayment)) + ' ₸';
    }
}

// ===== ОЦЕНКА КРЕДИТОСПОСОБНОСТИ =====
class CreditAssessment {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const form = document.getElementById('credit-assessment-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(e);
            });
        }
        
        // Обработчики для слайдеров
        const sliders = document.querySelectorAll('.assessment-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', () => {
                this.updateSliderValue(slider.id);
                this.updateCalculations();
            });
        });
        
        // Обработчик для переключения рефинансирования
        const refinancingToggle = document.getElementById('refinancing-toggle');
        if (refinancingToggle) {
            refinancingToggle.addEventListener('change', () => {
                this.toggleRefinancingFields();
            });
        }
    }
    
    updateSliderValue(sliderId) {
        const slider = document.getElementById(sliderId);
        const output = document.querySelector(`[data-for="${sliderId}"]`);
        if (slider && output) {
            output.textContent = formatNumber(slider.value) + ' ₸';
        }
    }
    
    toggleRefinancingFields() {
        const refinancingFields = document.querySelector('.refinancing-fields');
        const toggle = document.getElementById('refinancing-toggle');
        
        if (refinancingFields && toggle) {
            if (toggle.checked) {
                refinancingFields.style.display = 'block';
            } else {
                refinancingFields.style.display = 'none';
            }
        }
    }
    
    updateCalculations() {
        // Здесь можно добавить логику обновления расчетов
    }
    
    getFormData() {
        const form = document.getElementById('credit-assessment-form');
        if (!form) return null;
        
        const formData = new FormData(form);
        return {
            income: parseInt(formData.get('income') || 0),
            expenses: parseInt(formData.get('expenses') || 0),
            existingLoans: parseInt(formData.get('existing-loans') || 0),
            refinancing: formData.get('refinancing') === 'on',
            refinancingAmount: parseInt(formData.get('refinancing-amount') || 0)
        };
    }
    
    calculateCreditAssessment(data) {
        const netIncome = data.income - data.expenses;
        const maxMonthlyPayment = netIncome * 0.7; // 70% от чистого дохода
        
        let maxLoanAmount = 0;
        let recommendedRate = 12.6;
        
        // Простой расчет максимальной суммы кредита
        for (let rate = 12.6; rate <= 25; rate += 0.1) {
            const monthlyRate = rate / 100 / 12;
            const testAmount = 1000000;
            const monthlyPayment = testAmount * (monthlyRate * Math.pow(1 + monthlyRate, 12)) / (Math.pow(1 + monthlyRate, 12) - 1);
            
            if (monthlyPayment <= maxMonthlyPayment) {
                maxLoanAmount = testAmount;
                recommendedRate = rate;
            } else {
                break;
            }
        }
        
        return {
            maxLoanAmount: Math.round(maxLoanAmount),
            recommendedRate: recommendedRate,
            maxMonthlyPayment: Math.round(maxMonthlyPayment),
            creditScore: this.calculateCreditScore(data)
        };
    }
    
    calculateCreditScore(data) {
        let score = 100;
        
        // Снижаем балл за высокие расходы
        const expenseRatio = data.expenses / data.income;
        if (expenseRatio > 0.8) score -= 30;
        else if (expenseRatio > 0.6) score -= 20;
        else if (expenseRatio > 0.4) score -= 10;
        
        // Снижаем балл за существующие кредиты
        if (data.existingLoans > 0) score -= 20;
        
        return Math.max(0, score);
    }
    
    calculateMonthlyPayment(principal, monthlyRate, term) {
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    }
    
    calculateLoanAmount(monthlyPayment, monthlyRate, term) {
        return monthlyPayment * (Math.pow(1 + monthlyRate, term) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, term));
    }
    
    displayResults(results) {
        const resultsContainer = document.querySelector('.assessment-results');
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = `
            <div class="result-item">
                <h4>Максимальная сумма кредита</h4>
                <p class="result-value">${formatNumber(results.maxLoanAmount)} ₸</p>
            </div>
            <div class="result-item">
                <h4>Рекомендуемая ставка</h4>
                <p class="result-value">${results.recommendedRate.toFixed(1)}%</p>
            </div>
            <div class="result-item">
                <h4>Максимальный платеж</h4>
                <p class="result-value">${formatNumber(results.maxMonthlyPayment)} ₸/мес</p>
            </div>
            <div class="result-item">
                <h4>Кредитный рейтинг</h4>
                <p class="result-value">${results.creditScore}/100</p>
            </div>
        `;
        
        resultsContainer.style.display = 'block';
    }
    
    handleSubmit(e) {
        const data = this.getFormData();
        if (!data) return;
        
        const results = this.calculateCreditAssessment(data);
        this.displayResults(results);
        
        // Прокручиваем к результатам
        setTimeout(() => {
            const resultsSection = document.querySelector('.assessment-results');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
}

// ===== МОДАЛЬНЫЕ ОКНА =====
class Modal {
    constructor() {
        this.init();
    }
    
    init() {
        // Закрытие модальных окон при клике на оверлей
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__overlay')) {
                this.closeAll();
            }
        });
        
        // Закрытие модальных окон при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAll();
            }
        });
    }
    
    open(modalId) {
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    close(modalId) {
        const modal = document.getElementById(`modal-${modalId}`);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    closeAll() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
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
        // Инициализация масок для телефонов
        this.initPhoneMask();
        this.initIINMask();
        
        // Обработчики форм
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Валидация формы
        if (!this.validateForm(form)) {
            return;
        }
        
        // Обработка разных типов форм
        if (form.id === 'hero-form') {
            this.handleHeroForm(form, formData);
        } else if (form.id === 'calculator-form') {
            this.handleCalculatorForm(form, formData);
        } else if (form.id === 'assessment-form') {
            this.handleAssessmentForm(form, formData);
        } else {
            // Отправка в WhatsApp по умолчанию
            this.sendToWhatsApp(form, formData);
        }
    }
    
    handleHeroForm(form, formData) {
        const name = formData.get('name');
        const phone = formData.get('phone');
        const service = formData.get('service');
        
        const message = `Здравствуйте! Меня зовут ${name}. 
Хочу получить кредит: ${service}
Мой телефон: ${phone}

Пожалуйста, свяжитесь со мной для консультации.`;
        
        this.sendToWhatsApp(form, formData, message);
    }
    
    handleCalculatorForm(form, formData) {
        const amount = formData.get('amount');
        const term = formData.get('term');
        const purpose = formData.get('purpose');
        
        const message = `Здравствуйте! 
Хочу получить кредит на сумму: ${amount} ₸
Срок: ${term} месяцев
Цель: ${purpose}

Пожалуйста, рассчитайте для меня условия.`;
        
        this.sendToWhatsApp(form, formData, message);
    }
    
    handleAssessmentForm(form, formData) {
        const income = formData.get('income');
        const expenses = formData.get('expenses');
        
        const message = `Здравствуйте! 
Хочу оценить свою кредитоспособность.
Доход: ${income} ₸
Расходы: ${expenses} ₸

Пожалуйста, проведите оценку.`;
        
        this.sendToWhatsApp(form, formData, message);
    }
    
    sendToWhatsApp(form, formData, customMessage = null) {
        const phoneNumber = '77780067772';
        let message = customMessage || 'Здравствуйте! Меня интересует кредит. Пожалуйста, свяжитесь со мной.';
        
        // Добавляем данные из формы к сообщению
        if (!customMessage) {
            const formFields = [];
            for (let [key, value] of formData.entries()) {
                if (value && key !== 'agreement' && key !== 'consent') {
                    formFields.push(`${key}: ${value}`);
                }
            }
            if (formFields.length > 0) {
                message += '\n\nДанные заявки:\n' + formFields.join('\n');
            }
        }
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Открываем WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Показываем уведомление
        this.showNotification('Заявка отправлена! Мы свяжемся с вами в WhatsApp.', 'success');
        
        // Закрываем модальное окно, если форма в модальном окне
        const modal = form.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        // Очищаем форму
        form.reset();
    }
    
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'Это поле обязательно для заполнения');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
            
            // Специальная валидация для телефона
            if (input.type === 'tel' && input.value) {
                if (!validatePhone(input.value)) {
                    this.showFieldError(input, 'Введите корректный номер телефона');
                    isValid = false;
                }
            }
            
            // Специальная валидация для email
            if (input.type === 'email' && input.value) {
                if (!validateEmail(input.value)) {
                    this.showFieldError(input, 'Введите корректный email');
                    isValid = false;
                }
            }
            
            // Специальная валидация для ИИН
            if (input.name === 'iin' && input.value) {
                if (!validateIIN(input.value)) {
                    this.showFieldError(input, 'Введите корректный ИИН');
                    isValid = false;
                }
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
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    initPhoneMask() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            let value = input.value;
            
            input.addEventListener('input', (e) => {
                let cursorPosition = e.target.selectionStart;
                let oldValue = value;
                
                // Удаляем все нецифровые символы
                let numbers = e.target.value.replace(/\D/g, '');
                
                // Если номер начинается с 7, убираем его
                if (numbers.startsWith('7')) {
                    numbers = numbers.substring(1);
                }
                
                // Ограничиваем длину до 10 цифр
                numbers = numbers.substring(0, 10);
                
                // Форматируем номер
                if (numbers.length >= 3) {
                    value = `+7 (${numbers.substring(0, 3)})`;
                    if (numbers.length >= 6) {
                        value += ` ${numbers.substring(3, 6)}-${numbers.substring(6, 8)}`;
                        if (numbers.length >= 8) {
                            value += `-${numbers.substring(8, 10)}`;
                        }
                    } else {
                        value += ` ${numbers.substring(3)}`;
                    }
                } else {
                    value = `+7 (${numbers}`;
                }
                
                input.value = value;
                
                // Восстанавливаем позицию курсора
                if (cursorPosition < value.length) {
                    input.setSelectionRange(cursorPosition, cursorPosition);
                }
            });
            
            // Устанавливаем начальное значение
            if (!input.value) {
                input.value = '+7 (';
            }
        });
    }
    
    initIINMask() {
        const iinInputs = document.querySelectorAll('input[name="iin"]');
        iinInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.substring(0, 12);
                
                // Форматируем ИИН
                let formatted = '';
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formatted += ' ';
                    }
                    formatted += value[i];
                }
                
                e.target.value = formatted;
            });
        });
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('notification--show');
        }, 100);
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            notification.classList.remove('notification--show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Закрытие по клику
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('notification--show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
}

// ===== АНИМАЦИИ ПРИ ПРОКРУТКЕ =====
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.addAnimationStyles();
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 16px;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .notification--show {
                transform: translateX(0);
            }
            
            .notification__content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification__message {
                flex: 1;
                font-size: 14px;
                color: #374151;
            }
            
            .notification__close {
                background: none;
                border: none;
                font-size: 18px;
                color: #9ca3af;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification__close:hover {
                color: #6b7280;
            }
            
            .notification--success {
                border-left: 4px solid #10b981;
            }
            
            .notification--error {
                border-left: 4px solid #ef4444;
            }
            
            .notification--info {
                border-left: 4px solid #3b82f6;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== ПЕРЕХОДЫ МЕЖДУ СТРАНИЦАМИ =====
class PageTransition {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }
    
    init() {
        this.createOverlay();
        this.handleLinks();
    }
    
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="page-transition-spinner"></div>
        `;
        document.body.appendChild(overlay);
    }
    
    handleLinks() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            if (this.shouldTransition(link)) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.transitionToPage(link.href);
                });
            }
        });
    }
    
    shouldTransition(link) {
        const href = link.getAttribute('href');
        return href && 
               !href.startsWith('#') && 
               !href.startsWith('javascript:') && 
               !href.startsWith('mailto:') && 
               !href.startsWith('tel:') &&
               !link.target &&
               !link.hasAttribute('download');
    }
    
    async transitionToPage(url, pushState = true) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        const overlay = document.querySelector('.page-transition-overlay');
        overlay.classList.add('active');
        
        try {
            const response = await fetch(url);
            const html = await response.text();
            
            // Парсим HTML и извлекаем содержимое body
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('body').innerHTML;
            
            // Обновляем содержимое страницы
            document.body.innerHTML = newContent;
            
            if (pushState) {
                history.pushState({}, '', url);
            }
            
            // Переинициализируем скрипты
            this.reinitializeScripts();
            
        } catch (error) {
            console.error('Page transition error:', error);
            window.location.href = url;
        } finally {
            this.hideOverlay();
            this.isTransitioning = false;
        }
    }
    
    hideOverlay() {
        const overlay = document.querySelector('.page-transition-overlay');
        overlay.classList.remove('active');
    }
    
    hideOnLoad() {
        window.addEventListener('load', () => {
            this.hideOverlay();
        });
    }
    
    reinitializeScripts() {
        // Переинициализируем основные классы
        new Header();
        new Calculator();
        new CreditAssessment();
        new Modal();
        new Forms();
        new ScrollAnimations();
        
        // Переинициализируем обработчики ссылок
        this.handleLinks();
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Удаляем аналитические панели
    removeAnalyticsPanels();
    
    // Инициализируем основные классы
    new Header();
    new Calculator();
    new CreditAssessment();
    new Modal();
    new Forms();
    new ScrollAnimations();
    
    // Инициализируем переходы между страницами
    const pageTransition = new PageTransition();
    pageTransition.hideOnLoad();
    
    // Инициализируем слайдер партнеров
    initPartnersSlider();
    
    // Инициализируем видео отзывы
    new VideoReviews();
    
    // Инициализируем глобальную маску телефона
    initGlobalPhoneMask();
    
    console.log('Komek Damu - сайт загружен');
});

// ===== СЛАЙДЕР ПАРТНЕРОВ =====
function initPartnersSlider() {
    const slider = document.querySelector('.partners-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.partner-slide');
    const dots = document.querySelectorAll('.partner-dot');
    const prevBtn = document.querySelector('.partner-prev');
    const nextBtn = document.querySelector('.partner-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
        
        // Обновляем активную точку
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Обновляем состояние кнопок
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === totalSlides - 1;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Обработчики событий
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Автоматическое переключение
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Останавливаем автопереключение при наведении
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Возобновляем автопереключение при уходе мыши
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    // Показываем первый слайд
    showSlide(0);
}

// ===== ВИДЕО ОТЗЫВЫ =====
class VideoReviews {
    constructor() {
        this.currentVideo = null;
        this.init();
    }
    
    init() {
        this.initVideoCards();
        this.initModal();
        this.initLazyLoading();
    }
    
    initVideoCards() {
        const videoCards = document.querySelectorAll('.video-review-card');
        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoSrc = card.dataset.video;
                if (videoSrc) {
                    this.openVideo(videoSrc);
                }
            });
        });
    }
    
    initModal() {
        const modal = document.querySelector('.video-modal');
        if (!modal) return;
        
        const closeBtn = modal.querySelector('.video-modal__close');
        const overlay = modal.querySelector('.video-modal__overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeVideo());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.closeVideo());
        }
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeVideo();
            }
        });
    }
    
    initLazyLoading() {
        const videoCards = document.querySelectorAll('.video-review-card[data-video]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const videoSrc = card.dataset.video;
                    if (videoSrc) {
                        this.loadVideoThumbnail(videoSrc, card);
                        observer.unobserve(card);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        videoCards.forEach(card => observer.observe(card));
    }
    
    loadVideoThumbnail(videoSrc, card) {
        // Здесь можно добавить логику загрузки превью видео
        // Пока просто показываем карточку
        card.style.opacity = '1';
    }
    
    openVideo(videoSrc) {
        const modal = document.querySelector('.video-modal');
        const player = modal.querySelector('.video-modal__player');
        
        if (modal && player) {
            // Создаем iframe для YouTube видео
            const videoId = this.extractYouTubeId(videoSrc);
            if (videoId) {
                player.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.currentVideo = videoSrc;
        }
    }
    
    closeVideo() {
        const modal = document.querySelector('.video-modal');
        const player = modal.querySelector('.video-modal__player');
        
        if (modal && player) {
            player.innerHTML = '';
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.currentVideo = null;
        }
    }
    
    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
}

// ===== ГЛОБАЛЬНАЯ МАСКА ТЕЛЕФОНА =====
function initGlobalPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        // Устанавливаем начальное значение
        if (!input.value) {
            input.value = '+7 (';
        }
        
        input.addEventListener('input', (e) => {
            let value = e.target.value;
            let cursorPosition = e.target.selectionStart;
            
            // Удаляем все нецифровые символы
            let numbers = value.replace(/\D/g, '');
            
            // Если номер начинается с 7, убираем его
            if (numbers.startsWith('7')) {
                numbers = numbers.substring(1);
            }
            
            // Ограничиваем длину до 10 цифр
            numbers = numbers.substring(0, 10);
            
            // Форматируем номер
            if (numbers.length >= 3) {
                value = `+7 (${numbers.substring(0, 3)})`;
                if (numbers.length >= 6) {
                    value += ` ${numbers.substring(3, 6)}-${numbers.substring(6, 8)}`;
                    if (numbers.length >= 8) {
                        value += `-${numbers.substring(8, 10)}`;
                    }
                } else {
                    value += ` ${numbers.substring(3)}`;
                }
            } else {
                value = `+7 (${numbers}`;
            }
            
            e.target.value = value;
            
            // Восстанавливаем позицию курсора
            if (cursorPosition < value.length) {
                e.target.setSelectionRange(cursorPosition, cursorPosition);
            }
        });
    });
} 