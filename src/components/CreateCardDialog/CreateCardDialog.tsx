import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, type JSX } from "react";
import type { Card } from "@/types/card";

type Props = {
	setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

function getBrandFromNumber(number: string): Card["brand"] {
	const firstDigit = number[0];
	switch (firstDigit) {
		case "4":
			return "visa";
		case "5":
			return "mastercard";
		case "3":
			return "amex";
		default:
			return "noname";
	}
}

const CreateCardDialog = ({ setCards }: Props): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [cardNumber, setCardNumber] = useState("");
	const [expiration, setExpiration] = useState("");
	const [cvc, setCvc] = useState("");
	const [isDefault, setIsDefault] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const expRegex = /^\d{2}\/\d{2}$/;
		if (!expRegex.test(expiration)) {
			alert("Please enter expiration in MM/YY format.");
			return;
		}

		const last4 = cardNumber.slice(-4);
		const brand = getBrandFromNumber(cardNumber);

		const newCard: Card = {
			id: crypto.randomUUID(),
			brand,
			last4,
			isDefault,
		};

		setCards((prev) => {
			const updated = isDefault
				? prev.map((c) => ({ ...c, isDefault: false }))
				: prev;
			const newList = [...updated, newCard];
			localStorage.setItem("cards", JSON.stringify(newList));
			return newList;
		});

		// Reset form
		setCardNumber("");
		setExpiration("");
		setCvc("");
		setIsDefault(false);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="gap-2 bg-white text-black mr-2 hover:bg-green-700 hover:text-white transition duration-250 ease-in-out cursor-pointer">
					<Plus className="w-4 h-4" />
					Add Card
				</Button>
			</DialogTrigger>

			<DialogContent aria-describedby="dialog-description">
				<DialogHeader>
					<DialogTitle>Add New Card</DialogTitle>
					<DialogDescription id="dialog-description">
						Enter card information below.
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-4" onSubmit={handleSubmit}>
					{/* Card Number */}
					<div className="relative">
						<Input
							required
							maxLength={16}
							placeholder="Card Number"
							type="tel"
							value={cardNumber}
							// pattern="\d{16}"
							onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
						/>
						{cardNumber && (
							<img
								alt="brand"
								className="absolute right-1 -top-1.5 w-[80px] h-[50px] object-contain"
								src={`/brands/${getBrandFromNumber(cardNumber).toLowerCase()}.png`}
							/>
						)}
					</div>

					{/* Expiration Date */}
					<Input
						type="text"
						placeholder="MM/YY"
						value={expiration}
						onChange={(e) => setExpiration(e.target.value)}
						required
						// pattern="\d{2}/\d{2}"
						title="Enter expiration in MM/YY format"
					/>

					{/* CVC */}
					<Input
						inputMode="numeric"
						placeholder="CVC"
						type="password"
						value={cvc}
						onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
						required
						pattern="\d{3}"
						maxLength={3}
					/>

					{/* Is Default */}
					<label className="flex items-center gap-2">
						<input
							className="cursor-pointer"
							type="checkbox"
							checked={isDefault}
							onChange={(e) => setIsDefault(e.target.checked)}
						/>
						Set as default
					</label>

					<Button
						className="w-full cursor-pointer  hover:bg-green-700 transition duration-250 ease-in-out"
						type="submit"
					>
						Save Card
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCardDialog;
