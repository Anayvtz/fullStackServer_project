
## the server listens on port 8185.

## how to install the server ?
1. take the code from git
2. npm i
3. npm run dev

Commands
=========

## Users:


| Which User            | Header        | Command | URL                                       | Body | Action                |
|-----------------------|---------------|---------|-------------------------------------------|------|-----------------------|
| --                    | --            | POST    | http://localhost:8185/users               | Y    | Register              |
| --                    | --            | POST    | http://localhost:8185/users/login         | Y    | Login                 |
| Admin                 | x-auth-token  | GET     | http://localhost:8185/users               | N    | Get Users             |
| Login User & Admin    | x-auth-token  | GET     | http://localhost:8185/users/user-id       | N    | Get User              |
| Login User            | x-auth-token  | PUT     | http://localhost:8185/users/user-id       | Y    | Edit User             |
| Login User            | x-auth-token  | PUT     | http://localhost:8185/users/user-id/cart  | Y    | Add Yarn to Cart      |
| Login User            | x-auth-token  | DELETE  | http://localhost:8185/users/user-id/cart/yarn-id | N | Remove Yarn from Cart |
| Admin                 | x-auth-token  | PATCH   | http://localhost:8185/users/user-id       | N    | Toggle Is Business    |
| Admin                 | x-auth-token  | DELETE  | http://localhost:8185/users/user-id       | N    | Delete User           |
| Login User            | x-auth-token | DELETE   | http://localhost:8185/users/user-id/cart          | N    | delete-user-cart      |
| Login User            | x-auth-token  | GET     | http://localhost:8185/users/user-id/cart/yarn-id       | N    | get-user-cart-entity  |
| Admin                 | x-auth-token  | GET     | http://localhost:8185/users/search?email=user-email | N | get-user-by-email     |
| Login User            | x-auth-token  | GET     | http://localhost:8185/users/user-id/cart | N | get-user-cart


## Users Commands Body & Response

 # 1. Register
--------------

```json
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
```

# 1.1 register response
----------------------
```json
{
    "name": {
        "first": "ell",
        "middle": "",
        "last": "vis"
    },
    "email": "anayavetz3@gmail.com",
    "_id": "670a198c0af07ff971a0a1c6"
}
```

# 2. login body
---------------
```json
{
  "email": "admin@gmail.com",
  "password": "<password>"
}
```

# 2.1 login response
--------------------
x-auth-token

# 3. get-users body
--------------------
none

# 3.1 get-users response
------------------------
list of all users info

# 4. get-user body
------------------
none

# 4.1 get-user response
------------------------
user info

# 5. edit-user body
--------------------
updated registered  user info
```json
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
```

# 5.1 edit-user response
-----------------------
the updated user info

# 6. add-yarn-to-cart body
--------------------------
```json
{
    "yarnId": "yarn-id",
    "image": {
            "url": "the-image-url",
            "alt": "yarn image"
        },
    "quantity": some-number
}
```

# 6.1 add-yarn-to-cart response
--------------------------------
the cart. i.e. array of yarn-id and quantity
```json
[
    {
        "yarnId": "673497b0203e939c19c601b8",
        "image": {
            "alt": "yarn image"
        },
        "quantity": 3,
        "_id": "673dc0bb3bd16718bce963de"
    }
]
```
# 7. rmv-yarn-from-cart body
--------------------------
none

# 7.1 rmv-yarn-from-cart response
-------------------------------
the updated cart

# 8. toggle-is-business body
---------------------------
none

# 8.1 toggle-is-business response
--------------------------------
the updated user info

# 9. delete-user body
--------------------
none

# 9.1 delete-user response
-------------------------
the deleted user info

# 10. delete-user-cart body
---------------------------
none

# 10.1 delete-user-cart response
---------------------------------
the deleted user cart (i.e array of items)

# 11. get-user-cart-entity body
-------------------------------
none

# 11.1 get-user-cart-entity response
-------------------------------------
a user-cart item

# 12. get-user-by-email body
-----------------------------
none

# 12.1 get-user-by-email response
----------------------------------
the user

# 13. get-user-cart body
------------------------
none

# 13.1 get-user-cart response
------------------------------
the user cart (i.e array of items)



******




## yarns:

| Which User | Header        | Command | URL                                              | Body | Action             |
|------------|---------------|---------|--------------------------------------------------|------|--------------------|
| --         | --            | GET     | http://localhost:8185/yarns/                     | N    | get-yarns          |
| admin      | x-auth-token  | POST    | http://localhost:8185/yarns                      | Y    | create-yarn        |
| --         | --            | GET     | http://localhost:8185/yarns/yarn-id              | N    | get-yarn           |
| admin      | x-auth-token  | PUT     | http://localhost:8185/yarns/yarn-id              | Y    | update-yarn        |
| admin      | x-auth-token  | DELETE  | http://localhost:8185/yarns/yarn-id              | N    | delete-yarn        |
| --         | --            | GET     | http://localhost:8185/yarns/search?size=yarn-size | N    | get-yarn-by-size   |




## Yarns Commands Body & Response
----------------------------------


# 1. get-yarns body
--------------------
none

