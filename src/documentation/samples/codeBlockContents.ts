// Parsing errors happen in code editor when imports and script tags used inside code block component's contents.
// To prevent this we import usage examples from here.

const gettingStartedAppCss = `/* src/app.css */
@import "./fluidui.css";

/* Your application styles */`;

const gettingStartedUsage = `<script>
  // Import a base element for custom implementation
  import { Button } from 'fluid-ui-svelte/base';

  // Import a pre-built component
  import { Accordion } from 'fluid-ui-svelte/components';
</script>

<Button onclick={handleClick}>Submit</Button>

<Accordion>
  <!-- Accordion content -->
</Accordion>`;

// --- Button ---

const buttonPrimary = `<Button class="fluid-button-primary">Primary Button</Button>`;

const buttonSecondary = `<Button class="fluid-button-secondary">Secondary Button</Button>`;

const buttonOutline = `<Button class="fluid-button-outline">Outline Button</Button>`;

const buttonTransparent = `<Button class="fluid-button-transparent">Transparent Button</Button>`;

const buttonIcon = `<Button class="fluid-button-primary">
  <Icon icon="mdi:github" />
  <Text type="span">GitHub</Text>
</Button>`;

// --- Accordion ---

const accordionStandard = `<Accordion>
  {#snippet header({ isExpanded })}
    <Text>Title</Text>
    <Icon icon={isExpanded ? 'up' : 'down'} />
  {/snippet}
  {#snippet body()}
    <Text>Hidden content</Text>
  {/snippet}
</Accordion>`;

const accordionCustom = `import { fade } from 'svelte/transition';

<Accordion transitionFunction={fade} transitionDuration={500}>
  ...
</Accordion>`;

// --- Container ---

const containerHeader = `<Container type="header" class="bg-primary-100 p-4">
  <Text>Header Content</Text>
</Container>`;

const containerNav = `<Container type="nav" class="bg-secondary-100 p-4">
  <Text>Navigation Content</Text>
</Container>`;

const containerSection = `<Container type="section" class="bg-info-100 p-4">
  <Text>Section Content</Text>
</Container>`;

const containerFooter = `<Container type="footer" class="bg-warning-100 p-4">
  <Text>Footer Content</Text>
</Container>`;

// --- Image ---

const imageStandard = `<Container class="h-48 w-full overflow-hidden rounded-lg">
  <Image
    src="https://picsum.photos/id/1018/500/300"
    alt="Nature scene"
    class="h-full w-full object-cover"
  />
</Container>`;

const imageLoading = `<!-- The src is populated after a delay to demonstrate 
     the built-in skeleton loading effect -->
<Image
  src={delayedSrc}
  alt="Delayed Image"
  class="h-full w-full object-cover!"
/>`;

// --- Label ---

const labelStandard = `<Container class="flex flex-col gap-1.5">
  <Label for="full-name">Full Name</Label>
  <InputField id="full-name" placeholder="John Doe" />
</Container>`;

const labelRequired = `<Container class="flex flex-col gap-1.5">
  <Label for="email-address">
    Email Address <Text type="span" class="text-error-500">*</Text>
  </Label>
  <InputField id="email-address" type="email" placeholder="john@example.com" />
</Container>`;

const labelCustom = `<Label for="custom-input" class="text-primary-600 font-semibold tracking-wide">
  Custom Styled Label
</Label>`;

// --- Link ---

const linkStandard = `<Link href="/documentation/base/button">
  Navigate to Button
</Link>`;

const linkCustom = `<Link 
  href="/documentation/base/image" 
  class="font-bold text-primary-600 uppercase"
>
  Bold Primary Link
</Link>`;

// --- List ---

const listUnordered = `<List items={fruitItems}>
  {#snippet itemTemplate(item)}
    {item}
  {/snippet}
</List>`;

const listOrdered = `<List type="ol" items={numberItems}>
  {#snippet itemTemplate(item)}
    Step {item}
  {/snippet}
</List>`;

const listItemStyling = `<List 
  items={fruitItems} 
  itemClass="p-2 bg-neutral-100 rounded list-none"
>
  {#snippet itemTemplate(item)}
    {item}
  {/snippet}
</List>`;

