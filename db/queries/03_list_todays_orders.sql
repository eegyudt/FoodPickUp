SELECT *, CURRENT_DATE
FROM orders 
WHERE date(order_started) = CURRENT_DATE;
-- JOIN ordered_items ON order_id = orders.id 

