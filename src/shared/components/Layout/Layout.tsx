import React from 'react'
import Container from './components/Container/Container'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Section from './components/Section/Section'
import * as Styled from './styles'

type Props = {
  children?: React.ReactNode
}

export function DefaultLayout({ children }: Props) {
  return (
    <Styled.Layout>
      <Header />
      <Styled.Main>{children}</Styled.Main>
      <Footer />
    </Styled.Layout>
  )
}

function Layout({ children }: Props) {
  return <Styled.Layout>{children}</Styled.Layout>
}

Layout.Section = Section
Layout.Container = Container
Layout.Main = Styled.Main
Layout.Footer = Footer
Layout.Header = Header

export default Layout
