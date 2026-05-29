const { useState } = React;

const Sidebar = () => {
    const [isClosed, setIsClosed] = useState(false);
    const [activeItem, setActiveItem] = useState('Side bar');

    const menuItems = [
        { id: 'tabs', label: 'Tabs', icon: 'bx-layout' },
        { id: 'sidebar', label: 'Side bar', icon: 'bx-sidebar' },
        { id: 'carousel', label: 'Carrousel', icon: 'bx-carousel' },
        { id: 'tags', label: 'Tags', icon: 'bx-tag' }
    ];

    return (
        <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
            <header>
                <div className="logo-text">
                    <span className="image">
                        <i className='bx bx-leaf'></i>
                    </span>
                    <div className="text logo-name">Componentes</div>
                </div>
                <i 
                    className='bx bx-chevron-left toggle' 
                    onClick={() => setIsClosed(!isClosed)}
                ></i>
            </header>

            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links">
                        {menuItems.map((item) => (
                            <li className="nav-link" key={item.id}>
                                <a 
                                    href="#" 
                                    className={activeItem === item.label ? 'active' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveItem(item.label);
                                    }}
                                >
                                    <i className={`bx ${item.icon} icon`}></i>
                                    <span className="text nav-text">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Sidebar />);