# 1.1 get-yarns response
------------------------
array of created yarn body

# 2. create-yarn body
---------------------
```json
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
```

# 2.1 create-yarn response
--------------------------
the created yarn and the created stock
```json
{
    "yarn": {
        "title": "beautiful pink yarn",
        "subtitle": "weight 7 yarn",
        "description": "beautiful weight 7 yarn for shawls, sweather, hats and more",
        "yarnSize": 7,
        "quantityInStock": 40,
        "image": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:and9gcrm7vpmlnpx-vecdtvep5pwk1qtjrejpebenw&s",
            "alt": "yarn image"
        },
        "_id": "670f9dee465d193c6191f5dc",
        "__v": 0
    },
    "stock": {
        "yarnId": "670f9dee465d193c6191f5dc",
        "image": {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:and9gcrm7vpmlnpx-vecdtvep5pwk1qtjrejpebenw&s",
            "alt": "yarn image"
        },
        "quantity": 40,
        "_id": "670f9dee465d193c6191f5de",
        "__v": 0
    }
}
```

# 3. get-yarn body
------------------
none

# 3.1 get-yarn response
------------------------
the yarn

# 4. update-yarn body
----------------------
the created yarn body updated

# 4.1 update-yarn response
--------------------------
the updated yarn and the updated stock

# 5. delete-yarn body
-------------------------
none

# 5.1 delete-yarn response
--------------------------
the deleted yarn and the deleted stock

# 6. get-yarn-by-size body
--------------------------
none

# 6.1 get-yarn-by-size response
------------------------------
array of yarns of specified size


***


## stocks:


| Which User | Header        | Command | URL                                             | Body | Action            |
|------------|---------------|---------|-------------------------------------------------|------|-------------------|
| --         | --            | GET     | http://localhost:8185/stocks/                    | N    | get-stocks        |
| --         | --            | GET     | http://localhost:8185/stocks/stock-id            | N    | get-stock         |
| admin      | x-auth-token  | PATCH     | http://localhost:8185/stocks/stock-id            | Y    | update-stock-quantity      |



## Stocks Commands Body & Response

# 1. get-stocks body
---------------------
none

# 1.1 get-stocks response
--------------------------
the stocks info

# 2. get-stock body
-----------------------
none

# 2.1 get-stock response
-------------------------
the stock

# 3. update-stock-quantity body
 -------------------------------
 ```json
 {
    "yarnId": "670b9b404fe113e367bc2362",
    "image": {
            "url": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:and9gctf-jroewhniujixn2goy7ej7f9mcnylz9gcj3tfbm5jjloyxlo0fuytlu5x5lv87pmapdrf1jgf0_kmyndky6eq_xejy3h-foso7pe0yef6p4xhk2mdodm-g&usqp=cac",
            "alt":"yarn image"
    },
    "quantity": 23
 }
 ```

# 3.1 update-stock response
 --------------------------
the stock and yarn whose quantity was just updated


***


## Orders:


which user        | header         |  command  | url                             |  body  |action
============================================================================================
admin             | x-auth-token   | GET       |http://localhost:8185/orders     | N      | get-all-orders
--------------------------------------------------------------------------------------------
login-user&admin  | x-auth-token   | POST      |http://localhost:8185/orders/user-id | Y | create-order   

## Orders Commands Body & Response
=================================
1.1 get-all-orders body
---------------------------------
none
---------------------------------
1.2 get-all-orders response
---------------------------------
the array of orders
---------------------------------
2.1 create-order body
---------------------------------
the array of cart. for ex.
[
    {
        "image": {
            "url": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:and9gctf-jroewhniujixn2goy7ej7f9mcnylz9gcj3tfbm5jjloyxlo0fuytlu5x5lv87pmapdrf1jgf0_kmyndky6eq_xejy3h-foso7pe0yef6p4xhk2mdodm-g&usqp=cac",
            "alt": "yarn image"
        },
        "yarnId": "672d78e0cdc4805481651ba7",
        "quantity": 4,
        "_id": "672d86f6cdc4805481651bed"
    },
    {
        "image": {
            "url": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:and9gcrxoc94w7v2tn0xsz9dshrwokj9blpavucwgspjcb6ssgxh9iknvevdcbcogoudre-_9wtovqxylfwhulf3prxlzkiycayf5tdiggv_1b3uasorthbks1pbbjruygazgpceqsdvrprw&usqp=cac",
            "alt": "yarn image"
        },
        "yarnId": "672d78e0cdc4805481651bb0",
        "quantity": 4,
        "_id": "672d9116cdc4805481651c28"
    },
    {
        "image": {
            "url": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:and9gcqhp04hmop2z-mrb00s5wrbzn46p7strxrcxc_f4jfaq6eg0u1hi-hf3_8xql44g6e5vvqukbbzk3d7yisxyxwu5m3c94mpg0x5mwi5jnvf5u6-4ofcv4aj5-s&usqp=cac",
            "alt": "yarn image"
        },
        "yarnId": "672d78e0cdc4805481651bb4",
        "quantity": 1,
        "_id": "672d912fcdc4805481651c36"
    }
]
-----------------------------------
2.2 create-order response
-----------------------------------
the order. for ex.
