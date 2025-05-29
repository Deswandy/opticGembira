ELOQUENT RELATIONSHIPS
creates relational database structure

ONE TO ONE
in the model, make a new function (conventionally, name the function using the related model, and is singular)
-> return $this->hasOne(<Model>::class);
    model akan otomatis menyambung dgn foreign key MODELNAME_id

in the other model, you can make the inverse relation so it becomes one to one
-> return $this->belongsTo(<Model>::class);
    model will automatically be made

ONE TO MANY
in the model, make a new function (conventionally, name the function using the related model, and is plural)
-> return $this->hasMany(<Model>::class);

MANY TO MANY
-> $this->belongsToMany(<Model>::class);

