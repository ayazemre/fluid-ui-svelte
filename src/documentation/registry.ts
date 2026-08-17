import AccordionSamples from "./samples/AccordionSamples.svelte";
import BreadcrumbSamples from "./samples/BreadcrumbSamples.svelte";
import ButtonSamples from "./samples/ButtonSamples.svelte";
import CarouselSamples from "./samples/CarouselSamples.svelte";
import CodeBlockSamples from "./samples/CodeBlockSamples.svelte";
import ContainerSamples from "./samples/ContainerSamples.svelte";
import DatePickerSamples from "./samples/DatePickerSamples.svelte";
import DraggableSamples from "./samples/DraggableSamples.svelte";
import DrawerSamples from "./samples/DrawerSamples.svelte";
import DropzoneSamples from "./samples/DropzoneSamples.svelte";
import FormSamples from "./samples/FormSamples.svelte";
import ImageCropSamples from "./samples/ImageCropSamples.svelte";
import ImageSamples from "./samples/ImageSamples.svelte";
import InputFieldSamples from "./samples/InputFieldSamples.svelte";
import LinkSamples from "./samples/LinkSamples.svelte";
import ListSamples from "./samples/ListSamples.svelte";
import ModalSamples from "./samples/ModalSamples.svelte";
import NotificationSamples from "./samples/NotificationSamples.svelte";
import PageSamples from "./samples/PageSamples.svelte";
import PaginationSamples from "./samples/PaginationSamples.svelte";
import PopoverSamples from "./samples/PopoverSamples.svelte";
import SwitchSamples from "./samples/SwitchSamples.svelte";
import TableSamples from "./samples/TableSamples.svelte";
import TextSamples from "./samples/TextSamples.svelte";

