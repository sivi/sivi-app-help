import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HelpCenterCategories from '@site/src/components/HelpCenterCategories'
import { useHistory } from '@docusaurus/router'
import { useRef, useCallback, useState, useEffect } from 'react'

import Heading from '@theme/Heading'
import styles from './index.module.css'

// Algolia search trigger component
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const history = useHistory()

  // Function to trigger Algolia search
  const openSearchPage = useCallback(() => {
    // This will navigate to the search page with the current query
    if (searchQuery.trim()) {
      history.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      // If empty, just open the search modal
      document.querySelector('.DocSearch-Button').click();
    }
  }, [searchQuery, history])

  // Handle Enter key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      openSearchPage()
    }
  }, [openSearchPage])

  // Handle Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector('.DocSearch-Button').click()
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <>
      <input
        ref={searchInputRef}
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button 
        className={styles.searchButton}
        onClick={openSearchPage}
        aria-label="Search">
        <span>⌘</span>
        <span>K</span>
      </button>
    </>
  )
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Hey 👋, Welcome to our Help Center.
        </Heading>
        <p className="hero__subtitle">
          If you have questions, or just want to understand
          our product better – we've got your back.
        </p>
        <div className={styles.searchBox}>
          <div className={styles.searchContainer}>
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout 
      title={`${siteConfig.title}`} 
      description="Sivi Help Center - Find answers to all your questions about Sivi AI design tools."
    >
      <HomepageHeader />
      <main>
        <div className="container margin-vert--lg">
          <div className="text--center margin-bottom--lg">
            <Heading as="h2">Or browse through the categories below.</Heading>
          </div>
          <HelpCenterCategories />
        </div>
      </main>
    </Layout>
  )
}
