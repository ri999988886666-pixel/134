// script.js
class GitMarathon {
    constructor() {
        this.commands = [];
        this.currentCommand = null;
        this.progress = {
            completed: 0,
            skipped: 0,
            total: 110
        };
        this.screenshots = {};
        
        this.init();
    }
    
    async init() {
        // Загружаем данные
        await this.loadCommands();
        await this.loadProgress();
        await this.loadScreenshots();
        
        // Отображаем команды
        this.renderCommandsList();
        this.updateStats();
        
        // Назначаем обработчики событий
        this.setupEventListeners();
        
        console.log('Git Marathon инициализирован!');
    }
    
    async loadCommands() {
        // Создаем массив из 110 команд
        for (let i = 1; i <= 110; i++) {
            this.commands.push({
                id: i,
                name: `git-command-${i}`,
                displayName: this.getCommandName(i),
                description: this.getCommandDescription(i),
                examples: this.getCommandExamples(i),
                tasks: this.getCommandTasks(i),
                category: this.getCommandCategory(i),
                status: 'pending'
            });
        }
    }
    
    getCommandName(id) {
        const names = {
            1: 'git init',
            2: 'git clone',
            3: 'git add',
            4: 'git commit',
            5: 'git status',
            6: 'git push',
            7: 'git pull',
            8: 'git branch',
            9: 'git checkout',
            10: 'git merge',
            // ... остальные команды
        };
        return names[id] || `Команда #${id}`;
    }
    
    getCommandDescription(id) {
        const descriptions = {
            1: 'Инициализирует новый репозиторий Git в текущей директории.',
            2: 'Клонирует существующий репозиторий в новую директорию.',
            3: 'Добавляет изменения из рабочей директории в индекс (staging area).',
            4: 'Фиксирует изменения из индекса в репозиторий.',
            5: 'Показывает состояние рабочей директории и индекса.',
            // ... остальные описания
        };
        return descriptions[id] || 'Описание команды Git.';
    }
    
    getCommandExamples(id) {
        return [
            `Пример 1: ${this.getCommandName(id)} --help`,
            `Пример 2: ${this.getCommandName(id)} -v`,
            `Пример 3: ${this.getCommandName(id)} --version`
        ];
    }
    
    getCommandTasks(id) {
        return [
            `Выполните команду ${this.getCommandName(id)} в терминале VSCode`,
            `Используйте хотя бы один ключ/опцию`,
            `Сделайте скриншот результата выполнения`,
            `Запишите наблюдения в заметки`
        ];
    }
    
    getCommandCategory(id) {
        if (id <= 30) return 'basic';
        if (id <= 70) return 'advanced';
        return 'expert';
    }
    
    async loadProgress() {
        try {
            const saved = localStorage.getItem('git-marathon-progress');
            if (saved) {
                const data = JSON.parse(saved);
                this.progress = data.progress || this.progress;
                
                // Обновляем статусы команд
                data.commands?.forEach(cmd => {
                    const command = this.commands.find(c => c.id === cmd.id);
                    if (command) command.status = cmd.status;
                });
            }
        } catch (e) {
            console.log('Не удалось загрузить прогресс:', e);
        }
    }
    
    async loadScreenshots() {
        try {
            const saved = localStorage.getItem('git-marathon-screenshots');
            if (saved) {
                this.screenshots = JSON.parse(saved);
            }
        } catch (e) {
            console.log('Не удалось загрузить скриншоты:', e);
        }
    }
    
