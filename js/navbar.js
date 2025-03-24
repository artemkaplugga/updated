document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navCenter = document.querySelector('.nav-center');
    const dropdowns = document.querySelectorAll('.nav-center .dropdown');
    const authButtons = document.querySelector('.nav-right .auth-buttons');

    // Добавляем кнопки авторизации после пункта "информация"
    function addMobileAuth() {
        if (authButtons && window.innerWidth <= 480) {
            const infoDropdown = Array.from(dropdowns).find(dropdown => 
                dropdown.querySelector('.nav-item').textContent.toLowerCase().includes('информация')
            );
            
            if (infoDropdown) {
                const mobileAuthButtons = authButtons.cloneNode(true);
                mobileAuthButtons.classList.add('mobile-auth');
                infoDropdown.after(mobileAuthButtons);
            }
        }
    }

    // Инициализация мобильной авторизации
    addMobileAuth();

    // Открытие/закрытие бургер-меню
    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        navCenter.classList.toggle('active');
    });

    // Обработка кликов по выпадающим меню
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-item');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-center') && !e.target.closest('.burger-menu')) {
            burgerMenu.classList.remove('active');
            navCenter.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        const existingMobileAuth = navCenter.querySelector('.mobile-auth');
        
        if (window.innerWidth <= 480) {
            if (!existingMobileAuth) {
                addMobileAuth();
            }
        } else {
            if (existingMobileAuth) {
                existingMobileAuth.remove();
            }
            burgerMenu.classList.remove('active');
            navCenter.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
}); 