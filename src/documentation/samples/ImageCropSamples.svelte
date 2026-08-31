<script lang="ts">
  import { onMount } from "svelte";

  import { Button, Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock, ImageCrop, Switch } from "#src/lib/components/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  // Helper to convert hex to RGBA
  function hexToRgba(hex: string, opacity: number): string {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }

  // Helper to transform Data URL to matching source MIME type (JPEG / PNG / WebP)
  async function transformDataUrlToMimeType(sourceDataUrl: string, targetMimeType: string, quality: number = 0.92): Promise<string> {
    return new Promise((resolve, reject) => {
      const temporaryImage = new Image();
      temporaryImage.onload = () => {
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = temporaryImage.width;
        offscreenCanvas.height = temporaryImage.height;
        const canvasContext = offscreenCanvas.getContext("2d");
        if (!canvasContext) {
          resolve(sourceDataUrl);
          return;
        }

        // For JPEG, fill white background to avoid black background on transparent areas
        if (targetMimeType === "image/jpeg") {
          canvasContext.fillStyle = "#ffffff";
          canvasContext.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        }

        canvasContext.drawImage(temporaryImage, 0, 0);
        resolve(offscreenCanvas.toDataURL(targetMimeType, quality));
      };
      temporaryImage.onerror = (error) => reject(error);
      temporaryImage.src = sourceDataUrl;
    });
  }

  // Example 1 state (Remote JPG)
  let imageBitmap: ImageBitmap | undefined = $state(undefined);
  let rawResultImage: string | undefined = $state(undefined);
  let transformedResultImage: string | undefined = $state(undefined);
  const remoteMimeType = "image/jpeg";
  const remoteExtension = "jpg";

  let zoom = $state(1);
  let panX = $state(0);
  let panY = $state(0);
  let padding = $state(50);
  let isCircle = $state(false);
  let overlayHex = $state("#000000");
  let overlayOpacity = $state(0.5);
  let overlayColor = $derived(hexToRgba(overlayHex, overlayOpacity));

  // Transform remote crop output to JPG when generated
  $effect(() => {
    if (rawResultImage) {
      transformDataUrlToMimeType(rawResultImage, remoteMimeType)
        .then((converted) => {
          transformedResultImage = converted;
        })
        .catch(() => {
          transformedResultImage = rawResultImage;
        });
    } else {
      transformedResultImage = undefined;
    }
  });

  // Example 2 state (File Upload)
  let uploadedBitmap: ImageBitmap | undefined = $state(undefined);
  let rawUploadResult: string | undefined = $state(undefined);
  let transformedUploadResult: string | undefined = $state(undefined);
  let uploadedMimeType = $state("image/png");
  let uploadedExtension = $state("png");
  let uploadedBaseFileName = $state("uploaded-image");

  let uploadZoom = $state(1);
  let uploadPanX = $state(0);
  let uploadPanY = $state(0);
  let uploadPadding = $state(50);
  let uploadIsCircle = $state(false);
  let uploadOverlayHex = $state("#000000");
  let uploadOverlayOpacity = $state(0.5);
  let uploadOverlayColor = $derived(hexToRgba(uploadOverlayHex, uploadOverlayOpacity));

  // Transform uploaded crop output to match source file MIME type
  $effect(() => {
    if (rawUploadResult) {
      transformDataUrlToMimeType(rawUploadResult, uploadedMimeType)
        .then((converted) => {
          transformedUploadResult = converted;
        })
        .catch(() => {
          transformedUploadResult = rawUploadResult;
        });
    } else {
      transformedUploadResult = undefined;
    }
  });

  onMount(async () => {
    try {
      const response = await fetch("https://picsum.photos/id/10/1920/1080");
      const blob = await response.blob();
      imageBitmap = await createImageBitmap(blob);
    } catch (error) {
      console.error("Failed to load image:", error);
    }
  });

  async function handleFileChange(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const fileDotIndex = file.name.lastIndexOf(".");
      if (fileDotIndex !== -1) {
        uploadedBaseFileName = file.name.substring(0, fileDotIndex);
        uploadedExtension = file.name.substring(fileDotIndex + 1).toLowerCase();
      } else {
        uploadedBaseFileName = file.name;
        uploadedExtension = file.type.includes("jpeg") || file.type.includes("jpg") ? "jpg" : "png";
      }

      if (file.type === "image/jpeg" || uploadedExtension === "jpg" || uploadedExtension === "jpeg") {
        uploadedMimeType = "image/jpeg";
        uploadedExtension = "jpg";
      } else if (file.type === "image/webp" || uploadedExtension === "webp") {
        uploadedMimeType = "image/webp";
        uploadedExtension = "webp";
      } else {
        uploadedMimeType = "image/png";
        uploadedExtension = "png";
      }

      const blob = new Blob([file], { type: file.type });
      uploadedBitmap = await createImageBitmap(blob);
      uploadZoom = 1;
      uploadPanX = 0;
      uploadPanY = 0;
    }
  }

  function dataUrlToBlob(dataUrl: string): Blob {
    const parts = dataUrl.split(";base64,");
    const mimeType = parts[0].split(":")[1] || "image/png";
    const rawData = window.atob(parts[1] || "");
    const rawLength = rawData.length;
    const uint8Array = new Uint8Array(rawLength);

    for (let index = 0; index < rawLength; ++index) {
      uint8Array[index] = rawData.charCodeAt(index);
    }

    return new Blob([uint8Array], { type: mimeType });
  }

  function handleDownload(dataUrl: string | undefined, filename: string): void {
    if (!dataUrl) {
      return;
    }

    const blob = dataUrlToBlob(dataUrl);
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  }
</script>

