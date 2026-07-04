@php
    $record = $getRecord();

    if (!$record || !$record->thumbnail) {
        return;
    }

    $url = asset('storage/' . $record->thumbnail);
@endphp

@if($record->media_type === 'video_upload')
    <video
        width="90"
        height="70"
        muted
        controls
        preload="metadata"
        style="
            border-radius: 6px;
            border: 2px solid #6b7280;
            object-fit: cover;
            width: 90px;
            height: 60px;
        "
    >
        <source src="{{ $url }}" type="video/mp4">
        Your browser does not support the video tag.
    </video>
@else
    <img
        src="{{ $url }}"
        alt="Preview"
        width="90"
        height="70"
        style="
            object-fit: content;
            border-radius: 6px;
            border: 2px solid #6b7280;
        "
    >
@endif