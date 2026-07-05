<div class="border-t border-gray-950/10 p-3 dark:border-white/10">
    <div class="flex items-center gap-2 px-1 pb-3" style="margin-bottom: 8px;">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-950/5 text-gray-500 dark:bg-white/5 dark:text-gray-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        </div>

        <div style="display: flex; justify-content: center; align-items: center; gap: 5px;">
            <span class="truncate text-sm font-medium text-gray-950 dark:text-white">
                Super Admin
            </span>
            <div style="height: 5px; width: 5px; border-radius: 50%; background-color: green;"></div>
            <span style="color: green; font-size: 12px;"">
                {{ auth()->user()?->name }}
            </span>
        </div>

    </div>
    <form method="POST" action="{{ route('filament.admin.auth.logout') }}">
        @csrf
        <button
            type="submit"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-950/5 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-950/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Logout
        </button>
    </form>

</div>