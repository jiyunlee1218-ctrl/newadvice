// URL에서 idx 값(배열 인덱스) 가져오기
const params = new URLSearchParams(window.location.search);
const idx = params.get('idx');

const viewContent = document.getElementById('view-content');
const deleteBtn = document.getElementById('delete-btn');

let records = JSON.parse(localStorage.getItem('counselingRecords')) || [];

// 데이터가 존재하는지 확인
if (idx !== null && records[idx]) {
    const record = records[idx];

    // 화면에 데이터 출력
    viewContent.innerHTML = `
        <div class="info-row"><strong>학번:</strong> ${record.id}</div>
        <div class="info-row"><strong>이름:</strong> ${record.name}</div>
        <div class="info-row"><strong>상담 일자:</strong> ${record.date}</div>
        <div class="detail-box">
            <strong>상담 내용</strong>
            <p>${record.details}</p>
        </div>
    `;

    // 삭제 버튼 동작 설정
    deleteBtn.addEventListener('click', function() {
        if (confirm("정말로 이 상담 기록을 삭제하시겠습니까?")) {
            records.splice(idx, 1); // 배열에서 삭제
            localStorage.setItem('counselingRecords', JSON.stringify(records)); // 로컬 스토리지 업데이트
            alert("삭제되었습니다.");
            window.location.href = 'list.html'; // 목록으로 이동
        }
    });

} else {
    // 잘못된 접근 처리
    alert('존재하지 않거나 삭제된 기록입니다.');
    window.location.href = 'list.html';
}
