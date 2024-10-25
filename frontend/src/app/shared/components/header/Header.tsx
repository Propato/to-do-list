import { Navbar } from "..";
import { Contact } from "./components/contact/Contact";

export const Header = () => {
    return (
        <header className="container">
            <Contact />
            <section  className="col">
                <img src="https://www.athenas.com.br/wp-content/uploads/elementor/thumbs/Group-3-2-pwjfp5c8f7l5h30p4wc7gz6bc06p3nzfjyuhsdliww.png" alt="Athenas Tecnologia Logo" />
            </section>
            <Navbar />
        </header>
    );
}