<script lang="ts">
  import { Container } from "#src/lib/base/index.ts";

  import { renderImageCropPipeline, type ImageCropAspectRatio, type ImageCropPanCoordinates, type ImageCropShape } from "./imageCrop.ts";

  let {
    componentId,
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
    componentId: string;
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

  let canvasReference: HTMLCanvasElement | undefined = $state(undefined);

  $effect(() => {
    resultImage = renderImageCropPipeline(canvasReference, sourceImage, aspectRatio, { pan, zoom }, padding, shape, overlayColor);
  });
</script>

<Container id={componentId} class={[variant, "fluid-image-crop-wrapper"].join(" ")}>
  <canvas bind:this={canvasReference} class={[variant, "fluid-image-cropper-canvas"].join(" ")}></canvas>
</Container>
