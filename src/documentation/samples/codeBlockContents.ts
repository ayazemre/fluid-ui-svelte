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
</script>

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
</script>

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
</script>

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
</script>

<Button onclick={async () => isFlyDrawerOpen = true}>Open Fly Drawer</Button>

<Drawer 
  bind:isOpen={isFlyDrawerOpen}
  position="bottom"
  transitionFn={fly} 
  transitionParams={{ y: 200, duration: 800 }}
>
  Fly Content
</Drawer>`;

// --- Calendar ---

const calendarSingle = `<script>
  import { Calendar } from 'fluid-ui-svelte/components';
  import { Button, Container } from 'fluid-ui-svelte/base';

  let currentDate = $state(new Date().toISOString());

  const changeMonth = (increment: number) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + increment);
    currentDate = date.toISOString();
  };
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <Calendar bind:currentDate componentId="calendar-single" />
</Container>`;

const calendarDual = `<script>
  import { Calendar } from 'fluid-ui-svelte/components';
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
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <Container class="flex gap-8 flex-wrap">
    <Calendar currentDate={baseDate} componentId="cal-1" />
    <Calendar currentDate={getOffsetDate(1)} componentId="cal-2" />
  </Container>
</Container>`;

const calendarSixMonth = `<script>
  import { Calendar } from 'fluid-ui-svelte/components';
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
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonth(-1)}>Prev</Button>
    <Button onclick={() => changeMonth(1)}>Next</Button>
  </Container>
  <Container class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each Array(6) as _, i}
      <Calendar currentDate={getOffsetDate(i)} componentId="cal-{i}" />
    {/each}
  </Container>
</Container>`;

const calendarRange = `<script>
  import { Calendar } from 'fluid-ui-svelte/components';
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
    <Calendar 
      currentDate={baseDate} 
      bind:startDate 
      bind:endDate 
      componentId="cal-range-1" 
    />
    <Calendar 
      currentDate={getOffsetDate(1)} 
      bind:startDate 
      bind:endDate 
      componentId="cal-range-2" 
    />
  </Container>
</Container>`;

const calendarMulti = `<script>
  import { Calendar } from 'fluid-ui-svelte/components';
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
</script>

<Container class="flex flex-col gap-4">
  <Container class="flex gap-2">
    <Button onclick={() => changeMonthMulti(-1)}>Prev</Button>
    <Button onclick={() => changeMonthMulti(1)}>Next</Button>
  </Container>

  <Container class="flex gap-8 flex-wrap">
    <Calendar 
      bind:currentDate={multiCalendarState.currentDate} 
      bind:startDate={multiCalendarState.startDate} 
      bind:endDate={multiCalendarState.endDate} 
    />
    <Calendar 
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
</script>

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
</script>

<Carousel {items} bind:activeIndex>
  {#snippet itemTemplate({ item, index, internalState })}
    <div class="h-64">
      {item.name}
      <!-- Delta available for custom animations -->
      <span>Delta: {internalState.movementDelta}</span>
    </div>
  {/snippet}
</Carousel>`;

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
  codeBlockExample,
  drawerBasicUsage,
  drawerPositions,
  drawerAnimated,
  drawerFlyAnimation,
  calendarSingle,
  calendarDual,
  calendarSixMonth,
  calendarRange,
  calendarMulti,
  carouselInteractive,
  carouselUsage
};
