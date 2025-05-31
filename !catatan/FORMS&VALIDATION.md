FORMS & VALIDATION
-> php artisan route:list
    cek smua routingan

buatlah form dengan action dan method sesuai routingan

create untuk menyediakan form, store untuk menerima form.

store return msg dari request

return redirect agar data setelah submit, otomatis kembali ke page

RETRIEVE
ikuti routingan, akan return data.
edit, delete,show, apapun itu, bisa masukkan ke route.

EDIT
value="sesuai data retrieved"
dalam laravel, jgn lupa letakkan @method('PUT'), @csrf

DELETE
@method('DELETE')
@csrf

FILE UPLOAD
use enctype="multipart/form-data" in the form
type as file
controller in store, there is two, one as path and one as ext. extension uses extension method, storePublicly("path","options");

store in DB
$student->photo=$path;

add that photo file into the view
$photo=Storage::url($obj->field);

function asset($photo) untuk mengembalikan src dari foto.


FORM VALIDATION
pada store, tambahkan $this->validate($request, [
    'field'=>'required|max:x|unique:...',
    ...
])

add error handling, using $errors->all(), as $error, lalu kembalikan untuk mengembalikan validasi tersebut



