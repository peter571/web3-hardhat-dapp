import { Navigation, Welcome, Transactions, Footer } from "../components";

const App = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] p-4" >
      <Navigation />
      <Welcome />
      <Transactions />
      <Footer />
    </div>
  )
}
export default App;
