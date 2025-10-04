# ShipFast UI Components Library

Comprehensive collection of reusable TypeScript components built with Tailwind CSS and daisyUI.

## Installation

All components are ready to use. Import from the components directory:

```tsx
import { ButtonLead, Modal, Rating } from "@/components";
```

## Button Components

### ButtonLead
Email collection button with database integration.

```tsx
<ButtonLead
  placeholder="Enter your email"
  buttonText="Get Started"
/>
```

**Props:**
- `placeholder?: string` - Input placeholder text
- `buttonText?: string` - Button label
- `className?: string` - Additional CSS classes

**Features:**
- Saves to `/api/lead` endpoint
- Loading and success states
- Error handling
- Responsive design

---

### ButtonCheckout
Stripe checkout trigger button.

```tsx
<ButtonCheckout
  priceId="price_123"
  mode="payment"
>
  Buy Now
</ButtonCheckout>
```

**Props:**
- `priceId: string` - Stripe price ID (required)
- `mode?: "payment" | "subscription"` - Payment mode
- `className?: string` - Additional CSS classes
- `children?: ReactNode` - Button content

**Features:**
- Stripe integration via `/api/stripe/create-checkout`
- Loading states
- Error handling

---

### ButtonSignin
NextAuth authentication button.

```tsx
<ButtonSignin provider="google" />
<ButtonSignin provider="github" />
<ButtonSignin provider="email" />
```

**Props:**
- `provider?: "google" | "github" | "email"` - Auth provider
- `callbackUrl?: string` - Post-login redirect URL
- `className?: string` - Additional CSS classes
- `children?: ReactNode` - Custom button text

**Features:**
- NextAuth integration
- Provider-specific icons
- Loading states
- Uses config.ts for callback URL

---

### ButtonAccount
Account dropdown menu with user info.

```tsx
<ButtonAccount />
```

**Props:**
- `className?: string` - Additional CSS classes

**Features:**
- User avatar/initials display
- Dropdown menu (Dashboard, Settings, Billing, Sign Out)
- Click outside to close
- Requires NextAuth session

---

### ButtonGradient
Styled gradient button with animations.

```tsx
<ButtonGradient gradient="purple" isLoading={loading}>
  Click Me
</ButtonGradient>
```

**Props:**
- `children: ReactNode` - Button content (required)
- `gradient?: "primary" | "purple" | "blue" | "green" | "orange" | "pink"`
- `isLoading?: boolean` - Show loading spinner
- `onClick?: () => void` - Click handler
- `type?: "button" | "submit" | "reset"`
- `disabled?: boolean`
- `className?: string`

**Features:**
- 6 gradient presets
- Hover scale animation
- Loading states

---

### ButtonSupport
Support button (Crisp chat or email fallback).

```tsx
<ButtonSupport />
<ButtonSupport mode="email" />
```

**Props:**
- `mode?: "crisp" | "email"` - Support mode
- `className?: string` - Additional CSS classes
- `children?: ReactNode` - Button text

**Features:**
- Auto-loads Crisp widget if configured
- Email fallback to config.mailgun.supportEmail
- Uses config.crisp.id

---

## UI Elements

### Modal
Reusable modal component with backdrop and animations.

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="lg"
  footer={
    <>
      <button className="btn" onClick={() => setIsOpen(false)}>Cancel</button>
      <button className="btn btn-primary">Confirm</button>
    </>
  }
>
  <p>Modal content goes here</p>
</Modal>
```

**Props:**
- `isOpen: boolean` - Modal visibility (required)
- `onClose: () => void` - Close handler (required)
- `title?: string` - Modal title
- `children: ReactNode` - Modal content (required)
- `footer?: ReactNode` - Footer content
- `size?: "sm" | "md" | "lg" | "full"` - Modal size
- `closeOnBackdrop?: boolean` - Close on backdrop click (default: true)
- `closeOnEscape?: boolean` - Close on Escape key (default: true)
- `className?: string`

**Features:**
- Backdrop click to close
- Escape key support
- Focus trap
- Body scroll lock
- Animations

---

### Tabs
Tab navigation component with keyboard support.

```tsx
const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: <div>Overview content</div>,
    icon: <BetterIcon icon="info" size="sm" />
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <div>Settings content</div>,
    badge: 3
  },
  {
    id: 'disabled',
    label: 'Disabled',
    content: <div>Disabled</div>,
    disabled: true
  }
];

<Tabs tabs={tabs} defaultTab="overview" />
```

**Props:**
- `tabs: Tab[]` - Array of tab objects (required)
- `defaultTab?: string` - Default active tab ID
- `activeTab?: string` - Controlled active tab
- `onTabChange?: (tabId: string) => void` - Tab change handler
- `variant?: "bordered" | "lifted" | "boxed"` - Tab style
- `className?: string`

**Tab Interface:**
```tsx
interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  icon?: ReactNode;
}
```

**Features:**
- Keyboard navigation (Arrow keys)
- Badge support
- Icons support
- Disabled tabs
- Controlled/uncontrolled modes

---

### Rating
Star rating display and input component.

```tsx
// Display only
<Rating value={4.5} showValue />

// Interactive
const [rating, setRating] = useState(0);
<Rating value={rating} onChange={setRating} size="lg" />
```

**Props:**
- `value: number` - Rating value (required)
- `onChange?: (value: number) => void` - Rating change handler
- `max?: number` - Maximum rating (default: 5)
- `size?: "sm" | "md" | "lg"` - Star size
- `readonly?: boolean` - Read-only mode
- `showValue?: boolean` - Show numeric value
- `className?: string`

**Features:**
- Half-star support
- Interactive mode
- Hover preview
- Customizable size

---

### BetterIcon
Icon wrapper with built-in library.

```tsx
<BetterIcon icon="check" size="lg" color="success" />
<BetterIcon icon="spinner" animate="spin" />
<BetterIcon icon={<CustomSvg />} />
```

**Props:**
- `icon: string | ReactNode` - Icon name or custom SVG (required)
- `size?: "xs" | "sm" | "md" | "lg" | "xl"` - Icon size
- `color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info"`
- `animate?: "spin" | "pulse" | "bounce" | "ping"` - Animation
- `className?: string`

**Built-in Icons:**
- Navigation: `arrow-right`, `arrow-left`, `chevron-up`, `chevron-down`, `menu`, `external-link`
- Actions: `check`, `x`, `edit`, `trash`, `download`, `upload`, `search`
- UI: `user`, `mail`, `heart`, `star`, `settings`, `info`, `warning`, `spinner`

**Features:**
- 20+ built-in icons
- Custom SVG support
- Multiple sizes and colors
- Animations

---

## Configuration

Components use `config.ts` for:
- **ButtonSignin**: `config.auth.callbackUrl`
- **ButtonSupport**: `config.crisp.id`, `config.mailgun.supportEmail`
- **ButtonCheckout**: Stripe configuration

## API Endpoints Required

### /api/lead
```typescript
POST /api/lead
Body: { email: string }
Response: { success: boolean }
```

### /api/stripe/create-checkout
```typescript
POST /api/stripe/create-checkout
Body: {
  priceId: string,
  mode: "payment" | "subscription",
  successUrl: string,
  cancelUrl: string
}
Response: { url: string }
```

## Dependencies

- React 19.1.0
- Next.js 15.5.4
- NextAuth 4.24.11
- Tailwind CSS 3.4.18
- daisyUI 5.1.27
- TypeScript 5.x

---

## License

Part of ShipFast boilerplate.
