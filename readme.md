
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
    "imageurl": "https://www.image.com",
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
    "imageurl": "https://www.image.com",
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
            "imageurl": "the-image-url",
            "alt": "yarn image"
        },
    "quantity": some-number,
    "price": some-price
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
        "price":20
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
        "imageurl": "/images/whiteYarn.png",
        "alt": "yarn image"
    },
    "price":20
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
            "imageurl": "/images/lightBlue2Yarn.png",
            "alt": "yarn image"
        },
        "price": 20,
        "_id": "670f9dee465d193c6191f5dc",
        "__v": 0
    },
    "stock": {
        "yarnId": "670f9dee465d193c6191f5dc",
        "image": {
            "imageurl": "/images/whiteYarn.png",
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
            "imageurl": "/images/whiteYarn.png",
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


| Which User      | Header        | Command | URL                                                   | Body | Action                |
|-----------------|---------------|---------|-------------------------------------------------------|------|-----------------------|
| admin           | x-auth-token  | GET     | http://localhost:8185/orders                          | N    | get-all-orders        |
| login-user      | x-auth-token  | POST    | http://localhost:8185/orders/user-id                  | Y    | create-order          |
| --              | --            | GET     | http://localhost:8185/orders/order-id                 | N    | get-order             |
| admin           | x-auth-token  | GET     | http://localhost:8185/orders/search?customerId=user-id| N    | get-order-by-customer |
| login-user & admin | x-auth-token | PUT     | http://localhost:8185/orders/order-id                 | Y    | update-order          |
| admin           | x-auth-token  | DELETE  | http://localhost:8185/orders/order-id                 | N    | delete-order          |
| login-user & admin | x-auth-token | GET     | http://localhost:8185/orders/my-orders/user-id        | N    | get-my-orders         |
| admin           | x-auth-token  | PATCH   | http://localhost:8185/orders/order-id                 | N    | update-order-status   |


## Orders Commands Body & Response
----------------------------------

# 1.1 get-all-orders body
---------------------------------
none

# 1.2 get-all-orders response
---------------------------------
the array of orders

# 2.1 create-order body
---------------------------------
the array of cart (from users table). for ex.
```json
[
    {
        "image": {
            "imageurl": "/images/lightBlue3Yarn.png",
            "alt": "yarn image"
        },
        "yarnId": "673497b0203e939c19c601a8",
        "quantity": 4,
        "price": 20,
        "_id": "67354e44e588dc70d20226a4"
    }
]
```

# 2.2 create-order response
------------------------------
the order. for ex.
```json
{
    "yarns": [
        {
            "yarnId": "673497b0203e939c19c601a8",
            "image": {
                "imageurl": "/images/lightblue3yarn.png",
                "alt": "yarn image"
            },
            "quantity": 4,
            "price": 20,
            "_id": "67354e44e588dc70d20226a4"
        }
    ],
    "customerId": "67354bede588dc70d202269d",
    "customerName": {
        "first": "limor",
        "middle": "ana",
        "last": "yavetz"
    },
    "customerAddress": {
        "state": "aaa",
        "country": "aaa",
        "city": "aaa",
        "street": "aaa",
        "houseNumber": 3,
        "zip": 4935323
    },
    "customerEmail": "ana3@gmail.com",
    "status": [
        "inprocess"
    ],
    "_id": "673f0b0201ff41fa1d08c20a",
    "createdAt": "2024-11-21T10:27:14.136Z",
    "__v": 0
}
```
# 3.1 get-order body
--------------------
none

# 3.2 get-order response
-------------------------
the order

# 4.1 get-order-by-customer body
--------------------------------
none

# 4.2 get-order-by-customer response
-------------------------------------
the customer (i.e. user id) orders

# 5.1 update-order body
------------------------
the created order body updated

# 5.2 update-order response
---------------------------
the updated order

# 6.1 delete-order body
-----------------------
none

# 6.2 delete-order response
----------------------------
the deleted order

# 7.1 get-my-orders body
------------------------
none

# 7.2 get-my-orders response
----------------------------
the orders of that user (array of orders)

# 8.1 update-order-status body
---------------------------------
none

# 8.2 update-order-status response
-----------------------------------
the updated order

***

## multer:

| Which User      | Header        | Command | URL                                                   | Body | Action                |
|-----------------|---------------|---------|-------------------------------------------------------|------|-----------------------|
--                | --            | POST     |http://localhost:8185/upload-image | | upload-images-from-react

# 1.1 upload-images-from-react body
------------------------------------
recieves the file to be uploaded

# 1.2 upload-images-from-react response
----------------------------------------
create the file locally under /public/images and saves the local path of imageurl in mongodb both in yarns table entry and in stocks table entry. return the imageurl local path.