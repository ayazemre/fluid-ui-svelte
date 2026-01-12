import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { Dropzone } from '$lib/components';
import { createRawSnippet } from 'svelte';

describe('Dropzone', () => {
	test('Default Rendering', async () => {
		render(Dropzone, {
			componentId: 'dropzone-test',
			children: createRawSnippet<[{ isDragOver: boolean; isInvalid: boolean }]>((optionsThunk) => ({
				render: () => `<span>DragOver: ${optionsThunk().isDragOver}</span>`
			}))
		});

		const dropzoneElement = page.getByTestId('dropzone-test');
		await expect.element(dropzoneElement).toBeInTheDocument();
		await expect.element(dropzoneElement).toHaveClass('fluid-dropzone');
		await expect.element(dropzoneElement).toHaveTextContent('DragOver: false');
	});

	test('Variant', async () => {
		render(Dropzone, {
			componentId: 'dropzone-variant',
			variant: 'secondary',
			children: createRawSnippet(() => ({
				render: () => '<span>Drop Here</span>'
			}))
		});

		const dropzoneElement = page.getByTestId('dropzone-variant');
		await expect.element(dropzoneElement).toHaveClass('secondary');
	});
	// TODO: Problems with manual event testing.
	// test('dropEffect prop', async () => {
	// 	render(Dropzone, {
	// 		componentId: 'dropzone-effect',
	// 		dropEffect: 'move',
	// 		mode: 'text',
	// 		children: createRawSnippet(() => ({
	// 			render: () => '<span>Drop Here</span>'
	// 		}))
	// 	});

	// 	const dropzoneElement = page.getByTestId('dropzone-effect');
	// 	const dataTransfer = new DataTransfer();
	// 	dataTransfer.setData('text/plain', 'test data');
	// 	dataTransfer.effectAllowed = 'move';

	// 	const dragOverEvent = new DragEvent('dragover', {
	// 		dataTransfer: dataTransfer
	// 	});

	// 	const eventResult = dropzoneElement.element().dispatchEvent(dragOverEvent);
	// 	console.log(eventResult);

	// 	// We check the assignment on the dataTransfer object used in the event
	// 	expect(dragOverEvent.dataTransfer?.dropEffect).toBe('move');
	// });

	// test('Interaction and Data Binding', async () => {
	// 	let dataValue: any = '';
	// 	render(Dropzone, {
	// 		componentId: 'dropzone-interaction',
	// 		mode: 'text',
	// 		get data() {
	// 			return dataValue;
	// 		},
	// 		set data(value) {
	// 			dataValue = value;
	// 		},
	// 		children: createRawSnippet<[{ isDragOver: boolean; isInvalid: boolean }]>((optionsThunk) => ({
	// 			render: () =>
	// 				`<span>DragOver: ${optionsThunk().isDragOver}, Invalid: ${optionsThunk().isInvalid}</span>`
	// 		}))
	// 	});

	// 	const dropzoneElement = page.getByTestId('dropzone-interaction');

	// 	// 1. Valid Text Drag
	// 	const dataTransferValid = new DataTransfer();
	// 	dataTransferValid.setData('text/plain', 'hello');
	// 	dataTransferValid.effectAllowed = 'all';

	// 	const dragOverEventValid = new DragEvent('dragover', {
	// 		bubbles: true,
	// 		cancelable: true,
	// 		dataTransfer: dataTransferValid
	// 	});

	// 	await dropzoneElement.element().dispatchEvent(dragOverEventValid);

	// 	// Wait for Svelte 5 state update to reflect in the DOM
	// 	await new Promise((resolve) => setTimeout(resolve, 50));
	// 	await expect.element(dropzoneElement).toHaveTextContent('DragOver: true, Invalid: false');

	// 	// 2. Invalid Drag (contains files when mode is text)
	// 	const dataTransferInvalid = new DataTransfer();
	// 	const fakeFile = new File([''], 'test.txt', { type: 'text/plain' });
	// 	dataTransferInvalid.items.add(fakeFile);
	// 	dataTransferInvalid.effectAllowed = 'all';

	// 	const dragOverEventInvalid = new DragEvent('dragover', {
	// 		bubbles: true,
	// 		cancelable: true,
	// 		dataTransfer: dataTransferInvalid
	// 	});

	// 	await dropzoneElement.element().dispatchEvent(dragOverEventInvalid);

	// 	await new Promise((resolve) => setTimeout(resolve, 50));
	// 	await expect.element(dropzoneElement).toHaveTextContent('DragOver: true, Invalid: true');
	// 	await expect.element(dropzoneElement).toHaveClass('drag-invalid');

	// 	// 3. Drop Valid Text
	// 	const dataTransferDrop = new DataTransfer();
	// 	dataTransferDrop.setData('text/plain', 'Hello World');
	// 	dataTransferDrop.effectAllowed = 'all';

	// 	const dropEvent = new DragEvent('drop', {
	// 		bubbles: true,
	// 		cancelable: true,
	// 		dataTransfer: dataTransferDrop
	// 	});

	// 	await dropzoneElement.element().dispatchEvent(dropEvent);

	// 	// Wait for state update and bindable data update
	// 	await new Promise((resolve) => setTimeout(resolve, 50));

	// 	expect(dataValue).toBe('Hello World');
	// 	await expect.element(dropzoneElement).toHaveTextContent('DragOver: false, Invalid: false');
	// });
});
