// ==================== 数据定义 ====================
let leaders = ['庄棪', '王学磊', '古力勇', '张军', '昝家玮', '朱魏魏', '杜长江', '陈勇', '周林裕', '张洋'];

// 排班记录
let scheduleRecords = [
    { date: '2026-02-16', dayName: '周一', type: 'weekend', persons: ['庄棪', '王学磊', '古力勇'] },
    { date: '2026-02-17', dayName: '周二', type: 'weekend', persons: ['张军', '王学磊'] },
    { date: '2026-03-03', dayName: '周二', type: 'workday', persons: ['昝家玮', '朱魏魏'] },
    { date: '2026-03-04', dayName: '周三', type: 'workday', persons: ['杜长江', '王学磊'] },
    { date: '2026-03-05', dayName: '周四', type: 'workday', persons: ['庄棪', '陈勇'] },
    { date: '2026-03-06', dayName: '周五', type: 'workday', persons: ['古力勇', '周林裕'] },
    { date: '2026-03-07', dayName: '周六', type: 'weekend', persons: ['杜长江', '张洋'] },
    { date: '2026-03-08', dayName: '周日', type: 'weekend', persons: ['昝家玮', '朱魏魏'] },
    { date: '2026-03-09', dayName: '周一', type: 'workday', persons: ['张军', '王学磊'] },
    { date: '2026-03-10', dayName: '周二', type: 'workday', persons: ['庄棪', '陈勇'] },
    { date: '2026-03-11', dayName: '周三', type: 'workday', persons: ['古力勇', '周林裕'] },
    { date: '2026-03-12', dayName: '周四', type: 'workday', persons: ['杜长江', '张洋'] }
];

// 当前轮值位置（索引）
let weekdayIndex = 0;
let weekendIndex = 4;

// 临时变量
let currentEditDate = null;

// ==================== 2026年节假日数据 ====================
const holidays2026 = [
    '2026-01-01',
    '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20', '2026-02-21', '2026-02-22', '2026-02-23', '2026-02-24',
    '2026-04-04', '2026-04-05', '2026-04-06',
    '2026-05-01', '2026-05-02', '2026-05-03',
    '2026-05-30', '2026-05-31', '2026-06-01',
    '2026-09-25', '2026-09-26', '2026-09-27',
    '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07'
];

function isHoliday(dateStr) {
    return holidays2026.includes(dateStr);
}

function getHolidayName(dateStr) {
    if (dateStr === '2026-01-01') return '元旦';
    if (dateStr >= '2026-02-17' && dateStr <= '2026-02-24') return '春节';
    if (dateStr >= '2026-04-04' && dateStr <= '2026-04-06') return '清明节';
    if (dateStr >= '2026-05-01' && dateStr <= '2026-05-03') return '劳动节';
    if (dateStr >= '2026-05-30' && dateStr <= '2026-06-01') return '端午节';
    if (dateStr >= '2026-09-25' && dateStr <= '2026-09-27') return '中秋节';
    if (dateStr >= '2026-10-01' && dateStr <= '2026-10-07') return '国庆节';
    return '';
}

// ==================== 初始化 ====================
window.onload = function() {
    // 设置当前日期
    const today = new Date();
    document.getElementById('currentDate').textContent = formatDate(today);
    
    // 设置默认日期
    const startDate = getMonday(today);
    document.getElementById('scheduleStartDate').value = formatDateISO(startDate);
    document.getElementById('scheduleEndDate').value = formatDateISO(addDays(startDate, 13));
    
    // 渲染界面
    renderOrderList();
    updateStats();
    updatePositionIndicator();
    renderScheduleTable();
    updateNextDuty();
};

