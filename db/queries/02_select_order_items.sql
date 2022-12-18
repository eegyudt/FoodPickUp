SELECT menu_items.* 
FROM menu_items 
JOIN ordered_items ON menu_id = menu_items.id 
WHERE order_id = 1;