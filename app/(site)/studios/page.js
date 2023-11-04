import TextCallout from "@/components/TextCallout";

export default function Studios() {
	const title = "Studios";
	const text = (
		<p>
			There’s 268 fonts from 54 foundries on Museum Department. The most
			featured font is LL Unica 77 (12) and the most featured foundry is Schick
			Toikka.
		</p>
	);

	return (
		<>
			<section className="py-48 space-y-40">
				<TextCallout title={title} text={text} />
			</section>
		</>
	);
}
