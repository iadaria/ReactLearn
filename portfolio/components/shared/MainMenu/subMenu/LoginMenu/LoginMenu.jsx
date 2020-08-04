import React from 'react';
import Link from "next/link";
// import Link from '@material-ui/core/Link'; //need to reboot the page

const LoginMenu = ({ words }) => {
    return (
        // <ul className="nav nav-auth">
        <ul className="sub-menu login-menu">
            <li className="nav-item">
                {/* <Link href="/login">{words.signIn}</Link> */}
                <Link href="/login"><a>{words.signIn}</a></Link>
            </li>
            {/* <li className="nav-item">
                <Link className="btn btn-signup" href="/register">
                    <a>Sign Up</a>
                </Link>
            </li> */}
        </ul>
    );
};

export default LoginMenu;
