interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

interface SignupUser {
  username: string
  password: string
  confirmPassword: string
}

type LoginUser = Omit<SignupUser, 'confirmPassword'>;

interface UserProfile {
  id: string
  username: string
  avatar: string
  isAdmin: boolean
}
