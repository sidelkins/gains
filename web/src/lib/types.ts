export type User = {
	id: number;
	username: string;
	email: string | null;
	name: string | null;
	date_joined: string | null;
	is_staff: boolean;
	profile_pic: string | null;
};