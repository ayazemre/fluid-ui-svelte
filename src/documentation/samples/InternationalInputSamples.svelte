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

<Container class="flex flex-col gap-8">
  <!-- 1. International Phone Input -->
  <Container class="flex flex-col gap-2">
    <Text type="h3" class="text-xl font-bold">1. Phone Number Mode</Text>
    <Text class="text-neutral-500">
      Features a country flag & dial code dropdown with numeric-only phone input and greyed-out format placeholder.
    </Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="max-w-md">
        <InternationalInput
          componentId="international-phone-demo"
          mode="phone"
          bind:selectedCountry
          bind:dialCode
          bind:value={phoneNumber}
          class="w-full"
        />
        <Text class="mt-3 text-sm text-neutral-500">
          Selected: {selectedCountry} | Dial Code: {dialCode} | Value: {phoneNumber}
        </Text>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.internationalInputBasic} language="svelte" />
  </Container>

  <!-- 2. Country Only Mode -->
  <Container class="flex flex-col gap-2">
    <Text type="h3" class="text-xl font-bold">2. Country Only Mode</Text>
    <Text class="text-neutral-500">Clean country picker without an extra input field.</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="max-w-md">
        <InternationalInput componentId="international-country-demo" mode="country" bind:selectedCountry={selectedCountryOnly} />
        <Text class="mt-3 text-sm text-neutral-500">
          Selected Country: {selectedCountryOnly}
        </Text>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.internationalInputCountry} language="svelte" />
  </Container>

  <!-- 3. Currency Mode -->
  <Container class="flex flex-col gap-2">
    <Text type="h3" class="text-xl font-bold">3. Currency Mode</Text>
    <Text class="text-neutral-500">Flag and currency selector paired with a numeric amount input.</Text>
    <Container class="rounded-xl border p-6 dark:border-neutral-800">
      <Container class="max-w-md">
        <InternationalInput
          componentId="international-currency-demo"
          mode="currency"
          bind:selectedCountry={currencyCountry}
          bind:value={currencyAmount}
          class="w-full"
        />
        <Text class="mt-3 text-sm text-neutral-500">
          Country: {currencyCountry} | Amount: {currencyAmount}
        </Text>
      </Container>
    </Container>
    <CodeBlock code={codeBlockContents.internationalInputCurrency} language="svelte" />
  </Container>
</Container>
