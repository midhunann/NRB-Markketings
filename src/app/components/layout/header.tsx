"use client"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/app/components/ui/navigation-menu"

export default function Header() {
  return (
    <header>
      {/* Top Info Bar */}
      <div className="bg-secondary text-secondary-foreground py-2">
        <div className="container mx-auto px-4 text-sm flex justify-between items-center">
          <div>
            <span className="hidden sm:inline">We are the Trend Setter in the industry</span>
          </div>
          <div>
            <a href="tel:+919496899999" className="mr-4 hover:underline">
              +91 94968 99999
            </a>
            <a href="mailto:nrbmarkketings@gmail.com" className="hover:underline">
              nrbmarkketings@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-background shadow-md">
        <div className="container mx-auto px-4 py-3">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/">Main Home</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/services/web">Web Development</NavigationMenuLink>
                  <NavigationMenuLink href="/services/seo">SEO Optimization</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="/about">Who We Are</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>
      </div>
    </header>
  )
}
