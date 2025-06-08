// 오늘 날짜를 기본값으로 설정
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('mealDate').value = `${year}-${month}-${day}`;
    
    // 페이지 로드 시 오늘 날짜의 급식 정보 조회
    getMealInfo();
});

async function getMealInfo() {
    const dateInput = document.getElementById('mealDate').value;
    const formattedDate = dateInput.replace(/-/g, '');
    
    // API URL 구성
    const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7642036&MLSV_YMD=${formattedDate}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.text();
        
        // XML 응답을 파싱
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        
        // 급식 정보 추출
        const mealInfo = xmlDoc.getElementsByTagName("DDISH_NM")[0]?.textContent;
        const mealContent = document.getElementById('mealContent');
        
        if (mealInfo) {
            mealContent.textContent = mealInfo;
        } else {
            mealContent.textContent = "해당 날짜의 급식 정보가 없습니다.";
        }
    } catch (error) {
        console.error('급식 정보를 가져오는 중 오류가 발생했습니다:', error);
        document.getElementById('mealContent').textContent = "급식 정보를 가져오는 중 오류가 발생했습니다.";
    }
}
