import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.css';

const Navigation = () => {
    return (
        <div id="menu">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to={`/`}>Lista</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/create`}>Novo Contato</NavLink>
                                </li>
                                <li>
                                    <NavLink to="#1">GitHub</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