// ==================== 工具函数 ====================
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${year}年${month}月${day}日 ${weekdays[date.getDay()]}`;
}

function formatDateISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getDayType(date) {
    const dateStr = formatDateISO(date);
    if (isHoliday(dateStr)) return 'holiday';
    const day = date.getDay();
    if (day === 0 || day === 6) return 'weekend';
    return 'workday';
}

function getDayName(date) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekdays[date.getDay()];
}

// ==================== 顺序管理 ====================
function renderOrderList() {
    const container = document.getElementById('orderList');
    container.innerHTML = leaders.map((name, index) => `
        <div class="order-item fade-in">
            <span class="order-num">${index + 1}</span>
            <span class="order-name">${name}</span>
            <div class="order-actions">
                <button class="up" onclick="moveOrder(${index}, -1)" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="down" onclick="moveOrder(${index}, 1)" ${index === leaders.length - 1 ? 'disabled' : ''}>↓</button>
                <button class="del" onclick="removeLeader(${index})">×</button>
            </div>
        </div>
    `).join('');
    updatePositionIndicator();
}

function addLeader() {
    const name = document.getElementById('newLeaderName').value.trim();
    if (name && !leaders.includes(name)) {
        leaders.push(name);
        document.getElementById('newLeaderName').value = '';
        renderOrderList();
        updateStats();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') addLeader();
}

function removeLeader(index) {
    if (confirm(`确定要删除「${leaders[index]}」吗？`)) {
        leaders.splice(index, 1);
        renderOrderList();
        updateStats();
    }
}

function moveOrder(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < leaders.length) {
        [leaders[index], leaders[newIndex]] = [leaders[newIndex], leaders[index]];
        renderOrderList();
    }
}

// ==================== 位置指示器 ====================
function updatePositionIndicator() {
    const dutyCount = parseInt(document.getElementById('dutyCount')?.value) || 2;
    
    // 获取最后一个工作日和周末/节日的排班记录
    const workdayRecords = scheduleRecords.filter(r => r.type === 'workday').sort((a, b) => new Date(b.date) - new Date(a.date));
    const weekendRecords = scheduleRecords.filter(r => r.type !== 'workday').sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 工作日位置 - 基于已有的最后一条工作日记录
    const weekdayChain = document.getElementById('weekdayPosition');
    let weekdayHTML = '';
    if (workdayRecords.length > 0) {
        const lastWorkday = workdayRecords[0];
        const lastIdx = leaders.indexOf(lastWorkday.persons[0]);
        for (let i = 0; i < Math.min(dutyCount + 3, leaders.length); i++) {
            const idx = (lastIdx + i + dutyCount) % leaders.length;
            const isCurrent = i < dutyCount;
            weekdayHTML += `<span class="person ${isCurrent ? 'current' : ''}">${leaders[idx]}</span>`;
            if (i < Math.min(dutyCount + 2, leaders.length - 1)) {
                weekdayHTML += `<span class="arrow">→</span>`;
            }
        }
    } else {
        for (let i = 0; i < Math.min(dutyCount + 3, leaders.length); i++) {
            const idx = (weekdayIndex + i) % leaders.length;
            const isCurrent = i < dutyCount;
            weekdayHTML += `<span class="person ${isCurrent ? 'current' : ''}">${leaders[idx]}</span>`;
            if (i < Math.min(dutyCount + 2, leaders.length - 1)) {
                weekdayHTML += `<span class="arrow">→</span>`;
            }
        }
    }
    if (leaders.length > dutyCount + 3) {
        weekdayHTML += `<span class="arrow" style="margin-left:8px">...</span>`;
    }
    weekdayChain.innerHTML = weekdayHTML;

    // 周末位置 - 基于已有的最后一条周末记录
    const weekendChain = document.getElementById('weekendPosition');
    let weekendHTML = '';
    if (weekendRecords.length > 0) {
        const lastWeekend = weekendRecords[0];
        const lastIdx = leaders.indexOf(lastWeekend.persons[0]);
        for (let i = 0; i < Math.min(dutyCount + 3, leaders.length); i++) {
            const idx = (lastIdx + i + dutyCount) % leaders.length;
            const isCurrent = i < dutyCount;
            weekendHTML += `<span class="person ${isCurrent ? 'current' : ''}">${leaders[idx]}</span>`;
            if (i < Math.min(dutyCount + 2, leaders.length - 1)) {
                weekendHTML += `<span class="arrow">→</span>`;
            }
        }
    } else {
        for (let i = 0; i < Math.min(dutyCount + 3, leaders.length); i++) {
            const idx = (weekendIndex + i) % leaders.length;
            const isCurrent = i < dutyCount;
            weekendHTML += `<span class="person ${isCurrent ? 'current' : ''}">${leaders[idx]}</span>`;
            if (i < Math.min(dutyCount + 2, leaders.length - 1)) {
                weekendHTML += `<span class="arrow">→</span>`;
            }
        }
    }
    if (leaders.length > dutyCount + 3) {
        weekendHTML += `<span class="arrow" style="margin-left:8px">...</span>`;
    }
    weekendChain.innerHTML = weekendHTML;
}

// ==================== 排班生成 ====================
function generateSchedule() {
    const startDateStr = document.getElementById('scheduleStartDate').value;
    const endDateStr = document.getElementById('scheduleEndDate').value;
    const dutyCount = parseInt(document.getElementById('dutyCount').value);
    const mode = document.getElementById('scheduleMode').value;
    
    if (!startDateStr || !endDateStr) {
        alert('请选择开始和结束日期');
        return;
    }

    if (leaders.length < dutyCount) {
        alert(`领导人数不足${dutyCount}人，请添加更多领导`);
        return;
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    // 生成排班
    let current = new Date(startDate);
    let newRecords = [];
    
    while (current <= endDate) {
        const dateKey = formatDateISO(current);
        const dayType = getDayType(current);
        const dayName = getDayName(current);
        
        // 检查是否已存在
        const existing = scheduleRecords.find(r => r.date === dateKey);
        if (existing) {
            newRecords.push(existing);
            current = addDays(current, 1);
            continue;
        }
        
        let persons;
        if (mode === 'manual') {
            // 手动模式 - 打开选择弹窗
            currentEditDate = dateKey;
            openManualSelectModal(dayType, newRecords);
            return;
        } else {
            // 自动模式
            persons = getNextDutyPersons(dayType, dutyCount);
        }
        
        // 添加记录
        const record = {
            date: dateKey,
            dayName: dayName,
            type: dayType,
            persons: persons
        };
        
        newRecords.push(record);
        
        // 更新索引
        updateDutyIndex(dayType, dutyCount);
        
        current = addDays(current, 1);
    }
    
    scheduleRecords = newRecords;
    renderScheduleTable();
    updateStats();
    updatePositionIndicator();
    updateNextDuty();
}

function getNextDutyPersons(dayType, count) {
    const type = dayType === 'workday' ? 'workday' : 'weekend';
    const index = type === 'workday' ? weekdayIndex : weekendIndex;
    const persons = [];
    for (let i = 0; i < count; i++) {
        persons.push(leaders[(index + i) % leaders.length]);
    }
    return persons;
}

function updateDutyIndex(dayType, count) {
    if (dayType === 'workday') {
        weekdayIndex = (weekdayIndex + count) % leaders.length;
    } else {
        weekendIndex = (weekendIndex + count) % leaders.length;
    }
}

// ==================== 手动选择 ====================
function openManualSelectModal(dayType, existingRecords) {
    const select = document.getElementById('manualSelectLeaders');
    select.innerHTML = leaders.map(name => 
        `<option value="${name}">${name}</option>`
    ).join('');
    
    document.getElementById('manualSelectModal').classList.add('show');
    
    // 保存现有记录以便后续处理
    window.tempRecords = existingRecords;
    window.tempDayType = dayType;
}

function closeModal() {
    document.getElementById('manualSelectModal').classList.remove('show');
}

function confirmManualSelect() {
    const select = document.getElementById('manualSelectLeaders');
    const selected = Array.from(select.selectedOptions).map(opt => opt.value);
    const dutyCount = parseInt(document.getElementById('dutyCount').value);
    
    if (selected.length !== dutyCount) {
        alert(`请选择正好${dutyCount}人`);
        return;
    }
    
    const dateKey = currentEditDate;
    const current = new Date(dateKey);
    
    const record = {
        date: dateKey,
        dayName: getDayName(current),
        type: window.tempDayType,
        persons: selected
    };
    
    window.tempRecords.push(record);
    updateDutyIndex(window.tempDayType, dutyCount);
    
    scheduleRecords = window.tempRecords;
    
    closeModal();
    renderScheduleTable();
    updateStats();
    updatePositionIndicator();
    updateNextDuty();
    
    // 继续生成后续
    generateSchedule();
}

// ==================== 排班表格 ====================
function renderScheduleTable() {
    const tbody = document.getElementById('scheduleTableBody');
    
    if (scheduleRecords.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">暂无排班记录，请设置日期范围后生成排班</div>
                </td>
            </tr>
        `;
        return;
    }
    
    // 按日期排序
    const sorted = [...scheduleRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    tbody.innerHTML = sorted.map(record => {
        const holidayName = getHolidayName(record.date);
        const typeText = record.type === 'workday' ? '工作日' : (record.type === 'holiday' ? holidayName : '周末及节日');
        const typeClass = record.type === 'weekend' || record.type === 'holiday' ? 'weekend' : 'workday';
        return `
        <tr class="fade-in">
            <td class="date-cell ${typeClass}">${record.date} ${holidayName ? '<span style="color:#c41e3a;font-size:11px;">' + holidayName + '</span>' : ''}</td>
            <td>${record.dayName}</td>
            <td><span class="type-badge ${typeClass}">${typeText}</span></td>
            <td>
                <div class="persons-cell">
                    ${record.persons.map(p => `<span class="person-tag">${p}</span>`).join('')}
                </div>
            </td>
            <td>
                <button class="action-btn" onclick="deleteRecord('${record.date}')" title="删除">🗑️</button>
            </td>
        </tr>
        `;
    }).join('');
}

