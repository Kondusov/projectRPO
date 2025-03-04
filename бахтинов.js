function calculateTotal(check) {
    let total = 0;
    
    let regex = /([a-z]+)(\d{1,3}(\.\d{3})*(\.\d{2})?)/g; 
    
    let match;
    while ((match = regex.exec(check)) !== null) {
        let price = match[2].replace(/\./g, '');

        if (price.includes('.')) {
            let parts = price.split('.');
            let rubles = parseInt(parts[0]);
            let kopecks = parseInt(parts[1]);
            total += rubles + kopecks / 100;
        } else {
            total += parseInt(price);
        }
    }

    return total.toFixed(2);
}

let check = "apple234orange1.544banana149.431.10grape0.99";
let total = calculateTotal(check);
console.log(total);
