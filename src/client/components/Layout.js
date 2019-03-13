import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { setLanguage, detectLanguage } from '../containers/Localization/actions'
import routes from '../../common/routes'
import Header from './Header'
import Footer from './Footer'
import './Layout.scss'

class Layout extends Component {
    static contextTypes = {
        t: PropTypes.func.isRequired
    }

    static propTypes = {
        ln: PropTypes.string.isRequired,
        setLanguage: PropTypes.func.isRequired,
        detectLanguage: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    componentDidMount = () => {
        const { detectLanguage, location } = this.props
        detectLanguage(location.search)
    }

    render = () => {
        const { setLanguage } = this.props

        return (
            <div styleName="layout">

                <Helmet
                    // htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
                    // titleTemplate="%s | React App"
                    // titleAttributes={{itemprop: "name", lang: "en"}}
                    // meta={[
                    //     {name: "description", content: "Server side rendering example"},
                    //     {name: "viewport", content: "width=device-width, initial-scale=1"},
                    // ]}
                    // link={[{rel: "stylesheet", href: "/dist/styles.css"}]}
                />

                <Header/>

                <div styleName="content">
                    <Switch>
                        {routes.map(route => <Route key={route.path} {...route} />)}
                    </Switch>
                </div>

                <Footer setLanguage={setLanguage}/>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ln: state.localization.ln 	//need to subscribe so the lang change is reflected
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        setLanguage,
        detectLanguage
    }, dispatch)
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