const listComplex = `<List items={tasks}>
  {#snippet itemTemplate(item)}
    <Text class={item.completed ? 'line-through' : ''}>{item.text}</Text>
  {/snippet}
</List>`;

// --- Table ---

const tableStandard = `<Table 
  caption="User Directory"
  tableHeadItems={['ID', 'Name']}
  tableRowItems={[[1, 'Alice'], [2, 'Bob']]}
  tableFooterItems={['Total', '2']}
>
  {#snippet headTemplate(item)} {item} {/snippet}
  {#snippet bodyTemplate(item)} {item} {/snippet}
  {#snippet footerTemplate(item)} <strong>{item}</strong> {/snippet}
</Table>`;

const tableStyled = `<Table 
  tableHeadItems={headers} 
  tableRowItems={users}
  headClass="bg-primary-500 text-white"
  rowClass="hover:bg-neutral-100"
>
  ...
</Table>`;

// --- Text ---

const textHeadings = `<Text type="h1" class="text-2xl font-bold">Heading 1</Text>
<Text type="h2" class="text-xl font-semibold">Heading 2</Text>`;

const textInline = `<Text>
  This is <Text type="strong">bold</Text> and <Text type="em">italic</Text>.
</Text>`;

const textCode = `<Text type="code">const fluid = 'awesome';</Text>
<Text type="pre">{"{...}"}</Text>`;

const textSemantic = `<Text type="del">Old</Text> <Text type="ins">New</Text>
<Text>H<Text type="sub">2</Text>O</Text>`;

// --- Input Field ---

const inputBasic = `<InputField 
  placeholder="Enter your name" 
  bind:value={textValue} 
  class="w-full"
/>`;

const inputPassword = `<InputField
  type="password"
  placeholder="Enter password"
  bind:value={passwordValue}
  class="w-full"
/>`;

const inputNumeric = `<InputField
  placeholder="Numbers only..."
  bind:value={numericValue}
  characterFilter={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
  class="w-full"
/>`;

const inputError = `<InputField
  class="w-full fluid-input-field-error"
  placeholder="Error styling"
  bind:value={errorValue}
/>`;

const inputTextArea = `<InputField
  type="textarea"
  placeholder="Enter your message..."
  bind:value={textAreaValue}
  class="w-full h-32"
/>`;

// --- Form ---

const formBasic = `<script>
  import { Form, InputField, Button, Container, Text } from 'fluid-ui-svelte/base';
  let username = $state('');
</script>

<Form class="gap-4">
  <Container class="flex flex-col gap-2">
    <Text type="span" class="text-sm font-medium">Username</Text>
    <InputField bind:value={username} placeholder="Enter username" />
  </Container>

  <Button
    type="submit"
    class="fluid-button-primary"
    onclick={async (event, buttonState) => {
      buttonState.inProgress = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      buttonState.inProgress = false;
    }}
  >
    {#snippet loadingPlaceholder()}
      <span>Submitting...</span>
    {/snippet}
    Submit
  </Button>
</Form>`;

// --- CodeBlock ---

const codeBlockExample = `<script lang="ts">
  import CodeBlock from 'fluid-ui-svelte/components/CodeBlock.svelte';
</script>

<CodeBlock language="typescript" code="console.log('Hello, Fluid UI!');" />`;

// --- Drawer ---

const drawerBasicUsage = `<script>
  import { Drawer } from 'fluid-ui-svelte/components';
  import { Button, Text } from 'fluid-ui-svelte/base';

  let isBasicDrawerOpen = $state(false);
</script>

<Button onclick={async () => isBasicDrawerOpen = true}>Open Drawer</Button>

<Drawer id="drawer-basic" bind:isOpen={isBasicDrawerOpen} position="left">
  <div class="flex flex-col gap-4">
    <Text type="h2">Drawer Content</Text>
    <Text>This is some content inside the drawer.</Text>
    <Button onclick={async () => isBasicDrawerOpen = false}>Close</Button>
  </div>
</Drawer>`;

