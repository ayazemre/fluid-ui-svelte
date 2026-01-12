<script lang="ts">
	import { Container } from '$lib/base';
	import { mergeClasses } from '$lib/utilities/common';
	import { handleDragOver, isDragValid, handleDrop } from '$lib/utilities/dropzone';
	import type { Snippet } from 'svelte';

	let {
		variant = '',
		componentId = '',
		children,
		dropEffect = 'copy',
		mode = 'file',
		data = $bindable()
	}: {
		variant?: string;
		componentId?: string;
		children: Snippet<[{ isDragOver: boolean; isInvalid: boolean }]>;
		dropEffect?: 'copy' | 'move' | 'link' | 'none';
		mode?: 'file' | 'text';
		data?: File[] | string;
	} = $props();

	const componentState = $state({ isDragOver: false, isInvalid: false });
</script>

<Container
	id={componentId}
	class={mergeClasses(
		variant,
		`fluid-dropzone relative ${componentState.isDragOver ? 'drag-over' : ''} ${componentState.isInvalid ? 'drag-invalid' : ''}`
	)}
	ondragover={(e: DragEvent) => {
		console.log('dragovers');
		handleDragOver(e, dropEffect, mode);
		componentState.isDragOver = true;
		componentState.isInvalid = !isDragValid(e, mode);
		console.log('dropeffect: ', dropEffect);
	}}
	ondragenter={(e: DragEvent) => {
		componentState.isDragOver = true;
		componentState.isInvalid = !isDragValid(e, mode);
	}}
	ondragleave={() => {
		componentState.isDragOver = false;
		componentState.isInvalid = false;
	}}
	ondrop={(e: DragEvent) => {
		componentState.isDragOver = false;
		componentState.isInvalid = false;

		const result = handleDrop(e, mode);
		if (result) {
			data = result;
		}
	}}
>
	{@render children({ isDragOver: componentState.isDragOver, isInvalid: componentState.isInvalid })}
</Container>
