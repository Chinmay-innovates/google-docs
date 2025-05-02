import Link from "next/link";

const Page = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			Click&nbsp;
			<Link href="/document/123">
				<span className="text-blue-500 underline">here</span>
			</Link>
			&nbsp; to go document Id
		</div>
	);
};

export default Page;
