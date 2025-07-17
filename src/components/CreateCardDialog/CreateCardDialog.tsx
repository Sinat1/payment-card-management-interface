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
import { useState } from "react";
import type { Card } from "@/types/card";

type Props = {
	setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

const CreateCardDialog = ({ setCards }: Props) => {
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
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Card Number */}
					<div className="relative">
						<Input
							type="tel"
							placeholder="Card Number"
							value={cardNumber}
							onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
							required
							// pattern="\d{16}"
							maxLength={16}
						/>
						{cardNumber && (
							<img
								src={`/brands/${getBrandFromNumber(cardNumber).toLowerCase()}.png`}
								alt="brand"
								className="absolute right-1 -top-1.5 w-[80px] h-[50px] object-contain"
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
						type="password"
						inputMode="numeric"
						placeholder="CVC"
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
						type="submit"
						className="w-full cursor-pointer  hover:bg-green-700 transition duration-250 ease-in-out"
					>
						Save Card
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

function getBrandFromNumber(number: string): string {
	const firstDigit = number[0];
	switch (firstDigit) {
		case "4":
			return "Visa";
		case "5":
			return "Mastercard";
		case "3":
			return "Amex";
		default:
			return "NoName";
	}
}

export default CreateCardDialog;