    saveProgress() {
        const data = {
            progress: this.progress,
            commands: this.commands.map(cmd => ({
                id: cmd.id,
                status: cmd.status
            })),
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('git-marathon-progress', JSON.stringify(data));
    }
    
    saveScreenshots() {
        localStorage.setItem('git-marathon-screenshots', JSON.stringify(this.screenshots));
    }
    
    renderCommandsList() {
        const container = document.getElementById('commands-list');
        container.innerHTML = '';
        
        this.commands.forEach(command => {
            const item = document.createElement('div');
            item.className = `command-item ${command.status}`;
            if (this.currentCommand?.id === command.id) {
                item.classList.add('selected');
            }
            
            item.innerHTML = `
                <span class="command-number">${command.id}</span>
                <span class="command-name">${command.displayName}</span>
                <span class="command-status status-${command.status}">
                    ${this.getStatusText(command.status)}
                </span>
            `;
            
            item.addEventListener('click', () => this.selectCommand(command.id));
            container.appendChild(item);
        });
    }
    
    getStatusText(status) {
        const texts = {
            pending: 'Ожидает',
            completed: 'Выполнено',
            skipped: 'Пропущено'
        };
        return texts[status] || status;
    }
    
    selectCommand(commandId) {
        this.currentCommand = this.commands.find(c => c.id === commandId);
        this.renderCommandDetails();
        this.renderScreenshots();
    }
    
    renderCommandDetails() {
        const container = document.getElementById('command-details');
        
        if (!this.currentCommand) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-mouse-pointer fa-3x"></i>
                    <h3>Выберите команду из списка</h3>
                    <p>Кликните на любую команду слева, чтобы увидеть детали и задания</p>
                </div>
            `;
            return;
        }
        
        const cmd = this.currentCommand;
        const categoryIcon = cmd.category === 'basic' ? 'fa-star' : 
                           cmd.category === 'advanced' ? 'fa-rocket' : 'fa-crown';
        const categoryText = cmd.category === 'basic' ? 'Базовая' :
                           cmd.category === 'advanced' ? 'Продвинутая' : 'Экспертная';
        
        container.innerHTML = `
            <div class="command-header">
                <h3>
                    <i class="fas ${categoryIcon}"></i>
                    Команда #${cmd.id}: ${cmd.displayName}
                    <span class="command-status status-${cmd.status}">
                        ${this.getStatusText(cmd.status)}
                    </span>
                </h3>
                <div class="command-actions">
                    <button class="btn btn-success" onclick="marathon.markCommandCompleted(${cmd.id})">
                        <i class="fas fa-check"></i> Выполнено
                    </button>
                    <button class="btn btn-warning" onclick="marathon.markCommandSkipped(${cmd.id})">
                        <i class="fas fa-forward"></i> Пропустить
                    </button>
                </div>
            </div>
            
            <div class="command-content">
                <div class="command-section">
                    <h4><i class="fas fa-info-circle"></i> Описание</h4>
                    <p>${cmd.description}</p>
                    <p><strong>Категория:</strong> ${categoryText}</p>
                </div>
                
                <div class="command-section">
                    <h4><i class="fas fa-code"></i> Примеры использования</h4>
                    ${cmd.examples.map(example => `
                        <div class="code-block">${example}</div>
                    `).join('')}
                </div>
                
                <div class="command-section">
                    <h4><i class="fas fa-tasks"></i> Задания для выполнения</h4>
                    <ul class="task-list">
                        ${cmd.tasks.map(task => `
                            <li class="task-item">
                                <i class="fas fa-check-circle"></i>
                                ${task}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="command-section">
                    <h4><i class="fas fa-terminal"></i> Выполнить в VSCode</h4>
                    <div class="code-block"># Откройте терминал VSCode (Ctrl+`)\n${cmd.displayName} --help</div>
                    <button class="btn btn-primary" onclick="marathon.copyToClipboard('${cmd.displayName} --help')">
                        <i class="fas fa-copy"></i> Копировать команду
                    </button>
                </div>
            </div>
        `;
    }
    
    renderScreenshots() {
        const container = document.getElementById('screenshots-container');
        
        if (!this.currentCommand) {
            container.innerHTML = `
                <div class="no-screenshots">
                    <i class="fas fa-image fa-2x"></i>
                    <p>Скриншоты отсутствуют</p>
                </div>
            `;
            return;
        }
        
        const cmdId = this.currentCommand.id;
        const screenshots = this.screenshots[cmdId] || [];
        
        if (screenshots.length === 0) {
            container.innerHTML = `
                <div class="no-screenshots">
                    <i class="fas fa-image fa-2x"></i>
                    <p>Для этой команды еще нет скриншотов</p>
                    <button class="btn btn-success mt-3" onclick="addScreenshot()">
                        <i class="fas fa-plus"></i> Добавить первый скриншот
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="screenshots-grid">
                ${screenshots.map((screenshot, index) => `
                    <div class="screenshot-item">
                        <img src="${screenshot.dataUrl}" alt="Скриншот команды ${cmdId}">
                        <div class="screenshot-overlay">
                            <button class="btn btn-danger btn-sm" onclick="marathon.deleteScreenshot(${cmdId}, ${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    updateStats() {
        const completed = this.commands.filter(c => c.status === 'completed').length;
        const skipped = this.commands.filter(c => c.status === 'skipped').length;
        const pending = 110 - completed - skipped;
        const percent = Math.round((completed / 110) * 100);
        
        // Обновляем счетчики
        document.getElementById('completed-count').textContent = completed;
        document.getElementById('pending-count').textContent = pending;
        document.getElementById('screenshots-count').textContent = this.countScreenshots();
        document.getElementById('progress-percent').textContent = `${percent}%`;
        document.getElementById('progress-text').textContent = 
            `${completed} из 110 команд выполнено`;
        
        // Обновляем прогресс бар
        document.getElementById('progress-fill').style.width = `${percent}%`;
        
        // Сохраняем прогресс
        this.progress = { completed, skipped, total: 110 };
        this.saveProgress();
    }
    
    countScreenshots() {
        return Object.values(this.screenshots).reduce((total, arr) => total + arr.length, 0);
    }
    
    markCommandCompleted(commandId) {
        const command = this.commands.find(c => c.id === commandId);
        if (command && command.status !== 'completed') {
            command.status = 'completed';
            this.renderCommandsList();
            this.renderCommandDetails();
            this.updateStats();
            
            // Показываем уведомление
            this.showNotification(`Команда ${command.displayName} отмечена как выполненная!`, 'success');
        }
    }
    
    markCommandSkipped(commandId) {
        const command = this.commands.find(c => c.id === commandId);
        if (command && command.status !== 'skipped') {
            command.status = 'skipped';
            this.renderCommandsList();
            this.renderCommandDetails();
            this.updateStats();
            
            this.showNotification(`Команда ${command.displayName} пропущена`, 'warning');
        }
    }
    
    addScreenshot(file) {
        if (!this.currentCommand) {
            this.showNotification('Сначала выберите команду', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const screenshot = {
                dataUrl: e.target.result,
                filename: file.name,
                timestamp: new Date().toISOString(),
                commandId: this.currentCommand.id
            };
            
            if (!this.screenshots[this.currentCommand.id]) {
                this.screenshots[this.currentCommand.id] = [];
            }
            
            this.screenshots[this.currentCommand.id].push(screenshot);
            this.saveScreenshots();
            this.renderScreenshots();
            this.updateStats();
            
            this.showNotification('Скриншот успешно добавлен!', 'success');
            closeModal();
        };
        
        reader.readAsDataURL(file);
    }
    
    deleteScreenshot(commandId, index) {
        if (this.screenshots[commandId]) {
            this.screenshots[commandId].splice(index, 1);
            if (this.screenshots[commandId].length === 0) {
                delete this.screenshots[commandId];
            }
            this.saveScreenshots();
            this.renderScreenshots();
            this.updateStats();
            
            this.showNotification('Скриншот удален', 'info');
        }
    }
    
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Команда скопирована в буфер обмена!', 'success');
        });
    }
    
    showNotification(message, type = 'info') {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                             type === 'error' ? 'exclamation-circle' : 
                             type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    setupEventListeners() {
        // Поиск команд
        document.getElementById('search-commands').addEventListener('input', (e) => {
            this.filterCommands(e.target.value);
        });
        
        // Загрузка файлов
        const dropArea = document.getElementById('drop-area');
        const fileInput = document.getElementById('file-input');
        
        dropArea.addEventListener('click', () => fileInput.click());
        
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.style.borderColor = '#3498db';
            dropArea.style.background = '#f8f9fa';
        });
        
        dropArea.addEventListener('dragleave', () => {
            dropArea.style.borderColor = '#bdc3c7';
            dropArea.style.background = 'transparent';
        });
        
        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.style.borderColor = '#bdc3c7';
            dropArea.style.background = 'transparent';
            
            if (e.dataTransfer.files.length) {
                this.handleFileSelect(e.dataTransfer.files[0]);
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) {
                this.handleFileSelect(e.target.files[0]);
            }
        });
    }
    
    filterCommands(searchText) {
        const items = document.querySelectorAll('.command-item');
        const search = searchText.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(search) ? 'flex' : 'none';
        });
    }
    
    handleFileSelect(file) {
        if (!file.type.match('image.*')) {
            this.showNotification('Пожалуйста, выберите файл изображения', 'error');
            return;
        }
        
        // Показываем превью
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('preview-image').src = e.target.result;
            document.getElementById('preview-container').style.display = 'block';
            document.getElementById('save-btn').disabled = false;
            
            // Сохраняем файл для последующего использования
            window.currentScreenshotFile = file;
        };
        reader.readAsDataURL(file);
    }
    
    generateReport() {
        const completed = this.commands.filter(c => c.status === 'completed').length;
        const percent = Math.round((completed / 110) * 100);
        
        const report = `
# Отчет по марафону 110 команд Git
Дата: ${new Date().toLocaleString()}

## Статистика
- Всего команд: 110
- Выполнено: ${completed}
- Пропущено: ${this.commands.filter(c => c.status === 'skipped').length}
- Прогресс: ${percent}%

## Выполненные команды:
${this.commands.filter(c => c.status === 'completed').map(c => 
    `- ${c.displayName} (${c.id})`
).join('\n')}

## Скриншоты: ${this.countScreenshots()}
${Object.entries(this.screenshots).map(([cmdId, screens]) => 
    `- Команда ${cmdId}: ${screens.length} скриншотов`
).join('\n')}

## Рекомендации:
${percent < 30 ? 'Продолжайте изучать базовые команды!' :
 percent < 70 ? 'Отличный прогресс! Переходите к продвинутым командам.' :
 'Поздравляю! Вы почти освоили все команды Git!'}
        `;
        
        // Создаем и скачиваем файл
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `git-marathon-report-${new Date().toISOString().slice(0,10)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Отчет успешно создан и скачан!', 'success');
    }
}

// Глобальные функции
function addScreenshot() {
    document.getElementById('screenshot-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('screenshot-modal').style.display = 'none';
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('save-btn').disabled = true;
    window.currentScreenshotFile = null;
}

function saveScreenshot() {
    if (window.currentScreenshotFile && marathon.currentCommand) {
        marathon.addScreenshot(window.currentScreenshotFile);
    }
}

function openScreenshotsFolder() {
    // В реальном приложении здесь могла бы быть логика открытия папки
    marathon.showNotification('В реальном VSCode здесь открылась бы папка со скриншотами', 'info');
}

function runNextCommand() {
    const nextCommand = marathon.commands.find(c => c.status === 'pending');
    if (nextCommand) {
        marathon.selectCommand(nextCommand.id);
        marathon.showNotification(`Перейдите к команде #${nextCommand.id}: ${nextCommand.displayName}`, 'info');
        
        // Прокручиваем к выбранной команде
        const element = document.querySelector(`.command-item:nth-child(${nextCommand.id})`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        marathon.showNotification('Все команды выполнены или пропущены! 🎉', 'success');
    }
}

function openVSCodeTerminal() {
    marathon.showNotification('В реальном VSCode здесь открылся бы терминал', 'info');
}

function markAllCompleted() {
    if (confirm('Отметить ВСЕ команды как выполненные?')) {
        marathon.commands.forEach(cmd => {
            if (cmd.status === 'pending') cmd.status = 'completed';
        });
        marathon.renderCommandsList();
        marathon.updateStats();
        marathon.showNotification('Все команды отмечены как выполненные!', 'success');
    }
}

function resetProgress() {
    if (confirm('Вы уверены? Весь прогресс будет сброшен.')) {
        localStorage.removeItem('git-marathon-progress');
        localStorage.removeItem('git-marathon-screenshots');
        marathon.commands.forEach(cmd => cmd.status = 'pending');
        marathon.screenshots = {};
        marathon.renderCommandsList();
        marathon.updateStats();
        marathon.showNotification('Прогресс сброшен!', 'info');
    }
}

// Инициализация при загрузке страницы
let marathon;
document.addEventListener('DOMContentLoaded', () => {
    marathon = new GitMarathon();
    
    // Добавляем стили для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #27ae60;
        }
        
        .notification-error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification-warning {
            border-left: 4px solid #f39c12;
        }
        
        .notification-info {
            border-left: 4px solid #3498db;
        }
        
        .fade-out {
            animation: fadeOut 0.3s ease forwards;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});