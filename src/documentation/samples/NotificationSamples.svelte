<script lang="ts">
  import { onDestroy } from "svelte";

  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";
  import { NotificationArea } from "#src/lib/prebuilt/index.ts";

  import type { NotificationPosition } from "#src/lib/prebuilt/notificationArea.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  type CustomNotification = {
    actionLabel?: string;
    duration?: number;
    id: string;
    message: string;
    onAction?: () => void;
    progress?: number;
    title?: string;
    type?: "info" | "success" | "warning" | "error";
    variant: "standard" | "action" | "progress" | "pill";
  };

  let notifications = $state<CustomNotification[]>([]);
  let selectedPosition = $state<NotificationPosition>("bottom-right");

  const activeIntervals = new Set<ReturnType<typeof setInterval>>();

  const edgePositions: { label: string; value: NotificationPosition }[] = [
    { label: "Top Left", value: "top-left" },
    { label: "Top Center", value: "top-center" },
    { label: "Top Right", value: "top-right" },
    { label: "Center Left", value: "center-left" },
    { label: "Center Right", value: "center-right" },
    { label: "Bottom Left", value: "bottom-left" },
    { label: "Bottom Center", value: "bottom-center" },
    { label: "Bottom Right", value: "bottom-right" },
  ];

  function spawnStandardNotification(type: "info" | "success" | "warning" | "error"): void {
    const randomId = Math.random().toString(36).substring(2, 9);
    notifications = [
      ...notifications,
      {
        duration: 4000,
        id: randomId,
        message: `This is a ${type} notification message!`,
        title: `${type.toUpperCase()} ALERT`,
        type,
        variant: "standard",
      },
    ];
  }

  function spawnActionNotification(): void {
    const randomId = Math.random().toString(36).substring(2, 9);
    notifications = [
      ...notifications,
      {
        actionLabel: "Undo",
        duration: 6000,
        id: randomId,
        message: "5 items moved to trash.",
        title: "Items Archived",
        type: "warning",
        variant: "action",
      },
    ];
  }

  function spawnProgressNotification(): void {
    const randomId = Math.random().toString(36).substring(2, 9);
    let currentProgress = 20;

    notifications = [
      ...notifications,
      {
        duration: 5000,
        id: randomId,
        message: "Uploading assets to CDN server...",
        progress: currentProgress,
        title: "Upload in Progress",
        type: "info",
        variant: "progress",
      },
    ];

    const progressInterval = setInterval(() => {
      currentProgress += 20;
      if (currentProgress > 100) {
        clearInterval(progressInterval);
        activeIntervals.delete(progressInterval);
        return;
      }
      notifications = notifications.map((item) => {
        if (item.id === randomId) {
          return { ...item, progress: currentProgress };
        }
        return item;
      });
    }, 800);

    activeIntervals.add(progressInterval);
  }

  function spawnPillNotification(): void {
    const randomId = Math.random().toString(36).substring(2, 9);
    notifications = [
      ...notifications,
      {
        duration: 3000,
        id: randomId,
        message: "Profile settings saved",
        type: "success",
        variant: "pill",
      },
    ];
  }

  onDestroy(() => {
    for (const intervalId of activeIntervals) {
      clearInterval(intervalId);
    }
    activeIntervals.clear();
  });
</script>

