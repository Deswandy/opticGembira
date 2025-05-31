SECURITY AND AUTH
Install breeze project

Authentication = memastikan user logged in untuk masuk route
Authorization = memastikan user masuk sesuai role
Verification = memastikan user beneran user

terbentuk register dan login otomatis
dapat menggunakan db tersebut.

buat relasi untuk model ke User

middleware dapat digunakan untuk memproteksi route sehingga hanya bisa diakses user yg sudah login

mendapatkan user_id dapat menggunakan
-> Auth::id();

GATES AND AUTHORIZATION
AuthServiceProvider.php
dapat diatur untuk authorization.

Gate adalah untuk memastikan action sesuai role
Gate::define('ability', func(sesuaikan dengan params, return role id atau user id sesuaikan dengan aturan lah))

Gunakan gate parameter pada store
use
if(!Gate::allows('ability')){
    abort('403'); or any logic u want
}