import type { ChangeEvent } from "react";

type Props = {
	value: string;
	onChange: (value: string) => void;
};

const CardFilter = ({ value, onChange }: Props) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="mt-3 mb-3 mr-2">
			<input
				type="text"
				placeholder="Search..."
				value={value}
				onChange={handleInputChange}
				className="
                border border-gray-100
                focus:border-[#2B8EFF]
                rounded-md px-4 py-2 w-full
                text-white placeholder-gray-300
                outline-none
                transition-colors duration-200
                "
			/>
		</div>
	);
};

export default CardFilter;
