
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import SearchResults from "../components/home/SearchResults";



const SearchResultsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar/>
      <main className="flex-grow">
<SearchResults/>
      </main>
   <Footer/>
    </div>
  );
};

export default SearchResultsPage;
