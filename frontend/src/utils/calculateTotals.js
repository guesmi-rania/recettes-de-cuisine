// frontend/src/utils/calculateTotals.js

export function calculateTotals(items, options = {}) {
    const { type = "cart", shippingPerItem = 7, taxRate = 0.05 } = options;
  
    let subTotal = 0;
    let shipping = 0;
  
    if (type === "cart") {
      subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      shipping = items.length > 0 ? shippingPerItem : 0;
    } else if (type === "orders") {
      subTotal = items.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
      shipping = items.length * shippingPerItem;
    }
  
    const taxes = subTotal * taxRate;
    const total = subTotal + taxes + shipping;
  
    return { subTotal, taxes, shipping, total };
  }
  