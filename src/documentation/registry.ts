import AccordionSamples from './samples/AccordionSamples.svelte';
import ButtonSamples from './samples/ButtonSamples.svelte';
import CalendarSamples from './samples/CalendarSamples.svelte';
import CarouselSamples from './samples/CarouselSamples.svelte';
import CodeBlockSamples from './samples/CodeBlockSamples.svelte';
import ContainerSamples from './samples/ContainerSamples.svelte';
import DrawerSamples from './samples/DrawerSamples.svelte';
import ImageSamples from './samples/ImageSamples.svelte';
import InputFieldSamples from './samples/InputFieldSamples.svelte';
import LinkSamples from './samples/LinkSamples.svelte';
import ListSamples from './samples/ListSamples.svelte';
import TableSamples from './samples/TableSamples.svelte';
import TextSamples from './samples/TextSamples.svelte';

export const componentRegistry = {
	base: {
		button: {
			title: 'Fluid UI - Button',
			description:
				'The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, or performing a data-related action.',
			props: [
				{
					prop: 'onclick',
					type: '(event, state) => Promise<void>',
					default: 'required',
					description: 'Async event handler. Set state.inProgress to manage loading state.'
				},
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes to apply to the button.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes the base fluid-button class.'
				},
				{
					prop: 'loadingPlaceholder',
					type: 'Snippet',
					default: 'undefined',
					description: 'Snippet to render when onclick is in progress.'
				},
				{
					prop: '...rest',
					type: 'HTMLButtonAttributes',
					default: '—',
					description: 'Standard HTML button attributes.'
				}
			],
			sampleComponent: ButtonSamples
		},
		container: {
			title: 'Fluid UI - Container',
			description:
				'The Container component is a versatile wrapper for layout and styling, rendering as different HTML5 semantic elements.',
			props: [
				{
					prop: 'type',
					type: "'div' | 'nav' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'article'",
					default: "'div'",
					description: 'The HTML element tag to render.'
				},
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes to apply to the container.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes the base fluid-container class.'
				},
				{
					prop: 'transitionFn',
					type: 'Function',
					default: 'undefined',
					description: 'Svelte transition function.'
				},
				{
					prop: 'transitionParams',
					type: 'object',
					default: 'undefined',
					description: 'Parameters for the transition function.'
				},
				{
					prop: '...rest',
					type: 'HTMLAttributes',
					default: '—',
					description: 'Standard HTML attributes.'
				}
			],
			sampleComponent: ContainerSamples
		},
		image: {
			title: 'Fluid UI - Image',
			description:
				'The Image component is a wrapper for the native HTML <img> tag, with built-in styling for loading states.',
			props: [
				{
					prop: 'src',
					type: 'string',
					default: 'required',
					description: 'The image source URL.'
				},
				{
					prop: 'alt',
					type: 'string',
					default: 'required',
					description: 'Alternative text for the image.'
				},
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes to apply to the image.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes the base fluid-image class.'
				},
				{
					prop: '...rest',
					type: 'HTMLImgAttributes',
					default: '—',
					description: 'Standard HTML <img> attributes.'
				}
			],
			sampleComponent: ImageSamples
		},
		'input-field': {
			title: 'Fluid UI - Input Field',
			description:
				'The Input Field component is an enhanced wrapper for the native HTML <input> element. It provides built-in functionality for real-time character filtering.',
			props: [
				{
					prop: 'value',
					type: 'string',
					default: "''",
					description: "The input's bound value."
				},
				{
					prop: 'type',
					type: "'text' | 'password'",
					default: "'text'",
					description: 'The type of the input field.'
				},
				{
					prop: 'characterFilter',
					type: 'string[]',
					default: 'undefined',
					description: 'Array of allowed characters. If set, other characters are rejected.'
				},
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes to apply to the input.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes the base fluid-input-field class.'
				},
				{
					prop: '...rest',
					type: 'HTMLInputAttributes',
					default: '—',
					description: 'Standard HTML <input> attributes.'
				}
			],
			sampleComponent: InputFieldSamples
		},
		link: {
			title: 'Fluid UI - Link',
			description:
				'A standard anchor wrapper styled for Fluid UI, supporting client-side navigation in SvelteKit.',
			props: [
				{
					prop: 'href',
					type: 'string',
					default: 'required',
					description: 'The destination URL or path.'
				},
				{
					prop: 'children',
					type: 'Snippet',
					default: 'required',
					description: 'The content to be rendered inside the link.'
				},
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes to apply to the link.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes the base fluid-link class.'
				},
				{
					prop: '...rest',
					type: 'HTMLAnchorAttributes',
					default: '—',
					description: 'Standard HTML <a> attributes.'
				}
			],
			sampleComponent: LinkSamples
		},
		list: {
			title: 'Fluid UI - List',
			description:
				'The List component is a flexible component for rendering ordered or unordered lists from an array of items.',
			props: [
				{
					prop: 'type',
					type: "'ol' | 'ul'",
					default: "'ul'",
					description: 'Specifies the type of list to render.'
				},
				{
					prop: 'items',
					type: 'Array<T>',
					default: '[]',
					description: 'An array of items to be rendered.'
				},
				{
					prop: 'itemTemplate',
					type: 'Snippet<[T]>',
					default: 'required',
					description: 'A Svelte snippet used to render each item.'
				},
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'Custom CSS classes for the list element.'
				},
				{
					prop: 'itemClass',
					type: 'string',
					default: "''",
					description: 'Custom CSS classes for each list item (li).'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes default fluid styling.'
				},
				{
					prop: '...rest',
					type: 'HTMLAttributes',
					default: '—',
					description: 'Standard HTML list attributes.'
				}
			],
			sampleComponent: ListSamples
		},
		table: {
			title: 'Fluid UI - Table',
			description:
				'A flexible component for displaying tabular data with customizable cell rendering using Svelte snippets.',
			props: [
				{
					prop: 'caption',
					type: 'string',
					default: "''",
					description: 'An optional caption for the table.'
				},
				{
					prop: 'tableHeadItems',
					type: 'Array<T>',
					default: 'required',
					description: 'Data for the header row.'
				},
				{
					prop: 'tableRowItems',
					type: 'Array<Array<U>>',
					default: 'required',
					description: 'Data for the body rows.'
				},
				{
					prop: 'tableFooterItems',
					type: 'Array<V>',
					default: 'required',
					description: 'Data for the footer row.'
				},
				{
					prop: 'headTemplate',
					type: 'Snippet<[T]>',
					default: 'required',
					description: 'Snippet for rendering header cells.'
				},
				{
					prop: 'bodyTemplate',
					type: 'Snippet<[U]>',
					default: 'required',
					description: 'Snippet for rendering body cells.'
				},
				{
					prop: 'footerTemplate',
					type: 'Snippet<[V]>',
					default: 'required',
					description: 'Snippet for rendering footer cells.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes default fluid-table classes.'
				}
			],
			sampleComponent: TableSamples
		},
		text: {
			title: 'Fluid UI - Text',
			description:
				'A versatile component for rendering semantic text elements with consistent typography.',
			props: [
				{
					prop: 'type',
					type: 'string',
					default: "'p'",
					description: 'The HTML element to render (h1-h6, p, span, code, etc.).'
				},
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes to apply to the element.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes the base fluid-text class.'
				},
				{
					prop: 'children',
					type: 'Snippet',
					default: '—',
					description: 'The text content to render.'
				},
				{
					prop: '...rest',
					type: 'HTMLAttributes',
					default: '—',
					description: 'Standard HTML attributes for the chosen element type.'
				}
			],
			sampleComponent: TextSamples
		}
	},
	components: {
		accordion: {
			title: 'Fluid UI - Accordion',
			description:
				"A collapsible component used to organize content into toggleable sections. It's an ideal solution for FAQs, progressive disclosure, or compacting complex information.",
			props: [
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom CSS class to apply to the accordion wrapper.'
				},
				{
					prop: 'header',
					type: 'Snippet<[{ isExpanded: boolean }]>',
					default: 'required',
					description: 'Snippet for the toggleable header content.'
				},
				{
					prop: 'body',
					type: 'Snippet',
					default: 'required',
					description: 'Snippet for the collapsible body content.'
				},
				{
					prop: 'transitionFunction',
					type: 'function',
					default: 'slide',
					description: 'Svelte transition function for the expansion animation.'
				},
				{
					prop: 'transitionDuration',
					type: 'number',
					default: '250',
					description: 'Duration of the expansion animation in ms.'
				}
			],
			sampleComponent: AccordionSamples
		},
		calendar: {
			title: 'Fluid UI - Calendar',
			description:
				'A highly flexible, headless-inspired calendar component. It renders a month view based on a provided date, giving you full control over navigation and layout.',
			props: [
				{
					prop: 'componentId',
					type: 'string',
					default: 'undefined',
					description: 'The unique identifier for the component wrapper.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				},
				{
					prop: 'currentDate',
					type: 'string',
					default: 'new Date().toISOString()',
					description:
						'ISO 8601 formatted date string that determines the displayed month. Supports $bindable.'
				},
				{
					prop: 'startDate',
					type: 'string',
					default: 'undefined',
					description: 'Selected start date (ISO 8601). Supports $bindable.'
				},
				{
					prop: 'endDate',
					type: 'string',
					default: 'undefined',
					description: 'Selected end date (ISO 8601). Supports $bindable.'
				},
				{
					prop: 'weekDays',
					type: 'string[]',
					default: "['Mon', 'Tue', ...]",
					description: 'Array of week day names to display in the header.'
				},
				{
					prop: 'hideRollingDays',
					type: 'boolean',
					default: 'false',
					description: 'Whether to hide days from previous/next months.'
				}
			],
			sampleComponent: CalendarSamples
		},
		carousel: {
			title: 'Fluid UI - Carousel',
			description:
				'A high-performance carousel with custom JS-based snapping and smooth touch interactions.',
			props: [
				{
					prop: 'items',
					type: 'T[]',
					default: 'required',
					description: 'Array of data items to render.'
				},
				{
					prop: 'itemTemplate',
					type: 'Snippet<[{ item: T; index: number; internalState: CarouselInternalState }]>',
					default: 'required',
					description: 'Snippet to render each item. Provides access to data and touch state.'
				},
				{
					prop: 'orientation',
					type: "'horizontal' | 'vertical'",
					default: "'horizontal'",
					description: 'The scroll direction of the carousel.'
				},
				{
					prop: 'snapItems',
					type: 'boolean',
					default: 'true',
					description: 'Whether to automatically snap to the nearest item after a swipe.'
				},
				{
					prop: 'swipeable',
					type: 'boolean',
					default: 'true',
					description: 'Enable or disable touch-based swiping interaction.'
				},
				{
					prop: 'activeIndex',
					type: 'number',
					default: '0',
					description: 'The currently active slide index. Supports $bindable.'
				},
				{
					prop: 'autoplay',
					type: 'boolean',
					default: 'false',
					description: 'Whether to automatically cycle through items.'
				},
				{
					prop: 'autoplayDuration',
					type: 'number',
					default: '1000',
					description: 'Interval in milliseconds for autoplay.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: 'crypto.randomUUID()',
					description: 'The unique identifier for the component wrapper.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: CarouselSamples
		},
		'code-block': {
			title: 'Fluid UI - Code Block',
			description:
				'A component for displaying formatted code snippets with syntax highlighting.',
			props: [
				{
					prop: 'code',
					type: 'string',
					default: 'required',
					description: 'A string containing the code to be displayed.'
				},
				{
					prop: 'language',
					type: 'string',
					default: 'undefined',
					description:
						'An optional string that specifies the programming language (e.g., javascript, typescript, svelte).'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom CSS classes to apply custom styling variants.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description:
						'If true, prevents the component from applying its default styling.'
				}
			],
			sampleComponent: CodeBlockSamples
		},
		drawer: {
			title: 'Fluid UI - Drawer',
			description:
				'A programmatic sliding panel component that appears from the edge of the screen.',
			props: [
				{
					prop: 'isOpen',
					type: 'boolean',
					default: 'false',
					description: 'Controls the visibility of the drawer. Supports $bindable.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: 'undefined',
					description: 'The unique identifier for the component wrapper.'
				},
				{
					prop: 'position',
					type: "'left' | 'right' | 'top' | 'bottom'",
					default: "'left'",
					description: 'The side of the screen from which the drawer appears.'
				},
				{
					prop: 'backdrop',
					type: 'boolean',
					default: 'true',
					description: 'Whether to show a semi-transparent overlay behind the drawer.'
				},
				{
					prop: 'closeOnBackdropClick',
					type: 'boolean',
					default: 'true',
					description: 'Whether clicking the backdrop should close the drawer.'
				},
				{
					prop: 'scrollLock',
					type: 'boolean',
					default: 'true',
					description: 'Whether to prevent body scrolling when the drawer is open.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				},
				{
					prop: 'transitionFn',
					type: '(node: Element, params?: any) => TransitionConfig',
					default: '() => {}',
					description: 'The transition function for the drawer panel.'
				},
				{
					prop: 'backdropTransitionFn',
					type: '(node: Element, params?: any) => TransitionConfig',
					default: '() => {}',
					description: 'The transition function for the backdrop.'
				}
			],
			sampleComponent: DrawerSamples
		}
	}
};
