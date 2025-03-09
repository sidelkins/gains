export type User = {
	id: number;
	username: string;
	email: string | null;
	name: string | null;
	date_joined: string | null;
	is_staff: boolean;
	profile_pic: string | null;
};

export type NutritionEntry = {
	id: number;
	user_id: number;
	date: Date;
	description: string | null;
	calories: number | null;
	protein: number | null;
	carbs: number | null;
	fat: number | null;
};

export type SupplementEntry = {
	id: number;
	user_id: number;
	date: Date;
	supplement: string | null;
	quantity: number;
};