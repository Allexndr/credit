    sendToWhatsApp(form, formData) {
        // Номер WhatsApp для чата
        const phoneNumber = '77011061039';
        
        // Формируем сообщение
        let message = '=== НОВАЯ ЗАЯВКА НА КРЕДИТ ===\n';
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
            'name': '> Имя',
            'phone': '> Телефон',
            'email': '> Email',
            'iin': '> ИИН',
            'credit_type': '> Тип кредита',
            'amount': '> Сумма',
            'comment': '> Комментарий',
            'consent': '> Согласие'
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
                            creditTypeValue = select.value;
                            creditTypeText = select.selectedOptions[0].text;
                        }
                        value = select.selectedOptions[0].text;
                    }
                }
                
                // Специальная обработка для типа кредита
                if (key === 'credit_type') {
                    const prefix = creditTypeEmojis[creditTypeValue] || '[КРЕДИТ]';
                    message += `${prefix} ${fieldLabels[key]}: ${value}\n`;
                } else {
                    message += `${fieldLabels[key]}: ${value}\n`;
                }
            }
        }
        
        // Обновляем заголовок
        if (creditTypeValue && creditTypeEmojis[creditTypeValue]) {
            message = message.replace('=== НОВАЯ ЗАЯВКА НА КРЕДИТ ===', 
                `=== ${creditTypeEmojis[creditTypeValue]} НОВАЯ ЗАЯВКА ===`);
        }
        
        message += '\n==============================\n';
        message += '> Время: ' + new Date().toLocaleString('ru-RU');
        message += '\n==============================\n\n';
        message += '> Komek damu - Ваш партнер в кредитовании!';
        
        // Кодируем сообщение для URL
        const encodedMessage = encodeURIComponent(message);
        
        // Формируем ссылку WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Открываем WhatsApp
        window.open(whatsappUrl, '_blank');
        
        console.log('WhatsApp message:', message);
    }
