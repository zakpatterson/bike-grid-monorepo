<script lang="ts">
  import CalendarMonthIcon from "@material-symbols/svg-400/rounded/calendar_month.svg?component";
  import LinkIcon from "@material-symbols/svg-400/rounded/link.svg?component";
  import DoneIcon from "@material-symbols/svg-400/rounded/done.svg?component";
  import { format } from "date-fns";
  import type { PageData } from "./$types";
  import SvelteMarkdown from "svelte-markdown";
  import NewTabLink from "../../../NewTabLink.svelte";
  import SocialIcons from "@rodneylab/svelte-social-icons";

  export let data: PageData;
  let { post: stringifiedPost } = data;
  let post = stringifiedPost[0];

  function formatDate(date: any) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(date.seconds - 18000); // uhhhhhhhh????????? don't think I did this right lol
    return format(t, "EEEE, LLLL d");
  }

  function getImageUrl(imagePath: string) {
    const BASE =
      "https://firebasestorage.googleapis.com/v0/b/bike-grid-now.appspot.com/o";
    const PARAMS = "alt=media";

    return `${BASE}/${encodeURIComponent(imagePath)}?${PARAMS}`;
  }

  let copied = false;

  function copy() {
    if (copied) return;

    copied = true;
    navigator.clipboard.writeText(
      `https://www.bikegridnow.org/posts/${post.postLink}`
    );
    setTimeout(() => {
      copied = false;
    }, 1000);
  }
</script>

<div class="responsive-container">
  <div class="card">
    <div class="card-inner">
      {#if post}
        <h1>{post.title}</h1>

        {#if post.subtitle}
          <h2>{post.subtitle}</h2>
        {/if}

        <div class="horizontal">
          <div class="left">
            <CalendarMonthIcon
              viewBox="0 0 48 48"
              width="1.5rem"
              height="1.5rem"
            />
            <p>{formatDate(post.createdOn)}</p>
          </div>

          <div class="right">
            <a
              href="https://twitter.com/intent/tweet?url=https://www.bikegridnow.org/posts/{post.postLink}&text=@bikegridnow"
              target="_blank"
            >
              <SocialIcons width="40" height="40" network="twitter" />
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.bikegridnow.org/posts/{post.postLink}"
              target="_blank"
            >
              <SocialIcons width="40" height="40" network="facebook" />
            </a>
            <a
              href="https://www.linkedin.com/shareArticle/?mini=true&url=https://www.bikegridnow.org/posts/{post.postLink}"
              target="_blank"
            >
              <SocialIcons width="40" height="40" network="linkedin" />
            </a>
            <div class="copy" on:click={copy}>
              <div class="link">
                <div class="link-icon" class:active={!copied}>
                  <LinkIcon viewBox="0 0 48 48" width="30px" height="30px" />
                </div>
                <div class="check-icon" class:active={copied}>
                  <DoneIcon viewBox="0 0 48 48" width="30px" height="30px" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {#if post.image}
          <img src={getImageUrl(post.image)} />
        {/if}

        <div class="markdown">
          <SvelteMarkdown
            source={post.body}
            renderers={{
              link: NewTabLink,
            }}
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .card-inner {
    max-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 25px;
    margin-bottom: 25px;
    /* padding: 0px 25px; */
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    /* margin-top: 25px; */
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .published {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--color-text);
  }

  p {
    /* font-weight: 400; */
  }

  img {
    width: 100%;
    border-radius: 10px;
  }

  .markdown {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .horizontal {
    color: var(--color-text) !important;
    fill: currentColor;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  @media only screen and (max-width: 650px) {
    .horizontal {
      flex-direction: column;
      align-items: flex-start;
      gap: 25px;
    }
  }

  .horizontal .left {
    display: flex;
    gap: 10px;
    align-items: center;
    opacity: 0.5;
  }

  .horizontal .right {
    display: flex;
    gap: 10px;
  }

  .horizontal .right a {
    color: var(--color-text);
    fill: currentColor;
    text-decoration: none;
  }

  .copy {
    cursor: pointer;
  }

  .link {
    background-color: var(--color-primary);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: relative;
  }

  .link-icon,
  .check-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    opacity: 0;
    transform: scale(0.5);
    transition: 0.1s;
  }

  .link-icon.active,
  .check-icon.active {
    transition-delay: 0.05s;
    transform: scale(1);
    opacity: 1;
  }
</style>
