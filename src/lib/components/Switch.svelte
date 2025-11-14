<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '../base/index.js';

	let {
		onswitch,
		checked = $bindable(false),
		disabled = false,
		class: className = '',
		...rest
	}: {
		onswitch: (event: Event, checked: boolean) => Promise<void>;
		checked?: boolean;
		disabled?: boolean;
		class?: string;
		id?: string;
	} & Omit<HTMLAttributes<HTMLButtonElement>, 'onclick'> = $props();
</script>

<Button
	role="switch"
	aria-checked={checked}
	class={'fluid-switch-button' + (checked ? ' checked' : '')}
	onclick={async (event) => {
		if (!disabled) {
			await onswitch(event, checked);
			checked = !checked;
		}
	}}
	{...rest}
	overrideDefaultStyling
>
	<span class="fluid-switch-circle"></span>
</Button>
