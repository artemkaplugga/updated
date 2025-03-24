const locationPrices = {
    'us': { // Денвер
        shared: {
            'ALBs-1': { hourly: 0.02, monthly: 4.94 },
            'ALBs-2': { hourly: 0.03, monthly: 9.89 },
            'ALBs-3': { hourly: 0.05, monthly: 19.77 },
            'ALBs-4': { hourly: 0.13, monthly: 39.55 },
            'ALBs-5': { hourly: 0.10, monthly: 79.09 }
        },
        dedicated: {
            'ALB-1': { hourly: 0.03, monthly: 7.07 },
            'ALB-2': { hourly: 0.05, monthly: 14.15 },
            'ALB-3': { hourly: 0.09, monthly: 28.28 },
            'ALB-4': { hourly: 0.17, monthly: 56.55 },
            'ALB-5': { hourly: 0.28, monthly: 112.81 }
        }
    },
    'gb': { // Лондон
        shared: {
            'ALBs-1': { hourly: 0.025, monthly: 6.18 },
            'ALBs-2': { hourly: 0.038, monthly: 12.36 },
            'ALBs-3': { hourly: 0.063, monthly: 24.71 },
            'ALBs-4': { hourly: 0.163, monthly: 49.44 },
            'ALBs-5': { hourly: 0.125, monthly: 98.86 }
        },
        dedicated: {
            'ALB-1': { hourly: 0.038, monthly: 8.84 },
            'ALB-2': { hourly: 0.063, monthly: 17.69 },
            'ALB-3': { hourly: 0.113, monthly: 35.35 },
            'ALB-4': { hourly: 0.213, monthly: 70.69 },
            'ALB-5': { hourly: 0.35, monthly: 141.01 }
        }
    },
    'fr': { // Париж
        shared: {
            'ALBs-1': { hourly: 0.023, monthly: 5.68 },
            'ALBs-2': { hourly: 0.035, monthly: 11.37 },
            'ALBs-3': { hourly: 0.058, monthly: 22.74 },
            'ALBs-4': { hourly: 0.15, monthly: 45.48 },
            'ALBs-5': { hourly: 0.115, monthly: 90.95 }
        },
        dedicated: {
            'ALB-1': { hourly: 0.035, monthly: 8.13 },
            'ALB-2': { hourly: 0.058, monthly: 16.27 },
            'ALB-3': { hourly: 0.104, monthly: 32.52 },
            'ALB-4': { hourly: 0.196, monthly: 65.03 },
            'ALB-5': { hourly: 0.322, monthly: 129.73 }
        }
    }
    // Можно добавить другие страны по аналогии
};

function updatePrices(countryCode) {
    const prices = locationPrices[countryCode];
    if (!prices) return;

    // Обновляем цены для Shared тарифов
    Object.keys(prices.shared).forEach(plan => {
        const planElement = document.querySelector(`[data-plan="${plan}"]`);
        if (planElement) {
            const hourlyPrice = planElement.querySelector('.price-per-hour');
            const monthlyPrice = planElement.querySelector('.price-per-month');
            
            hourlyPrice.innerHTML = `€${prices.shared[plan].hourly.toFixed(2)}<span>/час</span>`;
            monthlyPrice.innerHTML = `€${prices.shared[plan].monthly.toFixed(2)}<span>/месяц</span>`;
        }
    });

    // Обновляем цены для Dedicated тарифов
    Object.keys(prices.dedicated).forEach(plan => {
        const planElement = document.querySelector(`[data-plan="${plan}"]`);
        if (planElement) {
            const hourlyPrice = planElement.querySelector('.price-per-hour');
            const monthlyPrice = planElement.querySelector('.price-per-month');
            
            hourlyPrice.innerHTML = `€${prices.dedicated[plan].hourly.toFixed(2)}<span>/час</span>`;
            monthlyPrice.innerHTML = `€${prices.dedicated[plan].monthly.toFixed(2)}<span>/месяц</span>`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const locations = document.querySelectorAll('.location');
    
    locations.forEach(location => {
        location.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Убираем класс active у всех локаций
            locations.forEach(loc => loc.classList.remove('active'));
            
            // Добавляем класс active к выбранной локации
            location.classList.add('active');
            
            // Получаем код страны из data-атрибута
            const countryCode = location.getAttribute('data-country');
            if (countryCode) {
                updatePrices(countryCode);
            }
        });
    });
}); 