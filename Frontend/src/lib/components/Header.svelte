<script>
	import { page } from "$app/stores";
	import weather from "$lib/tools/weatherStore.js";
	import cloud from "$lib/images/weather/cloud.svg";
	import rain from "$lib/images/weather/rain.svg";
	import fog from "$lib/images/weather/fog.svg";
	import wind from "$lib/images/weather/wind.svg";

	$: weatherValues = $weather;
</script>

<header>
	<div class="corner">
		<a href="/">
			<b class="title">NightSkyManager</b>
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
				<a href="/">Home</a>
			</li>
			<li
				aria-current={$page.url.pathname.startsWith("/weather")
					? "page"
					: undefined}
			>
				<a href="/weather">Weather</a>
			</li>
			<li
				aria-current={$page.url.pathname.startsWith("/constellations")
					? "page"
					: undefined}
			>
				<a href="/constellations">Constellations</a>
			</li>
			<li
				aria-current={$page.url.pathname.startsWith("/stars")
					? "page"
					: undefined}
			>
				<a href="/stars">Stars</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		{#if weatherValues[0].value > 0}
			<a href="/weather">
				<img
					src={cloud}
					alt="cloud"
					style="opacity:{weatherValues[0].value}%;"
				/>
			</a>
		{/if}
		{#if weatherValues[1].value > 0}
			<a href="/weather">
				<img
					src={rain}
					alt="rain"
					style="opacity:{weatherValues[1].value}%;"
				/>
			</a>
		{/if}
		{#if weatherValues[2].value > 0}
			<a href="/weather">
				<img
					src={fog}
					alt="fog"
					style="opacity:{weatherValues[2].value}%;"
				/>
			</a>
		{/if}
		{#if weatherValues[3].value > 0}
			<a href="/weather">
				<img
					src={wind}
					alt="wind"
					style="opacity:{weatherValues[3].value}%;"
				/>
			</a>
		{/if}
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
	.corner {
		width: 16em;
		display: flex;
		flex-direction: row;
		justify-content: right;
	}
	.corner a {
		display: flex;
		align-items: center;
		padding-left: 1em;
		padding-right: 1em;
	}
	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}
	.title {
		font-size: x-large;
		color: black;
	}
	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}
	svg {
		width: 2em;
		height: 3em;
		display: block;
	}
	path {
		fill: var(--background);
	}
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}
	li {
		position: relative;
		height: 100%;
	}
	li[aria-current="page"]::before {
		--size: 6px;
		content: "";
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}
	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	a:hover {
		color: var(--color-theme-1);
	}
</style>
