import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import Typed from 'react-typed';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '@/hoc/withApollo';

import { Container, Row, Col } from 'react-bootstrap';

const Index = () => {

    const roles = ['Developer', 'Team Player', 'React.js', 'React Native', 'ASP.NET'];
    
        return (
            <BaseLayout className="cover">
                <div className="main-section">
                    <div className="background-image">
                    <img src="/static/images/background-index.png" />
                    </div>
    
                    <Container>
                        <Row>
                            <Col md="6">
                                <div className="hero-section">
                                    <div className={`flipper`}>
                                    <div className="back">
                                        <div className="hero-section-content">
                                        <h2> Full Stack Developer </h2>
                                        <div className="hero-section-content-intro">
                                            Have a look at my portfolio and job history.
                                        </div>
                                        </div>
                                        <img className="image" src="/static/images/section-1.png"/>
                                        <div className="shadow-custom">
                                        <div className="shadow-inner"> </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6" className="hero-welcome-wrapper">
                                <div className="hero-welcome-text">
                                    <h1>
                                        Welcome to the portfolio website of Filip Jerga.
                                        Get informed, collaborate and discover projects I was working on through the years!
                                    </h1>
                                </div>
                                <Typed
                                    //typedRef={typedRef()}
                                    className="self-typed"
                                    loop
                                    typeSpeed={70}
                                    backSpeed={70}
                                    strings={roles}
                                    //strings={["welcome to react-typed", "This is a react component that wraps up the <a hre…", "If you like the project add a star in <a href='htt…"]}
                                    smartBackspace
                                    shuffle={false}
                                    backDelay={10000}
                                    fadeOut={false}
                                    fadeOutDelay={100}
                                    loopCount={0}
                                    showCursor
                                    cursorChar="|"
                                />
                                <div className="hero-welcome-bio">
                                    <h1>
                                        Let's take a look on my work.
                                    </h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </BaseLayout>
        );
    };

export default withApollo(Index, { getDataFromTree });
