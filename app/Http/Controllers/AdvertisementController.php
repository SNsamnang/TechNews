<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;

class AdvertisementController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'nullable|image',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('ads', 'public');
        }

        Advertisement::create([
            'title' => $request->title,
            'image' => $imagePath,
            'description' => $request->description,
            'position' => $request->position,
            'url' => $request->url, // Add this
            'status' => 1,
        ]);

        return back()->with('success', 'Advertisement created successfully');
    }
    public function popup()
    {
        $ads = Advertisement::where('status', 1)->get();

        return response()->json($ads);
    }
    public function sidebar()
    {
        return Advertisement::where('position', 'sidebar')->get();
    }
    public function homepage()
    {
        return Advertisement::where('position', 'homepage')->get();
    }
}
