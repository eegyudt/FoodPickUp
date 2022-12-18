SELECT * 
FROM orders 
WHERE DATE(order_started) = CURRENT_DATE;
-- JOIN ordered_items ON order_id = orders.id 

-- this select is not working, have to find a way to filter for today's date !!!