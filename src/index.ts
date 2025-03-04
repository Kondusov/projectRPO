enum UserRole {
	Admin,
	User,
	Guest,
}

namespace UserRole {
	export function getRoleDescription(role: UserRole): string {
		switch (role) {
			case UserRole.Admin:
				return 'Administrator with full access';
			case UserRole.User:
				return 'Regular user with limited access';
			case UserRole.Guest:
				return 'Guest user with minimal access';
			default:
				return 'Unknown role';
		}
	}
}

interface IUser<T> {
	id: number;
	name: string;
	role: T;
}

class User<T extends UserRole> implements IUser<T> {
	constructor(public id: number, public name: string, public role: T) {}

	getRoleDescription(): string {
		return UserRole.getRoleDescription(this.role);
	}
}

const user = new User(1, 'John', UserRole.User);
console.log(user.getRoleDescription());
