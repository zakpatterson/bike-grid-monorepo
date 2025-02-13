<script lang="ts">
  import { format } from "date-fns";
  import Slides from "$lib/components/Slides.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Image from "$lib/components/Image.svelte";
  import { PortableText } from "@portabletext/svelte";

  import type { PageData } from "./$types";

  export let data: PageData;

  let event = data.event;
  $: event = data.event;

  function formatDate(date: string) {
    return format(new Date(date), "M/dd/yyyy 'at' h:mm a");
  }
</script>

<Seo title={event.name} />

<div class="container">
  <div class="sideby">
    <div class="card">
      <h1>{event.name}</h1>
      <p>
        Date: {formatDate(event.date.local)}
      </p>

      {#if event.description}
        <div>
          <PortableText value={event.description} />
        </div>
      {/if}

      {#if event.rsvpLink}
        <a href={event.rsvpLink} target="_blank" class="button">RSVP</a>
      {/if}
    </div>

    <Slides events={[event]} />
  </div>
</div>

<div class="footer" />

<style>
  .container {
    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    margin-top: 20px;
  }

  .sideby {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    padding: 0px 20px;
  }

  .card {
    background-color: var(--color-card);
    padding: 25px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
  }

  .footer {
    height: 20px;
  }

  .button {
    padding: 15px 30px;
    background-color: var(--color-primary);
    border-radius: 15px;
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    width: fit-content;
    margin-top: 15px;
  }

  @media only screen and (max-width: 600px) {
    .sideby {
      grid-template-columns: 1fr;
    }
  }
</style>
