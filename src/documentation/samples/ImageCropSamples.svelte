<script lang="ts">
  import { onMount } from "svelte";

  import { Container, Text, Button } from "#src/lib/base/index.ts";
  import { ImageCrop, CodeBlock, Switch } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  // Helper to convert hex to RGBA
  function hexToRgba(hex: string, opacity: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Example 1 state
  let imageBitmap: ImageBitmap | undefined = $state(undefined);
  let resultImage: string | undefined = $state(undefined);
  let zoom = $state(1);
  let panX = $state(0);
  let panY = $state(0);
  let padding = $state(50);
  let isCircle = $state(false);
  let overlayHex = $state("#000000");
  let overlayOpacity = $state(0.5);
  let overlayColor = $derived(hexToRgba(overlayHex, overlayOpacity));

  // File upload example state
  let uploadedBitmap: ImageBitmap | undefined = $state(undefined);
  let uploadResult: string | undefined = $state(undefined);
  let uploadZoom = $state(1);
  let uploadPanX = $state(0);
  let uploadPanY = $state(0);
  let uploadPadding = $state(50);
  let uploadIsCircle = $state(false);
  let uploadOverlayHex = $state("#000000");
  let uploadOverlayOpacity = $state(0.5);
  let uploadOverlayColor = $derived(hexToRgba(uploadOverlayHex, uploadOverlayOpacity));

  onMount(async () => {
    try {
      const response = await fetch("https://picsum.photos/id/10/1920/1080");
      const blob = await response.blob();
      imageBitmap = await createImageBitmap(blob);
    } catch (error) {
      console.error("Failed to load image:", error);
    }
  });

  async function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      uploadedBitmap = await createImageBitmap(blob);
      // Reset controls for new image
      uploadZoom = 1;
      uploadPanX = 0;
      uploadPanY = 0;
    }
  }

  async function handleDownload(dataUrl: string | undefined, filename: string) {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }
</script>

