import Button from "../components/Button";

const NotFoundPage = () => {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-16 text-center">
			<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
				404 Error
			</p>
			<h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
				Page not found
			</h1>
			<p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
				The page you requested does not exist or may have been moved.
			</p>
			<div className="mt-8">
				<Button to="/">Back Home</Button>
			</div>
		</div>
	);
};

export default NotFoundPage;
