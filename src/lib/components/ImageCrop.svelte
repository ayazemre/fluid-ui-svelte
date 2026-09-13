<script lang="ts">
  import { Canvas, Container } from "#src/lib/base/index.ts";

  import { renderImageCropPipeline, type ImageCropAspectRatio, type ImageCropPanCoordinates, type ImageCropShape } from "./imageCrop.ts";

  let {
    id,
    variant = "",
    sourceImage = $bindable(),
    aspectRatio,
    resultImage = $bindable(),
    zoom = 1,
    pan = { x: 0, y: 0 },
    padding = 50,
    shape = "rectangle",
    overlayColor = "rgba(0, 0, 0, 0.5)",
  }: {
    id: string;
    sourceImage: ImageBitmap;
    aspectRatio: ImageCropAspectRatio;
    variant?: string;
    resultImage?: string;
    zoom?: number;
    pan?: ImageCropPanCoordinates;
    padding?: number;
    shape?: ImageCropShape;
    overlayColor?: string;
  } = $props();

  let canvasReference: HTMLCanvasElement | null = $state(null);

  $effect(() => {
    resultImage = renderImageCropPipeline(canvasReference ?? undefined, sourceImage, aspectRatio, { pan, zoom }, padding, shape, overlayColor);
  });
</script>

<Container {id} class={[variant, "fluid-image-crop-wrapper"].join(" ")}>
  <Canvas id={`${id}-canvas`} bind:underlyingElement={canvasReference} class={[variant, "fluid-image-cropper-canvas"].join(" ")} />
</Container>
