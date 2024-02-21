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

interface Post {
  id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  username: string
  avatar: string
}
