SELECT name, price, ingredients
FROM menu_items 
WHERE id in $1;

-- SELECT name, price, ingredients FROM menu_items WHERE id = ??? ORDER BY id;