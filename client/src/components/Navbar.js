import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

export default function CollapsibleExample({ onLoginClick, onTab }) {

    function handleButtonClick(tab){
        onTab(tab);
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="w-100">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Meal</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className='pl-3' onClick={() => {
                            onLoginClick();
                            handleButtonClick('tab2');
                        }}>Register</Nav.Link>
                        <Nav.Link onClick={() => {
                            onLoginClick();
                            handleButtonClick('tab1');
                        }}>
                            Log in
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
