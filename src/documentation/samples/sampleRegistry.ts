import type { Component } from "svelte";

import * as Samples from "./index.ts";

export const documentationSampleRegistry: Record<string, Record<string, Component>> = {
  base: {
    button: Samples.ButtonSamples,
    container: Samples.ContainerSamples,
    form: Samples.FormSamples,
    image: Samples.ImageSamples,
    "input-field": Samples.InputFieldSamples,
    label: Samples.LabelSamples,
    link: Samples.LinkSamples,
    list: Samples.ListSamples,
    table: Samples.TableSamples,
    text: Samples.TextSamples,
  },
  components: {
    accordion: Samples.AccordionSamples,
    "anchored-overlay": Samples.AnchoredOverlaySamples,
    "calendar-grid": Samples.CalendarGridSamples,
    carousel: Samples.CarouselSamples,
    draggable: Samples.DraggableSamples,
    drawer: Samples.DrawerSamples,
    dropzone: Samples.DropzoneSamples,
    "image-crop": Samples.ImageCropSamples,
    modal: Samples.ModalSamples,
    page: Samples.PageSamples,
    pagination: Samples.PaginationSamples,
    switch: Samples.SwitchSamples,
    "time-picker": Samples.TimePickerSamples,
  },
  prebuilt: {
    breadcrumb: Samples.BreadcrumbSamples,
    "code-editor": Samples.CodeEditorSamples,
    "international-input": Samples.InternationalInputSamples,
    "notification-area": Samples.NotificationSamples,
    "searchable-selector": Samples.SearchableSelectorSamples,
  },
};
