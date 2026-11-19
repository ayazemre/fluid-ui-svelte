import {
  gettingStartedStylesCss,
  gettingStartedInstallation,
  gettingStartedUsage,
  howToCopyStylesheet,
  howToDarkMode,
  howToIdConvention,
  howToNamingAndHandling,
  howToOverrideMarkup,
  howToOverrideRules,
  howToSnippetComposition,
  howToStylesheetImport,
  howToThemeColors,
  howToVariantMarkup,
  howToVariantRules,
} from "./samples/codeBlockContents.ts";

export const documentationRegistry = {
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
          default: "undefined",
          description: "Direct reference to the underlying rendered DOM element. Supports $bindable.",
          prop: "element",
          type: "HTMLElement",
        },
        {
          default: "''",
          description: "CSS classes to apply to the container.",
          prop: "class",
          type: "string",
        },
        {
          default: "undefined",
          description: "Svelte transition function.",
          prop: "transitionFunction",
          type: "Function",
        },
        {
          default: "undefined",
          description: "Parameters for the transition function.",
          prop: "transitionParameters",
          type: "object",
        },
        {
          default: "—",
          description: "Standard HTML attributes.",
          prop: "...rest",
          type: "HTMLAttributes",
        },
      ],
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
          default: "—",
          description: "Standard HTML <img> attributes.",
          prop: "...rest",
          type: "HTMLImgAttributes",
        },
      ],
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
          default: "—",
          description: "Standard HTML <input> attributes.",
          prop: "...rest",
          type: "HTMLInputAttributes",
        },
      ],
      title: "Fluid UI - Input Field",
    },
    label: {
      description: "A lightweight, accessible label wrapper for form controls with built-in dark mode support.",
      props: [
        {
          default: "undefined",
          description: "The content to be rendered inside the label.",
          prop: "children",
          type: "Snippet",
        },
        {
          default: "''",
          description: "CSS classes to apply to the label.",
          prop: "class",
          type: "string",
        },
        {
          default: "—",
          description: "Standard HTML <label> attributes (e.g. for).",
          prop: "...rest",
          type: "HTMLLabelAttributes",
        },
      ],
      title: "Fluid UI - Label",
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
          default: "—",
          description: "Standard HTML <a> attributes.",
          prop: "...rest",
          type: "HTMLAnchorAttributes",
        },
      ],
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
          default: "—",
          description: "Standard HTML list attributes.",
          prop: "...rest",
          type: "HTMLAttributes",
        },
      ],
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
      ],
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
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
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
      title: "Fluid UI - Accordion",
    },
    "anchored-overlay": {
      description: "A foundational positioning primitive that anchors a floating overlay to a trigger element.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the component container.",
          prop: "id",
          type: "string",
        },
        {
          default: "required",
          description: "Snippet for the anchor trigger element. Receives { isOpen, open, close, toggle }.",
          prop: "anchor",
          type: "Snippet<[{ close, isOpen, open, toggle }]>",
        },
        {
          default: "required",
          description: "Snippet for the floating overlay content. Receives { close }.",
          prop: "overlay",
          type: "Snippet<[{ close }]>",
        },
        {
          default: "false",
          description: "Controls the visibility of the floating overlay. Supports $bindable.",
          prop: "isOpen",
          type: "boolean",
        },
        {
          default: "'bottom-start'",
          description: "The placement position of the overlay relative to the anchor.",
          prop: "position",
          type: "AnchoredOverlayPosition",
        },
        {
          default: "true",
          description: "Whether to automatically flip overlay placement if it would collide with viewport edges.",
          prop: "autoFlip",
          type: "boolean",
        },
        {
          default: "true",
          description: "Whether clicking outside the overlay automatically closes it.",
          prop: "closeOnClickOutside",
          type: "boolean",
        },
        {
          default: "true",
          description: "Whether pressing Escape automatically closes the overlay.",
          prop: "closeOnEscape",
          type: "boolean",
        },
        {
          default: "fade",
          description: "Svelte transition function for the floating overlay.",
          prop: "transitionFunction",
          type: "function",
        },
        {
          default: "{ duration: 150 }",
          description: "Parameters for the transition function.",
          prop: "transitionParameters",
          type: "object",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
      ],
      title: "Fluid UI - Anchored Overlay",
    },
    "calendar-grid": {
      description:
        "A monthly calendar grid primitive powered by the native Date API. It renders a month view based on a provided ISO date without internal year or navigation controls, ideal for composable date pickers and multi-month blocks.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the component wrapper.",
          prop: "id",
          type: "string",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "new Date().toISOString().slice(0, 10)",
          description: "ISO 8601 formatted date string (YYYY-MM-DD) that determines the displayed month. Supports $bindable.",
          prop: "currentDate",
          type: "string",
        },
        {
          default: "''",
          description: "The start date string in ISO format for range selections. Supports $bindable.",
          prop: "startDate",
          type: "string",
        },
        {
          default: "''",
          description: "The end date string in ISO format for range selections. Supports $bindable.",
          prop: "endDate",
          type: "string",
        },
        {
          default: "undefined",
          description: "Optional custom snippet for rendering individual day cells.",
          prop: "daySnippet",
          type: "Snippet<[{ day: string; isCurrentMonth: boolean; isSelected: boolean; isInRange: boolean }]>",
        },
        {
          default: "undefined",
          description: "Optional custom snippet for rendering weekday header labels.",
          prop: "headerSnippet",
          type: "Snippet<[{ weekday: string }]>",
        },
      ],
      title: "Fluid UI - Calendar Grid",
    },
    carousel: {
      description:
        "A performant, accessible carousel component supporting horizontal and vertical orientations, autoplay, custom snippets, and smooth transitions.",
      props: [
        {
          default: "required",
          description: "An array of data items to render in the carousel.",
          prop: "items",
          type: "T[]",
        },
        {
          default: "required",
          description: "Snippet to render each item. Provides access to item and index.",
          prop: "itemTemplate",
          type: "Snippet<[{ item: T; index: number }]>",
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
          default: "0",
          description: "The scroll progress percentage from 0 to 100. Supports $bindable.",
          prop: "scrollPercentage",
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
          default: "required",
          description: "The unique identifier for the component wrapper.",
          prop: "id",
          type: "string",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "undefined",
          description: "Callback fired on scroll with activeIndex and scrollPercentage.",
          prop: "onscroll",
          type: "(event, metrics) => void",
        },
        {
          default: "undefined",
          description: "Callback fired when scrolling finishes with activeIndex and scrollPercentage.",
          prop: "onscrollend",
          type: "(event, metrics) => void",
        },
      ],
      title: "Fluid UI - Carousel",
    },
    "code-block": {
      description:
        "A view only code viewer with syntax highlighting and condensed diff support. Pass modifiedCode to switch into diff mode, otherwise sourceCode renders as a single view.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the component wrapper.",
          prop: "id",
          type: "string",
        },
        {
          default: "required",
          description: "The source code to display. In diff mode this is the original side.",
          prop: "sourceCode",
          type: "string",
        },
        {
          default: "undefined",
          description: "The modified code. When set, the block renders a condensed diff of changed lines plus context.",
          prop: "modifiedCode",
          type: "string",
        },
        {
          default: "undefined",
          description: "An optional string that specifies the programming language (e.g., javascript, typescript, svelte).",
          prop: "language",
          type: "string",
        },
        {
          default: "true",
          description: "Whether to show line numbers in the gutter.",
          prop: "showLineNumbers",
          type: "boolean",
        },
        {
          default: "2",
          description: "Number of unchanged context lines kept around each change in condensed diff view.",
          prop: "diffContextLineCount",
          type: "number",
        },
        {
          default: "true",
          description: "Whether diff mode collapses unchanged sections into gap rows. Set to false for the full file view.",
          prop: "condensedDiff",
          type: "boolean",
        },
        {
          default: "false",
          description: "Whether changed diff rows show per line accept and reject actions.",
          prop: "showDiffLineActions",
          type: "boolean",
        },
        {
          default: "undefined",
          description:
            "Callback fired when a change block is accepted. Takes the modified side for the whole paired change. Receives the clicked row and its row index.",
          prop: "onAcceptDiffLine",
          type: "(payload: DiffLineActionPayload) => void",
        },
        {
          default: "undefined",
          description:
            "Callback fired when a change block is rejected. Keeps the source side for the whole paired change. Receives the clicked row and its row index.",
          prop: "onRejectDiffLine",
          type: "(payload: DiffLineActionPayload) => void",
        },
        {
          default: "undefined",
          description: "Custom parser configuration for token rules. Defaults to the Svelte parser for svelte and html.",
          prop: "parserConfiguration",
          type: "ParserConfiguration",
        },
        {
          default: "undefined",
          description: "Custom token to Tailwind class mapping. Defaults to the default token theme.",
          prop: "tokenThemeMapping",
          type: "TokenThemeMapping",
        },
        {
          default: "undefined",
          description: "Custom diff row and gutter class mapping. Defaults to the default diff theme.",
          prop: "diffThemeMapping",
          type: "DiffThemeMapping",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
      ],
      title: "Fluid UI - Code Block",
    },
    draggable: {
      description: "A flexible wrapper component that enables native HTML5 drag operations for its content with lifecycle callbacks.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the component element.",
          prop: "id",
          type: "string",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "false",
          description: "If true, prevents drag interactions.",
          prop: "disabled",
          type: "boolean",
        },
        {
          default: "required",
          description: "The content to be made draggable. Provides isDragging parameter.",
          prop: "children",
          type: "Snippet<[{ isDragging: boolean }]>",
        },
        {
          default: "undefined",
          description: "Callback triggered when dragging starts. Use this to set dataTransfer.",
          prop: "ondragstart",
          type: "(event: DragEvent) => void",
        },
        {
          default: "undefined",
          description: "Callback triggered continuously while dragging.",
          prop: "ondrag",
          type: "(event: DragEvent) => void",
        },
        {
          default: "undefined",
          description: "Callback triggered when dragging finishes.",
          prop: "ondragend",
          type: "(event: DragEvent) => void",
        },
      ],
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
          default: "required",
          description: "The unique identifier for the component wrapper.",
          prop: "id",
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
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "() => {}",
          description: "Transition function for the drawer panel.",
          prop: "transitionFunction",
          type: "function",
        },
        {
          default: "{}",
          description: "Parameters for the panel transition.",
          prop: "transitionParameters",
          type: "object",
        },
        {
          default: "() => {}",
          description: "Transition function for the backdrop.",
          prop: "backdropTransitionFunction",
          type: "function",
        },
        {
          default: "undefined",
          description: "Parameters for the backdrop transition.",
          prop: "backdropTransitionParameters",
          type: "object",
        },
      ],
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
          default: "required",
          description: "The unique identifier for the component element.",
          prop: "id",
          type: "string",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
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
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "required",
          description: "The unique identifier for the component wrapper.",
          prop: "id",
          type: "string",
        },
      ],
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
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "required",
          description: "The unique identifier for the component wrapper.",
          prop: "id",
          type: "string",
        },
        {
          default: "scale",
          description: "Svelte transition function for the modal panel.",
          prop: "transitionFunction",
          type: "function",
        },
        {
          default: "{ duration: 200, start: 0.95 }",
          description: "Parameters for the panel transition.",
          prop: "transitionParameters",
          type: "object",
        },
        {
          default: "fade",
          description: "Svelte transition function for the backdrop.",
          prop: "backdropTransitionFunction",
          type: "function",
        },
        {
          default: "{ duration: 200 }",
          description: "Parameters for the backdrop transition.",
          prop: "backdropTransitionParameters",
          type: "object",
        },
        {
          default: "required",
          description: "The content of the modal.",
          prop: "children",
          type: "Snippet",
        },
      ],
      title: "Fluid UI - Modal",
    },

    page: {
      description:
        'The Page component is a specialized wrapper for top-level pages. It handles document metadata (SEO, Open Graph, Twitter Cards, JSON-LD schema) and renders a semantic "main" container for content.',
      props: [
        {
          default: "required",
          description: "The unique identifier for the main page element.",
          prop: "id",
          type: "string",
        },
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
          type: "'website' | 'article' | 'profile' | 'book'",
        },
        {
          default: "'summary_large_image'",
          description: "The type of Twitter card to render.",
          prop: "twitterCard",
          type: "'summary' | 'summary_large_image' | 'app' | 'player'",
        },
        {
          default: "''",
          description: "Twitter handle of the website/organization (@username).",
          prop: "twitterSite",
          type: "string",
        },
        {
          default: "''",
          description: "Twitter handle of the content creator/author (@username).",
          prop: "twitterCreator",
          type: "string",
        },
        {
          default: "''",
          description: "The locale of the content (e.g. 'en_US').",
          prop: "locale",
          type: "string",
        },
        {
          default: "''",
          description: "Author name of the page content.",
          prop: "author",
          type: "string",
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
          default: "undefined",
          description: "JSON-LD structured data object or array for rich schema.org search snippets.",
          prop: "structuredData",
          type: "Record<string, unknown> | Array<Record<string, unknown>>",
        },
        {
          default: "''",
          description: "CSS classes to apply to the main container.",
          prop: "class",
          type: "string",
        },
      ],
      title: "Fluid UI - Page",
    },
    pagination: {
      description: "A component for navigating through a series of related content across multiple pages.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the pagination navigation element.",
          prop: "id",
          type: "string",
        },
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
          default: "1",
          description: "Number of always-visible pages before and after the current page.",
          prop: "siblingCount",
          type: "number",
        },
        {
          default: "1",
          description: "Number of always-visible pages at the beginning and end boundaries.",
          prop: "boundaryCount",
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
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "undefined",
          description: "Optional custom snippet for rendering the Previous button content.",
          prop: "previousSnippet",
          type: "Snippet",
        },
        {
          default: "undefined",
          description: "Optional custom snippet for rendering the Next button content.",
          prop: "nextSnippet",
          type: "Snippet",
        },
        {
          default: "undefined",
          description: "Optional custom snippet for rendering ellipsis items.",
          prop: "ellipsisSnippet",
          type: "Snippet",
        },
      ],
      title: "Fluid UI - Pagination",
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
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "required",
          description: "The unique identifier for the component element.",
          prop: "id",
          type: "string",
        },
      ],
      title: "Fluid UI - Switch",
    },
    "time-picker": {
      description:
        "A focused time picker component with scrollable hour and minute columns in 12-hour or 24-hour formats, designed to complement CalendarGrid for full date-time selection.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the component container.",
          prop: "id",
          type: "string",
        },
        {
          default: "'minute'",
          description: "Time selection granularity mode ('hour', 'minute', or 'second').",
          prop: "mode",
          type: "'hour' | 'minute' | 'second'",
        },
        {
          default: "'12:00'",
          description: "The selected time string value. Supports $bindable.",
          prop: "selectedTime",
          type: "string",
        },
        {
          default: "'24h'",
          description: "Time format standard ('12h' or '24h').",
          prop: "format",
          type: "'12h' | '24h'",
        },
        {
          default: "5",
          description: "Step minute interval increment (e.g., 1, 5, 10, 15, 30).",
          prop: "stepMinuteInterval",
          type: "number",
        },
        {
          default: "5",
          description: "Step second interval increment when mode is 'second'.",
          prop: "stepSecondInterval",
          type: "number",
        },
        {
          default: "true",
          description: "Whether to display the header with the active time preview.",
          prop: "showHeader",
          type: "boolean",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
      ],
      title: "Fluid UI - Time Picker",
    },
  },
  pages: {
    conventions: {
      description: "Guides for building with Fluid UI Svelte. Learn how ids, styling, variants, and overrides fit together.",
      sections: [
        {
          content:
            "These guides show how to build with Fluid UI. They cover the id and class conventions, how to style the library, and how to customize components with variants and CSS.",
          id: "intro",
          title: "Conventions",
        },
        {
          code: howToIdConvention,
          description:
            "Give every element an id. Component and prebuilt elements build the ids of their parts from their class name and that id. The root is fluid-<component>-<id>, and each part is fluid-<component>-<part>-<id>, so an id and a class use the same words. Base elements keep the id you give them.",
          id: "mandatory-id",
          language: "svelte",
          table: {
            headers: ["Element", "Class", "Id"],
            rows: [
              ["Accordion root", "fluid-accordion", "fluid-accordion-faq"],
              ["Accordion header", "fluid-accordion-header", "fluid-accordion-header-faq"],
              ["Accordion body", "fluid-accordion-body", "fluid-accordion-body-faq"],
              ["AnchoredOverlay float", "fluid-anchored-overlay-float", "fluid-anchored-overlay-float-my-overlay"],
            ],
          },
          title: "Id Convention",
        },
        {
          description:
            "Build components, prebuilt elements, and pages from base elements instead of raw HTML tags. Base elements merge classes and handle accessibility, so your markup stays consistent.",
          id: "composition-law",
          table: {
            headers: ["Instead of", "Use"],
            rows: [
              ["<div>, <p>, <span>", "<Container>, <Text>"],
              ["<button>, <a>", "<Button>, <Link>"],
              ["<table>, <canvas>", "<Table>, <Canvas>"],
              ["<input>", "<InputField>"],
            ],
          },
          title: "Using Base Elements",
        },
        {
          description:
            "Base elements are low-level wrappers around native HTML. They merge classes and keep markup consistent, so you add styles to them with class.",
          id: "base-rules",
          table: {
            headers: ["Prop", "Type", "Default", "Purpose"],
            rows: [
              ["id", "string", "required", "Identifies the element in the DOM"],
              ["underlyingElement", "HTMLElement | null", "null ($bindable)", "Exposed as $bindable(null) for bind:this"],
              ["class", "string", '""', "Added on top of the default fluid-* class"],
              ["variant (Components/Prebuilt)", "string", '""', "A name you choose, added to the root element"],
            ],
          },
          title: "Base Element Props",
        },
        {
          description:
            "Every element gets its default look from fluidui.css. You change the look in three ways: a class on a base element, a variant on a component or prebuilt element, or a CSS rule in your application. Components and prebuilt elements do not accept class, so you change their look through variants and CSS.",
          id: "style-injection",
          table: {
            headers: ["Layer", "Hook", "Example"],
            rows: [
              ["Base", "class, added on top of the default", '<Button class="rounded-full">'],
              ["Components", "variant, a name added to the root", '<Modal variant="faq-modal">'],
              ["Prebuilt", "variant, a name added to the root", '<InternationalInput variant="checkout-country">'],
            ],
          },
          title: "Styling Hooks",
        },
        {
          code: howToCopyStylesheet,
          description:
            "fluidui.css ships inside the package. Copy it into the root of your project. The copy belongs to your application, so you can edit it. Copies do not update themselves, so copy the file again after each release.",
          id: "stylesheet-copy",
          language: "bash",
          title: "Stylesheet Copy",
        },
        {
          code: howToStylesheetImport,
          description:
            "Import the copied file in your main stylesheet after Tailwind. Fluid UI styles use Tailwind 4 syntax, so your application must run Tailwind 4. Rules you write below the import have no layer, so they win over the library.",
          id: "stylesheet-import",
          language: "css",
          title: "Stylesheet Import",
        },
        {
          code: howToThemeColors,
          description:
            "The library uses Tailwind theme names, such as bg-primary-500. You define the values in your own @theme block. Define every shade from 50 to 950 for primary, secondary, neutral, success, warning, error, and info. The library ships no design tokens in this version. A token layer is planned for a later release.",
          id: "stylesheet-colors",
          language: "css",
          title: "Colors",
        },
        {
          description:
            "All library rules sit in one layer named fluid, placed after the base rules and before utilities. Your unlayered CSS beats every library rule, so overrides need no !important.",
          id: "layers",
          table: {
            headers: ["Rule", "Effect"],
            rows: [
              ["Unlayered application CSS", "Beats every library rule"],
              ["Scoped selectors", ".fluid-accordion .fluid-accordion-body beats the single-class default of the same element"],
              ["Equal specificity", "The rule that comes later in fluidui.css wins"],
            ],
          },
          title: "Layers and Specificity",
        },
        {
          description:
            "Every base element has one default class that holds its look. Components build their parts from base elements, so the parts inherit these defaults unless the component's own rules change them.",
          id: "base-defaults",
          table: {
            headers: ["Element", "Default class"],
            rows: [
              ["Button", "fluid-button"],
              ["Canvas", "fluid-canvas"],
              ["Container", "fluid-container"],
              ["Form", "fluid-form"],
              ["Image", "fluid-image"],
              ["InputField", "fluid-input-field"],
              ["Label", "fluid-label"],
              ["Link", "fluid-link"],
              ["List", "fluid-unordered-list or fluid-ordered-list"],
              ["Table", "fluid-table, with fluid-table-head, fluid-table-body, fluid-table-row, fluid-table-cell, and fluid-table-footer"],
              ["Text", "fluid-text"],
            ],
          },
          title: "Base Defaults",
        },
        {
          code: howToOverrideMarkup,
          description:
            "Add a class to a base element to change one instance. The class is added on top of the default, so the element keeps its default look except where your class sets a different value.",
          id: "overrides-class",
          language: "svelte",
          title: "Overrides Through Class",
        },
        {
          code: howToOverrideRules,
          description:
            "Write a rule in your application to change every element of a kind, or only the elements inside one variant. Start a variant rule from the variant name so it reaches the parts of the component.",
          id: "overrides-rules",
          language: "css",
          title: "Overrides Through CSS",
        },
        {
          code: howToVariantMarkup,
          description:
            "A variant is a name you choose. It is added to the root element of a component or prebuilt element. The library never sets a variant, so the defaults stay unchanged. Variant names must be unique in your application.",
          id: "variants",
          language: "svelte",
          title: "Variants",
        },
        {
          code: howToVariantRules,
          description:
            "Every rule for a variant starts from the variant name, so the variant reaches the parts of its component without the parts carrying the name themselves.",
          id: "variant-rules",
          language: "css",
          title: "Variant Rules",
        },
        {
          code: howToDarkMode,
          description:
            "Dark values use the Tailwind dark variant, which applies inside any element with the dark class. Set the class on the container of the root layout, in src/routes/+layout.svelte, so every page inside it switches together.",
          id: "dark-mode",
          language: "svelte",
          title: "Dark Mode",
        },
        {
          code: howToSnippetComposition,
          description:
            "Use Svelte 5 snippets instead of configuration objects when you need custom markup, such as a slot or an item template. Snippets keep the markup flexible and the components consistent.",
          id: "snippet-passing",
          language: "svelte",
          title: "Snippets for Custom Markup",
        },
        {
          description:
            "Import components from the package in your application. The internal paths below are used inside the library's own source and documentation.",
          id: "imports",
          table: {
            headers: ["Context", "Import Path", "Example"],
            rows: [
              ["Library source", "#src/lib/base/index.ts", 'import { Button } from "#src/lib/base/index.ts"'],
              ["Library source (components)", "#src/lib/components/index.ts", 'import { AnchoredOverlay } from "#src/lib/components/index.ts"'],
              ["Your application", "fluid-ui-svelte/base", "import { Button } from 'fluid-ui-svelte/base'"],
              ["Your application (components)", "fluid-ui-svelte/components", "import { Modal } from 'fluid-ui-svelte/components'"],
              ["Your application (prebuilt)", "fluid-ui-svelte/prebuilt", "import { Breadcrumb } from 'fluid-ui-svelte/prebuilt'"],
            ],
          },
          title: "Import Paths",
        },
        {
          description:
            "Keep markup, logic, and styles in separate files. Markup in .svelte files describes what is rendered. Logic in .ts helpers holds pure functions that compute values. Styles in fluidui.css hold the look.",
          id: "pillars-howto",
          table: {
            headers: ["Kind", "File", "Contains"],
            rows: [
              [".svelte", "Component.svelte", "Markup, with helpers imported from component.ts"],
              [".ts helper", "component.ts", "Pure functions that compute state and values"],
              ["fluidui.css", "fluidui.css", "One block per element, part, and variant"],
            ],
          },
          title: "Where Code Lives",
        },
        {
          code: howToNamingAndHandling,
          description:
            "Use full names for variables and functions, keep functions short, and return early when a precondition fails, so the main path stays at the top level.",
          id: "naming-howto",
          language: "typescript",
          title: "Naming and Error Handling",
        },
      ],
      title: "Fluid UI - Conventions",
    },
    "getting-started": {
      description: "Installation and usage guide for the Fluid UI Svelte component library.",
      sections: [
        {
          content:
            "Fluid UI is a pragmatic Svelte 5 component library designed for flexibility and ease of use. It separates low-level semantic wrappers from high-level interactive components, giving you complete control over your application's architecture.",
          id: "introduction",
          title: "Getting Started",
        },
        {
          description: "The library is organized into three distinct layers with strict boundaries and composition rules:",
          id: "architecture",
          layers: [
            {
              description:
                "Fundamental, low-level semantic wrappers around native HTML elements (Buttons, Inputs, Containers, Tables, Text, Links). Purpose is to reduce HTML tag fatigue, enforce semantic consistency, and maintain accessibility without imposing heavy styles. Utility responsibility is class deduplication, merging, and attribute sanitization. Every base element exposes underlyingElement as $bindable(null) and accepts class, which is added on top of its default fluid-* class.",
              id: "base",
              path: "fluid-ui-svelte/base",
              title: "Base Layer",
            },
            {
              description:
                "Assembled UI elements (Accordions, Modals, Calendars, Drawers, Dropzones, Switches, Pagination). Purpose is to provide focused, cohesive functional primitives. Must be assembled strictly from Base Layer elements. Accepts a variant string that names the root class for user styling. Does not accept class.",
              id: "components",
              path: "fluid-ui-svelte/components",
              title: "Components Layer",
            },
            {
              description:
                "High-level, fully usable, self-contained domain components (Breadcrumbs, International Inputs, Notification Areas). Purpose is to combine multiple base and composed components into turnkey workflows. Must compose Base and Components. Accepts a variant string that names the root class for user styling. Does not accept class.",
              id: "prebuilt",
              path: "fluid-ui-svelte/prebuilt",
              title: "Prebuilt Layer",
            },
          ],
          title: "Library Structure",
        },
        {
          id: "installation",
          steps: [
            {
              code: gettingStartedInstallation,
              description: "Install the library using your package manager of choice.",
              id: "step-1",
              language: "bash",
              title: "1. Install the package",
            },
            {
              code: gettingStartedStylesCss,
              description:
                "Fluid UI does not inject styles automatically. Copy fluidui.css from the installed package into your project, then import it in your main stylesheet after Tailwind. The file uses Tailwind 4 syntax.",
              id: "step-2",
              language: "css",
              title: "2. Configure Global Styles",
            },
          ],
          title: "Installation",
        },
        {
          code: gettingStartedUsage,
          description: "Import components directly from their respective layers. Svelte 5 Runes mode is required.",
          id: "usage",
          language: "svelte",
          title: "Usage",
        },
      ],
      title: "Fluid UI - Getting Started",
    },
  },
  prebuilt: {
    breadcrumb: {
      description: "A navigation aid that allows users to keep track of their location within programs, documents, or websites.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the component wrapper.",
          prop: "id",
          type: "string",
        },
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
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
      ],
      title: "Fluid UI - Breadcrumb",
    },
    "international-input": {
      description:
        "A universal international input component featuring a country flag dropdown and mode-based format placeholders for phone numbers, timezones, country codes, and currencies.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the component wrapper.",
          prop: "id",
          type: "string",
        },
        {
          default: "'phone'",
          description: "The input mode: 'phone' | 'country' | 'timezone' | 'currency' | 'dialCode'.",
          prop: "mode",
          type: "InternationalInputMode",
        },
        {
          default: "'US'",
          description: "The selected ISO country code. Supports $bindable.",
          prop: "selectedCountry",
          type: "string",
        },
        {
          default: "'+1'",
          description: "The selected international dial code. Supports $bindable.",
          prop: "dialCode",
          type: "string",
        },
        {
          default: "''",
          description: "The input text/phone value. Supports $bindable.",
          prop: "value",
          type: "string",
        },
        {
          default: "undefined",
          description: "Custom placeholder. If omitted, uses the country's example format for the current mode.",
          prop: "placeholder",
          type: "string",
        },
        {
          default: "'Search country...'",
          description: "Placeholder text for the country search input.",
          prop: "searchPlaceholder",
          type: "string",
        },
        {
          default: "false",
          description: "Whether the input is disabled.",
          prop: "disabled",
          type: "boolean",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
      ],
      title: "Fluid UI - International Input",
    },
    "notification-area": {
      description:
        "A generic fixed viewport container managing lifecycle timers, screen edge positioning, and animations, rendering custom user snippets for each notification item.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the notification area element.",
          prop: "id",
          type: "string",
        },
        {
          default: "[]",
          description: "Bindable generic array of items extending { id: string | number; duration?: number }.",
          prop: "items",
          type: "T[]",
        },
        {
          default: "'top-right'",
          description: "The fixed screen edge zone where notifications are positioned.",
          prop: "position",
          type: "'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
        {
          default: "required",
          description: "Generic snippet function receiving (item: T, dismiss: () => void).",
          prop: "itemSnippet",
          type: "Snippet<[item: T, dismiss: () => void]>",
        },
      ],
      title: "Fluid UI - Notification Area",
    },
    "searchable-selector": {
      description:
        "A searchable dropdown selector with circle avatar, name, and double arrow trigger. Filters items by label or value and shows avatar initials or image.",
      props: [
        {
          default: "required",
          description: "The unique identifier for the selector wrapper.",
          prop: "id",
          type: "string",
        },
        {
          default: "required",
          description: "Array of selectable items with value, label, and optional avatarText or avatarImage.",
          prop: "items",
          type: "Array<{ value: string; label: string; avatarText?: string; avatarImage?: string }>",
        },
        {
          default: "undefined",
          description: "The selected item value. Supports $bindable.",
          prop: "selectedValue",
          type: "string | undefined",
        },
        {
          default: "'Select an option'",
          description: "Placeholder when no item is selected.",
          prop: "placeholder",
          type: "string",
        },
        {
          default: "'Search...'",
          description: "Placeholder for the search input.",
          prop: "searchPlaceholder",
          type: "string",
        },
        {
          default: "false",
          description: "Whether the selector is disabled.",
          prop: "disabled",
          type: "boolean",
        },
        {
          default: "''",
          description: "User-defined variant name, added to the root element. Style it with a CSS rule that starts from the root.",
          prop: "variant",
          type: "string",
        },
      ],
      title: "Fluid UI - Searchable Selector",
    },
  },
};
