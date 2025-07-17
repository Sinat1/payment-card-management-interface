import type { JSX } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Home = (): JSX.Element => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate({ to: "/my-cards" });
	};

	return (
		<div className="bg-[#C7DCF6] font-bold w-screen h-screen flex flex-col justify-center items-center">
			<button
				className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-250 ease-in-out cursor-pointer"
				type="submit"
				onClick={handleClick}
			>
				Check your cards
			</button>
		</div>
	);
};
