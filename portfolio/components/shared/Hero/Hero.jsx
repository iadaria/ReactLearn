import React from 'react';
import './hero.scss';
import Typed from 'react-typed';
import Grid from '@material-ui/core/Grid';

import withApollo from "@/hoc/withApollo";
import { useLazyGetUser, useGetPartWords } from "@/apollo/actions";
import languageContext from '../../../contexts/languageContext';

const Hero = () => {
    const languageCode = React.useContext(languageContext);

    const { loading, data: dataWords } = useGetPartWords({ variables: { languageCode, part: "hero" } });
    /* Create one object with many keys */
    const words = dataWords && dataWords.partWords.reduce((prevWords, currentWord) => (
        { ...prevWords, ...{ [currentWord.key]: currentWord.value } }
    ), {}) || [];
    
    const roles = [
        'Разработка мобильных приложений под Android/IOS на React Native',
        'Web-приложения, бэкэнд на ASP.NET',
        'React.js', 
        'React Native', 
        'ASP.NET'
    ];
    return (
        <Grid className="hero" container justify="center">

            <Grid className="item" container item lg={5} md={6} xs={12} justify="flex-end">
                <section className="hero-section">
                    <div className="hero-section-content">
                        <h2> Full Stack Developer </h2>
                        <div className="hero-section-content-intro">
                            Have a look at my portfolio and job history.
                        </div>
                    </div>
                    <img className="image" src="/static/images/section-1.png" />
                    <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                    </div>
                </section>
            </Grid>

            <Grid className="item" container item lg={5} md={6} xs={12}>
                <section className="welcom-section">
                    <div className="hero-welcome-text" dangerouslySetInnerHTML={{__html: words.welcom}}>
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
                </section>
            </Grid>

        </Grid>
    );
};

export default withApollo(Hero);
