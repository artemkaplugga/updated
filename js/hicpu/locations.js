const locationPrices = {
    us: {
        'HCP-I1': { hourly: 0.08, monthly: 19.77 },
        'HCP-I2': { hourly: 0.12, monthly: 29.66 },
        'HCP-I3': { hourly: 0.20, monthly: 49.44 },
        'HCP-I4': { hourly: 0.40, monthly: 98.88 },
        'HCP-I5': { hourly: 0.80, monthly: 197.76 },
        'HCP-A1': { hourly: 0.15, monthly: 37.08 },
        'HCP-A2': { hourly: 0.30, monthly: 74.16 },
        'HCP-A3': { hourly: 0.60, monthly: 148.32 },
        'HCP-A4': { hourly: 1.20, monthly: 296.64 },
        'HCP-A5': { hourly: 2.40, monthly: 593.28 }
    },
    gb: {
        'HCP-I1': { hourly: 0.10, monthly: 24.71 },
        'HCP-I2': { hourly: 0.15, monthly: 37.07 },
        'HCP-I3': { hourly: 0.25, monthly: 61.80 },
        'HCP-I4': { hourly: 0.50, monthly: 123.60 },
        'HCP-I5': { hourly: 1.00, monthly: 247.20 },
        'HCP-A1': { hourly: 0.19, monthly: 46.35 },
        'HCP-A2': { hourly: 0.38, monthly: 92.70 },
        'HCP-A3': { hourly: 0.75, monthly: 185.40 },
        'HCP-A4': { hourly: 1.50, monthly: 370.80 },
        'HCP-A5': { hourly: 3.00, monthly: 741.60 }
    },
    fr: {
        'HCP-I1': { hour: 0.08, month: 19.77 },
        'HCP-I2': { hour: 0.12, month: 29.66 },
        'HCP-I3': { hour: 0.20, month: 49.44 },
        'HCP-I4': { hour: 0.40, month: 98.88 },
        'HCP-I5': { hour: 0.80, month: 197.76 },
        'HCP-A1': { hour: 0.15, month: 37.08 },
        'HCP-A2': { hour: 0.30, month: 74.16 },
        'HCP-A3': { hour: 0.60, month: 148.32 },
        'HCP-A4': { hour: 1.20, month: 296.64 },
        'HCP-A5': { hour: 2.40, month: 593.28 }
    },
    de: {
        'HCP-I1': { hour: 0.07, month: 17.28 },
        'HCP-I2': { hour: 0.11, month: 27.17 },
        'HCP-I3': { hour: 0.18, month: 44.50 },
        'HCP-I4': { hour: 0.36, month: 89.00 },
        'HCP-I5': { hour: 0.72, month: 178.00 },
        'HCP-A1': { hour: 0.14, month: 34.59 },
        'HCP-A2': { hour: 0.28, month: 69.18 },
        'HCP-A3': { hour: 0.56, month: 138.36 },
        'HCP-A4': { hour: 1.12, month: 276.72 },
        'HCP-A5': { hour: 2.24, month: 553.44 }
    }
};

function updatePrices(countryCode) {
    document.querySelectorAll('.plan').forEach(plan => {
        const planId = plan.getAttribute('data-plan');
        const prices = locationPrices[countryCode][planId];
        
        if (prices) {
            const hourPrice = plan.querySelector('.price-per-hour');
            const monthPrice = plan.querySelector('.price-per-month');
            
            if (hourPrice) {
                hourPrice.innerHTML = `€${prices.hour.toFixed(2)}<span>/час</span>`;
            }
            if (monthPrice) {
                monthPrice.innerHTML = `€${prices.month.toFixed(2)}<span>/месяц</span>`;
            }
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
            
            // Обновляем цены для выбранной страны
            const countryCode = location.getAttribute('data-country');
            updatePrices(countryCode);
        });
    });

    // Устанавливаем начальные цены для активной локации
    const activeLocation = document.querySelector('.location.active');
    if (activeLocation) {
        const countryCode = activeLocation.getAttribute('data-country');
        updatePrices(countryCode);
    }
}); 