# 🎨 Icons Guide for Your App

## 📦 **Installed Icon Library: Lucide React**

Lucide React is a beautiful, customizable icon library with 1000+ icons.

## 🚀 **How to Use Icons**

### **1. Basic Import and Usage**
```tsx
import { User, Mail, Lock, Settings } from "lucide-react";

// Basic usage
<User className="h-4 w-4" />

// With custom styling
<User className="h-6 w-6 text-blue-500" />

// In buttons
<Button>
  <User className="h-4 w-4 mr-2" />
  Profile
</Button>
```

### **2. Icon Sizes**
```tsx
// Small icons (16px)
<Settings className="h-4 w-4" />

// Medium icons (20px)
<Settings className="h-5 w-5" />

// Large icons (24px)
<Settings className="h-6 w-6" />

// Extra large icons (32px)
<Settings className="h-8 w-8" />
```

### **3. Icon Colors**
```tsx
// Using Tailwind color classes
<User className="h-4 w-4 text-blue-500" />
<Mail className="h-4 w-4 text-green-500" />
<Lock className="h-4 w-4 text-red-500" />
<Settings className="h-4 w-4 text-gray-500" />
```

### **4. IconButton Component**
```tsx
import { IconButton } from "./ui/icon-button";
import { Settings, Bell, Search } from "lucide-react";

// Icon-only button
<IconButton icon={<Settings className="h-4 w-4" />} />

// With different variants
<IconButton 
  icon={<Bell className="h-4 w-4" />} 
  variant="ghost" 
/>
```

### **5. Common Icon Patterns**

#### **Form Fields with Icons**
```tsx
<div className="relative">
  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
  <Input className="pl-10" placeholder="Username" />
</div>
```

#### **Navigation Icons**
```tsx
<nav className="flex items-center gap-4">
  <Home className="h-5 w-5" />
  <Search className="h-5 w-5" />
  <Settings className="h-5 w-5" />
</nav>
```

#### **Status Icons**
```tsx
<div className="flex items-center gap-2">
  <CheckCircle className="h-4 w-4 text-green-500" />
  <span>Success</span>
</div>
```

## 🎯 **Popular Icons for Your App**

### **Authentication**
- `User` - User profile
- `Mail` - Email
- `Lock` - Password
- `Eye` / `EyeOff` - Password visibility
- `LogIn` / `LogOut` - Login/Logout

### **Navigation**
- `Home` - Home page
- `Settings` - Settings
- `Bell` - Notifications
- `Search` - Search
- `Menu` - Mobile menu

### **Pokemon Related**
- `Trophy` - Achievements
- `Star` - Favorites
- `MapPin` - Locations/Regions
- `Sword` - Battle
- `Shield` - Defense

### **Actions**
- `Plus` - Add
- `Minus` - Remove
- `Edit` - Edit
- `Trash` - Delete
- `Save` - Save
- `Download` - Download

## 🔧 **Customization**

### **Custom Icon Component**
```tsx
interface CustomIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export function CustomIcon({ name, size = 16, color, className }: CustomIconProps) {
  const IconComponent = lucideIcons[name];
  
  if (!IconComponent) return null;
  
  return (
    <IconComponent 
      className={className}
      style={{ width: size, height: size, color }}
    />
  );
}
```

### **Icon with Badge**
```tsx
<div className="relative">
  <Bell className="h-5 w-5" />
  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
    3
  </span>
</div>
```

## 📚 **Available Icons**

Visit [Lucide Icons](https://lucide.dev/icons) to browse all available icons.

## 💡 **Best Practices**

1. **Consistent Sizing**: Use consistent icon sizes throughout your app
2. **Accessibility**: Always provide meaningful alt text or labels
3. **Color Coding**: Use colors to convey meaning (green for success, red for errors)
4. **Loading States**: Use spinner icons for loading states
5. **Interactive States**: Add hover effects for clickable icons

## 🎨 **Examples in Your App**

Check out the updated Dashboard and AuthForm components to see icons in action!
