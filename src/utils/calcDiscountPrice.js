// 할인 유형에 맞는 가격 return

function calcDiscountPrice(type, prices) {
    const totals = [prices['original']['total'], prices['public']['total'], prices['select24']['total'], prices['select12']['total']];
    const minPrice = Math.min.apply(Math, totals);
    const minIdx = totals.indexOf(minPrice);
    
    if (type === '0') {
        switch(minIdx) {
            case 0:
                return prices['original'];
            case 1:
                return prices['public'];
            case 2:
                return prices['select24'];
            case 3:
                return prices['select12'];
            default:
                return prices['original'];
        }
    } else if(type === '1') {
        // 공시지원금
        return prices['public'];
    } else if(type === '2') {
        // 선택약정24개월
        return prices['select24'];
    } else if(type === '3') {
        // 선택약정12개월
        return prices['select12'];
    }
}

export default calcDiscountPrice;