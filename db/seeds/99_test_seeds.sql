INSERT INTO menu_items (name, price, ingredients, inventory, food_photo_url)
VALUES
('CHICKEN PESTO PIZZA', 14, 'Artichokes, Onions, Zucchini, Spinach, Feta, Tomatoes, Chicken Breast, Cheese, Basil & Pesto Drizzle', true, 'https://static.wixstatic.com/media/d744f8_b62215357a68490d96dd3f9a1e910973~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_b62215357a68490d96dd3f9a1e910973~mv2.jpg'),
('HOUSE SPECIAL', 13, 'Ham, Pepperoni, Mushrooms, Onions, Green Peppers, Olives, Cheese & Tomato Sauce', true, 'https://static.wixstatic.com/media/d744f8_bc3a964637cb4577a6b4e32563841a4d~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_bc3a964637cb4577a6b4e32563841a4d~mv2.jpg'),
('FETA SPECIAL', 14, 'Italian salami, Mushrooms, Onions, Tomatoes, Green Peppers, Feta Cheese, Cheese & Tomato Sauce', true, 'https://static.wixstatic.com/media/d744f8_2b8f8646c1274196879b3c55375dfc65~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_2b8f8646c1274196879b3c55375dfc65~mv2.jpg'),
('HOT & SPICY SPECIAL', 13, 'Hot Pepperoni, Hot Salami, Mushrooms, Onions, Green Pepper, Cheese & Tomato Sauce', true, 'https://static.wixstatic.com/media/d744f8_16aa7668356e44718431a695e3779538~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_16aa7668356e44718431a695e3779538~mv2.jpg'),
('EVERYTHING SPECIAL', 19, 'Ham, Pepperoni, Salami, Mushrooms, Lean Beef, Olives, Onions, Green Peppers, Pineapple, Tomatoes, Cheese & Tomato Sauce', true, 'https://static.wixstatic.com/media/d744f8_17f6d3475b734458a603ef5a9d5d85b8~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_17f6d3475b734458a603ef5a9d5d85b8~mv2.jpg'),
('VEGETARIAN SPECIAL', 13, 'Mushroom, Olives, Onions, Pineapple, Tomatoes, Green Peppers, Cheese & Tomato Sauce', true, 'https://static.wixstatic.com/media/d744f8_00f58a73314b416caa5b1ed8644c8077~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_00f58a73314b416caa5b1ed8644c8077~mv2.jpg'),
('VEGGIE GARLIC', 16, 'Mushrooms, Red Onion, Tomato, Spinach, Green Pepper, Artichoke Heart, Fresh Garlic, White Garlic Sauce', true, 'https://static.wixstatic.com/media/d744f8_b1441926065f44a8a9182207bb670c8f~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_b1441926065f44a8a9182207bb670c8f~mv2.jpg'),
('TACO VEGGIE SPECIAL', 14, 'Red Onions, Jalapeno Pepper, Sour Cream, Paneer, Lettuce, Fresh Tomatoes & Cheese', true, 'https://static.wixstatic.com/media/d744f8_cce2eeeaa46b469bb7bb950acd949ab5~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_cce2eeeaa46b469bb7bb950acd949ab5~mv2.jpg'),
('BUTTER CHICKEN PIZZA', 17, 'Butter Chickes, Mushrooms, Red Onions, Tomato & Butter Chicken sauce', true, 'https://static.wixstatic.com/media/d744f8_88069663a11a4dcab4a706fe128e6c99~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_88069663a11a4dcab4a706fe128e6c99~mv2.jpg'),
('BBQ CHICKEN PIZZA', 14, 'Roasted BBQ Chickes, Mushrooms, Red Onions, Tomato & BBQ Sauce', true, 'https://static.wixstatic.com/media/d744f8_c233b6c11b644cffaee239213a9a2ba5~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_c233b6c11b644cffaee239213a9a2ba5~mv2.jpg'),
('TROPICAL HAWAIIAN', 18, 'Ham, Tropical Sauce, Cheddar, Bacon, Cheese & Tomato Sauce, Pineapple', true, 'https://static.wixstatic.com/media/d744f8_67ea1b69d5b049858a8682752b6bf5fa~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_67ea1b69d5b049858a8682752b6bf5fa~mv2.jpg'),
('HOT WINGS', 14, 'chicken', true, 'https://static.wixstatic.com/media/d744f8_75a149e2c6184dfdb769112f8483f93f~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_75a149e2c6184dfdb769112f8483f93f~mv2.jpg'),
('HONEY GARLIC WINGS', 15, 'chicken', true, 'https://static.wixstatic.com/media/d744f8_75a149e2c6184dfdb769112f8483f93f~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_75a149e2c6184dfdb769112f8483f93f~mv2.jpg'),
('BBQ WINGS', 14, 'chicken', true, 'https://static.wixstatic.com/media/d744f8_75a149e2c6184dfdb769112f8483f93f~mv2.jpg/v1/fill/w_560,h_385,al_c,q_80,enc_auto/d744f8_75a149e2c6184dfdb769112f8483f93f~mv2.jpg');




INSERT INTO users
(name, email, phone, password, admin)
VALUES
('Hungry Hippo', 'h.h@h.com', '1112223333', '123', false),
('Peckish Penguin', 'p@p.com', '2222223333', '123', false),
('Elegant Elephant', 'e@e.com', '3332223333', '123', false),
('Krazy Kangaroo', 'k@k.com', '4442223333', '123', false),
('Frog Prince', 'f@f.com', '5552223333', '123', false),
('admin1', 'g@g.com', '6662223333', '123', true);



INSERT INTO orders
(order_started, order_fulfilled, order_status, user_id)
VALUES
('2022-06-22 19:10:25-07', '2016-06-22 19:30:25-07', TRUE, 1),
('2022-07-13 07:01:01-07', '2022-07-13 13:10:10-07', TRUE, 2),
('2022-07-13 14:01:01-07', '2022-07-13 14:50:01-07', TRUE, 1),
('2022-07-14 16:15:01-07', '2022-07-13 16:35:01-07', TRUE, 3);



INSERT INTO ordered_items
(order_id, menu_id, quantity)
VALUES
(1, 1, 1),
(1, 4, 1),
(1, 5, 1),
(2, 2, 3),
(2, 3, 3),
(2, 4, 3),
(2, 5, 3),
(3, 1, 3),
(3, 3, 1),
(3, 9, 1),
(4, 6, 1),
(4, 7, 1),
(4, 8, 2);