const drawerPositions = `<script>
  import { Drawer } from 'fluid-ui-svelte/components';
  let left = $state(false);
  let right = $state(false);
  let top = $state(false);
  let bottom = $state(false);
</script>

<Button onclick={async () => left = true}>Left</Button>
<Button onclick={async () => right = true}>Right</Button>
<Button onclick={async () => top = true}>Top</Button>
<Button onclick={async () => bottom = true}>Bottom</Button>

<Drawer id="drawer-left" bind:isOpen={left} position="left">Left Drawer</Drawer>
<Drawer id="drawer-right" bind:isOpen={right} position="right">Right Drawer</Drawer>
<Drawer id="drawer-top" bind:isOpen={top} position="top">Top Drawer</Drawer>
<Drawer id="drawer-bottom" bind:isOpen={bottom} position="bottom">Bottom Drawer</Drawer>`;

const drawerAnimated = `<script>
  import { Drawer } from 'fluid-ui-svelte/components';
  import { fly, fade } from 'svelte/transition';
  
  let isAnimatedDrawerOpen = $state(false);
</script>

<Button onclick={async () => isAnimatedDrawerOpen = true}>Open Animated</Button>

<Drawer 
  id="drawer-animated"
  bind:isOpen={isAnimatedDrawerOpen}
  position="right"
  transitionFunction={fly} 
  transitionParameters={{ x: 500, duration: 500 }}
  backdropTransitionFunction={fade}
>
  Animated Content
</Drawer>`;

const drawerFlyAnimation = `<script>
  import { Drawer } from 'fluid-ui-svelte/components';
  import { fly } from 'svelte/transition';
  
  let isFlyDrawerOpen = $state(false);
</script>

<Button onclick={async () => isFlyDrawerOpen = true}>Open Fly Drawer</Button>

<Drawer 
  id="drawer-fly"
  bind:isOpen={isFlyDrawerOpen}
  position="bottom"
  transitionFunction={fly} 
  transitionParameters={{ y: 200, duration: 800 }}
>
  Fly Content
</Drawer>`;

// --- CalendarGrid ---

const calendarGridSingle = `<script>
  import { CalendarGrid } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  let currentDate = $state(Temporal.Now.plainDateISO().toString());

  const changeMonth = (increment: number) => {
    currentDate = Temporal.PlainDate.from(currentDate).add({ months: increment }).toString();
  };
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <CalendarGrid {currentDate} id="calendar-single" />
</Container>`;

const calendarGridDual = `<script>
  import { CalendarGrid } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  let baseDate = $state(Temporal.Now.plainDateISO().toString());
  
  const getOffsetDate = (offset: number) => {
    return Temporal.PlainDate.from(baseDate).add({ months: offset }).toString();
  };

  const changeMonth = (increment: number) => {
    baseDate = Temporal.PlainDate.from(baseDate).add({ months: increment }).toString();
  };
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <Container class="flex gap-8 flex-wrap">
    <CalendarGrid currentDate={baseDate} id="cal-1" />
    <CalendarGrid currentDate={getOffsetDate(1)} id="cal-2" />
  </Container>
</Container>`;

const calendarGridSixMonth = `<script>
  import { CalendarGrid } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  let baseDate = $state(Temporal.Now.plainDateISO().toString());
  
  const getOffsetDate = (offset: number) => {
    return Temporal.PlainDate.from(baseDate).add({ months: offset }).toString();
  };

  const changeMonth = (increment: number) => {
    baseDate = Temporal.PlainDate.from(baseDate).add({ months: increment }).toString();
  };
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <Container class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each Array(6) as _, index}
      <CalendarGrid currentDate={getOffsetDate(index)} id="cal-{index}" />
    {/each}
  </Container>
</Container>`;

