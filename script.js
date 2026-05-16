// HTML 폼 및 입력 요소 가져오기
const counselForm = document.getElementById('counsel-form');
const idInput = document.getElementById('student-id');
const nameInput = document.getElementById('student-name');
const dateInput = document.getElementById('counsel-date');
const detailsInput = document.getElementById('counsel-details');

// 페이지 로드 시 '오늘 날짜'를 기본값으로 자동 설정
dateInput.valueAsDate = new Date();

// 폼 제출(저장 버튼 클릭) 이벤트 처리
counselForm.addEventListener('submit', function(e) {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 현상 방지

    // 사용자가 입력한 값들을 하나의 객체로 묶기
    const newRecord = {
        id: idInput.value,
        name: nameInput.value,
        date: dateInput.value,
        details: detailsInput.value
    };

    // 로컬 스토리지에서 기존 기록 불러오기 (기록이 아예 없으면 빈 배열 [] 할당)
    let records = JSON.parse(localStorage.getItem('counselingRecords')) || [];

    // 새로운 기록을 배열의 맨 앞에 추가 (가장 최근 기록이 위로 오도록)
    records.unshift(newRecord);

    // 업데이트된 전체 배열을 다시 로컬 스토리지에 문자열 형태로 저장
    localStorage.setItem('counselingRecords', JSON.stringify(records));

    // 저장 완료 후 목록 페이지로 자동 이동
    window.location.href = 'list.html'; 
});
