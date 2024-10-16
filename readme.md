
## the server listens on port 8185.

## how to install the server ?
1. take the code from git
2. npm i
3. npm run dev

Commands
=========

## Users:


which user        | header         |  command  | url                             |  body  |action
============================================================================================
    --            |  --            | POST      | http://localhost:8185/users     | Y |register
--------------------------------------------------------------------------------------------
    --            |  --            | POST      | http://localhost:8185/users/login | Y | login
--------------------------------------------------------------------------------------------
   admin          | x-auth-token   | GET       | http://localhost:8185/users       | N | get-users
--------------------------------------------------------------------------------------------
login-user&admin  | x-auth-token   | GET       | http://localhost:8185/users/user-id | N | get-user
--------------------------------------------------------------------------------------------
 login-user       | x-auth-token   | PUT       | http://localhost:8185/users/user-id | Y | edit-user
--------------------------------------------------------------------------------------------
 login-user       | x-auth-token   | PUT       | http://localhost:8185/users/user-id/cart| Y | add-yarn-to-cart
 -------------------------------------------------------------------------------------------
 login-user       | x-auth-token   | DELETE    | http://localhost:8185/users/user-id/cart/yarn-id | N | rmv-yarn-from-cart
 -------------------------------------------------------------------------------------------
 admin            | x-auth-token   | PATCH     | http://localhost:8185/users/user-id | N | toggle-is-business
 -------------------------------------------------------------------------------------------
 admin            | x-auth-token   | DELETE    | http://localhost:8185/users/user-id | N | delete-user
 -------------------------------------------------------------------------------------------

## Users Commands Body & Response
 =================================
 1. register
 ------------
 {
  "name": {
    "first": "Ell",
    "middle": "",
    "last": "Vis"
  },
  "phone": "0512345567",
  "email": "anayavetz3@gmail.com",
  "password": "<password>",
  "image": {
    "url": "https://www.image.com",
    "alt": "image"
  },
  "address": {
    "state": "IL",
    "country": "Israel",
    "city": "Arad",
    "street": "Shoham",
    "houseNumber": 5,
    "zip": 8920435
  }
}
----------------------
1.1 register response
----------------------
{
    "name": {
        "first": "ell",
        "middle": "",
        "last": "vis"
    },
    "email": "anayavetz3@gmail.com",
    "_id": "670a198c0af07ff971a0a1c6"
}
---------------------------------------
2. login body
-------------
{
  "email": "admin@gmail.com",
  "password": "<password>"
}
-------------------
2.1 login response
------------------
x-auth-token
-----------------------------------------
3. get-users body
-----------------
none
-----------------------
3.1 get-users response
-----------------------
list of all users info
-----------------------------------------
4. get-user body
----------------
none
----------------------
4.1 get-user response
----------------------
user info
------------------------------------------
5. edit-user body
------------------
updated registered  user info
-----------------------
5.1 edit-user response
-----------------------
the updated user info
-------------------------------------------
6. add-yarn-to-cart body
------------------------
{
yarnId: <yarn-id>, 
quantity: <some-number>
}
------------------------------
6.1 add-yarn-to-cart response
------------------------------
the cart. i.e. array of yarn-id and quantity
--------------------------------------------
7. rmv-yarn-from-cart body
--------------------------
none
-------------------------------
7.1 rmv-yarn-from-cart response
-------------------------------
the updated cart
---------------------------------------------
8. toggle-is-business body
---------------------------
none
--------------------------------
8.1 toggle-is-business response
--------------------------------
the updated user info
----------------------------------------------
9. delete-user body
--------------------
none
-------------------------
9.1 delete-user response
-------------------------
the deleted user info
-------------------------


##################################################


## yarns:

which user        | header         |  command  | url                             |  body  |action
============================================================================================
 --               | --             | GET       | http://localhost:8185/yarns/    | N      | get-yarns
---------------------------------------------------------------------------------------------
 admin            | x-auth-token   | POST      | http://localhost:8185/yarns     | Y      | create-yarn
---------------------------------------------------------------------------------------------
 --               | --             | GET       | http://localhost:8185/yarns/yarn-id | N  | get-yarn
---------------------------------------------------------------------------------------------
 admin            | x-auth-token   | PUT       | http://localhost:8185/yarns/yarn-id | Y  | update-yarn
---------------------------------------------------------------------------------------------
 admin            | x-auth-token   | DELETE    | http://localhost:8185/yarns/yarn-id | N  | delete-yarn
---------------------------------------------------------------------------------------------
 --               | --             | GET       | http://localhost:8185/yarns/search?size=yarn-size | N | get-yarn-by-size
 --------------------------------------------------------------------------------------------



## Yarns Commands Body & Response
=================================
1. get-yarns body
-----------------
none
------------------
1.1 get-yarns response
-----------------------
array of created yarn body
---------------------
2. create-yarn body
---------------------
{
  "title": "beautiful light blue yarn" ,
    "subtitle": "weight 4 yarn",
    "description": "beautiful weight 4 yarn for shawls, sweather, hats and more",
    "yarnSize": 4,
    "quantityInStock": 10,
    "image": {
        "url": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTf-JroeWhnIUJIXN2gOy7eJ7f9mCnylz9GCj3tFBm5JJloyXlO0FUytLu5X5lv87PMAPdrF1jGf0_KmyndKY6EQ_XEJY3h-FoSO7PE0Yef6P4xHk2mdodM-g&usqp=CAc",
        "alt": "yarn image"
    }
}
-----------------------------
2.1 create-yarn response
--------------------------
the created yarn
-----------------
3. get-yarn body
-----------------
none
-----------------
3.1 get-yarn response
----------------------
the created yarn
----------------------
4. update-yarn body
----------------------
the created yarn body updated
-----------------------------
4.1 update-yarn response
-------------------------
the updated yarn
-------------------------
5. delete-yarn body
-------------------------
none
--------------------------
5.1 delete-yarn response
--------------------------
the deleted yarn
--------------------------
6. get-yarn-by-size body
--------------------------
none
--------------------------
6.1 get-yarn-by-size response
------------------------------
array of yarns of specified size
---------------------------------


## stocks:


which user        | header         |  command  | url                             |  body  |action
============================================================================================
 --               | --             | GET       | http://localhost:8185/stocks/    | N      | get-stocks
 -------------------------------------------------------------------------------------------
 --               | --             | GET       | http://localhost:8185/stocks/stock-id | N | get-stock
 --------------------------------------------------------------------------------------------
 admin            | x-auth-token   | PUT       | http://localhost:8185/stocks/stock-id | Y | update-stock
 --------------------------------------------------------------------------------------------