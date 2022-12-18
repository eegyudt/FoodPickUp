SELECT orders.id, orders.user_id, menu_items.name
FROM orders 
JOIN ordered_items ON order_id = orders.id
JOIN menu_items ON menu_id = menu_items.id
WHERE order_status IS FALSE AND date(order_started) = CURRENT_DATE
ORDER BY order_started DESC;