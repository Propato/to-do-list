import { Link } from "react-router-dom";

export const Contact = () => {
    return (
        <div className="container py-3">
            <section className="row">
                <h5 className="col-8">
                    App by David Propato
                </h5>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <Link className="mx-2 px-1" to="https://api.whatsapp.com/send/?phone=5527998661654&text=Ol%C3%A1%2C+eu+estou+com+seu+curr%C3%ADculo+e+estou+interessado+no+seu+trabalho.+N%C3%B3s+podemos+conversar%3F&type=phone_number&app_absent=0">
                        <i className="bi bi-whatsapp fs-3"></i>
                    </Link>
                    <Link className="mx-2 px-1" to="https://github.com/Propato">
                        <i className="bi bi-github fs-3"></i>
                    </Link>
                    <Link className="mx-2 px-1" to="https://www.linkedin.com/in/david-propato/">
                        <i className="bi bi-linkedin fs-3"></i>
                    </Link>
                </div>
            </section>
        </div>
    );
}