const calendarGridRange = `<script>
  import { CalendarGrid } from 'fluid-ui-svelte/components';
  import { Button, Container, Text } from 'fluid-ui-svelte/base';

  let baseDate = $state(Temporal.Now.plainDateISO().toString());
  let startDate = $state<string>();
  let endDate = $state<string>();

  const getOffsetDate = (offset: number) => {
    return Temporal.PlainDate.from(baseDate).add({ months: offset }).toString();
  };

  const changeMonth = (increment: number) => {
    baseDate = Temporal.PlainDate.from(baseDate).add({ months: increment }).toString();
  };
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex justify-between items-center">
    <Container class="flex gap-2">
      <Button onclick={() => changeMonth(-1)}>Prev</Button>
      <Button onclick={() => changeMonth(1)}>Next</Button>
    </Container>
    <Text class="text-sm font-mono">
      {startDate || '...'} to {endDate || '...'}
    </Text>
  </Container>

  <Container class="flex gap-8 flex-wrap">
    <CalendarGrid 
      currentDate={baseDate} 
      bind:startDate 
      bind:endDate 
      id="cal-range-1" 
    />
    <CalendarGrid 
      currentDate={getOffsetDate(1)} 
      bind:startDate 
      bind:endDate 
      id="cal-range-2" 
    />
  </Container>
</Container>`;

const calendarGridMulti = `<script>
  import { CalendarGrid } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  const multiCalendarState = $state({
    currentDate: Temporal.Now.plainDateISO().toString(),
    startDate: '',
    endDate: ''
  });

  const changeMonthMulti = (increment: number) => {
    multiCalendarState.currentDate = Temporal.PlainDate.from(multiCalendarState.currentDate).add({ months: increment }).toString();
  };
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonthMulti(-1)}>Prev</Button>
    <Button onclick={() => changeMonthMulti(1)}>Next</Button>
  </Container>

  <Container class="flex gap-8 flex-wrap">
    <CalendarGrid 
      bind:startDate={multiCalendarState.startDate} 
      bind:endDate={multiCalendarState.endDate} 
      currentDate={multiCalendarState.currentDate} 
    />
    <CalendarGrid 
      bind:startDate={multiCalendarState.startDate} 
      bind:endDate={multiCalendarState.endDate} 
      currentDate={Temporal.PlainDate.from(multiCalendarState.currentDate).add({ months: 1 }).toString()} 
    />
  </Container>
</Container>`;

// --- Carousel ---

const carouselInteractive = `<script>
  import { Carousel } from 'fluid-ui-svelte/components';
  const items = [...];
</script>

<Carousel {items} id="demo-id">
  {#snippet itemTemplate({ item })}
    <div class="h-64 flex items-center justify-center">
      {item.text}
    </div>
  {/snippet}
</Carousel>`;

const carouselUsage = `<script>
  import { Carousel } from 'fluid-ui-svelte/components';
  const items = [...];
  let activeIndex = $state(0);
</script>

<Carousel {items} bind:activeIndex>
  {#snippet itemTemplate({ item, index })}
    <div class="h-64 flex items-center justify-center">
      {item.text}
    </div>
  {/snippet}
</Carousel>`;

const carouselAutoplay = `<script>
  import { Carousel } from 'fluid-ui-svelte/components';
  const items = [...];
  let activeIndex = $state(0);
  let autoplay = $state(true);
</script>

<Carousel 
  {items} 
  {autoplay} 
  autoplayDuration={2500} 
  bind:activeIndex
>
  {#snippet itemTemplate({ item })}
    <div class="h-40 flex items-center justify-center">
      {item.text}
    </div>
  {/snippet}
</Carousel>`;

const imageCropBasic = `<script>
  import { ImageCrop } from 'fluid-ui-svelte/components';
  import { onMount } from 'svelte';
  
  let bitmap = $state<ImageBitmap>();

  onMount(async () => {
    const response = await fetch('https://picsum.photos/id/10/800/600');
    const blob = await response.blob();
    bitmap = await createImageBitmap(blob);
  });
</script>

{#if bitmap}
  <ImageCrop id="image-crop-demo" sourceImage={bitmap} aspectRatio={{ x: 16, y: 9 }} />
{/if}`;

const imageCropUpload = `<script>
  import { ImageCrop } from 'fluid-ui-svelte/components';
  
  let uploadedBitmap = $state<ImageBitmap>();
  let resultImage = $state<string>();

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      uploadedBitmap = await createImageBitmap(blob);
    }
  }
</script>

<input type="file" accept="image/*" onchange={handleFileChange} />

{#if uploadedBitmap}
  <ImageCrop 
    id="image-crop-upload"
    sourceImage={uploadedBitmap} 
    aspectRatio={{ x: 16, y: 9 }} 
    bind:resultImage 
  />
  
  {#if resultImage}
    <img src={resultImage} alt="Cropped result" />
  {/if}
{/if}`;