<Container id="image-crop-samples-container" class="flex flex-col gap-12">
  <!-- Example 1: Basic with Remote Image -->
  <Container id="image-crop-sample-remote-section" class="flex flex-col gap-4">
    <Container id="image-crop-remote-header" class="flex items-center justify-between">
      <Container id="image-crop-remote-titles" class="flex flex-col gap-1">
        <Text id="image-crop-remote-heading" type="h3" class="text-lg font-semibold">Rectangle Crop (1:1)</Text>
        <Text id="image-crop-remote-description" class="text-sm text-neutral-500"
          >Standard rectangular cropping with zoom, pan, and padding controls.</Text
        >
      </Container>
      <Container id="image-crop-remote-switch-wrapper" class="flex items-center gap-3">
        <Text id="image-crop-remote-shape-label" class="text-xs font-medium uppercase text-neutral-500">{isCircle ? "Circle" : "Rectangle"}</Text>
        <Switch id="image-crop-switch-1" bind:checked={isCircle} onclick={async () => {}} />
      </Container>
    </Container>

    <Container id="image-crop-remote-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      {#if imageBitmap}
        <Container id="image-crop-remote-content" class="flex flex-col gap-8">
          <!-- Preview Row -->
          <Container id="image-crop-remote-preview-row" class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Container id="image-crop-remote-canvas-col" class="flex flex-col gap-2">
              <Text id="image-crop-remote-canvas-label" type="h4" class="font-semibold text-neutral-500">Canvas:</Text>
              <Container
                id="image-crop-remote-canvas-wrapper"
                class="flex aspect-square items-center justify-center overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800"
              >
                <ImageCrop
                  id="image-crop-basic"
                  sourceImage={imageBitmap}
                  aspectRatio={{ x: 1, y: 1 }}
                  bind:resultImage={rawResultImage}
                  {zoom}
                  pan={{ x: panX, y: panY }}
                  {padding}
                  shape={isCircle ? "circle" : "rectangle"}
                  {overlayColor}
                />
              </Container>
            </Container>

            <Container id="image-crop-remote-result-col" class="flex flex-col gap-2">
              <Container id="image-crop-remote-result-header" class="flex items-center justify-between">
                <Container id="image-crop-remote-result-info" class="flex items-center gap-2">
                  <Text id="image-crop-remote-result-label" type="h4" class="font-semibold text-neutral-500">Result:</Text>
                  <Text
                    id="image-crop-remote-ext-badge"
                    type="span"
                    class="rounded bg-neutral-200 px-2 py-0.5 text-xs font-mono font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
                  >
                    {remoteExtension.toUpperCase()}
                  </Text>
                </Container>
                {#if transformedResultImage}
                  <Button
                    id="image-crop-remote-download-btn"
                    onclick={async () => handleDownload(transformedResultImage, `crop-result.${remoteExtension}`)}
                    class="fluid-button-primary scale-75"
                  >
                    Download .{remoteExtension}
                  </Button>
                {/if}
              </Container>
              <Container
                id="image-crop-remote-result-image-wrapper"
                class="flex aspect-square items-center justify-center overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800"
              >
                {#if transformedResultImage}
                  <Image
                    id="image-crop-remote-result-img"
                    src={transformedResultImage}
                    alt="Cropped result"
                    class="max-h-full max-w-full object-contain"
                  />
                {:else}
                  <Text id="image-crop-remote-processing-text" class="text-xs italic text-neutral-400">Processing...</Text>
                {/if}
              </Container>
            </Container>
          </Container>

          <!-- Controls Grid -->
          <Container id="image-crop-remote-controls-grid" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Container id="image-crop-remote-zoom-padding-group" class="flex flex-col gap-4">
              <Container id="image-crop-remote-zoom-group" class="flex flex-col gap-2">
                <Text id="image-crop-remote-zoom-label" class="text-xs font-medium uppercase text-neutral-500">Zoom ({zoom.toFixed(2)})</Text>
                <input id="image-crop-remote-zoom-input" type="range" min="0.1" max="5" step="0.01" bind:value={zoom} class="w-full" />
              </Container>
              <Container id="image-crop-remote-padding-group" class="flex flex-col gap-2">
                <Text id="image-crop-remote-padding-label" class="text-xs font-medium uppercase text-neutral-500">Padding ({padding}px)</Text>
                <input id="image-crop-remote-padding-input" type="range" min="0" max="200" step="1" bind:value={padding} class="w-full" />
              </Container>
            </Container>

            <Container id="image-crop-remote-pan-group" class="flex flex-col gap-4">
              <Container id="image-crop-remote-panx-group" class="flex flex-col gap-2">
                <Text id="image-crop-remote-panx-label" class="text-xs font-medium uppercase text-neutral-500">Pan X ({panX}px)</Text>
                <input id="image-crop-remote-panx-input" type="range" min="-400" max="400" step="1" bind:value={panX} class="w-full" />
              </Container>
              <Container id="image-crop-remote-pany-group" class="flex flex-col gap-2">
                <Text id="image-crop-remote-pany-label" class="text-xs font-medium uppercase text-neutral-500">Pan Y ({panY}px)</Text>
                <input id="image-crop-remote-pany-input" type="range" min="-400" max="400" step="1" bind:value={panY} class="w-full" />
              </Container>
            </Container>

            <Container id="image-crop-remote-color-group" class="flex flex-col gap-4">
              <Container id="image-crop-remote-color-picker-group" class="flex flex-col gap-2">
                <Text id="image-crop-remote-color-label" class="text-xs font-medium uppercase text-neutral-500">Color</Text>
                <input id="image-crop-remote-color-input" type="color" bind:value={overlayHex} class="h-8 w-full" />
              </Container>
              <Container id="image-crop-remote-opacity-group" class="flex flex-col gap-2">
                <Text id="image-crop-remote-opacity-label" class="text-xs font-medium uppercase text-neutral-500">Opacity ({overlayOpacity})</Text>
                <input id="image-crop-remote-opacity-input" type="range" min="0" max="1" step="0.05" bind:value={overlayOpacity} class="w-full" />
              </Container>
            </Container>
          </Container>
        </Container>
      {:else}
        <Text id="image-crop-remote-loading-text">Loading image bitmap...</Text>
      {/if}
    </Container>
    <CodeBlock id="image-crop-remote-code" code={codeBlockContents.imageCropBasic} language="svelte" />
  </Container>

  <!-- Example 2: File Picker -->
  <Container id="image-crop-sample-upload-section" class="flex flex-col gap-4">
    <Container id="image-crop-upload-header" class="flex items-center justify-between">
      <Container id="image-crop-upload-titles" class="flex flex-col gap-1">
        <Text id="image-crop-upload-heading" type="h3" class="text-lg font-semibold">File Upload</Text>
        <Text id="image-crop-upload-description" class="text-sm text-neutral-500">
          Select a local image file to crop. Preserves source file extension (JPG / PNG / WebP) upon export.
        </Text>
      </Container>
      <Container id="image-crop-upload-switch-wrapper" class="flex items-center gap-3">
        <Text id="image-crop-upload-shape-label" class="text-xs font-medium uppercase text-neutral-500"
          >{uploadIsCircle ? "Circle" : "Rectangle"}</Text
        >
        <Switch id="image-crop-switch-2" bind:checked={uploadIsCircle} onclick={async () => {}} />
      </Container>
    </Container>

    <Container id="image-crop-upload-preview" class="rounded-lg border p-6 dark:border-neutral-700">
      <Container id="image-crop-upload-file-input-row" class="mb-6 flex flex-wrap items-center gap-4">
        <input
          id="image-crop-upload-file-input"
          type="file"
          accept="image/*"
          onchange={handleFileChange}
          class="text-sm text-neutral-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-neutral-800 dark:file:text-neutral-300"
        />
        {#if uploadedBitmap}
          <Text
            id="image-crop-upload-detected-badge"
            type="span"
            class="rounded bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-950 dark:text-primary-300"
          >
            Detected Source: {uploadedMimeType} (.{uploadedExtension})
          </Text>
        {/if}
      </Container>

      {#if uploadedBitmap}
        <Container id="image-crop-upload-content" class="flex flex-col gap-8">
          <!-- Preview Row -->
          <Container id="image-crop-upload-preview-row" class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Container id="image-crop-upload-canvas-col" class="flex flex-col gap-2">
              <Text id="image-crop-upload-canvas-label" type="h4" class="font-semibold text-neutral-500">Canvas:</Text>
              <Container
                id="image-crop-upload-canvas-wrapper"
                class="flex aspect-video items-center justify-center overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800"
              >
                <ImageCrop
                  id="image-crop-upload"
                  sourceImage={uploadedBitmap}
                  aspectRatio={{ x: 16, y: 9 }}
                  bind:resultImage={rawUploadResult}
                  zoom={uploadZoom}
                  pan={{ x: uploadPanX, y: uploadPanY }}
                  padding={uploadPadding}
                  shape={uploadIsCircle ? "circle" : "rectangle"}
                  overlayColor={uploadOverlayColor}
                />
              </Container>
            </Container>

            <Container id="image-crop-upload-result-col" class="flex flex-col gap-2">
              <Container id="image-crop-upload-result-header" class="flex items-center justify-between">
                <Container id="image-crop-upload-result-info" class="flex items-center gap-2">
                  <Text id="image-crop-upload-result-label" type="h4" class="font-semibold text-neutral-500">Result:</Text>
                  <Text
                    id="image-crop-upload-ext-badge"
                    type="span"
                    class="rounded bg-neutral-200 px-2 py-0.5 text-xs font-mono font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
                  >
                    {uploadedExtension.toUpperCase()}
                  </Text>
                </Container>
                {#if transformedUploadResult}
                  <Button
                    id="image-crop-upload-download-btn"
                    onclick={async () => handleDownload(transformedUploadResult, `cropped-${uploadedBaseFileName}.${uploadedExtension}`)}
                    class="fluid-button-primary scale-75"
                  >
                    Download .{uploadedExtension}
                  </Button>
                {/if}
              </Container>
              <Container
                id="image-crop-upload-result-image-wrapper"
                class="flex aspect-video items-center justify-center overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800"
              >
                {#if transformedUploadResult}
                  <Image
                    id="image-crop-upload-result-img"
                    src={transformedUploadResult}
                    alt="Cropped result"
                    class="max-h-full max-w-full object-contain"
                  />
                {:else}
                  <Text id="image-crop-upload-processing-text" class="text-xs italic text-neutral-400">Processing...</Text>
                {/if}
              </Container>
            </Container>
          </Container>

          <!-- Controls Grid -->
          <Container id="image-crop-upload-controls-grid" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Container id="image-crop-upload-zoom-padding-group" class="flex flex-col gap-4">
              <Container id="image-crop-upload-zoom-group" class="flex flex-col gap-2">
                <Text id="image-crop-upload-zoom-label" class="text-xs font-medium uppercase text-neutral-500">Zoom ({uploadZoom.toFixed(2)})</Text>
                <input id="image-crop-upload-zoom-input" type="range" min="0.1" max="5" step="0.01" bind:value={uploadZoom} class="w-full" />
              </Container>
              <Container id="image-crop-upload-padding-group" class="flex flex-col gap-2">
                <Text id="image-crop-upload-padding-label" class="text-xs font-medium uppercase text-neutral-500">Padding ({uploadPadding}px)</Text>
                <input id="image-crop-upload-padding-input" type="range" min="0" max="200" step="1" bind:value={uploadPadding} class="w-full" />
              </Container>
            </Container>

            <Container id="image-crop-upload-pan-group" class="flex flex-col gap-4">
              <Container id="image-crop-upload-panx-group" class="flex flex-col gap-2">
                <Text id="image-crop-upload-panx-label" class="text-xs font-medium uppercase text-neutral-500">Pan X ({uploadPanX}px)</Text>
                <input id="image-crop-upload-panx-input" type="range" min="-1000" max="1000" step="1" bind:value={uploadPanX} class="w-full" />
              </Container>
              <Container id="image-crop-upload-pany-group" class="flex flex-col gap-2">
                <Text id="image-crop-upload-pany-label" class="text-xs font-medium uppercase text-neutral-500">Pan Y ({uploadPanY}px)</Text>
                <input id="image-crop-upload-pany-input" type="range" min="-1000" max="1000" step="1" bind:value={uploadPanY} class="w-full" />
              </Container>
            </Container>

            <Container id="image-crop-upload-color-group" class="flex flex-col gap-4">
              <Container id="image-crop-upload-color-picker-group" class="flex flex-col gap-2">
                <Text id="image-crop-upload-color-label" class="text-xs font-medium uppercase text-neutral-500">Color</Text>
                <input id="image-crop-upload-color-input" type="color" bind:value={uploadOverlayHex} class="h-8 w-full" />
              </Container>
              <Container id="image-crop-upload-opacity-group" class="flex flex-col gap-2">
                <Text id="image-crop-upload-opacity-label" class="text-xs font-medium uppercase text-neutral-500"
                  >Opacity ({uploadOverlayOpacity})</Text
                >
                <input
                  id="image-crop-upload-opacity-input"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  bind:value={uploadOverlayOpacity}
                  class="w-full"
                />
              </Container>
            </Container>
          </Container>
        </Container>
      {:else}
        <Container
          id="image-crop-upload-empty-state"
          class="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 dark:border-neutral-800"
        >
          <Text id="image-crop-upload-empty-text" class="text-neutral-400">Please select an image to start cropping</Text>
        </Container>
      {/if}
    </Container>
    <CodeBlock id="image-crop-upload-code" code={codeBlockContents.imageCropUpload} language="svelte" />
  </Container>
</Container>
