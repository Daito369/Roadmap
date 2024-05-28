// JavaScriptコード
    document.addEventListener('DOMContentLoaded', function() {
        loadProgress();

        const checkboxes = document.querySelectorAll('.task');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                saveProgress();
                updateProgressBar();
            });
        });

        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            accordion.addEventListener('click', function() {
                this.classList.toggle('active');
                const panel = this.nextElementSibling;
                panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
            });
        });

        updateProgressBar();
    });

    function showTabContent(event, tabName) {
        const tabContent = document.querySelectorAll('.tab-content');
        tabContent.forEach(content => content.classList.remove('active'));

        document.getElementById(tabName).classList.add('active');

        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));

        event.currentTarget.classList.add('active');
    }

    function saveProgress() {
        const progress = {};
        const checkboxes = document.querySelectorAll('.task');
        checkboxes.forEach((checkbox, index) => {
            progress[`task${index + 1}`] = checkbox.checked;
        });
        localStorage.setItem('progress', JSON.stringify(progress));
    }

    function loadProgress() {
        const progress = JSON.parse(localStorage.getItem('progress')) || {};
        Object.keys(progress).forEach(taskId => {
            const checkbox = document.getElementById(taskId);
            if (checkbox) {
                checkbox.checked = progress[taskId];
            }
        });
    }

    function updateProgressBar() {
        const checkboxes = document.querySelectorAll('.task');
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        const percentage = Math.round((checked / total) * 100);

        document.getElementById('progress-bar').querySelector('span').style.width = `${percentage}%`;
        document.getElementById('progress-text').textContent = `${percentage}% Complete`;
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
        document.body.classList.add('dark-mode');
    }
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
