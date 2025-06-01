<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MsMerk;

class MsMerkController extends Controller
{
    public function index() { return response()->json(MsMerk::all()); }

    public function store(Request $request)
    {
        $request->validate(['merk' => 'required|string']);
        $merk = MsMerk::create($request->all());
        return response()->json($merk);
    }

    public function update(Request $request, $id)
    {
        $merk = MsMerk::findOrFail($id);
        $merk->update($request->all());
        return response()->json($merk);
    }

    public function destroy($id)
    {
        MsMerk::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
