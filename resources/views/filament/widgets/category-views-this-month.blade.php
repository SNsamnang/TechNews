<x-filament-widgets::widget>
    <x-filament::section :heading="'ចំនួនអ្នកមើលប្រចាំខែនេះ'">
        <div class="flex flex-col gap-4">
            @forelse ($this->getCategoryStats() as $stat)
                <div>
                    <div class="mb-1 flex items-center justify-between text-sm">
                        <span class="font-medium text-gray-950 dark:text-white">{{ $stat['name'] }}</span>
                        <span class="text-gray-500 dark:text-gray-400">{{ number_format($stat['views']) }}</span>
                    </div>
                    <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                        <div
                            class="h-full rounded-full transition-all"
                            style="width: {{ $stat['percent'] }}%; background-color: {{ $stat['color'] }};"
                        ></div>
                    </div>
                </div>
            @empty
                <p class="text-sm text-gray-500 dark:text-gray-400">មិនទាន់មានទិន្នន័យ</p>
            @endforelse
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
