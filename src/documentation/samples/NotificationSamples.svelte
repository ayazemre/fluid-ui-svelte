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

<Container class="flex flex-col gap-10">
  <Container class="flex flex-col gap-2">
    <Text type="h1">Notification Area</Text>
    <Text class="text-neutral-500">
      A generic fixed viewport container supporting 8 controllable screen edge zones, automatic timer management, and generic type-inferred item
      snippets.
    </Text>
  </Container>

  <!-- 1. Interactive Demo -->
  <Container class="flex flex-col gap-6">
    <Text type="h3" class="text-xl font-bold">1. Interactive Screen Edge & Generic Snippet Demo</Text>
    <Text class="text-neutral-500">Choose screen edge position and trigger custom notifications.</Text>

    <Container class="flex flex-col gap-6 rounded-xl border p-6 dark:border-neutral-800">
      <!-- Screen Position Selector -->
      <Container class="flex flex-col gap-2">
        <Text class="text-sm font-semibold uppercase tracking-wider text-neutral-500">Screen Edge Position</Text>
        <Container class="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
          {#each edgePositions as positionOption (positionOption.value)}
            <Button
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
      <Container class="flex flex-col gap-2">
        <Text class="text-sm font-semibold uppercase tracking-wider text-neutral-500">Spawn Notifications</Text>
        <Container class="flex flex-wrap gap-3">
          <Button onclick={async () => spawnStandardNotification("info")} class="bg-info-500 text-white hover:bg-info-600">Info</Button>
          <Button onclick={async () => spawnStandardNotification("success")} class="bg-success-500 text-white hover:bg-success-600">Success</Button>
          <Button onclick={async () => spawnStandardNotification("warning")} class="bg-warning-500 text-white hover:bg-warning-600">Warning</Button>
          <Button onclick={async () => spawnStandardNotification("error")} class="bg-error-500 text-white hover:bg-error-600">Error</Button>
          <Button onclick={async () => spawnActionNotification()} class="bg-amber-600 text-white hover:bg-amber-700">Action (Undo)</Button>
          <Button onclick={async () => spawnProgressNotification()} class="bg-indigo-600 text-white hover:bg-indigo-700">Progress Bar</Button>
          <Button onclick={async () => spawnPillNotification()} class="bg-emerald-600 text-white hover:bg-emerald-700">Compact Pill</Button>
        </Container>
      </Container>

      <!-- Generic Notification Area with itemSnippet -->
      <NotificationArea componentId="notification-area-demo" position={selectedPosition} bind:items={notifications}>
        {#snippet itemSnippet(item, dismiss)}
          {#if item.variant === "pill"}
            <!-- Compact Pill Style -->
            <div
              class="pointer-events-auto flex items-center gap-3 rounded-full border border-neutral-200 bg-white/95 px-4 py-2 shadow-md backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/95"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              <Text class="text-xs font-semibold">{item.message}</Text>
              <Button onclick={async () => dismiss()} class="text-neutral-400 hover:text-neutral-600 p-0!">
                <span class="text-base leading-none">&times;</span>
              </Button>
            </div>
          {:else if item.variant === "progress"}
            <!-- Progress / Upload Style -->
            <div
              class="pointer-events-auto flex min-w-[320px] max-w-md flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
            >
              <div class="flex items-center justify-between">
                <Text class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{item.title}</Text>
                <span class="text-xs font-mono font-bold text-neutral-500">{item.progress}%</span>
              </div>
              <Text class="text-sm font-medium">{item.message}</Text>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
                <div class="h-full bg-indigo-600 transition-all duration-300 dark:bg-indigo-400" style="width: {item.progress}%;"></div>
              </div>
            </div>
          {:else if item.variant === "action"}
            <!-- Action / Undo Style -->
            <div
              class="pointer-events-auto flex min-w-[320px] max-w-md items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/95 p-4 shadow-lg dark:border-amber-900/40 dark:bg-neutral-800"
            >
              <div class="flex flex-col gap-0.5">
                <Text class="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">{item.title}</Text>
                <Text class="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.message}</Text>
              </div>
              <Button onclick={async () => dismiss()} class="rounded-md bg-amber-600 px-3 py-1 text-xs font-bold text-white hover:bg-amber-700">
                {item.actionLabel || "Undo"}
              </Button>
            </div>
          {:else}
            <!-- Standard Alert Style -->
            <div
              class={[
                "pointer-events-auto flex min-w-[300px] max-w-md items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg transition-all dark:border-neutral-700 dark:bg-neutral-800",
                `fluid-notification-${item.type || "info"}`,
              ].join(" ")}
            >
              <div class="flex flex-1 flex-col gap-0.5">
                {#if item.title}
                  <Text class="text-xs font-bold uppercase tracking-wider text-neutral-500">{item.title}</Text>
                {/if}
                <Text class="text-sm font-medium">{item.message}</Text>
              </div>
              <Button onclick={async () => dismiss()} class="fluid-notification-close p-0!">
                <span class="text-xl leading-none">&times;</span>
              </Button>
            </div>
          {/if}
        {/snippet}
      </NotificationArea>
    </Container>

    <CodeBlock code={codeBlockContents.notificationBasic} language="svelte" />
  </Container>
</Container>
