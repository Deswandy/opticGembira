<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MsLaci;

class MsLaciController extends Controller
{
    public function index() { return response()->json(MsLaci::all()); }

    public function store(Request $request)
    {
        $request->validate(['laci' => 'required|string|max:3']);
        $laci = MsLaci::create($request->all());
        return response()->json($laci);
    }

    public function update(Request $request, $id)
    {
        $laci = MsLaci::findOrFail($id);
        $laci->update($request->all());
        return response()->json($laci);
    }

    public function destroy($id)
    {
        MsLaci::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
