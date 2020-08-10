import React from 'react'
import Link from 'next/link'
import MainLayout from '../components/MainLayout'

const AboutPage = () => (
  <MainLayout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </MainLayout>
)

export default AboutPage