const imageCropCircle = `<script>
  import { ImageCrop } from 'fluid-ui-svelte/components';
  import { onMount } from 'svelte';
  
  let bitmap = $state<ImageBitmap>();

  onMount(async () => {
    const response = await fetch('https://picsum.photos/id/64/800/800');
    const blob = await response.blob();
    bitmap = await createImageBitmap(blob);
  });
</script>

{#if bitmap}
  <ImageCrop 
    id="image-crop-circle"
    sourceImage={bitmap} 
    aspectRatio={{ x: 1, y: 1 }} 
    shape="circle" 
    padding={50}
  />
{/if}`;

const pageBasic = `<script>
  import { Page } from 'fluid-ui-svelte/components';
  import { Text } from 'fluid-ui-svelte/base';
</script>

<Page 
  id="home-page"
  title="Home" 
  description="Welcome to my awesome website."
>
  <Text type="h1">Hello World</Text>
  <Text>This content is inside a semantic main container.</Text>
</Page>`;

const pageMetadata = `<script>
  import { Page } from 'fluid-ui-svelte/components';
</script>

<Page 
  id="article-page"
  title="My Article" 
  description="A deep dive into Fluid UI Svelte."
  type="article"
  siteName="My Blog"
  url="https://example.com/blog/article"
  image="https://example.com/cover.jpg"
  imageAlt="Cover image showing Fluid UI components"
  twitterCard="summary_large_image"
  keywords="svelte, ui, library, framework"
  robots="index, follow"
>
  <!-- Content here -->
</Page>`;

const switchBasic = `<script>
  import { Switch } from 'fluid-ui-svelte/components';
  let checked = $state(false);
</script>

<Switch 
  bind:checked 
  onclick={async () => {
    console.log('Toggled');
  }} 
/>`;

const switchDisabled = `<Switch disabled onclick={async () => {}} />
<Switch checked disabled onclick={async () => {}} />`;

// --- Draggable ---

const draggableBasic = `<script>
  import { Draggable } from 'fluid-ui-svelte/components';
</script>

<Draggable 
  id="draggable-item" 
  ondragstart={(event) => event.dataTransfer?.setData('text/plain', 'Data')}
> 
  <div>Drag me</div>
</Draggable>`;

// --- Dropzone ---

const dropzoneFile = `<script>
  import { Dropzone } from 'fluid-ui-svelte/components';
  
  let droppedFiles = $state<File[]>([]);
</script>

<Dropzone id="dropzone-file" bind:data={droppedFiles} mode="file" dropEffect="copy">
  {#snippet children({ isDragOver })}
    <div class="flex flex-col items-center gap-2">
      <p class="font-medium">
        {isDragOver ? 'Drop Files Now' : 'Drag & Drop Files Here'}
      </p>
      
      {#if droppedFiles.length > 0}
        <div class="mt-4 w-full text-left text-sm bg-neutral-100 p-2 rounded">
          <p class="font-bold mb-1">Dropped Files:</p>
          <ul class="list-disc pl-4">
            {#each droppedFiles as file}
              <li>{file.name} ({Math.round(file.size / 1024)} KB)</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  {/snippet}
</Dropzone>`;

const dropzoneData = `<script>
  import { Dropzone } from 'fluid-ui-svelte/components';
  
  let droppedData = $state('');
</script>

<Dropzone id="dropzone-data" bind:data={droppedData} mode="text" dropEffect="move">
  {#snippet children({ isDragOver })}
    <div class="flex flex-col items-center gap-2">
      <p class="font-medium">
        {isDragOver ? 'Drop Data Now' : 'Drag Text/Data Here'}
      </p>
      
      {#if droppedData}
        <div class="mt-4 w-full text-left text-sm bg-neutral-100 p-2 rounded border border-neutral-200">
          <p class="font-bold mb-1 text-primary-600">Captured Data:</p>
          <pre class="whitespace-pre-wrap">{droppedData}</pre>
        </div>
      {/if}
    </div>
  {/snippet}
</Dropzone>`;

