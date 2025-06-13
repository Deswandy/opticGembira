<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MsKacamataStatus;

class MsKacamataStatusController extends Controller
{
    public function index() { return response()->json(MsKacamataStatus::all()); }

    public function store(Request $request)
    {
        $request->validate(['status' => 'required|string']);
        $status = MsKacamataStatus::create($request->all());
        return response()->json($status);
    }

    public function update(Request $request, $id)
    {
        $status = MsKacamataStatus::findOrFail($id);
        $status->update($request->all());
        return response()->json($status);
    }

    public function destroy($id)
    {
        MsKacamataStatus::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
