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
<\/script>

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
<\/script>

<CodeBlock language="typescript" code="console.log('Hello, Fluid UI!');" />`;

// --- Drawer ---

const drawerBasicUsage = `<script>
  import { Drawer } from 'fluid-ui-svelte/components';
  import { Button, Text } from 'fluid-ui-svelte/base';

  let isBasicDrawerOpen = $state(false);
<\/script>

<Button onclick={async () => isBasicDrawerOpen = true}>Open Drawer</Button>

<Drawer bind:isOpen={isBasicDrawerOpen} position="left">
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
<\/script>

<Button onclick={async () => left = true}>Left</Button>
<Button onclick={async () => right = true}>Right</Button>
<Button onclick={async () => top = true}>Top</Button>
<Button onclick={async () => bottom = true}>Bottom</Button>

<Drawer bind:isOpen={left} position="left">Left Drawer</Drawer>
<Drawer bind:isOpen={right} position="right">Right Drawer</Drawer>
<Drawer bind:isOpen={top} position="top">Top Drawer</Drawer>
<Drawer bind:isOpen={bottom} position="bottom">Bottom Drawer</Drawer>`;

const drawerAnimated = `<script>
  import { Drawer } from 'fluid-ui-svelte/components';
  import { fly, fade } from 'svelte/transition';
  
  let isAnimatedDrawerOpen = $state(false);
<\/script>

<Button onclick={async () => isAnimatedDrawerOpen = true}>Open Animated</Button>

<Drawer 
  bind:isOpen={isAnimatedDrawerOpen}
  position="right"
  transitionFn={fly} 
  transitionParams={{ x: 500, duration: 500 }}
  backdropTransitionFn={fade}
>
  Animated Content
</Drawer>`;

const drawerFlyAnimation = `<script>
  import { Drawer } from 'fluid-ui-svelte/components';
  import { fly } from 'svelte/transition';
  
  let isFlyDrawerOpen = $state(false);
<\/script>

<Button onclick={async () => isFlyDrawerOpen = true}>Open Fly Drawer</Button>

<Drawer 
  bind:isOpen={isFlyDrawerOpen}
  position="bottom"
  transitionFn={fly} 
  transitionParams={{ y: 200, duration: 800 }}
>
  Fly Content
</Drawer>`;

// --- DatePicker ---

const datePickerSingle = `<script>
  import { DatePicker } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  let currentDate = $state(new Date().toISOString());

  const changeMonth = (increment: number) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + increment);
    currentDate = date.toISOString();
  };
<\/script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <DatePicker bind:currentDate componentId="calendar-single" />
</Container>`;

const datePickerDual = `<script>
  import { DatePicker } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  let baseDate = $state(new Date().toISOString());
  
  // Helper to get next month relative to base
  const getOffsetDate = (offset: number) => {
    const d = new Date(baseDate);
    d.setMonth(d.getMonth() + offset);
    return d.toISOString();
  };

  const changeMonth = (increment: number) => {
    const d = new Date(baseDate);
    d.setMonth(d.getMonth() + increment);
    baseDate = d.toISOString();
  };
<\/script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <Container class="flex gap-8 flex-wrap">
    <DatePicker currentDate={baseDate} componentId="cal-1" />
    <DatePicker currentDate={getOffsetDate(1)} componentId="cal-2" />
  </Container>
</Container>`;

const datePickerSixMonth = `<script>
  import { DatePicker } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  let baseDate = $state(new Date().toISOString());
  
  const getOffsetDate = (offset: number) => {
    const d = new Date(baseDate);
    d.setMonth(d.getMonth() + offset);
    return d.toISOString();
  };

  const changeMonth = (increment: number) => {
    const d = new Date(baseDate);
    d.setMonth(d.getMonth() + increment);
    baseDate = d.toISOString();
  };
<\/script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <Container class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each Array(6) as _, i}
      <DatePicker currentDate={getOffsetDate(i)} componentId="cal-{i}" />
    {/each}
  </Container>