<Container class="flex flex-col gap-12">
  <!-- Example 1: Basic with Remote Image -->
  <Container class="flex flex-col gap-4">
    <Container class="flex items-center justify-between">
      <Container class="flex flex-col gap-1">
        <Text type="h3" class="text-lg font-semibold">Rectangle Crop (1:1)</Text>
        <Text class="text-sm text-neutral-500">Standard rectangular cropping with zoom, pan, and padding controls.</Text>
      </Container>
      <Container class="flex items-center gap-3">
        <Text class="text-xs font-medium uppercase text-neutral-500">{isCircle ? "Circle" : "Rectangle"}</Text>
        <Switch bind:checked={isCircle} onclick={async () => {}} />
      </Container>
    </Container>

    <Container class="rounded-lg border p-6 dark:border-neutral-700">
      {#if imageBitmap}
        <Container class="flex flex-col gap-8">
          <!-- Preview Row -->
          <Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Container class="flex flex-col gap-2">
              <Text type="h4" class="font-semibold text-neutral-500">Canvas:</Text>
              <Container class="flex aspect-square items-center justify-center overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                <ImageCrop
                  sourceImage={imageBitmap}
                  aspectRatio={{ x: 1, y: 1 }}
                  bind:resultImage
                  {zoom}
                  pan={{ x: panX, y: panY }}
                  {padding}
                  shape={isCircle ? "circle" : "rectangle"}
                  {overlayColor}
                />
              </Container>
            </Container>

            <Container class="flex flex-col gap-2">
              <Container class="flex items-center justify-between">
                <Text type="h4" class="font-semibold text-neutral-500">Result:</Text>
                {#if resultImage}
                  <Button onclick={async () => handleDownload(resultImage, "crop-result.png")} class="fluid-button-primary scale-75">Download</Button>
                {/if}
              </Container>
              <Container class="flex aspect-square items-center justify-center overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                {#if resultImage}
                  <img src={resultImage} alt="Cropped result" class="max-h-full max-w-full object-contain" />
                {:else}
                  <Text class="text-xs text-neutral-400 italic">Processing...</Text>
                {/if}
              </Container>
            </Container>
          </Container>

          <!-- Controls Grid -->
          <Container class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Container class="flex flex-col gap-4">
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Zoom ({zoom.toFixed(2)})</Text>
                <input type="range" min="0.1" max="5" step="0.01" bind:value={zoom} class="w-full" />
              </Container>
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Padding ({padding}px)</Text>
                <input type="range" min="0" max="200" step="1" bind:value={padding} class="w-full" />
              </Container>
            </Container>

            <Container class="flex flex-col gap-4">
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Pan X ({panX}px)</Text>
                <input type="range" min="-400" max="400" step="1" bind:value={panX} class="w-full" />
              </Container>
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Pan Y ({panY}px)</Text>
                <input type="range" min="-400" max="400" step="1" bind:value={panY} class="w-full" />
              </Container>
            </Container>

            <Container class="flex flex-col gap-4">
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Color</Text>
                <input type="color" bind:value={overlayHex} class="h-8 w-full" />
              </Container>
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Opacity ({overlayOpacity})</Text>
                <input type="range" min="0" max="1" step="0.05" bind:value={overlayOpacity} class="w-full" />
              </Container>
            </Container>
          </Container>
        </Container>
      {:else}
        <Text>Loading image bitmap...</Text>
      {/if}
    </Container>
    <CodeBlock code={codeBlockContents.imageCropBasic} language="svelte" />
  </Container>

  <!-- Example 2: File Picker -->
  <Container class="flex flex-col gap-4">
    <Container class="flex items-center justify-between">
      <Container class="flex flex-col gap-1">
        <Text type="h3" class="text-lg font-semibold">File Upload</Text>
        <Text class="text-sm text-neutral-500">Select a local image file to crop. Supports custom aspect ratios and colors.</Text>
      </Container>
      <Container class="flex items-center gap-3">
        <Text class="text-xs font-medium uppercase text-neutral-500">{uploadIsCircle ? "Circle" : "Rectangle"}</Text>
        <Switch bind:checked={uploadIsCircle} onclick={async () => {}} />
      </Container>
    </Container>

    <Container class="rounded-lg border p-6 dark:border-neutral-700">
      <Container class="mb-6">
        <input
          type="file"
          accept="image/*"
          onchange={handleFileChange}
          class="text-sm text-neutral-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-neutral-800 dark:file:text-neutral-300"
        />
      </Container>

      {#if uploadedBitmap}
        <Container class="flex flex-col gap-8">
          <!-- Preview Row -->
          <Container class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Container class="flex flex-col gap-2">
              <Text type="h4" class="font-semibold text-neutral-500">Canvas:</Text>
              <Container class="flex aspect-video items-center justify-center overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                <ImageCrop
                  sourceImage={uploadedBitmap}
                  aspectRatio={{ x: 16, y: 9 }}
                  bind:resultImage={uploadResult}
                  zoom={uploadZoom}
                  pan={{ x: uploadPanX, y: uploadPanY }}
                  padding={uploadPadding}
                  shape={uploadIsCircle ? "circle" : "rectangle"}
                  overlayColor={uploadOverlayColor}
                />
              </Container>
            </Container>

            <Container class="flex flex-col gap-2">
              <Container class="flex items-center justify-between">
                <Text type="h4" class="font-semibold text-neutral-500">Result:</Text>
                {#if uploadResult}
                  <Button onclick={async () => handleDownload(uploadResult, "upload-crop-result.png")} class="fluid-button-primary scale-75">
                    Download
                  </Button>
                {/if}
              </Container>
              <Container class="flex aspect-video items-center justify-center overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
                {#if uploadResult}
                  <img src={uploadResult} alt="Cropped result" class="max-h-full max-w-full object-contain" />
                {:else}
                  <Text class="text-xs text-neutral-400 italic">Processing...</Text>
                {/if}
              </Container>
            </Container>
          </Container>

          <!-- Controls Grid -->
          <Container class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Container class="flex flex-col gap-4">
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Zoom ({uploadZoom.toFixed(2)})</Text>
                <input type="range" min="0.1" max="5" step="0.01" bind:value={uploadZoom} class="w-full" />
              </Container>
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Padding ({uploadPadding}px)</Text>
                <input type="range" min="0" max="200" step="1" bind:value={uploadPadding} class="w-full" />
              </Container>
            </Container>

            <Container class="flex flex-col gap-4">
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Pan X ({uploadPanX}px)</Text>
                <input type="range" min="-1000" max="1000" step="1" bind:value={uploadPanX} class="w-full" />
              </Container>
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Pan Y ({uploadPanY}px)</Text>
                <input type="range" min="-1000" max="1000" step="1" bind:value={uploadPanY} class="w-full" />
              </Container>
            </Container>

            <Container class="flex flex-col gap-4">
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Color</Text>
                <input type="color" bind:value={uploadOverlayHex} class="h-8 w-full" />
              </Container>
              <Container class="flex flex-col gap-2">
                <Text class="text-xs font-medium uppercase text-neutral-500">Opacity ({uploadOverlayOpacity})</Text>
                <input type="range" min="0" max="1" step="0.05" bind:value={uploadOverlayOpacity} class="w-full" />
              </Container>
            </Container>
          </Container>
        </Container>
      {:else}
        <Container class="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 dark:border-neutral-800">
          <Text class="text-neutral-400">Please select an image to start cropping</Text>
        </Container>
      {/if}
    </Container>
    <CodeBlock code={codeBlockContents.imageCropUpload} language="svelte" />
  </Container>
</Container>
