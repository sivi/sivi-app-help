import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Icons that represent each category
const CATEGORY_ICONS = {
  'Get started': '👋',
  'Brand kit': '🎨',
  'Generate your first design': '✨',
  'Design generation': '🖌️',
  'Editing your design': '✏️',
  'Plans and credits': '💰',
  'Account settings': '⚙️',
  'Troubleshooting FAQ': '❓',
  'Use cases': '📋',
  'Advanced': '🚀',
  'Working with content': '📝'
};

// Short descriptions for each category
const CATEGORY_DESCRIPTIONS = {
  'Get started': 'Learn the basics and get up to speed with Sivi',
  'Brand kit': 'Set up and manage your brand assets and identity',
  'Generate your first design': 'Create your first AI-generated design',
  'Design generation': 'Control and optimize how Sivi generates designs',
  'Editing your design': 'Customize and perfect your generated designs',
  'Plans and credits': 'Understand pricing, credits and subscription options',
  'Account settings': 'Manage your account preferences and details',
  'Troubleshooting FAQ': 'Solutions to common issues and questions',
  'Use cases': 'Real-world examples and inspiration',
  'Advanced': 'Expert features and integrations',
  'Working with content': 'Organize and structure your design content'
};

// Category to document path mapping
const CATEGORY_PATHS = {
  'Get started': 'get-started',
  'Brand kit': 'brand-kit',
  'Generate your first design': 'generate-your-first-design',
  'Design generation': 'design-generation',
  'Editing your design': 'editing-your-design',
  'Plans and credits': 'plans-and-credits',
  'Account settings': 'account-settings',
  'Troubleshooting FAQ': 'troubleshooting-faq',
  'Use cases': 'use-cases',
  'Advanced': 'advanced',
  'Working with content': 'working-with-content'
};

const categories = Object.keys(CATEGORY_ICONS);

export default function HelpCenterCategories() {
  return (
    <section className={styles.categoriesContainer}>
      {categories.map((category) => (
        <Link
          key={category}
          to={CATEGORY_PATHS[category]}
          className={styles.categoryBox}
        >
          <div className={styles.categoryIcon}>{CATEGORY_ICONS[category]}</div>
          <Heading as="h3" className={styles.categoryTitle}>
            {category}
          </Heading>
          <p className={styles.categoryDescription}>
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        </Link>
      ))}
    </section>
  );
}
