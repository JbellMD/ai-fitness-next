import {
  Activity,
  Apple,
  Brain,
  Calendar,
  Clock,
  Dumbbell,
  LineChart,
  TrendingUp,
  Target,
  Trophy,
  PlusCircle,
  Settings,
  User,
  Home,
  BarChart,
  ChevronDown,
  ChevronUp,
  Check,
  Sun,
  Moon,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  Star,
  Heart,
  AlertCircle,
  Info,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  dumbbellLogo: Dumbbell,
  activity: Activity,
  calendar: Calendar,
  clock: Clock,
  dumbbell: Dumbbell,
  target: Target,
  trophy: Trophy,
  plus: PlusCircle,
  settings: Settings,
  user: User,
  home: Home,
  chart: BarChart,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  check: Check,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  close: X,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  star: Star,
  heart: Heart,
  alert: AlertCircle,
  info: Info,
  apple: Apple,
  brain: Brain,
  trendingUp: TrendingUp,
  lineChart: LineChart,
  spinner: (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ),
  customLogo: (props: any) => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Dumbbell */}
      <path
        d="M6.5 12H17.5M7.5 9V15M16.5 9V15M5 10.5V13.5M19 10.5V13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary"
      />
      
      {/* Circular glow effect */}
      <circle
        cx="12"
        cy="12"
        r="9"
        className="stroke-primary/20"
        strokeWidth="2"
      />
    </svg>
  ),
}
