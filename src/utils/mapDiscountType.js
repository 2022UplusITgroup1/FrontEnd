// 할인 유형 이름 매칭

function mapDiscountType(type) {
    if(type === 1) {
        return "공시지원금";
    } else if(type === 2) {
        return "선택약정24개월";
    } else if(type === 3) {
        return "선택약정12개월";
    }
}

export default mapDiscountType;