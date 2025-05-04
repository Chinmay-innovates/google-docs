import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<Button
				onClick={async () => {
					"use server";
					redirect("/document/123");
				}}
			>
				Test
			</Button>
		</div>
	);
}
