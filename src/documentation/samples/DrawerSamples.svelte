<script lang="ts">
  import { fade, fly } from "svelte/transition";

  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, Drawer } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let isBasicDrawerOpen = $state(false);
  let isPositionedDrawerOpen = $state(false);
  let isAnimatedDrawerOpen = $state(false);
  let isFlyDrawerOpen = $state(false);
  let currentPosition = $state<"bottom" | "left" | "right" | "top">("left");

  const openAtPosition = (position: "bottom" | "left" | "right" | "top") => {
    currentPosition = position;
    isPositionedDrawerOpen = true;
  };
</script>

<Container id="drawer-samples-container" class="flex flex-col gap-10">
  <!-- 1. Basic -->
  <Container id="drawer-sample-basic-section" class="flex flex-col gap-4">
    <Text id="drawer-sample-basic-heading" type="h3" class="text-xl font-bold">Basic Usage</Text>
    <Text id="drawer-sample-basic-description" class="text-neutral-500">A standard drawer anchored to the left.</Text>
    <Container id="drawer-sample-basic-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Button
        id="drawer-sample-basic-open-btn"
        class="fluid-button-primary"
        onclick={async () => {
          isBasicDrawerOpen = true;
        }}
      >
        Open Drawer
      </Button>
      <Drawer id="drawer-basic-sample" bind:isOpen={isBasicDrawerOpen} position="left">
        <Container id="drawer-basic-sample-content" class="flex min-w-64 flex-col gap-6 p-6">
          <Text id="drawer-basic-sample-title" type="h2" class="text-2xl font-bold">Navigation</Text>
          <Container id="drawer-basic-sample-links" class="flex flex-col gap-2">
            <Text id="drawer-basic-sample-link-1" class="cursor-pointer hover:text-primary-500">Dashboard</Text>
            <Text id="drawer-basic-sample-link-2" class="cursor-pointer hover:text-primary-500">Settings</Text>
            <Text id="drawer-basic-sample-link-3" class="cursor-pointer hover:text-primary-500">Profile</Text>
          </Container>
          <Button
            id="drawer-basic-sample-close-btn"
            class="fluid-button-outline"
            onclick={async () => {
              isBasicDrawerOpen = false;
            }}
          >
            Close
          </Button>
        </Container>
      </Drawer>
    </Container>
    <CodeBlock id="drawer-sample-basic-code" code={codeBlockContents.drawerBasicUsage} language="svelte" />
  </Container>

  <!-- 2. Positions -->
  <Container id="drawer-sample-positions-section" class="flex flex-col gap-4">
    <Text id="drawer-sample-positions-heading" type="h3" class="text-xl font-bold">Anchoring Positions</Text>
    <Text id="drawer-sample-positions-description" class="text-neutral-500">Toggle drawers from all four directions.</Text>
    <Container id="drawer-sample-positions-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="drawer-sample-positions-buttons" class="flex flex-wrap gap-4">
        <Button
          id="drawer-pos-left-btn"
          class="fluid-button-secondary"
          onclick={async () => {
            openAtPosition("left");
          }}>Left</Button
        >
        <Button
          id="drawer-pos-right-btn"
          class="fluid-button-secondary"
          onclick={async () => {
            openAtPosition("right");
          }}>Right</Button
        >
        <Button
          id="drawer-pos-top-btn"
          class="fluid-button-secondary"
          onclick={async () => {
            openAtPosition("top");
          }}>Top</Button
        >
        <Button
          id="drawer-pos-bottom-btn"
          class="fluid-button-secondary"
          onclick={async () => {
            openAtPosition("bottom");
          }}>Bottom</Button
        >
      </Container>
      <Drawer id="drawer-positions-sample" bind:isOpen={isPositionedDrawerOpen} position={currentPosition}>
        <Container id="drawer-positions-sample-content" class="flex min-w-64 flex-col gap-4 p-8">
          <Text id="drawer-positions-sample-title" type="h2" class="text-xl font-bold">Position: {currentPosition}</Text>
          <Text id="drawer-positions-sample-text">The drawer adapts its anchoring based on the prop.</Text>
          <Button
            id="drawer-positions-sample-close-btn"
            class="fluid-button-outline"
            onclick={async () => {
              isPositionedDrawerOpen = false;
            }}
          >
            Close
          </Button>
        </Container>
      </Drawer>
    </Container>
    <CodeBlock id="drawer-sample-positions-code" code={codeBlockContents.drawerPositions} language="svelte" />
  </Container>

  <!-- 3. Animated -->
  <Container id="drawer-sample-animated-section" class="flex flex-col gap-4">
    <Text id="drawer-sample-animated-heading" type="h3" class="text-xl font-bold">Custom Animations</Text>
    <Text id="drawer-sample-animated-description" class="text-neutral-500">Pass standard Svelte transitions or custom ones.</Text>
    <Container id="drawer-sample-animated-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Button
        id="drawer-sample-animated-open-btn"
        class="fluid-button-primary"
        onclick={async () => {
          isAnimatedDrawerOpen = true;
        }}
      >
        Open Animated
      </Button>
      <Drawer
        id="drawer-animated-sample"
        bind:isOpen={isAnimatedDrawerOpen}
        position="right"
        transitionFunction={fade}
        transitionParams={{ duration: 600 }}
        backdropTransitionFunction={fade}
        backdropTransitionParams={{ duration: 600 }}
      >
        <Container id="drawer-animated-sample-content" class="flex min-w-80 flex-col gap-4 p-8">
          <Text id="drawer-animated-sample-title" type="h2" class="text-xl font-bold">Smooth Transitions</Text>
          <Text id="drawer-animated-sample-text">You have full control over the entrance and exit animations.</Text>
          <Button
            id="drawer-animated-sample-close-btn"
            class="fluid-button-outline"
            onclick={async () => {
              isAnimatedDrawerOpen = false;
            }}
          >
            Close
          </Button>
        </Container>
      </Drawer>
    </Container>
    <CodeBlock id="drawer-sample-animated-code" code={codeBlockContents.drawerAnimated} language="svelte" />
  </Container>

  <!-- 4. Fly Animation -->
  <Container id="drawer-sample-fly-section" class="flex flex-col gap-4">
    <Text id="drawer-sample-fly-heading" type="h3" class="text-xl font-bold">Fly Transition</Text>
    <Text id="drawer-sample-fly-description" class="text-neutral-500">Using the fly transition for a sliding effect.</Text>
    <Container id="drawer-sample-fly-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Button
        id="drawer-sample-fly-open-btn"
        class="fluid-button-primary"
        onclick={async () => {
          isFlyDrawerOpen = true;
        }}
      >
        Open Fly Drawer
      </Button>
      <Drawer
        id="drawer-fly-sample"
        bind:isOpen={isFlyDrawerOpen}
        position="bottom"
        transitionFunction={fly}
        transitionParams={{ duration: 800, y: 200 }}
        backdropTransitionFunction={fade}
        backdropTransitionParams={{ duration: 600 }}
      >
        <Container id="drawer-fly-sample-content" class="flex min-w-80 flex-col gap-4 p-8">
          <Text id="drawer-fly-sample-title" type="h2" class="text-xl font-bold">Fly In</Text>
          <Text id="drawer-fly-sample-text">This drawer flies in from the bottom.</Text>
          <Button
            id="drawer-fly-sample-close-btn"
            class="fluid-button-outline"
            onclick={async () => {
              isFlyDrawerOpen = false;
            }}
          >
            Close
          </Button>
        </Container>
      </Drawer>
    </Container>
    <CodeBlock id="drawer-sample-fly-code" code={codeBlockContents.drawerFlyAnimation} language="svelte" />
  </Container>
</Container>
