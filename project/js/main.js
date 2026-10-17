// --- 1. TOGGLE POPUP HỒ SƠ ---
function toggleMiniProfile(event) {
    event.stopPropagation();
    document.getElementById('miniProfilePopup').classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const popup = document.getElementById('miniProfilePopup');
    const widget = document.querySelector('.user-widget-wrapper');
    if (popup.classList.contains('active') && !widget.contains(event.target)) {
        popup.classList.remove('active');
    }
});

function toggleHistory() {
    const content = document.getElementById("history-content");
    const icon = document.getElementById("history-icon");
    content.classList.toggle("active");
    icon.textContent = content.classList.contains("active") ? "▲" : "▼";
}

// --- 2. DỮ LIỆU JAVASCRIPT ---
const profilesData = {
    'U-001': {
        id: 'U-001', name: 'Đức Khải', fullName: 'Đức Khải (bạn)',
        email: 'duckhai@example.com', phone: '0987654321', role: 'Quản trị viên',
        badges: ['Quản trị tối cao', 'Hoạt động'],
        perms: { duyet: true, ban: true, admin: true }, 
        history: [{ time: '08:00 - 15/10/2026', action: 'Đăng nhập hệ thống' }]
    },
    'U-012': {
        id: 'U-012', name: 'Nguyễn Lan Hương', fullName: 'Nguyễn Lan Hương',
        email: 'lanhuong@example.com', phone: '0912345678', role: 'Quản trị viên',
        badges: ['Đã xác minh', 'Quản trị viên'],
        perms: { duyet: true, ban: true, admin: true }, 
        history: [{ time: '10:30 - 15/10/2026', action: 'Thay đổi quyền: Cấp quyền "Cấm / Ban user"' }]
    },
    'U-008': {
        id: 'U-008', name: 'Quốc Tuấn', fullName: 'Quốc Tuấn',
        email: 'quoctuan@example.com', phone: '0909090909', role: 'Kiểm duyệt viên',
        badges: ['Đã xác minh', 'Kiểm duyệt viên'],
        perms: { duyet: true, ban: true, admin: false }, 
        history: [{ time: '11:00 - 14/10/2026', action: 'Duyệt 15 bài viết mới' }]
    },
    'U-031': {
        id: 'U-031', name: 'Minh Quân', fullName: 'Minh Quân',
        email: 'minhquan@example.com', phone: '0933333333', role: 'Kiểm duyệt viên',
        badges: ['Đang xác minh', 'Kiểm duyệt viên'],
        perms: { duyet: true, ban: false, admin: false }, 
        history: [{ time: '09:30 - 15/10/2026', action: 'Báo cáo vi phạm' }]
    }
};

let isEditMode = true; 

// --- 3. RENDER DANH SÁCH (CỘT PHẢI) ---
function renderLists() {
    const adminList = document.getElementById('admin-list');
    const modList = document.getElementById('mod-list');
    const currentId = document.getElementById('currentUserId').value;
    
    adminList.innerHTML = '';
    modList.innerHTML = '';

    for (const key in profilesData) {
        const p = profilesData[key];
        const li = document.createElement('li');
        li.id = `list-${p.id}`;
        li.onclick = () => loadProfile(p.id);
        if (p.id === currentId && isEditMode) li.classList.add('selected');
        
        li.innerHTML = `
            <div class="user-info">
                <span class="user-name">${p.id} • ${p.fullName}</span>
                <span class="user-email">${p.email}</span>
            </div>
        `;

        if (p.role === 'Quản trị viên') adminList.appendChild(li);
        else modList.appendChild(li);
    }

    // Thêm nút [+] cho Admin
    const addAdminLi = document.createElement('li');
    addAdminLi.className = 'add-btn';
    addAdminLi.onclick = () => showAddForm('Quản trị viên');
    addAdminLi.innerHTML = `<span class="user-name">+ Thêm Quản trị viên</span>`;
    adminList.appendChild(addAdminLi);

    // Thêm nút [+] cho Mod
    const addModLi = document.createElement('li');
    addModLi.className = 'add-btn';
    addModLi.onclick = () => showAddForm('Kiểm duyệt viên');
    addModLi.innerHTML = `<span class="user-name">+ Thêm Kiểm duyệt viên</span>`;
    modList.appendChild(addModLi);
}

// --- 4. LOAD PROFILE VÀO FORM ---
function loadProfile(userId) {
    const p = profilesData[userId];
    if (!p) return;

    isEditMode = true;
    document.getElementById('currentUserId').value = p.id;
    
    document.getElementById('prof-title').textContent = p.id + ' • ' + p.fullName;
    document.getElementById('prof-name').value = p.name;
    document.getElementById('prof-email').value = p.email;
    document.getElementById('prof-email').disabled = true; 
    document.getElementById('prof-phone').value = p.phone; 
    document.getElementById('prof-role').value = p.role;
    
    document.getElementById('chk-duyet').checked = p.perms.duyet;
    document.getElementById('chk-ban').checked = p.perms.ban;
    document.getElementById('chk-admin').checked = p.perms.admin;

    const badgesContainer = document.getElementById('prof-badges');
    badgesContainer.innerHTML = '';
    p.badges.forEach(b => {
        badgesContainer.innerHTML += `<div class="badge">${b}</div>`;
    });

    document.getElementById('history-box').style.display = 'block';
    const historyList = document.getElementById('prof-history');
    historyList.innerHTML = '';
    p.history.forEach(h => {
        historyList.innerHTML += `<li><span class="history-time">${h.time}</span> ${h.action}</li>`;
    });

    resetValidation();
    document.getElementById('btn-save').textContent = 'Lưu thông tin & quyền';
    document.getElementById('btn-delete').style.display = 'block'; 

    renderLists(); 
    applyCardTransition();
}

