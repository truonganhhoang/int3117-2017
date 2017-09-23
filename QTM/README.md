# Hướng dẫn cài đặt Cypress
## 1. Yêu cầu hệ thống
##### Hiện tại Cypress chỉ hỗ trợ trên 2 hệ điều hành
- Mac
- Linux
## 2. Cài đặt trên Linux
##### Cài đặt npm
```sh
$ sudo apt-get update && sudo apt-get -y upgrade
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs

```
##### Kiểm tra cài đặt npm
```sh
$ npm -v

```
##### Cài đặt Cypress qua npm

```sh
$ cd /your/project/path
$ npm install cypress --save-dev

```
##### Mở Cypress
Tạo file `package.json` trong thư mục chứa project
Thêm đoạn mã sau vào file `package.json`
>{
>  "scripts": {
>      "cypress:open": "cypress open"
>   }
>}

##### Chạy lệnh sau để mở:

```sh
$ npm run cypress:open

```