<Container id="notification-samples-container" class="flex flex-col gap-10">
  <Container id="notification-samples-header" class="flex flex-col gap-2">
    <Text id="notification-samples-title" type="h1">Notification Area</Text>
    <Text id="notification-samples-description" class="text-neutral-500">
      A generic fixed viewport container supporting 8 controllable screen edge zones, automatic timer management, and generic type-inferred item
      snippets.
    </Text>
  </Container>

  <!-- 1. Interactive Demo -->
  <Container id="notification-sample-interactive-section" class="flex flex-col gap-6">
    <Text id="notification-sample-interactive-heading" type="h3" class="text-xl font-bold">1. Interactive Screen Edge & Generic Snippet Demo</Text>
    <Text id="notification-sample-interactive-description" class="text-neutral-500"
      >Choose screen edge position and trigger custom notifications.</Text
    >

    <Container id="notification-sample-interactive-preview" class="flex flex-col gap-6 rounded-xl border p-6 dark:border-neutral-800">
      <!-- Screen Position Selector -->
      <Container id="notification-sample-position-selector" class="flex flex-col gap-2">
        <Text id="notification-sample-position-label" class="text-sm font-semibold uppercase tracking-wider text-neutral-500"
          >Screen Edge Position</Text
        >
        <Container id="notification-sample-position-grid" class="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
          {#each edgePositions as positionOption (positionOption.value)}
            <Button
              id={`notification-pos-${positionOption.value}-btn`}
              onclick={async () => (selectedPosition = positionOption.value)}
              class={[
                "text-xs font-medium transition-all",
                selectedPosition === positionOption.value
                  ? "fluid-button-primary shadow-sm"
                  : "fluid-button-transparent border border-neutral-200 dark:border-neutral-700",
              ].join(" ")}
            >
              {positionOption.label}
            </Button>
          {/each}
        </Container>
      </Container>

      <!-- Spawn Buttons Grid -->
      <Container id="notification-sample-spawn-selector" class="flex flex-col gap-2">
        <Text id="notification-sample-spawn-label" class="text-sm font-semibold uppercase tracking-wider text-neutral-500">Spawn Notifications</Text>
        <Container id="notification-sample-spawn-grid" class="flex flex-wrap gap-3">
          <Button
            id="notification-spawn-info-btn"
            onclick={async () => spawnStandardNotification("info")}
            class="bg-info-500 text-white hover:bg-info-600">Info</Button
          >
          <Button
            id="notification-spawn-success-btn"
            onclick={async () => spawnStandardNotification("success")}
            class="bg-success-500 text-white hover:bg-success-600">Success</Button
          >
          <Button
            id="notification-spawn-warning-btn"
            onclick={async () => spawnStandardNotification("warning")}
            class="bg-warning-500 text-white hover:bg-warning-600">Warning</Button
          >
          <Button
            id="notification-spawn-error-btn"
            onclick={async () => spawnStandardNotification("error")}
            class="bg-error-500 text-white hover:bg-error-600">Error</Button
          >
          <Button
            id="notification-spawn-action-btn"
            onclick={async () => spawnActionNotification()}
            class="bg-amber-600 text-white hover:bg-amber-700">Action (Undo)</Button
          >
          <Button
            id="notification-spawn-progress-btn"
            onclick={async () => spawnProgressNotification()}
            class="bg-indigo-600 text-white hover:bg-indigo-700">Progress Bar</Button
          >
          <Button
            id="notification-spawn-pill-btn"
            onclick={async () => spawnPillNotification()}
            class="bg-emerald-600 text-white hover:bg-emerald-700">Compact Pill</Button
          >
        </Container>
      </Container>

      <!-- Generic Notification Area with itemSnippet -->
      <NotificationArea id="notification-area-demo" position={selectedPosition} bind:items={notifications}>
        {#snippet itemSnippet(item, dismiss)}
          {#if item.variant === "pill"}
            <!-- Compact Pill Style -->
            <Container
              id={`notification-pill-${item.id}`}
              class="pointer-events-auto flex items-center gap-3 rounded-full border border-neutral-200 bg-white/95 px-4 py-2 shadow-md backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/95"
            >
              <Text id={`notification-pill-dot-${item.id}`} type="span" class="h-2 w-2 rounded-full bg-emerald-500"></Text>
              <Text id={`notification-pill-msg-${item.id}`} class="text-xs font-semibold">{item.message}</Text>
              <Button id={`notification-pill-close-${item.id}`} onclick={async () => dismiss()} class="text-neutral-400 hover:text-neutral-600 p-0!">
                <Text id={`notification-pill-x-${item.id}`} type="span" class="text-base leading-none">&times;</Text>
              </Button>
            </Container>
          {:else if item.variant === "progress"}
            <!-- Progress / Upload Style -->
            <Container
              id={`notification-progress-${item.id}`}
              class="pointer-events-auto flex min-w-[320px] max-w-md flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
            >
              <Container id={`notification-progress-header-${item.id}`} class="flex items-center justify-between">
                <Text
                  id={`notification-progress-title-${item.id}`}
                  class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{item.title}</Text
                >
                <Text id={`notification-progress-pct-${item.id}`} type="span" class="text-xs font-mono font-bold text-neutral-500"
                  >{item.progress}%</Text
                >
              </Container>
              <Text id={`notification-progress-msg-${item.id}`} class="text-sm font-medium">{item.message}</Text>
              <Container
                id={`notification-progress-bar-bg-${item.id}`}
                class="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700"
              >
                <Container
                  id={`notification-progress-bar-fill-${item.id}`}
                  class="h-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-400"
                  style="width: {item.progress}%;"
                ></Container>
              </Container>
            </Container>
          {:else if item.variant === "action"}
            <!-- Action / Undo Style -->
            <Container
              id={`notification-action-${item.id}`}
              class="pointer-events-auto flex min-w-[320px] max-w-md items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/95 p-4 shadow-lg dark:border-amber-900/40 dark:bg-neutral-800"
            >
              <Container id={`notification-action-text-col-${item.id}`} class="flex flex-col gap-0.5">
                <Text
                  id={`notification-action-title-${item.id}`}
                  class="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">{item.title}</Text
                >
                <Text id={`notification-action-msg-${item.id}`} class="text-sm font-medium text-neutral-800 dark:text-neutral-200"
                  >{item.message}</Text
                >
              </Container>
              <Button
                id={`notification-action-btn-${item.id}`}
                onclick={async () => dismiss()}
                class="rounded-md bg-amber-600 px-3 py-1 text-xs font-bold text-white hover:bg-amber-700"
              >
                {item.actionLabel || "Undo"}
              </Button>
            </Container>
          {:else}
            <!-- Standard Alert Style -->
            <Container
              id={`notification-standard-${item.id}`}
              class={[
                "pointer-events-auto flex min-w-[300px] max-w-md items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg transition-all dark:border-neutral-700 dark:bg-neutral-800",
                `fluid-notification-${item.type || "info"}`,
              ].join(" ")}
            >
              <Container id={`notification-standard-content-${item.id}`} class="flex flex-1 flex-col gap-0.5">
                {#if item.title}
                  <Text id={`notification-standard-title-${item.id}`} class="text-xs font-bold uppercase tracking-wider text-neutral-500"
                    >{item.title}</Text
                  >
                {/if}
                <Text id={`notification-standard-msg-${item.id}`} class="text-sm font-medium">{item.message}</Text>
              </Container>
              <Button id={`notification-standard-close-${item.id}`} onclick={async () => dismiss()} class="fluid-notification-close p-0!">
                <Text id={`notification-standard-x-${item.id}`} type="span" class="text-xl leading-none">&times;</Text>
              </Button>
            </Container>
          {/if}
        {/snippet}
      </NotificationArea>
    </Container>

    <CodeBlock id="notification-sample-code" code={codeBlockContents.notificationBasic} language="svelte" />
  </Container>
</Container>
