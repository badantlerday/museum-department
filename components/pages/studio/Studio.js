export default function Studio({ studio }) {
	// console.log(studio);
	return (
		<>
			<main className="px-20 mx-auto p-36">
				<div className="text-sm uppercase tracking-wider">Studio</div>
				<h1 className="text-6xl font-medium">{studio.name}</h1>
			</main>
		</>
	);
}
