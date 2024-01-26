<button {{ $attributes->merge(['type' => 'submit', 'class' => 'btn text-uppercase font-monospace']) }} style="font-size: 0.8rem; letter-spacing: 1px">
    {{ $slot }}
</button>
