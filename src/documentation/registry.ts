import AccordionSamples from './samples/AccordionSamples.svelte';
import ButtonSamples from './samples/ButtonSamples.svelte';
import DatePickerSamples from './samples/DatePickerSamples.svelte';
import CarouselSamples from './samples/CarouselSamples.svelte';
import CodeBlockSamples from './samples/CodeBlockSamples.svelte';
import ContainerSamples from './samples/ContainerSamples.svelte';
import DrawerSamples from './samples/DrawerSamples.svelte';
import FormSamples from './samples/FormSamples.svelte';
import ImageSamples from './samples/ImageSamples.svelte';
import ImageCropSamples from './samples/ImageCropSamples.svelte';
import InputFieldSamples from './samples/InputFieldSamples.svelte';
import LinkSamples from './samples/LinkSamples.svelte';
import ListSamples from './samples/ListSamples.svelte';
import TableSamples from './samples/TableSamples.svelte';
import TextSamples from './samples/TextSamples.svelte';
import PageSamples from './samples/PageSamples.svelte';
import SwitchSamples from './samples/SwitchSamples.svelte';
import DraggableSamples from './samples/DraggableSamples.svelte';
import DropzoneSamples from './samples/DropzoneSamples.svelte';
import PopoverSamples from './samples/PopoverSamples.svelte';
import ModalSamples from './samples/ModalSamples.svelte';
import BreadcrumbSamples from './samples/BreadcrumbSamples.svelte';
import PaginationSamples from './samples/PaginationSamples.svelte';
import NotificationSamples from './samples/NotificationSamples.svelte';
import BadgeSamples from './samples/BadgeSamples.svelte';
import CheckboxSamples from './samples/CheckboxSamples.svelte';
import RadioSamples from './samples/RadioSamples.svelte';
import DividerSamples from './samples/DividerSamples.svelte';
import TabsSamples from './samples/TabsSamples.svelte';
import TooltipSamples from './samples/TooltipSamples.svelte';
import AlertSamples from './samples/AlertSamples.svelte';
import ProgressSamples from './samples/ProgressSamples.svelte';
import AvatarSamples from './samples/AvatarSamples.svelte';
import SelectSamples from './samples/SelectSamples.svelte';
import ComboboxSamples from './samples/ComboboxSamples.svelte';
import SliderSamples from './samples/SliderSamples.svelte';
import ContextMenuSamples from './samples/ContextMenuSamples.svelte';
import KbdSamples from './samples/KbdSamples.svelte';
import SkeletonSamples from './samples/SkeletonSamples.svelte';
import SpinnerSamples from './samples/SpinnerSamples.svelte';
import PinInputSamples from './samples/PinInputSamples.svelte';

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
		form: {
			title: 'Fluid UI - Form',
			description:
				'The Form component is a thin wrapper around the HTML <form> element that automatically prevents default browser submission behavior.',
			props: [
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes to apply to the form.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes the base fluid-form class.'
				},
				{
					prop: 'children',
					type: 'Snippet',
					default: 'required',
					description: 'The content of the form.'
				},
				{
					prop: '...rest',
					type: 'HTMLFormAttributes',
					default: '—',
					description: 'Standard HTML form attributes.'
				}
			],
			sampleComponent: FormSamples
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
					type: "'text' | 'password' | 'textarea'",
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
					type: 'Snippet<[T, number]>',
					default: 'required',
					description: 'A Svelte snippet used to render each item. Receives item and index.'
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
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes for the table element.'
				},
				{
					prop: 'captionClass',
					type: 'string',
					default: "''",
					description: 'CSS classes for the caption element.'
				},
				{
					prop: 'headClass',
					type: 'string',
					default: "''",
					description: 'CSS classes for the thead element.'
				},
				{
					prop: 'bodyClass',
					type: 'string',
					default: "''",
					description: 'CSS classes for the tbody element.'
				},
				{
					prop: 'rowClass',
					type: 'string',
					default: "''",
					description: 'CSS classes for tr elements.'
				},
				{
					prop: 'cellClass',
					type: 'string',
					default: "''",
					description: 'CSS classes for th and td elements.'
				},
				{
					prop: 'footerClass',
					type: 'string',
					default: "''",
					description: 'CSS classes for the tfoot element.'
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
		},
		badge: {
			title: 'Fluid UI - Badge',
			description: 'A small visual label used to convey status, metadata, or numerical counts.',
			props: [
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description:
						'Visual style variant (primary, secondary, success, warning, error, info, outline).'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes the base fluid-badge class.'
				},
				{
					prop: 'children',
					type: 'Snippet',
					default: '—',
					description: 'The content to render inside the badge.'
				},
				{
					prop: '...rest',
					type: 'HTMLAttributes<HTMLSpanElement>',
					default: '—',
					description: 'Standard HTML span attributes.'
				}
			],
			sampleComponent: BadgeSamples
		},
		checkbox: {
			title: 'Fluid UI - Checkbox',
			description:
				'An accessible form input that allows selecting binary states or indeterminate values.',
			props: [
				{
					prop: 'checked',
					type: 'boolean',
					default: 'false',
					description: 'The checked state of the checkbox. Supports $bindable.'
				},
				{
					prop: 'indeterminate',
					type: 'boolean',
					default: 'false',
					description: 'Whether the checkbox is in an indeterminate (partially checked) state.'
				},
				{
					prop: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'If true, disables interaction.'
				},
				{
					prop: 'label',
					type: 'string | Snippet',
					default: 'undefined',
					description: 'Optional label displayed alongside the checkbox.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom styling variant class.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes default fluid-checkbox styling.'
				},
				{
					prop: 'onclick',
					type: '(event: Event, checked: boolean) => Promise<unknown> | void',
					default: 'undefined',
					description: 'Async click handler callback.'
				}
			],
			sampleComponent: CheckboxSamples
		},
		radio: {
			title: 'Fluid UI - Radio',
			description: 'An accessible radio button input for single-choice option sets within forms.',
			props: [
				{
					prop: 'value',
					type: 'string',
					default: 'required',
					description: 'The value represented by this radio option.'
				},
				{
					prop: 'group',
					type: 'string',
					default: "''",
					description: 'Bound group selection value. Supports $bindable.'
				},
				{
					prop: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'If true, disables interaction.'
				},
				{
					prop: 'label',
					type: 'string | Snippet',
					default: 'undefined',
					description: 'Optional label displayed alongside the radio button.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom styling variant class.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes default fluid-radio styling.'
				}
			],
			sampleComponent: RadioSamples
		},
		divider: {
			title: 'Fluid UI - Divider',
			description: 'A visual separator line used to segment and structure page layout sections.',
			props: [
				{
					prop: 'orientation',
					type: "'horizontal' | 'vertical'",
					default: "'horizontal'",
					description: 'The axis orientation of the divider.'
				},
				{
					prop: 'label',
					type: 'string | Snippet',
					default: 'undefined',
					description: 'Optional centered text label (horizontal mode only).'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes default fluid-divider styling.'
				}
			],
			sampleComponent: DividerSamples
		},
		select: {
			title: 'Fluid UI - Select',
			description:
				'A native HTML select input wrapper supporting option lists, snippets, and value binding.',
			props: [
				{
					prop: 'value',
					type: 'string',
					default: "''",
					description: 'The bound selected string value.'
				},
				{
					prop: 'options',
					type: 'Array<{ value: string; label: string; disabled?: boolean }>',
					default: '[]',
					description: 'The options list to render inside the select element.'
				},
				{
					prop: 'placeholder',
					type: 'string',
					default: 'undefined',
					description: 'Optional placeholder option shown when no value is selected.'
				},
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes default fluid-select styling.'
				}
			],
			sampleComponent: SelectSamples
		},
		kbd: {
			title: 'Fluid UI - Kbd',
			description:
				'A semantic keyboard key indicator used to display keyboard shortcuts and hotkeys.',
			props: [
				{
					prop: 'overrideDefaultStyling',
					type: 'boolean',
					default: 'false',
					description: 'If true, removes default fluid-kbd styling.'
				}
			],
			sampleComponent: KbdSamples
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
		'date-picker': {
			title: 'Fluid UI - Date Picker',
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
			sampleComponent: DatePickerSamples
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
					type: 'Snippet<[T, number]>',
					default: 'required',
					description: 'Snippet to render each item. Provides access to item and index.'
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
					prop: 'visibleItemCount',
					type: 'number',
					default: '1',
					description: 'Number of items visible at once.'
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
			description: 'A component for displaying formatted code snippets with syntax highlighting.',
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
					description: 'If true, prevents the component from applying its default styling.'
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
					type: 'function',
					default: '() => {}',
					description: 'Transition function for the drawer panel.'
				},
				{
					prop: 'transitionParams',
					type: 'object',
					default: '{}',
					description: 'Parameters for the panel transition.'
				},
				{
					prop: 'backdropTransitionFn',
					type: 'function',
					default: '() => {}',
					description: 'Transition function for the backdrop.'
				},
				{
					prop: 'backdropTransitionParams',
					type: 'object',
					default: 'undefined',
					description: 'Parameters for the backdrop transition.'
				}
			],
			sampleComponent: DrawerSamples
		},
		page: {
			title: 'Fluid UI - Page',
			description:
				'The Page component is a specialized wrapper for top-level pages. It handles document metadata (SEO, Open Graph, Twitter Cards) and provides a standard "main" container for content.',
			props: [
				{
					prop: 'title',
					type: 'string',
					default: "''",
					description: 'The title of the page (appears in browser tab and search results).'
				},
				{
					prop: 'description',
					type: 'string',
					default: "''",
					description: 'A brief summary of the page for search engines and social previews.'
				},
				{
					prop: 'image',
					type: 'string',
					default: "''",
					description: 'URL of the image used for social media previews.'
				},
				{
					prop: 'imageAlt',
					type: 'string',
					default: "''",
					description: 'Alt text for the social preview image.'
				},
				{
					prop: 'url',
					type: 'string',
					default: "''",
					description: 'The canonical URL of the page.'
				},
				{
					prop: 'siteName',
					type: 'string',
					default: "''",
					description: 'The name of the overall website.'
				},
				{
					prop: 'type',
					type: "'website' | 'article' | 'profile'",
					default: "'website'",
					description: 'The type of Open Graph object.'
				},
				{
					prop: 'twitterCard',
					type: "'summary' | 'summary_large_image'",
					default: "'summary_large_image'",
					description: 'The type of Twitter card to render.'
				},
				{
					prop: 'themeColor',
					type: 'string',
					default: "''",
					description: 'Color for the browser toolbar/address bar.'
				},
				{
					prop: 'robots',
					type: 'string',
					default: "'index, follow'",
					description: 'Instructions for search engine crawlers.'
				},
				{
					prop: 'keywords',
					type: 'string',
					default: "''",
					description: 'Comma-separated keywords for the page.'
				},
				{
					prop: 'class',
					type: 'string',
					default: "''",
					description: 'CSS classes to apply to the main container.'
				}
			],
			sampleComponent: PageSamples
		},
		'image-crop': {
			title: 'Fluid UI - Image Crop',
			description:
				'A canvas-based component for cropping images with zoom and pan support, providing a real-time cropped preview.',
			props: [
				{
					prop: 'sourceImage',
					type: 'ImageBitmap',
					default: 'required',
					description: 'The source ImageBitmap to be cropped.'
				},
				{
					prop: 'aspectRatio',
					type: '{ x: number, y: number }',
					default: 'required',
					description: 'Fixed aspect ratio for the crop area.'
				},
				{
					prop: 'resultImage',
					type: 'string',
					default: 'undefined',
					description: 'The base64 encoded cropped image result. Supports $bindable.'
				},
				{
					prop: 'zoom',
					type: 'number',
					default: '1',
					description: 'Zoom level for the image.'
				},
				{
					prop: 'pan',
					type: '{ x: number, y: number }',
					default: '{ x: 0, y: 0 }',
					description: 'Pan coordinates (x, y) for the image.'
				},
				{
					prop: 'padding',
					type: 'number',
					default: '0',
					description: 'Padding in pixels around the crop area within the canvas.'
				},
				{
					prop: 'shape',
					type: "'rectangle' | 'circle'",
					default: "'rectangle'",
					description: 'The shape of the crop area.'
				},
				{
					prop: 'overlayColor',
					type: 'string',
					default: "'rgba(0, 0, 0, 0.5)'",
					description: 'The color of the overlay around the crop area.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: 'undefined',
					description: 'The unique identifier for the component wrapper.'
				}
			],
			sampleComponent: ImageCropSamples
		},
		switch: {
			title: 'Fluid UI - Switch',
			description: 'A simple toggle switch component used for binary settings or preferences.',
			props: [
				{
					prop: 'checked',
					type: 'boolean',
					default: 'false',
					description: 'The current state of the switch. Supports $bindable.'
				},
				{
					prop: 'onclick',
					type: '(event: Event, checked: boolean) => Promise<void>',
					default: 'required',
					description: 'Async callback triggered when the switch is toggled.'
				},
				{
					prop: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'If true, prevents user interaction.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom CSS variant class.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: "''",
					description: 'The unique identifier for the component element.'
				}
			],
			sampleComponent: SwitchSamples
		},
		draggable: {
			title: 'Fluid UI - Draggable',
			description:
				'A barebone wrapper component that enables native HTML5 drag operations for its content.',
			props: [
				{
					prop: 'componentId',
					type: 'string',
					default: "''",
					description: 'The unique identifier for the component element.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom CSS variant class.'
				},
				{
					prop: 'children',
					type: 'Snippet',
					default: 'required',
					description: 'The content to be made draggable.'
				},
				{
					prop: 'ondragstart',
					type: '(event: DragEvent) => void',
					default: 'undefined',
					description: 'Callback triggered when dragging starts. Use this to set dataTransfer.'
				}
			],
			sampleComponent: DraggableSamples
		},
		dropzone: {
			title: 'Fluid UI - Dropzone',
			description: 'A barebone area for receiving files or data via drag and drop events.',
			props: [
				{
					prop: 'data',
					type: 'File[] | string',
					default: 'undefined',
					description: 'The dropped data (files or text). Supports $bindable.'
				},
				{
					prop: 'mode',
					type: "'file' | 'text'",
					default: "'file'",
					description: 'Specifies the type of data the dropzone accepts.'
				},
				{
					prop: 'dropEffect',
					type: "'copy' | 'move' | 'link' | 'none'",
					default: "'copy'",
					description: 'The visual feedback during the drag operation.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: "''",
					description: 'The unique identifier for the component element.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom CSS variant class.'
				},
				{
					prop: 'children',
					type: 'Snippet<[{ isDragOver: boolean; isInvalid: boolean }]>',
					default: 'required',
					description: 'Snippet for the dropzone content. Receives drag state.'
				}
			],
			sampleComponent: DropzoneSamples
		},
		popover: {
			title: 'Fluid UI - Popover',
			description:
				'A dynamic and flexible popover component used for dropdowns, tooltips, and contextual menus.',
			props: [
				{
					prop: 'trigger',
					type: 'Snippet',
					default: 'required',
					description: 'Snippet for the element that triggers the popover.'
				},
				{
					prop: 'content',
					type: 'Snippet',
					default: 'required',
					description: 'Snippet for the content displayed inside the popover.'
				},
				{
					prop: 'isOpen',
					type: 'boolean',
					default: 'false',
					description: 'Controls the visibility of the popover. Supports $bindable.'
				},
				{
					prop: 'position',
					type: "'top' | 'bottom' | 'left' | 'right'",
					default: "'bottom'",
					description: 'The preferred position of the popover relative to the trigger.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: 'crypto.randomUUID()',
					description: 'The unique identifier for the component wrapper.'
				},
				{
					prop: 'transitionFn',
					type: 'function',
					default: 'fade',
					description: 'Svelte transition function for the popover content.'
				},
				{
					prop: 'transitionParams',
					type: 'object',
					default: '{ duration: 150 }',
					description: 'Parameters for the transition function.'
				}
			],
			sampleComponent: PopoverSamples
		},
		modal: {
			title: 'Fluid UI - Modal',
			description: 'A barebone centered modal component for critical actions or information.',
			props: [
				{
					prop: 'isOpen',
					type: 'boolean',
					default: 'false',
					description: 'Controls the visibility of the modal. Supports $bindable.'
				},
				{
					prop: 'closeOnBackdropClick',
					type: 'boolean',
					default: 'true',
					description: 'Whether clicking the backdrop closes the modal.'
				},
				{
					prop: 'scrollLock',
					type: 'boolean',
					default: 'true',
					description: 'Whether to lock body scroll when the modal is open.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: 'crypto.randomUUID()',
					description: 'The unique identifier for the component wrapper.'
				},
				{
					prop: 'transitionFn',
					type: 'function',
					default: 'scale',
					description: 'Svelte transition function for the modal panel.'
				},
				{
					prop: 'transitionParams',
					type: 'object',
					default: '{ duration: 200, start: 0.95 }',
					description: 'Parameters for the panel transition.'
				},
				{
					prop: 'backdropTransitionFn',
					type: 'function',
					default: 'fade',
					description: 'Svelte transition function for the backdrop.'
				},
				{
					prop: 'backdropTransitionParams',
					type: 'object',
					default: '{ duration: 200 }',
					description: 'Parameters for the backdrop transition.'
				},
				{
					prop: 'children',
					type: 'Snippet',
					default: 'required',
					description: 'The content of the modal.'
				}
			],
			sampleComponent: ModalSamples
		},
		breadcrumb: {
			title: 'Fluid UI - Breadcrumb',
			description:
				'A navigation aid that allows users to keep track of their location within programs, documents, or websites.',
			props: [
				{
					prop: 'items',
					type: 'Array<{ label: string; href: string }>',
					default: '[]',
					description: 'An array of breadcrumb items.'
				},
				{
					prop: 'separator',
					type: 'string | Snippet',
					default: "'/'",
					description: 'The separator element between items.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: 'crypto.randomUUID()',
					description: 'The unique identifier for the component wrapper.'
				}
			],
			sampleComponent: BreadcrumbSamples
		},
		pagination: {
			title: 'Fluid UI - Pagination',
			description:
				'A component for navigating through a series of related content across multiple pages.',
			props: [
				{
					prop: 'currentPage',
					type: 'number',
					default: '1',
					description: 'The currently active page. Supports $bindable.'
				},
				{
					prop: 'totalPages',
					type: 'number',
					default: '1',
					description: 'The total number of pages.'
				},
				{
					prop: 'onPageChange',
					type: '(page: number) => Promise<void>',
					default: 'undefined',
					description: 'Async callback triggered when the page changes.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: 'crypto.randomUUID()',
					description: 'The unique identifier for the component wrapper.'
				}
			],
			sampleComponent: PaginationSamples
		},
		'notification-area': {
			title: 'Fluid UI - Notification Area',
			description: 'A fixed area for displaying non-intrusive notifications and alerts.',
			props: [
				{
					prop: 'items',
					type: 'Notification[]',
					default: '[]',
					description: 'A bindable array of notification items.'
				},
				{
					prop: 'position',
					type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
					default: "'top-right'",
					description: 'The corner of the screen where notifications appear.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: NotificationSamples
		},
		tabs: {
			title: 'Fluid UI - Tabs',
			description:
				'An accessible tabbed navigation interface with animated panel selection and keyboard arrow controls.',
			props: [
				{
					prop: 'items',
					type: 'Array<TabItem>',
					default: '[]',
					description: 'Array of tab items with id, label, and optional content snippets.'
				},
				{
					prop: 'activeTabId',
					type: 'string',
					default: "''",
					description: 'The id of the currently active tab. Supports $bindable.'
				},
				{
					prop: 'orientation',
					type: "'horizontal' | 'vertical'",
					default: "'horizontal'",
					description: 'Layout axis orientation for the tab list.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				},
				{
					prop: 'componentId',
					type: 'string',
					default: 'crypto.randomUUID()',
					description: 'The unique identifier for the component wrapper.'
				}
			],
			sampleComponent: TabsSamples
		},
		tooltip: {
			title: 'Fluid UI - Tooltip',
			description: 'A contextual popup hint displayed upon hovering or focusing a trigger element.',
			props: [
				{
					prop: 'trigger',
					type: 'Snippet',
					default: 'required',
					description: 'Snippet for the target anchor element.'
				},
				{
					prop: 'text',
					type: 'string',
					default: 'undefined',
					description: 'Text string content displayed inside the tooltip.'
				},
				{
					prop: 'content',
					type: 'Snippet',
					default: 'undefined',
					description: 'Custom snippet content displayed inside the tooltip.'
				},
				{
					prop: 'position',
					type: "'top' | 'bottom' | 'left' | 'right'",
					default: "'top'",
					description: 'Placement of the tooltip relative to the trigger element.'
				},
				{
					prop: 'delay',
					type: 'number',
					default: '200',
					description: 'Delay in milliseconds before the tooltip appears.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: TooltipSamples
		},
		alert: {
			title: 'Fluid UI - Alert',
			description:
				'A prominent banner used to communicate system feedback, warnings, and confirmations.',
			props: [
				{
					prop: 'type',
					type: "'info' | 'success' | 'warning' | 'error'",
					default: "'info'",
					description: 'The semantic status type of the alert.'
				},
				{
					prop: 'title',
					type: 'string',
					default: 'undefined',
					description: 'Bold title header for the alert message.'
				},
				{
					prop: 'description',
					type: 'string',
					default: 'undefined',
					description: 'Body message for the alert.'
				},
				{
					prop: 'dismissible',
					type: 'boolean',
					default: 'false',
					description: 'Whether to show a close dismiss button.'
				},
				{
					prop: 'ondismiss',
					type: '(event: Event) => Promise<unknown> | void',
					default: 'undefined',
					description: 'Async callback triggered when the alert is dismissed.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: AlertSamples
		},
		progress: {
			title: 'Fluid UI - Progress',
			description:
				'An accessible progress bar for displaying determinate percentages or indeterminate loading states.',
			props: [
				{
					prop: 'value',
					type: 'number',
					default: 'undefined',
					description: 'Current progress value (0 to max). Omit for indeterminate mode.'
				},
				{
					prop: 'max',
					type: 'number',
					default: '100',
					description: 'Maximum progress value.'
				},
				{
					prop: 'showValue',
					type: 'boolean',
					default: 'false',
					description: 'Whether to display the numerical percentage value.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: ProgressSamples
		},
		avatar: {
			title: 'Fluid UI - Avatar',
			description:
				'An avatar element displaying a user photo, automatic initials fallback, and status dot.',
			props: [
				{
					prop: 'src',
					type: 'string',
					default: 'undefined',
					description: 'Image URL for the avatar.'
				},
				{
					prop: 'name',
					type: 'string',
					default: "''",
					description: 'User display name used to compute initials fallback.'
				},
				{
					prop: 'size',
					type: "'sm' | 'md' | 'lg' | 'xl'",
					default: "'md'",
					description: 'Size diameter of the avatar.'
				},
				{
					prop: 'status',
					type: "'online' | 'offline' | 'busy' | 'away'",
					default: 'undefined',
					description: 'Presence status indicator dot.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: AvatarSamples
		},
		combobox: {
			title: 'Fluid UI - Combobox',
			description:
				'A searchable dropdown select component supporting single and multi-select modes, search filtering, and custom snippets.',
			props: [
				{
					prop: 'options',
					type: 'Array<{ value: string; label: string; disabled?: boolean }>',
					default: '[]',
					description: 'List of selectable option items.'
				},
				{
					prop: 'value',
					type: 'string | string[]',
					default: "''",
					description: 'Bound selected value (string or array of strings for multi-select).'
				},
				{
					prop: 'multiple',
					type: 'boolean',
					default: 'false',
					description: 'Allows multiple option selection if true.'
				},
				{
					prop: 'placeholder',
					type: 'string',
					default: "'Select option...'",
					description: 'Placeholder label when nothing is selected.'
				},
				{
					prop: 'searchPlaceholder',
					type: 'string',
					default: "'Search...'",
					description: 'Search input placeholder inside dropdown.'
				},
				{
					prop: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'Disables combobox trigger.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: ComboboxSamples
		},
		slider: {
			title: 'Fluid UI - Slider',
			description:
				'An accessible range slider input supporting drag interaction, step increments, and keyboard navigation.',
			props: [
				{
					prop: 'value',
					type: 'number',
					default: '0',
					description: 'Bound numerical value.'
				},
				{
					prop: 'min',
					type: 'number',
					default: '0',
					description: 'Minimum allowed value.'
				},
				{
					prop: 'max',
					type: 'number',
					default: '100',
					description: 'Maximum allowed value.'
				},
				{
					prop: 'step',
					type: 'number',
					default: '1',
					description: 'Step increment value.'
				},
				{
					prop: 'showValue',
					type: 'boolean',
					default: 'false',
					description: 'Displays current numeric value header.'
				},
				{
					prop: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'Disables slider interaction.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: SliderSamples
		},
		'context-menu': {
			title: 'Fluid UI - ContextMenu',
			description:
				'A desktop-grade contextual menu that opens at pointer coordinates upon right-click with automatic screen boundary clamping.',
			props: [
				{
					prop: 'trigger',
					type: 'Snippet',
					default: 'required',
					description: 'Trigger area snippet listening for contextmenu events.'
				},
				{
					prop: 'menu',
					type: 'Snippet<[{ close: () => void }]>',
					default: 'required',
					description: 'Floating contextual menu panel snippet.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: ContextMenuSamples
		},
		skeleton: {
			title: 'Fluid UI - Skeleton',
			description:
				'An animated shimmer placeholder used to indicate loading content and prevent layout shift.',
			props: [
				{
					prop: 'shape',
					type: "'rectangle' | 'circle' | 'text'",
					default: "'rectangle'",
					description: 'Visual geometry of the placeholder.'
				},
				{
					prop: 'width',
					type: 'string',
					default: 'undefined',
					description: 'Explicit width CSS string.'
				},
				{
					prop: 'height',
					type: 'string',
					default: 'undefined',
					description: 'Explicit height CSS string.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: SkeletonSamples
		},
		spinner: {
			title: 'Fluid UI - Spinner',
			description:
				'A circular animated loading spinner icon for inline actions and loading states.',
			props: [
				{
					prop: 'size',
					type: "'sm' | 'md' | 'lg' | 'xl'",
					default: "'md'",
					description: 'Diameter preset size.'
				},
				{
					prop: 'label',
					type: 'string',
					default: "'Loading...'",
					description: 'Accessible screen reader label.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: SpinnerSamples
		},
		'pin-input': {
			title: 'Fluid UI - PinInput',
			description:
				'A multi-box verification code input for OTP and 2FA authentication with auto-focus advancing and paste support.',
			props: [
				{
					prop: 'length',
					type: 'number',
					default: '6',
					description: 'Total number of digit cells.'
				},
				{
					prop: 'value',
					type: 'string',
					default: "''",
					description: 'Bound combined code string.'
				},
				{
					prop: 'type',
					type: "'number' | 'text' | 'password'",
					default: "'number'",
					description: 'Input character type.'
				},
				{
					prop: 'disabled',
					type: 'boolean',
					default: 'false',
					description: 'Disables all input cells.'
				},
				{
					prop: 'variant',
					type: 'string',
					default: "''",
					description: 'Custom variant class for theming.'
				}
			],
			sampleComponent: PinInputSamples
		}
	}
};