</Container>`;

const datePickerRange = `<script>
  import { DatePicker } from 'fluid-ui-svelte/components';
  import { Button, Container, Text } from 'fluid-ui-svelte/base';

  let baseDate = $state(new Date().toISOString());
  let startDate = $state<string>();
  let endDate = $state<string>();

  const getOffsetDate = (offset: number) => {
    const d = new Date(baseDate);
    d.setMonth(d.getMonth() + offset);
    return d.toISOString();
  };

  const changeMonth = (inc: number) => {
    const d = new Date(baseDate);
    d.setMonth(d.getMonth() + inc);
    baseDate = d.toISOString();
  };
<\/script>

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
    <DatePicker 
      currentDate={baseDate} 
      bind:startDate 
      bind:endDate 
      componentId="cal-range-1" 
    />
    <DatePicker 
      currentDate={getOffsetDate(1)} 
      bind:startDate 
      bind:endDate 
      componentId="cal-range-2" 
    />
  </Container>
</Container>`;

const datePickerMulti = `<script>
  import { DatePicker } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  const multiCalendarState = $state({
    currentDate: new Date().toISOString(),
    startDate: '',
    endDate: ''
  });

  const changeMonthMulti = (inc: number) => {
    const d = new Date(multiCalendarState.currentDate);
    d.setMonth(d.getMonth() + inc);
    multiCalendarState.currentDate = d.toISOString();
  };
<\/script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonthMulti(-1)}>Prev</Button>
    <Button onclick={() => changeMonthMulti(1)}>Next</Button>
  </Container>

  <Container class="flex gap-8 flex-wrap">
    <DatePicker 
      bind:currentDate={multiCalendarState.currentDate} 
      bind:startDate={multiCalendarState.startDate} 
      bind:endDate={multiCalendarState.endDate} 
    />
    <DatePicker 
      currentDate={new Date(new Date(multiCalendarState.currentDate).setMonth(new Date(multiCalendarState.currentDate).getMonth() + 1)).toISOString()} 
      bind:startDate={multiCalendarState.startDate} 
      bind:endDate={multiCalendarState.endDate} 
    />
  </Container>
</Container>`;

// --- Carousel ---

const carouselInteractive = `<script>
  import { Carousel } from 'fluid-ui-svelte/components';
  const items = [...];
<\/script>

<Carousel {items} componentId="demo-id">
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
<\/script>