// --- 5. BẬT FORM THÊM MỚI ---
function showAddForm(role) {
    isEditMode = false;
    document.getElementById('currentUserId').value = '';
    
    document.getElementById('prof-title').textContent = 'Thêm nhân sự mới';
    document.getElementById('prof-name').value = '';
    document.getElementById('prof-email').value = '';
    document.getElementById('prof-email').disabled = false; 
    document.getElementById('prof-phone').value = ''; 
    document.getElementById('prof-role').value = role;
    
    if (role === 'Quản trị viên') {
        document.getElementById('chk-duyet').checked = true;
        document.getElementById('chk-ban').checked = true;
        document.getElementById('chk-admin').checked = true;
    } else {
        document.getElementById('chk-duyet').checked = true;
        document.getElementById('chk-ban').checked = false;
        document.getElementById('chk-admin').checked = false;
    }

    document.getElementById('prof-badges').innerHTML = '<div class="badge">Đang tạo mới</div>';
    document.getElementById('history-box').style.display = 'none'; 

    resetValidation();
    document.getElementById('btn-save').textContent = 'Thêm nhân sự';
    document.getElementById('btn-delete').style.display = 'none'; 

    renderLists(); 
    applyCardTransition();
}

// --- 6. VALIDATION & SUBMIT ---
function resetValidation() {
    document.getElementById('grp-name').classList.remove('error');
    document.getElementById('err-name').style.display = 'none';
    document.getElementById('grp-reason').classList.remove('error');
    document.getElementById('err-reason').style.display = 'none';
}

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    resetValidation();

    let isValid = true;
    const name = document.getElementById('prof-name').value.trim();
    const reason = document.getElementById('prof-reason').value.trim();

    if (name === '') {
        document.getElementById('grp-name').classList.add('error');
        document.getElementById('err-name').style.display = 'block';
        isValid = false;
    }

    if (reason === '') {
        document.getElementById('grp-reason').classList.add('error');
        document.getElementById('err-reason').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        const role = document.getElementById('prof-role').value;
        const email = document.getElementById('prof-email').value;
        const phone = document.getElementById('prof-phone').value; 
        const perms = {
            duyet: document.getElementById('chk-duyet').checked,
            ban: document.getElementById('chk-ban').checked,
            admin: document.getElementById('chk-admin').checked
        };

        if (!isEditMode) {
            const rand = Math.floor(Math.random() * 90 + 10);
            const newId = 'U-0' + rand;
            
            profilesData[newId] = {
                id: newId, name: name, fullName: name, email: email, phone: phone, role: role,
                badges: ['Mới thêm', role], perms: perms,
                history: [{ time: 'Vừa xong', action: 'Tài khoản được tạo mới vào hệ thống' }]
            };
            
            alert("Thêm nhân sự mới thành công!");
            loadProfile(newId); 
        } else {
            const currentId = document.getElementById('currentUserId').value;
            profilesData[currentId].name = name;
            profilesData[currentId].fullName = (currentId === 'U-001') ? name + ' (bạn)' : name;
            profilesData[currentId].phone = phone; 
            profilesData[currentId].role = role;
            profilesData[currentId].perms = perms;
            
            profilesData[currentId].history.unshift({ time: 'Vừa xong', action: 'Cập nhật thông tin/quyền hạn. Lý do: ' + reason });
            
            alert("Cập nhật thông tin thành công!");
            loadProfile(currentId); 
        }
        
        document.getElementById('prof-reason').value = '';
    }
});

// --- 7. LOGIC XÓA ---
function deleteUser() {
    const currentId = document.getElementById('currentUserId').value;
    const userName = profilesData[currentId]?.name || '';

    if (currentId === 'U-001') {
        alert("Lỗi: Bạn không thể tự loại bỏ chính mình khỏi hệ thống.");
        return;
    }

    if (confirm(`Bạn có chắc chắn muốn loại bỏ ${userName} khỏi hệ thống? Hành động này không thể hoàn tác.`)) {
        delete profilesData[currentId];
        alert("Đã loại bỏ nhân sự thành công!");
        loadProfile('U-001'); 
    }
}

function applyCardTransition() {
    const card = document.querySelector('.detail-card');
    card.style.opacity = '0.3';
    setTimeout(() => { card.style.opacity = '1'; }, 200);
}

window.onload = () => {
    renderLists();
    loadProfile('U-012'); 
};