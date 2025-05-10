import { KeyboardEvent } from "react";
import { ProductCategory } from "./data";

/**
 * Handle keyboard navigation for tab list
 * @param e - Keyboard event
 * @param activeTab - Current active tab index
 * @param tabsLength - Total number of tabs
 * @param setActiveTab - Function to set active tab
 */
export const handleTabKeyDown = (
  e: KeyboardEvent<HTMLDivElement>,
  activeTab: number,
  tabsLength: number,
  setActiveTab: (index: number) => void
): void => {
  const targetKey = e.key;
  
  // Handle arrow navigation
  if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(targetKey)) {
    e.preventDefault();
    
    let newIndex = activeTab;
    
    switch (targetKey) {
      case "ArrowLeft":
        // Move to previous tab or wrap to end
        newIndex = activeTab === 0 ? tabsLength - 1 : activeTab - 1;
        break;
      case "ArrowRight":
        // Move to next tab or wrap to beginning
        newIndex = activeTab === tabsLength - 1 ? 0 : activeTab + 1;
        break;
      case "Home":
        // Move to first tab
        newIndex = 0;
        break;
      case "End":
        // Move to last tab
        newIndex = tabsLength - 1;
        break;
    }
    
    // Update active tab and focus the tab button
    setActiveTab(newIndex);
    
    // Find and focus the tab button
    const tabButtons = document.querySelectorAll('[role="tab"]');
    if (tabButtons && tabButtons[newIndex]) {
      (tabButtons[newIndex] as HTMLElement).focus();
    }
  }
};

/**
 * Scroll to category section when tab is clicked
 * @param categoryId - Category ID to scroll to
 */
export const scrollToCategory = (categoryId: string): void => {
  const element = document.getElementById(`tabpanel-${categoryId}`);
  if (element) {
    // Smooth scroll to the element with offset for the sticky header
    const headerOffset = 120; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

/**
 * Get active tab index based on scroll position
 * @param categories - Array of product categories
 * @returns Index of the active category
 */
export const getActiveTabFromScroll = (categories: ProductCategory[]): number => {
  if (typeof window === "undefined") return 0;
  
  // Get all section elements
  const sections = categories.map(cat => document.getElementById(`tabpanel-${cat.slug}`));
  
  // Calculate which section is most in view
  const viewportHeight = window.innerHeight;
  const headerOffset = 120; // Same as in scrollToCategory
  
  let maxVisibleSection = 0;
  let maxVisibleArea = 0;
  
  sections.forEach((section, index) => {
    if (!section) return;
    
    const rect = section.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, headerOffset);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleArea = Math.max(0, visibleBottom - visibleTop);
    
    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea;
      maxVisibleSection = index;
    }
  });
  
  return maxVisibleSection;
};