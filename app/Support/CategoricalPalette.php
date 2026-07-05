<?php

namespace App\Support;

class CategoricalPalette
{
    // Fixed order, CVD-validated (min adjacent ΔE ≥ 12) — never cycle or reorder.
    protected const COLORS = [
        '#2a78d6', // blue
        '#1baf7a', // aqua
        '#eda100', // yellow
        '#008300', // green
        '#4a3aa7', // violet
        '#e34948', // red
        '#e87ba4', // magenta
        '#eb6834', // orange
    ];

    public static function color(int $index): string
    {
        return self::COLORS[$index % count(self::COLORS)];
    }
}
