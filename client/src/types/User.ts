export type User = {
  email: string;
  role: 'admin' | 'shopper';
  firstName: string;
  lastName: string;
};

export type UserToCreate = User & {
  password: string;
};