// --- Anchored Overlay ---

const anchoredOverlayClick = `<script>
  import { AnchoredOverlay } from 'fluid-ui-svelte/components';
  import { Button, Text } from 'fluid-ui-svelte/base';
</script>

<AnchoredOverlay id="click-overlay-demo" triggerMode="click" position="bottom-start">
  {#snippet anchor()}
    <Button class="fluid-button-primary">Click to Toggle</Button>
  {/snippet}
  {#snippet overlay({ close })}
    <div class="flex flex-col gap-2 p-2">
      <Text type="strong">Floating Overlay</Text>
      <Text class="text-sm">Opened via click trigger.</Text>
      <Button onclick={async () => close()} class="fluid-button-secondary text-xs">Close</Button>
    </div>
  {/snippet}
</AnchoredOverlay>`;

const anchoredOverlayHover = `<script>
  import { AnchoredOverlay } from 'fluid-ui-svelte/components';
  import { Text } from 'fluid-ui-svelte/base';
</script>

<AnchoredOverlay id="hover-overlay-demo" triggerMode="hover" position="top">
  {#snippet anchor()}
    <span class="inline-flex cursor-pointer rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium dark:bg-neutral-800">
      Hover Over Me
    </span>
  {/snippet}
  {#snippet overlay()}
    <div class="px-2 py-1 text-xs">
      <Text>Opened via hover trigger.</Text>
    </div>
  {/snippet}
</AnchoredOverlay>`;

// --- Modal ---

const modalBasic = `<script>
  import { Modal } from 'fluid-ui-svelte/components';
  import { Button, Text, Container } from 'fluid-ui-svelte/base';

  let isModalOpen = $state(false);
</script>

<Button id="open-modal-trigger" onclick={async () => isModalOpen = true}>Open Modal</Button>

<Modal id="modal-sample" bind:isOpen={isModalOpen}>
  <Container id="modal-content" class="p-6 flex flex-col gap-4">
    <Text id="modal-title" type="h2">Modal Title</Text>
    <Text id="modal-body">This is a barebone modal component.</Text>
    <Button id="modal-close" onclick={async () => isModalOpen = false}>Close</Button>
  </Container>
</Modal>`;

// --- Breadcrumb ---

const breadcrumbBasic = `<script>
  import { Breadcrumb } from 'fluid-ui-svelte/prebuilt';

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Prebuilt', href: '/documentation/prebuilt' },
    { label: 'Breadcrumb', href: '/documentation/prebuilt/breadcrumb' }
  ];
</script>

<Breadcrumb {items} />`;

const breadcrumbSeparator = `<script>
  import { Breadcrumb } from 'fluid-ui-svelte/prebuilt';
</script>

<Breadcrumb 
  {items} 
  separator=">" 
/>`;

// --- International Input ---

const internationalInputBasic = `<script>
  import { InternationalInput } from 'fluid-ui-svelte/prebuilt';

  let phoneNumber = $state('');
  let selectedCountry = $state('US');
  let dialCode = $state('+1');
</script>

<InternationalInput 
  id="user-phone-input"
  mode="phone"
  bind:value={phoneNumber} 
  bind:selectedCountry
  bind:dialCode
/>`;

const internationalInputCountry = `<script>
  import { InternationalInput } from 'fluid-ui-svelte/prebuilt';

  let selectedCountry = $state('US');
</script>

<InternationalInput 
  id="user-country-picker"
  mode="country"
  bind:selectedCountry
/>`;

const internationalInputCurrency = `<script>
  import { InternationalInput } from 'fluid-ui-svelte/prebuilt';

  let amount = $state('');
  let selectedCountry = $state('US');
</script>

<InternationalInput 
  id="user-currency-input"
  mode="currency"
  bind:value={amount}
  bind:selectedCountry
/>`;

// --- Pagination ---

