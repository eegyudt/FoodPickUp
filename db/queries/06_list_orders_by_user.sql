SELECT users.name, orders.*, menu_items.name 
FROM menu_items 
JOIN ordered_items ON menu_id = menu_items.id 
JOIN orders ON order_id = orders.id
JOIN users ON user_id = users.id
WHERE user_id = 2;