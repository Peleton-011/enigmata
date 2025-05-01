import { defineAsyncComponent } from "vue";

// All puzzle components
const modules = import.meta.glob("~/components/puzzles/**/[A-Z]*.vue");

function getPath(slug: string, component: string) {
	return `/components/puzzles/${slug}/${component}.vue`;
}

export function usePuzzleComponent(slug: string, componentName: string) {
	const mainPath = getPath(slug, componentName);
	const fallbackPath = getPath("_fallback", componentName);

	const moduleLoader = modules[mainPath] || modules[fallbackPath];

	if (!moduleLoader) {
		console.warn(
			`[Enigmata] Missing component: ${mainPath}, no fallback found`
		);
		return null;
	}

	// Wrap to return the `.default` export from the module
	const loader = async () => {
		const mod = await moduleLoader();
		return (mod as { default: Component }).default;
	};

	return defineAsyncComponent(loader);
}
