// utils/calculateTotals.js

/**
 * Calcule les totaux (sous-total, taxes, livraison, total)
 * @param {Array} items - Tableau d'articles ou de commandes
 * @param {Object} options - Options pour le calcul
 *        options.type = "cart" | "orders" 
 *        options.shippingPerItem = montant de livraison par article/commande
 *        options.taxRate = taux de taxe (ex: 0.05 pour 5%)
 * @returns {Object} { subTotal, taxes, shipping, total }
 */
export function calculateTotals(items, options = {}) {
    const { type = "cart", shippingPerItem = 7, taxRate = 0.05 } = options;
  
    let subTotal = 0;
    let shipping = 0;
  
    if (type === "cart") {
      // items = panier, chaque item a {price, quantity}
      subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      shipping = items.length > 0 ? shippingPerItem : 0;
    } else if (type === "orders") {
      // items = commandes, chaque order a totalPrice
      subTotal = items.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
      shipping = items.length * shippingPerItem;
    }
  
    const taxes = subTotal * taxRate;
    const total = subTotal + taxes + shipping;
  
    return { subTotal, taxes, shipping, total };
  }
  