const paginationBasic = `<script>
  import { Pagination } from 'fluid-ui-svelte/components';

  let currentPage = $state(1);
</script>

<Pagination 
  id="my-pagination"
  bind:currentPage 
  totalPages={10} 
  siblingCount={1}
  boundaryCount={1}
  onPageChange={async (page) => {
    console.log('Page changed to:', page);
  }}
/>`;

// --- Notification Area ---

const notificationBasic = `<script lang="ts">
  import { NotificationArea } from 'fluid-ui-svelte/prebuilt';
  import { Button, Text } from 'fluid-ui-svelte/base';

  type ToastItem = {
    id: number;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
  };

  let notifications = $state<ToastItem[]>([]);

  function add() {
    notifications = [...notifications, {
      id: Date.now(),
      message: 'New generic notification!',
      type: 'success',
      duration: 4000
    }];
  }
</script>

<Button onclick={async () => add()}>Notify</Button>

<NotificationArea
  id="my-notifications"
  position="bottom-right"
  bind:items={notifications}
>
  {#snippet itemSnippet(item, dismiss)}
    <div class="fluid-notification fluid-notification-{item.type}">
      <Text>{item.message}</Text>
      <Button onclick={async () => dismiss()} class="fluid-notification-close p-0!">&times;</Button>
    </div>
  {/snippet}
</NotificationArea>`;

// --- Time Picker ---

const timePickerHourOnly = `<script>
  import { TimePicker } from 'fluid-ui-svelte/components';

  let selectedHour = $state('14');
</script>

<TimePicker
  id="time-picker-hour-only"
  mode="hour"
  bind:selectedTime={selectedHour}
/>`;

const timePickerBasic = `<script>
  import { TimePicker } from 'fluid-ui-svelte/components';

  let selectedTime = $state('14:30');
</script>

<TimePicker
  id="time-picker-basic"
  mode="minute"
  bind:selectedTime
/>`;

const timePickerWithSeconds = `<script>
  import { TimePicker } from 'fluid-ui-svelte/components';

  let selectedTime = $state('14:30:45');
</script>

<TimePicker
  id="time-picker-seconds"
  mode="second"
  stepSecondInterval={5}
  bind:selectedTime
/>`;

const timePickerTwelveHour = `<script>
  import { TimePicker } from 'fluid-ui-svelte/components';

  let selectedTime = $state('02:30 PM');
</script>

<TimePicker
  id="time-picker-12h"
  format="12h"
  bind:selectedTime
/>`;

export const codeBlockContents = {
  accordionCustom,
  accordionStandard,
  anchoredOverlayClick,
  anchoredOverlayHover,
  breadcrumbBasic,
  breadcrumbSeparator,
  buttonIcon,
  buttonOutline,
  buttonPrimary,
  buttonSecondary,
  buttonTransparent,
  calendarGridDual,
  calendarGridMulti,
  calendarGridRange,
  calendarGridSingle,
  calendarGridSixMonth,
  carouselAutoplay,
  carouselInteractive,
  carouselUsage,
  codeBlockExample,
  containerFooter,
  containerHeader,
  containerNav,
  containerSection,
  draggableBasic,
  drawerAnimated,
  drawerBasicUsage,
  drawerFlyAnimation,
  drawerPositions,
  dropzoneData,
  dropzoneFile,
  formBasic,
  gettingStartedAppCss,
  gettingStartedUsage,
  imageCropBasic,
  imageCropCircle,
  imageCropUpload,
  imageLoading,
  imageStandard,
  inputBasic,
  inputError,
  inputNumeric,
  inputPassword,
  inputTextArea,
  internationalInputBasic,
  internationalInputCountry,
  internationalInputCurrency,
  labelCustom,
  labelRequired,
  labelStandard,
  linkCustom,
  linkStandard,
  listComplex,
  listItemStyling,
  listOrdered,
  listUnordered,
  modalBasic,
  notificationBasic,
  pageBasic,
  pageMetadata,
  paginationBasic,
  switchBasic,
  switchDisabled,
  tableStandard,
  tableStyled,
  textCode,
  textHeadings,
  textInline,
  textSemantic,
  timePickerBasic,
  timePickerHourOnly,
  timePickerTwelveHour,
  timePickerWithSeconds,
};