<Carousel {items} bind:activeIndex>
  {#snippet itemTemplate({ item, index, internalState })}
    <div class="h-64">
      {item.name}
      <!-- Delta available for custom animations -->
      <span>Delta: {internalState.movementDelta}</span>
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
<\/script>

{#if bitmap}
  <ImageCrop sourceImage={bitmap} aspectRatio={{ x: 16, y: 9 }} />
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
<\/script>

<input type="file" accept="image/*" onchange={handleFileChange} />

{#if uploadedBitmap}
  <ImageCrop 
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
<\/script>

{#if bitmap}
  <ImageCrop 
    sourceImage={bitmap} 
    aspectRatio={{ x: 1, y: 1 }} 
    shape="circle" 
    padding={50}
  />
{/if}`;

const pageBasic = `<script>
  import { Page } from 'fluid-ui-svelte/components';
  import { Text } from 'fluid-ui-svelte/base';
<\/script>

<Page 
  title="Home" 
  description="Welcome to my awesome website."
>
  <Text type="h1">Hello World</Text>
  <Text>This content is inside a semantic main container.</Text>
</Page>`;

const pageMetadata = `<script>
  import { Page } from 'fluid-ui-svelte/components';
<\/script>

<Page 
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
<\/script>

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
<\/script>

<Draggable ondragstart={(e) => e.dataTransfer.setData('text/plain', 'Data')}> 
  <div>Drag me</div>
</Draggable>`;

// --- Dropzone ---

const dropzoneFile = `<script>
  import { Dropzone } from 'fluid-ui-svelte/components';
  
  let droppedFiles = $state<File[]>([]);
<\/script>

<Dropzone bind:data={droppedFiles} mode="file" dropEffect="copy">
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
<\/script>

<Dropzone bind:data={droppedData} mode="text" dropEffect="move">
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

// --- Popover ---

const popoverBasic = `<script>
  import { Popover } from 'fluid-ui-svelte/components';
  import { Text } from 'fluid-ui-svelte/base';
<\/script>

<Popover>
  {#snippet trigger()}
    <Text class="bg-primary-500 text-white p-2 rounded-md">Click Me</Text>
  {/snippet}
  {#snippet content()}
    <Text>This is a popover content!</Text>
  {/snippet}
</Popover>`;

const popoverPositions = `<script>
  import { Popover } from 'fluid-ui-svelte/components';
  import { Text } from 'fluid-ui-svelte/base';
<\/script>

<Popover position="top">
  {#snippet trigger()}
    <Text class="border border-primary-500 text-primary-500 p-2 rounded-md">Top Popover</Text>
  {/snippet}
  {#snippet content()}
    <Text>Content on top</Text>
  {/snippet}
</Popover>

<Popover position="right">
  {#snippet trigger()}
    <Text class="border border-primary-500 text-primary-500 p-2 rounded-md">Right Popover</Text>
  {/snippet}
  {#snippet content()}
    <Text>Content on right</Text>
  {/snippet}
</Popover>`;

// --- Modal ---

const modalBasic = `<script>
  import { Modal } from 'fluid-ui-svelte/components';
  import { Button, Text, Container } from 'fluid-ui-svelte/base';

  let isModalOpen = $state(false);
<\/script>

<Button onclick={async () => isModalOpen = true}>Open Modal</Button>

<Modal bind:isOpen={isModalOpen}>
  <Container class="p-6 flex flex-col gap-4">
    <Text type="h2">Modal Title</Text>
    <Text>This is a barebone modal component.</Text>
    <Button onclick={async () => isModalOpen = false}>Close</Button>
  </Container>
</Modal>`;

// --- Breadcrumb ---

const breadcrumbBasic = `<script>
  import { Breadcrumb } from 'fluid-ui-svelte/components';

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/documentation/components' },
    { label: 'Breadcrumb', href: '/documentation/components/breadcrumb' }
  ];
<\/script>

<Breadcrumb {items} />`;

const breadcrumbSeparator = `<script>
  import { Breadcrumb } from 'fluid-ui-svelte/components';
<\/script>

<Breadcrumb 
  {items} 
  separator=">" 
/>`;

// --- Pagination ---

const paginationBasic = `<script>
  import { Pagination } from 'fluid-ui-svelte/components';

  let currentPage = $state(1);
<\/script>

<Pagination 
  bind:currentPage 
  totalPages={10} 
  onPageChange={async (page) => {
    console.log('Page changed to:', page);
  }}
/>`;

// --- Notification Area ---

const notificationBasic = `<script>
  import { NotificationArea } from 'fluid-ui-svelte/components';
  import { Button } from 'fluid-ui-svelte/base';

  let notifications = $state([]);

  function add() {
    notifications = [...notifications, {
      id: Date.now(),
      message: 'New Notification!',
      type: 'success',
      duration: 3000
    }];
  }
<\/script>

<Button onclick={async () => add()}>Notify</Button>
<NotificationArea bind:items={notifications} position="top-right" />`;

export const codeBlockContents = {
	gettingStartedAppCss,
	gettingStartedUsage,
	buttonPrimary,
	buttonSecondary,
	buttonOutline,
	buttonTransparent,
	buttonIcon,
	accordionStandard,
	accordionCustom,
	containerHeader,
	containerNav,
	containerSection,
	containerFooter,
	imageStandard,
	imageLoading,
	linkStandard,
	linkCustom,
	listUnordered,
	listOrdered,
	listItemStyling,
	listComplex,
	tableStandard,
	tableStyled,
	textHeadings,
	textInline,
	textCode,
	textSemantic,
	inputBasic,
	inputPassword,
	inputNumeric,
	inputError,
	inputTextArea,
	formBasic,
	codeBlockExample,
	drawerBasicUsage,
	drawerPositions,
	drawerAnimated,
	drawerFlyAnimation,
	datePickerSingle,
	datePickerDual,
	datePickerSixMonth,
	datePickerRange,
	datePickerMulti,
	carouselInteractive,
	carouselUsage,
	imageCropBasic,
	imageCropUpload,
	imageCropCircle,
	pageBasic,
	pageMetadata,
	switchBasic,
	switchDisabled,
	draggableBasic,
	dropzoneFile,
	dropzoneData,
	popoverBasic,
	popoverPositions,
	modalBasic,
	breadcrumbBasic,
	breadcrumbSeparator,
	paginationBasic,
	notificationBasic
};
