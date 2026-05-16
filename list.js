const tbody = document.getElementById('list-tbody');
let records = JSON.parse(localStorage.getItem('counselingRecords')) || [];

function renderTable() {
    tbody.innerHTML = ''; // 초기화

    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">등록된 상담 기록이 없습니다.</td></tr>';
        return;
    }

    records.forEach((record, index) => {
        // 연번 계산: 가장 최근 글이 가장 높은 번호를 가지도록
        const no = records.length - index;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${no}</td>
            <td><a href="view.html?idx=${index}" class="link-text">${record.id}</a></td>
            <td><a href="view.html?idx=${index}" class="link-text">${record.name}</a></td>
            <td>${record.date}</td>
        `;
        tbody.appendChild(tr);
    });
}

renderTable();
