// HTML 요소 가져오기
const counselForm = document.getElementById('counsel-form');
const recordList = document.getElementById('record-list');
const nameInput = document.getElementById('student-name');
const dateInput = document.getElementById('counsel-date');
const detailsInput = document.getElementById('counsel-details');

// 로컬 스토리지에서 기존 데이터 불러오기 (없으면 빈 배열)
let records = JSON.parse(localStorage.getItem('counselingRecords')) || [];

// 화면에 기록을 그려주는 함수
function renderRecords() {
    // 기존 목록 초기화
    recordList.innerHTML = '';

    // 기록 배열을 순회하며 HTML 요소 생성
    records.forEach((record, index) => {
        const li = document.createElement('li');
        li.classList.add('record-item');

        li.innerHTML = `
            <div class="record-header">
                <div>
                    <strong>${record.name}</strong> 
                    <span>(${record.date})</span>
                </div>
                <button class="delete-btn" onclick="deleteRecord(${index})">삭제</button>
            </div>
            <p class="record-details">${record.details}</p>
        `;
        
        recordList.appendChild(li);
    });
}

// 폼 제출 이벤트 처리
counselForm.addEventListener('submit', function(e) {
    e.preventDefault(); // 새로고침 방지

    // 입력된 값 가져오기
    const newRecord = {
        name: nameInput.value,
        date: dateInput.value,
        details: detailsInput.value
    };

    // 배열에 새 기록 추가
    records.unshift(newRecord); // 가장 최근 기록이 위로 올라오도록 배열의 앞에 추가

    // 로컬 스토리지에 저장
    localStorage.setItem('counselingRecords', JSON.stringify(records));

    // 화면 업데이트 및 입력창 초기화
    renderRecords();
    counselForm.reset();
});

// 기록 삭제 함수
function deleteRecord(index) {
    if (confirm("정말로 이 상담 기록을 삭제하시겠습니까?")) {
        // 배열에서 해당 인덱스의 기록 1개 제거
        records.splice(index, 1);
        
        // 변경된 배열을 로컬 스토리지에 다시 저장
        localStorage.setItem('counselingRecords', JSON.stringify(records));
        
        // 화면 업데이트
        renderRecords();
    }
}

// 페이지 로드 시 초기 렌더링
renderRecords();

// 오늘 날짜를 기본값으로 설정 (선택 사항)
dateInput.valueAsDate = new Date();
