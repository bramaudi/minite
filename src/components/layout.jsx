import Nav from '../components/nav'

const Layout = (slot) => {
  return (
    <main>
      {Nav()}
      {slot}
    </main>
  )
}

export default Layout