<script lang="ts">
  import { Container, Text } from "#src/lib/base/index.ts";
  import { CodeBlock } from "#src/lib/components/index.ts";
  import { InternationalInput } from "#src/lib/prebuilt/index.ts";

  import { codeBlockContents } from "./codeBlockContents.ts";

  let phoneNumber = $state("");
  let selectedCountry = $state("US");
  let dialCode = $state("+1");

  let selectedCountryOnly = $state("US");

  let currencyAmount = $state("");
  let currencyCountry = $state("US");
</script>

<Container id="international-input-samples-container" class="flex flex-col gap-8">
  <!-- 1. International Phone Input -->
  <Container id="international-input-phone-section" class="flex flex-col gap-2">
    <Text id="international-input-phone-heading" type="h3" class="text-xl font-bold">1. Phone Number Mode</Text>
    <Text id="international-input-phone-description" class="text-neutral-500">
      Features a country flag & dial code dropdown with numeric-only phone input and greyed-out format placeholder.
    </Text>
    <Container id="international-input-phone-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="international-input-phone-wrapper" class="max-w-md">
        <InternationalInput id="international-phone-demo" mode="phone" bind:selectedCountry bind:dialCode bind:value={phoneNumber} variant="w-full" />
        <Text id="international-input-phone-status" class="mt-3 text-sm text-neutral-500">
          Selected: {selectedCountry} | Dial Code: {dialCode} | Value: {phoneNumber}
        </Text>
      </Container>
    </Container>
    <CodeBlock id="international-input-phone-code" code={codeBlockContents.internationalInputBasic} language="svelte" />
  </Container>

  <!-- 2. Country Only Mode -->
  <Container id="international-input-country-section" class="flex flex-col gap-2">
    <Text id="international-input-country-heading" type="h3" class="text-xl font-bold">2. Country Only Mode</Text>
    <Text id="international-input-country-description" class="text-neutral-500">Clean country picker without an extra input field.</Text>
    <Container id="international-input-country-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="international-input-country-wrapper" class="max-w-md">
        <InternationalInput id="international-country-demo" mode="country" bind:selectedCountry={selectedCountryOnly} />
        <Text id="international-input-country-status" class="mt-3 text-sm text-neutral-500">
          Selected Country: {selectedCountryOnly}
        </Text>
      </Container>
    </Container>
    <CodeBlock id="international-input-country-code" code={codeBlockContents.internationalInputCountry} language="svelte" />
  </Container>

  <!-- 3. Currency Mode -->
  <Container id="international-input-currency-section" class="flex flex-col gap-2">
    <Text id="international-input-currency-heading" type="h3" class="text-xl font-bold">3. Currency Mode</Text>
    <Text id="international-input-currency-description" class="text-neutral-500">Flag and currency selector paired with a numeric amount input.</Text>
    <Container id="international-input-currency-preview" class="rounded-xl border p-6 dark:border-neutral-800">
      <Container id="international-input-currency-wrapper" class="max-w-md">
        <InternationalInput
          id="international-currency-demo"
          mode="currency"
          bind:selectedCountry={currencyCountry}
          bind:value={currencyAmount}
          variant="w-full"
        />
        <Text id="international-input-currency-status" class="mt-3 text-sm text-neutral-500">
          Country: {currencyCountry} | Amount: {currencyAmount}
        </Text>
      </Container>
    </Container>
    <CodeBlock id="international-input-currency-code" code={codeBlockContents.internationalInputCurrency} language="svelte" />
  </Container>
</Container>
