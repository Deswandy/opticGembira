Function up() pada migrations digunakan untuk membuat table dan down() untuk menghapus table ketika migration dilakukan.
-> php artisan migrate
    digunakan untuk melakukan migrasi pada migrations tersebut.

$table merupakan object table
method id() akan membuat sebuah PK id autoincrement
method timestamp() akan membuat dua kolom pada db, yaitu created_at dan updated_at
method dengan method unique() akan membuat sebuah

migration file dapat dibuat dengan command terminal 
-> php artisan make:migration <migrationFileName> --create="<tableName>"

migration dapat dirollback
-> php artisan migrate:rollback

adding columns to existing tables
-> php artisan make:migration <migrationFileName> --table="<tableName>"

-> php artisan migrate:reset
    menghapus semua table pada db

-> php artisan migrate:status
    melihat status dari setiap file migration, apakah sudah pernah dijalankan atau belum

-> php artisan migrate:refresh
    reset dan migrate dalam satu command

#DATABASE MANIPULATION

Raw SQL queries
uses Facades/DB
-> DB::insert("query",['value']); -> returns boolean

-> DB::select("query",[value]); -> store in some variable

-> DB::update("query",[value]); -> returns boolean

-> DB::delete("query",[value]); -> returns boolean

Eloquent/ORM
-> php artisan make:model <NamaModel>
    will access namamodels (make sure the model name is singular and capitalized, but the DB table is plural and not capitalized)

SELECT
-> <Model>::all()
    selects all the db

-> <Model>::find($id)
    select with specific id

-> <Model>::where('field', value)->orderBy('field','asc/desc')->take(int)->get();

INSERT
-> $var = new <Model>;
    pointers to each field like $var->field, will insert it into the object.
-> $var->save;
    insert

or

-> <Model>::create([
    'field' => 'value';
]);
    Model must be configured accordingly first
    protected $fillable=[fields];


UPDATE
-> $var = <Model>::find(id);
    pointers to each field like $var->field, will insert it into the object.
-> $var->save;
    insert

or

-> <Model>::where('field',value)->...->update([
    'field'=>'value'
]);

DELETE
same, find a model object
-> $model->delete();

or

-> <Model>::destroy(id)
-> <Model>::destroy([1,2,...]);
-> <Model>::where()->delete();

SOFT DELETING / TRASHING
In the model
-> use SoftDeletes;
-> protected $dates = ['deleted_at'];

make the migration to add the deleted_at

-> $table->softDeletes(); up
-> $table->dropColumn('deleted_at'); down

when we delete, timestamp of deleted_at will be shown.

RETRIEVING TRASHED DATA
find the softdeleted data, when checked will not return anything. you must initialize the model with method withTrashed() -> will return all data.
-> $model = <Model>::withTrashed()->where()->get();

-> <Model>::onlyTrashed()->get()

to restore, use method restore();

PERMANENTLY DELETE
use the method forceDelete();


