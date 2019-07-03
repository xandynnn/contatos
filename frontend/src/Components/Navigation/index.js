import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav id="mainHeader">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <ul>
                            <li>
                                <NavLink to={`/`}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/create`}>Novo Contato</NavLink>
                            </li>
                            <li>
                                <NavLink to="#1">GitHub</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;