export function calculateTotalCost(subTotal: number) {
    let taxRate: number = parseFloat(process.env.TAXRATE);
    let total = (subTotal * (1 - taxRate));
    return total
}