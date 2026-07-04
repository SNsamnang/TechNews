<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'image',
        'media_type',
        'url',
        'video_url',
        'description',
        'status',
        'position',
        'start_date',
        'end_date',
    ];

    public function index()
    {
        $ads = Advertisement::where('status', 1)->get();

        return view('home', compact('ads'));
    }
}
