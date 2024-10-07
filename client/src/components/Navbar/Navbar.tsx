import React, { useState } from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import styles from './Navbar.module.scss'

import { CrewHrLogo } from '@/ui/crew-hr-logo'

const menuItems = [
  {
    title: 'Solutions',
    href: '#',
    submenus: [
      {
        title: 'Employee Engagement Surveys',
        href: 'https://crewhr.com/employee-engagement-surveys/',
      },
      {
        title: 'Employee Time Tracking & Attendance',
        href: 'https://crewhr.com/employee-time-tracking-attendance/',
      },
      {
        title: 'Employee Scheduling & Rostering',
        href: 'https://crewhr.com/employee-scheduling-rostering/',
      },
      {
        title: 'Employee Leave Tracker',
        href: 'https://crewhr.com/employee-leave-tracker/',
      },
      {
        title: 'Employee Management Software',
        href: 'https://crewhr.com/employee-management-software/',
      },
      {
        title: 'Birthday Reminders',
        href: 'https://crewhr.com/birthday-reminders/',
      },
    ],
  },
  {
    title: 'HR Tools',
    href: '#',
    submenus: [
      {
        title: 'Free Employee Scheduling Software',
        href: 'https://employee-scheduling.crewhr.com/',
      },
      {
        title: 'HR Glossary',
        href: 'https://crewhr.com/hr-glossary/',
      },
      {
        title: 'Interview Question Generator',
        href: 'https://interview-questions.crewhr.com/',
      },
    ],
  },
  {
    title: 'Pricing',
    href: 'https://crewhr.com/pricing/',
  },
  {
    title: 'Blog',
    href: 'https://crewhr.com/blog/',
  },
]

export const Navbar = () => {
  const [hoveredSubMenuIndex, setHoveredSubMenuIndex] = useState<number | null>(
    null,
  )

  const handleMouseEnter = (index: number) => {
    setHoveredSubMenuIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredSubMenuIndex(null)
  }

  const renderMenuItems = () => {
    return menuItems.map((menuItem, index) => (
      <div
        key={index}
        className={styles.menuItem}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={menuItem.href} className={styles.menuLink}>
          {menuItem.title}
          {menuItem.submenus && (
            <span className={styles.submenuIcon}>
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          )}
        </Link>
        {menuItem.submenus && hoveredSubMenuIndex === index && (
          <div className={styles.subMenuWrapper}>
            <div className={styles.subMenuSubWrapper}>
              <div className={styles.subMenuOverlay} />
              {menuItem.submenus.map((submenu, subIndex) => (
                <div key={subIndex} className={styles.subMenuItem}>
                  <Link href={submenu.href}>{submenu.title}</Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.leftSide}>
            <Link href="https://crewhr.com/" className={styles.logo}>
              <CrewHrLogo />
            </Link>
            <div className={styles.menu}>{renderMenuItems()}</div>
          </div>
          <div className={styles.rightSide}>
            <Link
              href="https://app.crewhr.com/login"
              className={styles.loginButton}
            >
              Login
            </Link>
            <Link href="https://crewhr.com/demo/" className={styles.demoButton}>
              Watch Demo
            </Link>
            <Link
              href="https://app.crewhr.com/signup"
              className={styles.greenButton}
            >
              Try CrewHR free
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
