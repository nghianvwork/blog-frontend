import Header from './Header';
import Footer from './Footer';


export default function Layout({ children }: { children: React.ReactNode }){
return (
        <div>
          <Header />
                 <main className="container mx-auto p-4">{children}</main>
          <Footer />
       </div>
)
}