function deleteRecord(dateKey) {
    if (confirm(`确定要删除 ${dateKey} 的排班记录吗？`)) {
        scheduleRecords = scheduleRecords.filter(r => r.date !== dateKey);
        renderScheduleTable();
        updateStats();
        updatePositionIndicator();
        updateNextDuty();
    }
}

function clearSchedule() {
    if (confirm('确定要清空所有排班记录吗？')) {
        scheduleRecords = [];
        weekdayIndex = 0;
        weekendIndex = 0;
        renderScheduleTable();
        updateStats();
        updatePositionIndicator();
        updateNextDuty();
    }
}

// ==================== 统计 ====================
function updateStats() {
    const stats = {};
    leaders.forEach(leader => {
        stats[leader] = { workday: 0, weekend: 0 };
    });
    
    scheduleRecords.forEach(record => {
        record.persons.forEach(person => {
            if (stats[person]) {
                if (record.type === 'workday') {
                    stats[person].workday++;
                } else {
                    stats[person].weekend++;
                }
            }
        });
    });
    
    const container = document.getElementById('statsGrid');
    container.innerHTML = Object.entries(stats).map(([name, counts]) => {
        const total = counts.workday + counts.weekend;
        const maxCount = Math.max(...Object.values(stats).map(s => s.workday + s.weekend), 1);
        const percentage = (total / maxCount) * 100;
        const workdayWidth = total > 0 ? (counts.workday / total) * percentage : 50;
        const weekendWidth = total > 0 ? (counts.weekend / total) * percentage : 50;
        
        return `
            <div class="stat-row">
                <div class="stat-name">${name}</div>
                <div class="stat-progress">
                    <div class="progress-bar">
                        <div class="weekday" style="width: ${workdayWidth}%"></div>
                        <div class="weekend" style="width: ${weekendWidth}%"></div>
                    </div>
                    <div class="stat-counts">
<span class="weekday-count">📅 工作日: ${counts.workday}</span>
                        <span class="weekend-count">🏖️ 周末及节日: ${counts.weekend}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function resetStats() {
    if (confirm('确定要重置统计数据吗？这不会删除排班记录。')) {
        weekdayIndex = 0;
        weekendIndex = 0;
        updatePositionIndicator();
        alert('已重置轮值位置');
    }
}

// ==================== 下一个值班 ====================
function updateNextDuty() {
    const today = formatDateISO(new Date());
    const futureRecords = scheduleRecords
        .filter(r => r.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const info = document.getElementById('nextDutyInfo');
    
    if (futureRecords.length === 0) {
        info.innerHTML = '暂无未来排班，请先生成排班';
        return;
    }
    
    const next = futureRecords[0];
    const holidayName = getHolidayName(next.date);
    const typeText = next.type === 'workday' ? '📅 工作日' : (next.type === 'holiday' ? '📌 ' + holidayName : '🏖️ 周末及节日');
    info.innerHTML = `${next.date} (${next.dayName}) ${typeText} <span>${next.persons.join('、')}</span>`;
}

// ==================== 下一批次预测 ====================
function predictFuture() {
    const dutyCount = parseInt(document.getElementById('dutyCount').value) || 2;
    const container = document.getElementById('predictResult');
    
    // 获取最后的工作日和周末记录
    const workdayRecords = scheduleRecords.filter(r => r.type === 'workday').sort((a, b) => new Date(b.date) - new Date(a.date));
    const weekendRecords = scheduleRecords.filter(r => r.type !== 'workday').sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 工作日位置 - 基于最后一条工作日记录
    let tempWeekdayIndex;
    if (workdayRecords.length > 0) {
        const lastWorkday = workdayRecords[0];
        tempWeekdayIndex = (leaders.indexOf(lastWorkday.persons[0]) + dutyCount) % leaders.length;
    } else {
        tempWeekdayIndex = weekdayIndex;
    }
    
    // 周末位置 - 基于最后一条周末记录
    let tempWeekendIndex;
    if (weekendRecords.length > 0) {
        const lastWeekend = weekendRecords[0];
        tempWeekendIndex = (leaders.indexOf(lastWeekend.persons[0]) + dutyCount) % leaders.length;
    } else {
        tempWeekendIndex = weekendIndex;
    }
    
    // 预测工作日批次
    let workdayHtml = '<div style="margin-bottom:12px;"><strong>工作日：</strong></div>';
    for (let i = 0; i < 3; i++) {
        const persons = [];
        for (let j = 0; j < dutyCount; j++) {
            persons.push(leaders[(tempWeekdayIndex + j) % leaders.length]);
        }
        tempWeekdayIndex = (tempWeekdayIndex + dutyCount) % leaders.length;
        
        workdayHtml += `
            <div class="predict-card workday fade-in">
                <div class="date">第${i + 1}批 <span class="type-badge workday">工作日</span></div>
                <div class="persons">
                    ${persons.map(p => `<span class="person">${p}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // 预测周末批次
    let weekendHtml = '<div style="margin:12px 0;"><strong>周末及节日：</strong></div>';
    for (let i = 0; i < 2; i++) {
        const persons = [];
        for (let j = 0; j < dutyCount; j++) {
            persons.push(leaders[(tempWeekendIndex + j) % leaders.length]);
        }
        tempWeekendIndex = (tempWeekendIndex + dutyCount) % leaders.length;
        
        weekendHtml += `
            <div class="predict-card weekend fade-in">
                <div class="date">第${i + 1}批 <span class="type-badge weekend">周末及节日</span></div>
                <div class="persons">
                    ${persons.map(p => `<span class="person">${p}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = workdayHtml + weekendHtml;
}

function showPredictModal() {
    predictFuture();
}