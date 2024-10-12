
the server listens on port 8185.

how to install the server ?
1. take the code from git
2. npm i
3. npm run dev

Commands
=========

Users:

===========================================================================================
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
 ============================================================================================