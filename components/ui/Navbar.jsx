import { Container, Nav, Navbar } from "react-bootstrap"
import MagicButton from "./Button";
import { signOut } from "next-auth/react"

function Navigationbar() {
    return (
        <Navbar expand="lg" className="bg-primary">
            <Container fluid>
                <Navbar.Brand className="text-light fw-bold" href="/">Schnäppchen Safari</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    <Nav.Link className="text-light" href="/">Shop</Nav.Link>
                    <Nav.Link className="text-light" href="/creatordashboard">Creatordashboard</Nav.Link>
                    <Nav.Link className="text-light" href="/">Support</Nav.Link>
                    <Nav.Link className="text-light" href="/">Account</Nav.Link>
                    </Nav>
                    <MagicButton funktion={() => signOut()} variant={"outline-light"} content={"Logout"}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;