export const componentRegistry = {
  base: {
    button: {
      description:
        "The Button component is used to trigger an action or event, such as submitting a form, opening a dialog, or performing a data-related action.",
      props: [
        {
          default: "required",
          description: "Async event handler. Set state.inProgress to manage loading state.",
          prop: "onclick",
          type: "(event, state) => Promise<void>",
        },
        {
          default: "''",
          description: "CSS classes to apply to the button.",
          prop: "class",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes the base fluid-button class.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
        {
          default: "undefined",
          description: "Snippet to render when onclick is in progress.",
          prop: "loadingPlaceholder",
          type: "Snippet",
        },
        {
          default: "—",
          description: "Standard HTML button attributes.",
          prop: "...rest",
          type: "HTMLButtonAttributes",
        },
      ],
      sampleComponent: ButtonSamples,
      title: "Fluid UI - Button",
    },
    container: {
      description: "The Container component is a versatile wrapper for layout and styling, rendering as different HTML5 semantic elements.",
      props: [
        {
          default: "'div'",
          description: "The HTML element tag to render.",
          prop: "type",
          type: "'div' | 'nav' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'article'",
        },
        {
          default: "''",
          description: "CSS classes to apply to the container.",
          prop: "class",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes the base fluid-container class.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
        {
          default: "undefined",
          description: "Svelte transition function.",
          prop: "transitionFn",
          type: "Function",
        },
        {
          default: "undefined",
          description: "Parameters for the transition function.",
          prop: "transitionParams",
          type: "object",
        },
        {
          default: "—",
          description: "Standard HTML attributes.",
          prop: "...rest",
          type: "HTMLAttributes",
        },
      ],
      sampleComponent: ContainerSamples,
      title: "Fluid UI - Container",
    },
    form: {
      description:
        "The Form component is a thin wrapper around the HTML <form> element that automatically prevents default browser submission behavior.",
      props: [
        {
          default: "''",
          description: "CSS classes to apply to the form.",
          prop: "class",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes the base fluid-form class.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
        {
          default: "required",
          description: "The content of the form.",
          prop: "children",
          type: "Snippet",
        },
        {
          default: "—",
          description: "Standard HTML form attributes.",
          prop: "...rest",
          type: "HTMLFormAttributes",
        },
      ],
      sampleComponent: FormSamples,
      title: "Fluid UI - Form",
    },
    image: {
      description: "The Image component is a wrapper for the native HTML <img> tag, with built-in styling for loading states.",
      props: [
        {
          default: "required",
          description: "The image source URL.",
          prop: "src",
          type: "string",
        },
        {
          default: "required",
          description: "Alternative text for the image.",
          prop: "alt",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes to apply to the image.",
          prop: "class",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes the base fluid-image class.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
        {
          default: "—",
          description: "Standard HTML <img> attributes.",
          prop: "...rest",
          type: "HTMLImgAttributes",
        },
      ],
      sampleComponent: ImageSamples,
      title: "Fluid UI - Image",
    },
    "input-field": {
      description:
        "The Input Field component is an enhanced wrapper for the native HTML <input> element. It provides built-in functionality for real-time character filtering.",
      props: [
        {
          default: "''",
          description: "The input's bound value.",
          prop: "value",
          type: "string",
        },
        {
          default: "'text'",
          description: "The type of the input field.",
          prop: "type",
          type: "'text' | 'password' | 'textarea'",
        },
        {
          default: "undefined",
          description: "Array of allowed characters. If set, other characters are rejected.",
          prop: "characterFilter",
          type: "string[]",
        },
        {
          default: "''",
          description: "CSS classes to apply to the input.",
          prop: "class",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes the base fluid-input-field class.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
        {
          default: "—",
          description: "Standard HTML <input> attributes.",
          prop: "...rest",
          type: "HTMLInputAttributes",
        },
      ],
      sampleComponent: InputFieldSamples,
      title: "Fluid UI - Input Field",
    },
    link: {
      description: "A standard anchor wrapper styled for Fluid UI, supporting client-side navigation in SvelteKit.",
      props: [
        {
          default: "required",
          description: "The destination URL or path.",
          prop: "href",
          type: "string",
        },
        {
          default: "required",
          description: "The content to be rendered inside the link.",
          prop: "children",
          type: "Snippet",
        },
        {
          default: "''",
          description: "CSS classes to apply to the link.",
          prop: "class",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes the base fluid-link class.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
        {
          default: "—",
          description: "Standard HTML <a> attributes.",
          prop: "...rest",
          type: "HTMLAnchorAttributes",
        },
      ],
      sampleComponent: LinkSamples,
      title: "Fluid UI - Link",
    },
    list: {
      description: "The List component is a flexible component for rendering ordered or unordered lists from an array of items.",
      props: [
        {
          default: "'ul'",
          description: "Specifies the type of list to render.",
          prop: "type",
          type: "'ol' | 'ul'",
        },
        {
          default: "[]",
          description: "An array of items to be rendered.",
          prop: "items",
          type: "Array<T>",
        },
        {
          default: "required",
          description: "A Svelte snippet used to render each item. Receives item and index.",
          prop: "itemTemplate",
          type: "Snippet<[T, number]>",
        },
        {
          default: "''",
          description: "Custom CSS classes for the list element.",
          prop: "class",
          type: "string",
        },
        {
          default: "''",
          description: "Custom CSS classes for each list item (li).",
          prop: "itemClass",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes default fluid styling.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
        {
          default: "—",
          description: "Standard HTML list attributes.",
          prop: "...rest",
          type: "HTMLAttributes",
        },
      ],
      sampleComponent: ListSamples,
      title: "Fluid UI - List",
    },
    table: {
      description: "A flexible component for displaying tabular data with customizable cell rendering using Svelte snippets.",
      props: [
        {
          default: "''",
          description: "An optional caption for the table.",
          prop: "caption",
          type: "string",
        },
        {
          default: "required",
          description: "Data for the header row.",
          prop: "tableHeadItems",
          type: "Array<T>",
        },
        {
          default: "required",
          description: "Data for the body rows.",
          prop: "tableRowItems",
          type: "Array<Array<U>>",
        },
        {
          default: "required",
          description: "Data for the footer row.",
          prop: "tableFooterItems",
          type: "Array<V>",
        },
        {
          default: "required",
          description: "Snippet for rendering header cells.",
          prop: "headTemplate",
          type: "Snippet<[T]>",
        },
        {
          default: "required",
          description: "Snippet for rendering body cells.",
          prop: "bodyTemplate",
          type: "Snippet<[U]>",
        },
        {
          default: "required",
          description: "Snippet for rendering footer cells.",
          prop: "footerTemplate",
          type: "Snippet<[V]>",
        },
        {
          default: "''",
          description: "CSS classes for the table element.",
          prop: "class",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes for the caption element.",
          prop: "captionClass",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes for the thead element.",
          prop: "headClass",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes for the tbody element.",
          prop: "bodyClass",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes for tr elements.",
          prop: "rowClass",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes for th and td elements.",
          prop: "cellClass",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes for the tfoot element.",
          prop: "footerClass",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes default fluid-table classes.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
      ],
      sampleComponent: TableSamples,
      title: "Fluid UI - Table",
    },
    text: {
      description: "A versatile component for rendering semantic text elements with consistent typography.",
      props: [
        {
          default: "'p'",
          description: "The HTML element to render (h1-h6, p, span, code, etc.).",
          prop: "type",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes to apply to the element.",
          prop: "class",
          type: "string",
        },
        {
          default: "false",
          description: "If true, removes the base fluid-text class.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
        {
          default: "—",
          description: "The text content to render.",
          prop: "children",
          type: "Snippet",
        },
        {
          default: "—",
          description: "Standard HTML attributes for the chosen element type.",
          prop: "...rest",
          type: "HTMLAttributes",
        },
      ],
      sampleComponent: TextSamples,
      title: "Fluid UI - Text",
    },
  },
  components: {
    accordion: {
      description:
        "A collapsible component used to organize content into toggleable sections. It's an ideal solution for FAQs, progressive disclosure, or compacting complex information.",
      props: [
        {
          default: "''",
          description: "Custom CSS class to apply to the accordion wrapper.",
          prop: "variant",
          type: "string",
        },
        {
          default: "required",
          description: "Snippet for the toggleable header content.",
          prop: "header",
          type: "Snippet<[{ isExpanded: boolean }]>",
        },
        {
          default: "required",
          description: "Snippet for the collapsible body content.",
          prop: "body",
          type: "Snippet",
        },
        {
          default: "slide",
          description: "Svelte transition function for the expansion animation.",
          prop: "transitionFunction",
          type: "function",
        },
        {
          default: "250",
          description: "Duration of the expansion animation in ms.",
          prop: "transitionDuration",
          type: "number",
        },
      ],
      sampleComponent: AccordionSamples,
      title: "Fluid UI - Accordion",
    },
    breadcrumb: {
      description: "A navigation aid that allows users to keep track of their location within programs, documents, or websites.",
      props: [
        {
          default: "[]",
          description: "An array of breadcrumb items.",
          prop: "items",
          type: "Array<{ label: string; href: string }>",
        },
        {
          default: "'/'",
          description: "The separator element between items.",
          prop: "separator",
          type: "string | Snippet",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
        {
          default: "crypto.randomUUID()",
          description: "The unique identifier for the component wrapper.",
          prop: "componentId",
          type: "string",
        },
      ],
      sampleComponent: BreadcrumbSamples,
      title: "Fluid UI - Breadcrumb",
    },
    carousel: {
      description: "A high-performance carousel with custom JS-based snapping and smooth touch interactions.",
      props: [
        {
          default: "required",
          description: "Array of data items to render.",
          prop: "items",
          type: "T[]",
        },
        {
          default: "required",
          description: "Snippet to render each item. Provides access to item and index.",
          prop: "itemTemplate",
          type: "Snippet<[T, number]>",
        },
        {
          default: "'horizontal'",
          description: "The scroll direction of the carousel.",
          prop: "orientation",
          type: "'horizontal' | 'vertical'",
        },
        {
          default: "true",
          description: "Whether to automatically snap to the nearest item after a swipe.",
          prop: "snapItems",
          type: "boolean",
        },
        {
          default: "1",
          description: "Number of items visible at once.",
          prop: "visibleItemCount",
          type: "number",
        },
        {
          default: "0",
          description: "The currently active slide index. Supports $bindable.",
          prop: "activeIndex",
          type: "number",
        },
        {
          default: "false",
          description: "Whether to automatically cycle through items.",
          prop: "autoplay",
          type: "boolean",
        },
        {
          default: "1000",
          description: "Interval in milliseconds for autoplay.",
          prop: "autoplayDuration",
          type: "number",
        },
        {
          default: "crypto.randomUUID()",
          description: "The unique identifier for the component wrapper.",
          prop: "componentId",
          type: "string",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
      ],
      sampleComponent: CarouselSamples,
      title: "Fluid UI - Carousel",
    },
    "code-block": {
      description: "A component for displaying formatted code snippets with syntax highlighting.",
      props: [
        {
          default: "required",
          description: "A string containing the code to be displayed.",
          prop: "code",
          type: "string",
        },
        {
          default: "undefined",
          description: "An optional string that specifies the programming language (e.g., javascript, typescript, svelte).",
          prop: "language",
          type: "string",
        },
        {
          default: "''",
          description: "Custom CSS classes to apply custom styling variants.",
          prop: "variant",
          type: "string",
        },
        {
          default: "false",
          description: "If true, prevents the component from applying its default styling.",
          prop: "overrideDefaultStyling",
          type: "boolean",
        },
      ],
      sampleComponent: CodeBlockSamples,
      title: "Fluid UI - Code Block",
    },
    "date-picker": {
      description:
        "A highly flexible, headless-inspired calendar component. It renders a month view based on a provided date, giving you full control over navigation and layout.",
      props: [
        {
          default: "undefined",
          description: "The unique identifier for the component wrapper.",
          prop: "componentId",
          type: "string",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
        {
          default: "new Date().toISOString()",
          description: "ISO 8601 formatted date string that determines the displayed month. Supports $bindable.",
          prop: "currentDate",
          type: "string",
        },
        {
          default: "undefined",
          description: "Selected start date (ISO 8601). Supports $bindable.",
          prop: "startDate",
          type: "string",
        },
        {
          default: "undefined",
          description: "Selected end date (ISO 8601). Supports $bindable.",
          prop: "endDate",
          type: "string",
        },
        {
          default: "['Mon', 'Tue', ...]",
          description: "Array of week day names to display in the header.",
          prop: "weekDays",
          type: "string[]",
        },
        {
          default: "false",
          description: "Whether to hide days from previous/next months.",
          prop: "hideRollingDays",
          type: "boolean",
        },
      ],
      sampleComponent: DatePickerSamples,
      title: "Fluid UI - Date Picker",
    },
    draggable: {
      description: "A barebone wrapper component that enables native HTML5 drag operations for its content.",
      props: [
        {
          default: "''",
          description: "The unique identifier for the component element.",
          prop: "componentId",
          type: "string",
        },
        {
          default: "''",
          description: "Custom CSS variant class.",
          prop: "variant",
          type: "string",
        },
        {
          default: "required",
          description: "The content to be made draggable.",
          prop: "children",
          type: "Snippet",
        },
        {
          default: "undefined",
          description: "Callback triggered when dragging starts. Use this to set dataTransfer.",
          prop: "ondragstart",
          type: "(event: DragEvent) => void",
        },
      ],
      sampleComponent: DraggableSamples,
      title: "Fluid UI - Draggable",
    },
    drawer: {
      description: "A programmatic sliding panel component that appears from the edge of the screen.",
      props: [
        {
          default: "false",
          description: "Controls the visibility of the drawer. Supports $bindable.",
          prop: "isOpen",
          type: "boolean",
        },
        {
          default: "undefined",
          description: "The unique identifier for the component wrapper.",
          prop: "componentId",
          type: "string",
        },
        {
          default: "'left'",
          description: "The side of the screen from which the drawer appears.",
          prop: "position",
          type: "'left' | 'right' | 'top' | 'bottom'",
        },
        {
          default: "true",
          description: "Whether clicking the backdrop should close the drawer.",
          prop: "closeOnBackdropClick",
          type: "boolean",
        },
        {
          default: "true",
          description: "Whether to prevent body scrolling when the drawer is open.",
          prop: "scrollLock",
          type: "boolean",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
        {
          default: "() => {}",
          description: "Transition function for the drawer panel.",
          prop: "transitionFn",
          type: "function",
        },
        {
          default: "{}",
          description: "Parameters for the panel transition.",
          prop: "transitionParams",
          type: "object",
        },
        {
          default: "() => {}",
          description: "Transition function for the backdrop.",
          prop: "backdropTransitionFn",
          type: "function",
        },
        {
          default: "undefined",
          description: "Parameters for the backdrop transition.",
          prop: "backdropTransitionParams",
          type: "object",
        },
      ],
      sampleComponent: DrawerSamples,
      title: "Fluid UI - Drawer",
    },
    dropzone: {
      description: "A barebone area for receiving files or data via drag and drop events.",
      props: [
        {
          default: "undefined",
          description: "The dropped data (files or text). Supports $bindable.",
          prop: "data",
          type: "File[] | string",
        },
        {
          default: "'file'",
          description: "Specifies the type of data the dropzone accepts.",
          prop: "mode",
          type: "'file' | 'text'",
        },
        {
          default: "'copy'",
          description: "The visual feedback during the drag operation.",
          prop: "dropEffect",
          type: "'copy' | 'move' | 'link' | 'none'",
        },
        {
          default: "''",
          description: "The unique identifier for the component element.",
          prop: "componentId",
          type: "string",
        },
        {
          default: "''",
          description: "Custom CSS variant class.",
          prop: "variant",
          type: "string",
        },
        {
          default: "required",
          description: "Snippet for the dropzone content. Receives drag state.",
          prop: "children",
          type: "Snippet<[{ isDragOver: boolean; isInvalid: boolean }]>",
        },
      ],
      sampleComponent: DropzoneSamples,
      title: "Fluid UI - Dropzone",
    },
    "image-crop": {
      description: "A canvas-based component for cropping images with zoom and pan support, providing a real-time cropped preview.",
      props: [
        {
          default: "required",
          description: "The source ImageBitmap to be cropped.",
          prop: "sourceImage",
          type: "ImageBitmap",
        },
        {
          default: "required",
          description: "Fixed aspect ratio for the crop area.",
          prop: "aspectRatio",
          type: "{ x: number, y: number }",
        },
        {
          default: "undefined",
          description: "The base64 encoded cropped image result. Supports $bindable.",
          prop: "resultImage",
          type: "string",
        },
        {
          default: "1",
          description: "Zoom level for the image.",
          prop: "zoom",
          type: "number",
        },
        {
          default: "{ x: 0, y: 0 }",
          description: "Pan coordinates (x, y) for the image.",
          prop: "pan",
          type: "{ x: number, y: number }",
        },
        {
          default: "0",
          description: "Padding in pixels around the crop area within the canvas.",
          prop: "padding",
          type: "number",
        },
        {
          default: "'rectangle'",
          description: "The shape of the crop area.",
          prop: "shape",
          type: "'rectangle' | 'circle'",
        },
        {
          default: "'rgba(0, 0, 0, 0.5)'",
          description: "The color of the overlay around the crop area.",
          prop: "overlayColor",
          type: "string",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
        {
          default: "undefined",
          description: "The unique identifier for the component wrapper.",
          prop: "componentId",
          type: "string",
        },
      ],
      sampleComponent: ImageCropSamples,
      title: "Fluid UI - Image Crop",
    },
    modal: {
      description: "A barebone centered modal component for critical actions or information.",
      props: [
        {
          default: "false",
          description: "Controls the visibility of the modal. Supports $bindable.",
          prop: "isOpen",
          type: "boolean",
        },
        {
          default: "true",
          description: "Whether clicking the backdrop closes the modal.",
          prop: "closeOnBackdropClick",
          type: "boolean",
        },
        {
          default: "true",
          description: "Whether to lock body scroll when the modal is open.",
          prop: "scrollLock",
          type: "boolean",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
        {
          default: "crypto.randomUUID()",
          description: "The unique identifier for the component wrapper.",
          prop: "componentId",
          type: "string",
        },
        {
          default: "scale",
          description: "Svelte transition function for the modal panel.",
          prop: "transitionFn",
          type: "function",
        },
        {
          default: "{ duration: 200, start: 0.95 }",
          description: "Parameters for the panel transition.",
          prop: "transitionParams",
          type: "object",
        },
        {
          default: "fade",
          description: "Svelte transition function for the backdrop.",
          prop: "backdropTransitionFn",
          type: "function",
        },
        {
          default: "{ duration: 200 }",
          description: "Parameters for the backdrop transition.",
          prop: "backdropTransitionParams",
          type: "object",
        },
        {
          default: "required",
          description: "The content of the modal.",
          prop: "children",
          type: "Snippet",
        },
      ],
      sampleComponent: ModalSamples,
      title: "Fluid UI - Modal",
    },
    "notification-area": {
      description: "A fixed area for displaying non-intrusive notifications and alerts.",
      props: [
        {
          default: "[]",
          description: "A bindable array of notification items.",
          prop: "items",
          type: "Notification[]",
        },
        {
          default: "'top-right'",
          description: "The corner of the screen where notifications appear.",
          prop: "position",
          type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
      ],
      sampleComponent: "",
      title: "Fluid UI - Notification Area",
    },
    page: {
      description:
        'The Page component is a specialized wrapper for top-level pages. It handles document metadata (SEO, Open Graph, Twitter Cards) and provides a standard "main" container for content.',
      props: [
        {
          default: "''",
          description: "The title of the page (appears in browser tab and search results).",
          prop: "title",
          type: "string",
        },
        {
          default: "''",
          description: "A brief summary of the page for search engines and social previews.",
          prop: "description",
          type: "string",
        },
        {
          default: "''",
          description: "URL of the image used for social media previews.",
          prop: "image",
          type: "string",
        },
        {
          default: "''",
          description: "Alt text for the social preview image.",
          prop: "imageAlt",
          type: "string",
        },
        {
          default: "''",
          description: "The canonical URL of the page.",
          prop: "url",
          type: "string",
        },
        {
          default: "''",
          description: "The name of the overall website.",
          prop: "siteName",
          type: "string",
        },
        {
          default: "'website'",
          description: "The type of Open Graph object.",
          prop: "type",
          type: "'website' | 'article' | 'profile'",
        },
        {
          default: "'summary_large_image'",
          description: "The type of Twitter card to render.",
          prop: "twitterCard",
          type: "'summary' | 'summary_large_image'",
        },
        {
          default: "''",
          description: "Color for the browser toolbar/address bar.",
          prop: "themeColor",
          type: "string",
        },
        {
          default: "'index, follow'",
          description: "Instructions for search engine crawlers.",
          prop: "robots",
          type: "string",
        },
        {
          default: "''",
          description: "Comma-separated keywords for the page.",
          prop: "keywords",
          type: "string",
        },
        {
          default: "''",
          description: "CSS classes to apply to the main container.",
          prop: "class",
          type: "string",
        },
      ],
      sampleComponent: PageSamples,
      title: "Fluid UI - Page",
    },
    pagination: {
      description: "A component for navigating through a series of related content across multiple pages.",
      props: [
        {
          default: "1",
          description: "The currently active page. Supports $bindable.",
          prop: "currentPage",
          type: "number",
        },
        {
          default: "1",
          description: "The total number of pages.",
          prop: "totalPages",
          type: "number",
        },
        {
          default: "undefined",
          description: "Async callback triggered when the page changes.",
          prop: "onPageChange",
          type: "(page: number) => Promise<void>",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
        {
          default: "crypto.randomUUID()",
          description: "The unique identifier for the component wrapper.",
          prop: "componentId",
          type: "string",
        },
      ],
      sampleComponent: PaginationSamples,
      title: "Fluid UI - Pagination",
    },
    popover: {
      description: "A dynamic and flexible popover component used for dropdowns, tooltips, and contextual menus.",
      props: [
        {
          default: "required",
          description: "Snippet for the element that triggers the popover.",
          prop: "trigger",
          type: "Snippet",
        },
        {
          default: "required",
          description: "Snippet for the content displayed inside the popover.",
          prop: "content",
          type: "Snippet",
        },
        {
          default: "false",
          description: "Controls the visibility of the popover. Supports $bindable.",
          prop: "isOpen",
          type: "boolean",
        },
        {
          default: "'bottom'",
          description: "The preferred position of the popover relative to the trigger.",
          prop: "position",
          type: "'top' | 'bottom' | 'left' | 'right'",
        },
        {
          default: "''",
          description: "Custom variant class for theming.",
          prop: "variant",
          type: "string",
        },
        {
          default: "crypto.randomUUID()",
          description: "The unique identifier for the component wrapper.",
          prop: "componentId",
          type: "string",
        },
        {
          default: "fade",
          description: "Svelte transition function for the popover content.",
          prop: "transitionFn",
          type: "function",
        },
        {
          default: "{ duration: 150 }",
          description: "Parameters for the transition function.",
          prop: "transitionParams",
          type: "object",
        },
      ],
      sampleComponent: PopoverSamples,
      title: "Fluid UI - Popover",
    },
    switch: {
      description: "A simple toggle switch component used for binary settings or preferences.",
      props: [
        {
          default: "false",
          description: "The current state of the switch. Supports $bindable.",
          prop: "checked",
          type: "boolean",
        },
        {
          default: "required",
          description: "Async callback triggered when the switch is toggled.",
          prop: "onclick",
          type: "(event: Event, checked: boolean) => Promise<void>",
        },
        {
          default: "false",
          description: "If true, prevents user interaction.",
          prop: "disabled",
          type: "boolean",
        },
        {
          default: "''",
          description: "Custom CSS variant class.",
          prop: "variant",
          type: "string",
        },
        {
          default: "''",
          description: "The unique identifier for the component element.",
          prop: "componentId",
          type: "string",
        },
      ],
      sampleComponent: SwitchSamples,
      title: "Fluid UI - Switch",
    },
  },
};
