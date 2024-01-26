@props(['value'])

<label {{ $attributes->merge(['class' => 'form-control-label text-uppercase small fw-bold font-monospace']) }} style="letter-spacing: 1px">
    {{ $value ?? $slot }}
</label>
