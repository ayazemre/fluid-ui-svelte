// Parsing errors happen in code editor when imports and script tags used inside code block component's contents.
// To prevent this we import usage examples from here.

const gettingStartedAppCss = `// src/routes/+layout.svelte
import '../app.css';`;

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

const carouselSlide = `<script>
  import { Carousel } from 'fluid-ui-svelte/components';
  import { Image } from 'fluid-ui-svelte/base';

  const items = [
    { src: 'https://via.placeholder.com/800x400?text=Slide+1', alt: 'Slide 1' },
    { src: 'https://via.placeholder.com/800x400?text=Slide+2', alt: 'Slide 2' },
    { src: 'https://via.placeholder.com/800x400?text=Slide+3', alt: 'Slide 3' }
  ];
</script>

<Carousel {items} type="slide" loop>
  {#snippet children(item)}
    <Image src={item.src} alt={item.alt} class="w-full h-64 object-cover" />
  {/snippet}
</Carousel>`;

const carouselFade = `<script>
  import { Carousel } from 'fluid-ui-svelte/components';
  import { Text } from 'fluid-ui-svelte/base';

  const quotes = [
    { text: "Innovation is key.", author: "Tech CEO" },
    { text: "Design is intelligence made visible.", author: "Designer" },
    { text: "Simplicity is the ultimate sophistication.", author: "Da Vinci" }
  ];
</script>

<Carousel {items: quotes} type="fade" autoplay autoplayInterval={4000}>
  {#snippet children(quote)}
    <div class="h-64 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-800 p-8 text-center">
      <Text type="h3" class="text-2xl font-bold mb-4">"{quote.text}"</Text>
      <Text class="text-neutral-500">- {quote.author}</Text>
    </div>
  {/snippet}
</Carousel>`;

export const codeBlockContents = { 
	gettingStartedAppCss, 
	gettingStartedUsage,
	drawerBasicUsage,
	drawerPositions,
	drawerAnimated,
	drawerFlyAnimation,
	calendarSingle,
	calendarDual,
	calendarSixMonth,
	calendarRange,
	calendarMulti,
	carouselSlide,
	carouselFade
};